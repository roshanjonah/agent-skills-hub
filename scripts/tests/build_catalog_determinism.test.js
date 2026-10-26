const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { buildCatalog } = require('../build-catalog');

const root = path.resolve(__dirname, '../..');
const outputs = ['CATALOG.md', 'data/catalog.json', 'data/bundles.json', 'data/aliases.json'];

const first = buildCatalog();
const snapshots = outputs.map(file => fs.readFileSync(path.join(root, file), 'utf8'));
const second = buildCatalog();

assert.strictEqual(second.generatedAt, first.generatedAt, 'unchanged content keeps its generation time');
for (const [index, file] of outputs.entries()) {
  assert.strictEqual(fs.readFileSync(path.join(root, file), 'utf8'), snapshots[index], file);
}

try {
  const stale = { ...second, generatedAt: '2000-01-01T00:00:00.000Z', total: -1 };
  fs.writeFileSync(path.join(root, outputs[1]), JSON.stringify(stale));
  const rebuilt = buildCatalog();
  assert.notStrictEqual(rebuilt.generatedAt, stale.generatedAt, 'changed content gets a new generation time');
  assert.strictEqual(rebuilt.total, second.total, 'stale content is regenerated');
} finally {
  outputs.forEach((file, index) => fs.writeFileSync(path.join(root, file), snapshots[index]));
}

console.log('catalog regeneration is deterministic');
