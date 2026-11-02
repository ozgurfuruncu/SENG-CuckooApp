// Read-only audit. This program never changes GitHub settings, reviews or releases.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');

const REQUIRED_CHECKS = ['backend', 'OpenAPI 3.1 validation', 'Stack A backend', 'Stack A frontend', 'Stack A Compose smoke'];
const SOURCE_HASH = '04c3b14cfa8da58b6a0c06bf98a01b5eade8ef82bb6bdbc3a3ed2b931f012e86';
const checksSucceed = checks => checks?.length > 0 && REQUIRED_CHECKS.every(name => checks.some(check => check.name === name)) && checks.every(check => check.status === 'completed' && check.conclusion === 'success');

function effectiveApprovals(pr, eligibleLogins = new Set()) {
  const latest = new Map();
  for (const review of pr.reviews || []) {
    if (review.login === pr.author || !eligibleLogins.has(review.login) || review.state === 'COMMENTED') continue;
    latest.set(review.login, review);
  }
  return [...latest.values()].filter(review => review.state === 'APPROVED' && review.commit === pr.sha).length;
}

function evaluate(snapshot, ci, options) {
  const rows = [...options.artifacts];
  const branches = Array.isArray(snapshot.branches) ? snapshot.branches : [];
  const pulls = Array.isArray(snapshot.pulls) ? snapshot.pulls : [];
  const collaborators = Array.isArray(snapshot.collaborators) ? snapshot.collaborators : [];
  const add = (id, category, status, detail) => rows.push({ id, category, status, detail });
  const checks = Array.isArray(ci.checks) ? ci.checks : [];
  const contextsPresent = REQUIRED_CHECKS.every(name => checks.some(check => check.name === name));
  const current = ci.sha === options.expectedSha && branches.some(branch => branch.name === 'release/sprint-1' && branch.sha === options.expectedSha);
  add('candidate-ci', 'technical', current && checksSucceed(checks) ? 'PASS' : 'INCOMPLETE',
    current ? (contextsPresent ? 'All five contexts must be completed successfully.' : 'A required context is absent.') : 'CI/snapshot is stale for the candidate SHA.');

  const issues = Array.isArray(snapshot.issues) ? snapshot.issues : [];
  const stories = Array.from({ length: 15 }, (_, index) => issues.filter(issue => issue.title.startsWith(`[US-${String(index + 1).padStart(2, '0')}]`)));
  const completeStories = stories.every(matches => matches.length === 1);
  add('story-coverage', 'technical', completeStories ? 'PASS' : 'INCOMPLETE', 'US-01..15 must each exist exactly once.');
  const verified = new Set(collaborators.map(person => person.login));
  const eligibleReviewers = new Set(collaborators.filter(person => person.permissions?.push || person.permissions?.admin).map(person => person.login));
  const teamCovered = options.requiredLogins?.length > 0 && options.requiredLogins.every(login => eligibleReviewers.has(login));
  add('team-access', 'setup', teamCovered ? 'PASS' : 'INCOMPLETE', 'Every user-confirmed role account must have verified repository Write/Admin access.');
  const owned = completeStories && stories.every(([issue]) => issue.assignees?.length && issue.assignees.every(login => verified.has(login)));
  add('story-owners', 'setup', owned ? 'PASS' : 'INCOMPLETE', owned ? 'Every story has a verified planning owner; this is not a completed implementation.' : 'Missing or unverified story assignees remain.');

  for (const name of ['main', 'develop']) {
    const branch = branches.find(item => item.name === name);
    const protection = snapshot.protections?.[name];
    const integrated = name === 'main' || pulls.some(pr => pr.number === 19 && pr.merged);
    const expected = integrated ? REQUIRED_CHECKS : REQUIRED_CHECKS.slice(0, 2);
    const bypass = protection?.required_pull_request_reviews?.bypass_pull_request_allowances;
    const valid = branch?.protected && protection && !protection.error &&
      protection.enforce_admins?.enabled === true &&
      protection.required_pull_request_reviews?.required_approving_review_count >= 1 &&
      protection.required_pull_request_reviews?.dismiss_stale_reviews === true &&
      !bypass?.users?.length && !bypass?.teams?.length && !bypass?.apps?.length &&
      protection.restrictions == null &&
      protection.required_status_checks?.strict === true &&
      expected.every(context => protection.required_status_checks.contexts?.includes(context)) &&
      protection.allow_force_pushes?.enabled === false && protection.allow_deletions?.enabled === false &&
      protection.required_conversation_resolution?.enabled === true;
    add(`${name}-protection`, 'setup', valid ? 'PASS' : branch?.protected ? 'UNVERIFIED' : 'INCOMPLETE',
      valid ? 'Effective rules verified, including admin enforcement and required contexts.' : 'Prepared payloads are not evidence of effective branch protection.');
  }

  const project = snapshot.projectInspection;
  const expectedIssues = issues.map(issue => issue.number);
  const boardVerified = project?.verified === true && project.url && expectedIssues.every(number => project.issueNumbers?.includes(number));
  const adminsVerified = boardVerified && verified.size > 0 && [...verified].every(login => project.adminLogins?.includes(login));
  add('project-import-access', 'setup', adminsVerified ? 'PASS' : 'UNVERIFIED',
    adminsVerified ? 'Linked board, issue import and all-collaborator access verified.' : 'Project existence/import/admin access is unverified; missing scope is not proof that a board does not exist.');

  for (const number of [17, 19, 21]) {
    const pr = pulls.find(item => item.number === number);
    add(`review-${number}`, 'manual', pr && effectiveApprovals(pr, eligibleReviewers) >= 1 ? 'PASS' : 'WAITING_HUMAN',
      'Requires an effective independent approval on that PR head; self/stale/dismissed reviews do not count.');
  }
  const releasePr = pulls.find(pr => pr.number === 21);
  const tag = snapshot.tagDetails?.find(item => item.name === 'sprint-1');
  const publication = snapshot.releases?.find(item => item.tag === 'sprint-1' && !item.draft && item.publishedAt);
  const integrated = [17, 19, 21].every(number => pulls.find(pr => pr.number === number)?.merged);
  const releasedChecks = snapshot.releaseCi?.sha === releasePr?.mergeCommitSha && checksSucceed(snapshot.releaseCi?.checks);
  add('integration-release', 'manual', integrated && releasePr.mergeCommitSha && tag?.sha === releasePr.mergeCommitSha && publication && releasedChecks ? 'PASS' : 'WAITING_HUMAN',
    'Requires reviewed integration, successful checks at the release merge SHA, a matching tag and an actual published GitHub release.');
  const requestedLogin = snapshot.requestedAdminLogin || 'anyx05';
  const requestedRepositoryAdmin = collaborators.find(person => person.login === requestedLogin)?.permissions?.admin;
  add('requested-admin-access', 'manual', requestedRepositoryAdmin && adminsVerified && project.adminLogins.includes(requestedLogin) ? 'PASS' : 'WAITING_OWNER',
    'User requests repository and Project admin, subject to owner approval. Personal repository ownership and Project roles are separate.');

  const readyExceptManual = rows.filter(row => row.category !== 'manual').every(row => row.status === 'PASS');
  return { expectedSha: options.expectedSha, readyExceptManual, releaseComplete: readyExceptManual && rows.every(row => row.status === 'PASS'), rows };
}

function inspectArtifacts(root) {
  const rows = [];
  const check = (id, detail, action) => {
    try { if (!action()) throw new Error('Requirement not met'); rows.push({ id, category: 'technical', status: 'PASS', detail }); }
    catch (error) { rows.push({ id, category: 'technical', status: 'INCOMPLETE', detail: `${detail}: ${error.message}` }); }
  };
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const required = ['README.md', 'README.bootstrap.md', 'LICENSE', 'AGENTS.md', 'api/openapi.yaml',
    'docs/team-raci.md', 'docs/team-accounts.json', 'docs/product-backlog.md', 'docs/issue-index.md',
    'docs/diagrams/system-context.png', 'docs/submissions/Cuckoo_Sprint1_Submission.docx',
    'docs/submissions/Cuckoo_Sprint1_Repository_Evidence_Candidate.docx',
    'docs/release/branch-protection-foundation.json', 'docs/release/branch-protection-integrated.json',
    'docs/release/owner-actions.md', 'docs/release/sprint-1-release-notes.md', 'docs/release/project-items.json', 'docs/legacy/README.original.md',
    '.github/PULL_REQUEST_TEMPLATE.md', '.github/ISSUE_TEMPLATE/user-story.yml', '.github/ISSUE_TEMPLATE/bug-report.yml',
    'compose.bootstrap.yml', 'backend/requirements.lock', 'frontend/package-lock.json'];
  check('required-artifacts', 'All required foundation/source/evidence/process/bootstrap paths exist', () => required.every(file => fs.statSync(path.join(root, file)).isFile()));
  check('mit-license', 'Complete MIT permission and warranty text is retained', () => /MIT License/.test(read('LICENSE')) && /Permission is hereby granted/.test(read('LICENSE')) && /THE SOFTWARE IS PROVIDED "AS IS"/.test(read('LICENSE')));
  check('accepted-adr', 'ADR-001 records Stack A acceptance and approval source', () => /^Status: \*\*ACCEPTED/m.test(read('docs/decisions/ADR-001-architecture.md')) && /Approval source:/.test(read('docs/decisions/ADR-001-architecture.md')));
  check('raci-accountability', 'Exactly one A in every submitted RACI activity', () => {
    const activities = read('docs/team-raci.md').split(/\r?\n/).filter(line => /^\|/.test(line)).map(line => line.split('|').slice(1, -1).map(cell => cell.trim())).filter(cells => cells.length === 7 && /^[RACI]$/.test(cells[1]));
    return activities.length === 7 && activities.every(cells => cells.slice(1).filter(cell => cell === 'A').length === 1);
  });
  check('confirmed-team-accounts', 'Six unique user-confirmed account mappings cover the named roles', () => {
    const accounts = JSON.parse(read('docs/team-accounts.json'));
    return accounts.confirmedOn && Object.keys(accounts.roles).sort().join(',') === 'DO,FI,PO,QA,SM,TL' && new Set(Object.values(accounts.roles).map(person => person.login)).size === 6;
  });
  check('source-submission-preserved', 'Supplied source DOCX remains byte-identical', () => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'docs/submissions/Cuckoo_Sprint1_Submission.docx'))).digest('hex') === SOURCE_HASH);
  return rows;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const argument = name => args[args.indexOf(name) + 1];
  if (!args.includes('--snapshot') || !args.includes('--ci')) throw new Error('Usage: node scripts/sprint1_readiness.cjs --snapshot FILE --ci FILE [--out FILE]');
  const root = path.resolve(__dirname, '..');
  const git = parameters => execFileSync('git', ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, ...parameters], { cwd: root, encoding: 'utf8' }).trim();
  const artifacts = inspectArtifacts(root);
  artifacts.push({ id: 'clean-working-tree', category: 'technical', status: git(['status', '--porcelain']) ? 'INCOMPLETE' : 'PASS', detail: 'Audit committed files from a clean checkout.' });
  let preserved = false;
  try {
    git(['merge-base', '--is-ancestor', '8f701754a296dfd5aa9e464383ac4668d0f5e790', 'HEAD']);
    preserved = git(['hash-object', '--', 'docs/legacy/README.original.md']) === git(['rev-parse', '8f701754a296dfd5aa9e464383ac4668d0f5e790:README.md']);
  } catch { /* Missing history is incomplete evidence, not a pass. */ }
  artifacts.push({ id: 'original-history', category: 'technical', status: preserved ? 'PASS' : 'INCOMPLETE', detail: 'Original main remains an ancestor and the archived README matches its original Git blob.' });
  const snapshot = JSON.parse(fs.readFileSync(argument('--snapshot'), 'utf8'));
  const ci = JSON.parse(fs.readFileSync(argument('--ci'), 'utf8'));
  let requiredLogins = [];
  try { requiredLogins = Object.values(JSON.parse(fs.readFileSync(path.join(root, 'docs/team-accounts.json'), 'utf8')).roles).map(person => person.login); } catch { /* Artifact row also records invalid mappings. */ }
  const result = evaluate(snapshot, ci, { expectedSha: git(['rev-parse', 'HEAD']), artifacts, requiredLogins });
  if (args.includes('--out')) fs.writeFileSync(argument('--out'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result, null, 2));
  // Only manual gates may remain for this exit code to be successful.
  process.exitCode = result.readyExceptManual ? 0 : 1;
}

module.exports = { REQUIRED_CHECKS, effectiveApprovals, evaluate, inspectArtifacts };
