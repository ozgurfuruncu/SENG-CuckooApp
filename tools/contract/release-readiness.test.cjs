const assert = require('node:assert/strict');
const { test } = require('node:test');
const { REQUIRED_CHECKS, evaluate, effectiveApprovals } = require('../../scripts/sprint1_readiness.cjs');

function fixture() {
  const policy = { enforce_admins: { enabled: true }, restrictions: null, required_pull_request_reviews: { required_approving_review_count: 1, dismiss_stale_reviews: true },
    required_status_checks: { strict: true, contexts: REQUIRED_CHECKS }, allow_force_pushes: { enabled: false },
    allow_deletions: { enabled: false }, required_conversation_resolution: { enabled: true } };
  const issues = Array.from({ length: 15 }, (_, i) => ({ number: i + 1, title: `[US-${String(i + 1).padStart(2, '0')}] Story`, assignees: ['po'] }));
  return { snapshot: { branches: [{ name: 'main', protected: true }, { name: 'develop', protected: true }, { name: 'release/sprint-1', sha: 'current' }],
    issues, collaborators: [{ login: 'po', permissions: { push: true } }], protections: { main: policy, develop: policy },
    projectInspection: { verified: true, url: 'https://github.com/users/example/projects/1', issueNumbers: issues.map(i => i.number), adminLogins: ['po'] },
    permissions: { admin: false }, pulls: [17, 19, 21].map(number => ({ number, author: 'author', sha: 'current', reviews: [], merged: false })), tags: [] },
    ci: { sha: 'current', checks: REQUIRED_CHECKS.map(name => ({ name, status: 'completed', conclusion: 'success' })) },
    options: { expectedSha: 'current', requiredLogins: ['po'], artifacts: [{ id: 'artifact', category: 'technical', status: 'PASS' }] } };
}

test('separates completed setup from outstanding real manual approval/release', () => {
  const f = fixture(), result = evaluate(f.snapshot, f.ci, f.options);
  assert.equal(result.readyExceptManual, true);
  assert.equal(result.releaseComplete, false);
});
test('rejects successful CI from an older commit', () => {
  const f = fixture(); f.ci.sha = 'old';
  assert.equal(evaluate(f.snapshot, f.ci, f.options).readyExceptManual, false);
});
test('does not pass an absent check or an empty check list', () => {
  for (const count of [0, 4]) { const f = fixture(); f.ci.checks.length = count; assert.equal(evaluate(f.snapshot, f.ci, f.options).readyExceptManual, false); }
});
test('rejects a failing required check', () => {
  const f = fixture(); f.ci.checks[0].conclusion = 'failure';
  assert.equal(evaluate(f.snapshot, f.ci, f.options).readyExceptManual, false);
});
test('prepared, bypassed or writer-restricted rules do not count as the required live policy', () => {
  for (const variant of ['prepared', 'bypass', 'restricted']) {
    const f = fixture();
    if (variant === 'prepared') f.snapshot.branches[0].protected = false;
    if (variant === 'bypass') f.snapshot.protections.main.required_pull_request_reviews.bypass_pull_request_allowances = { users: ['author'] };
    if (variant === 'restricted') f.snapshot.protections.main.restrictions = { users: ['author'] };
    assert.equal(evaluate(f.snapshot, f.ci, f.options).readyExceptManual, false);
  }
});
test('missing Project scope/proof does not count as a completed board', () => {
  const f = fixture(); f.snapshot.projectInspection = { error: 'INSUFFICIENT_SCOPES' };
  const result = evaluate(f.snapshot, f.ci, f.options);
  assert.equal(result.readyExceptManual, false);
  assert.equal(result.rows.find(row => row.id === 'project-import-access').status, 'UNVERIFIED');
  const inaccessible = fixture(); inaccessible.snapshot.collaborators = { error: 'Access denied' };
  assert.equal(evaluate(inaccessible.snapshot, inaccessible.ci, inaccessible.options).rows.find(row => row.id === 'project-import-access').status, 'UNVERIFIED');
});
test('unassigned stories and duplicate story IDs block setup readiness', () => {
  for (const kind of ['owner', 'duplicate', 'missing-team-access']) {
    const f = fixture();
    if (kind === 'owner') f.snapshot.issues[0].assignees = [];
    else if (kind === 'duplicate') f.snapshot.issues.push(structuredClone(f.snapshot.issues[0]));
    else f.options.requiredLogins.push('missing-team-member');
    assert.equal(evaluate(f.snapshot, f.ci, f.options).readyExceptManual, false);
  }
});
test('self approvals, stale approvals and dismissed/changed reviews never satisfy the review gate', () => {
  const eligible = new Set(['author', 'peer', 'other']);
  const pr = { author: 'author', sha: 'current', reviews: [
    { login: 'author', state: 'APPROVED', commit: 'current' }, { login: 'peer', state: 'APPROVED', commit: 'old' },
    { login: 'other', state: 'APPROVED', commit: 'current' }, { login: 'other', state: 'CHANGES_REQUESTED', commit: 'current' },
    { login: 'outsider-without-write', state: 'APPROVED', commit: 'current' },
  ] };
  assert.equal(effectiveApprovals(pr, eligible), 0);
  pr.reviews.push({ login: 'peer', state: 'APPROVED', commit: 'current' });
  assert.equal(effectiveApprovals(pr, eligible), 1);
  pr.reviews.push({ login: 'peer', state: 'DISMISSED', commit: 'current' });
  assert.equal(effectiveApprovals(pr, eligible), 0);
});
test('a tag at the wrong commit or an unpublished draft cannot count as a release', () => {
  const f = fixture();
  f.snapshot.pulls.forEach(pr => { pr.merged = true; pr.mergeCommitSha = 'reviewed-merge'; });
  f.snapshot.tagDetails = [{ name: 'sprint-1', sha: 'wrong' }];
  f.snapshot.releases = [{ tag: 'sprint-1', draft: false, publishedAt: '2026-11-02' }];
  f.snapshot.releaseCi = { sha: 'reviewed-merge', checks: f.ci.checks };
  assert.equal(evaluate(f.snapshot, f.ci, f.options).rows.find(row => row.id === 'integration-release').status, 'WAITING_HUMAN');
  f.snapshot.tagDetails[0].sha = 'reviewed-merge'; f.snapshot.releases[0].draft = true;
  assert.equal(evaluate(f.snapshot, f.ci, f.options).rows.find(row => row.id === 'integration-release').status, 'WAITING_HUMAN');
  f.snapshot.releases[0].draft = false;
  assert.equal(evaluate(f.snapshot, f.ci, f.options).rows.find(row => row.id === 'integration-release').status, 'PASS');
  f.snapshot.releaseCi.checks[0].conclusion = 'failure';
  assert.equal(evaluate(f.snapshot, f.ci, f.options).rows.find(row => row.id === 'integration-release').status, 'WAITING_HUMAN');
});
