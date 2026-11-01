const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, rmSync, readdirSync, readFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const YAML = require('yaml');

const cli = path.join(__dirname, 'node_modules/@redocly/cli/bin/cli.js');
const config = path.join(__dirname, 'redocly.yaml');
const repository = path.resolve(__dirname, '../..');

function lint(file) {
  const result = spawnSync(process.execPath, [cli, 'lint', file, '--config', config], {
    encoding: 'utf8', env: { ...process.env, REDOCLY_TELEMETRY: 'off' },
  });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}

const valid = {
  openapi: '3.1.0', info: { title: 'Validation fixture', version: '1.0.0' },
  paths: { '/example': { get: { operationId: 'example', responses: {
    200: { description: 'OK', content: { 'application/json': { schema: { type: ['string', 'null'] } } } },
  } } } },
};

test('canonical OpenAPI 3.1 document and references validate', () => {
  const file = path.join(repository, 'api/openapi.yaml');
  const document = YAML.parse(readFileSync(file, 'utf8'));
  assert.equal(document.openapi, '3.1.0');
  const result = lint(file);
  assert.equal(result.status, 0, result.output);
});

for (const [name, mutate, expected] of [
  ['invalid OpenAPI schema type', document => {
    document.paths['/example'].get.responses[200].content['application/json'].schema.type = 'not-a-type';
  }, /struct|type/i],
  ['unresolved schema reference', document => {
    document.paths['/example'].get.responses[200].content['application/json'].schema = { $ref: '#/components/schemas/Missing' };
  }, /no-unresolved-refs|resolve/i],
  ['OpenAPI 3.0 boolean exclusiveMinimum in a 3.1 schema', document => {
    document.paths['/example'].get.responses[200].content['application/json'].schema = { type: 'number', exclusiveMinimum: true };
  }, /struct|exclusiveMinimum/i],
  ['duplicate operation IDs', document => {
    document.paths['/another'] = structuredClone(document.paths['/example']);
  }, /operation-operationId-unique|unique/i],
]) {
  test(`rejects ${name}`, () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'cuckoo-contract-'));
    try {
      const fixture = structuredClone(valid);
      mutate(fixture);
      const file = path.join(directory, 'invalid.yaml');
      writeFileSync(file, YAML.stringify(fixture));
      const result = lint(file);
      assert.equal(result.status, 1, result.output);
      assert.match(result.output, expected);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
}

test('rejects duplicate YAML keys', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'cuckoo-contract-'));
  try {
    const file = path.join(directory, 'duplicate.yaml');
    writeFileSync(file, `${YAML.stringify(valid)}openapi: 3.1.0\n`);
    const result = lint(file);
    assert.equal(result.status, 1, result.output);
    assert.match(result.output, /duplicate|unique/i);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('all checked-in YAML parses with unique keys using YAML 1.2', () => {
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (['.git', 'node_modules', '.venv', '__pycache__', 'dist'].includes(entry.name)) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.ya?ml$/.test(entry.name)) {
        const document = YAML.parseDocument(readFileSync(file, 'utf8'), { uniqueKeys: true });
        assert.deepEqual(document.errors, [], path.relative(repository, file));
      }
    }
  }
  walk(repository);
  const workflow = YAML.parse(readFileSync(path.join(repository, '.github/workflows/contract-check.yml'), 'utf8'));
  assert.ok(Object.hasOwn(workflow.on, 'pull_request'));
});
