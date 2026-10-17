import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { compile } from 'svelte/compiler';
import ts from 'typescript';
import * as calendar from '../../dist/controls/scheduling/calendar/utils.js';

const repo = join(dirname(fileURLToPath(import.meta.url)), '../..');
const site = join(repo, 'src/routes/(site)/ui');
function svelteFiles(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
		const path = join(directory, entry.name);
		return entry.isDirectory() ? svelteFiles(path) : entry.name.endsWith('.svelte') ? [path] : [];
	});
}
const owned = ['content', 'editors', 'scheduling', 'overlays/command-palette'].map(dir => join(site, dir));
const files = [...owned.flatMap(svelteFiles), ...svelteFiles(join(site, '../showcase'))];
for (const filename of files) compile(readFileSync(filename, 'utf8'), { filename, generate: false });
console.log(`Compiled ${files.length} owned Svelte files (no browser rendering).`);

function scriptOf(relativePath) {
	const source = readFileSync(join(site, relativePath), 'utf8');
	return source.match(/<script lang="ts">([\s\S]*?)<\/script>/)[1];
}
function plainScript(script) {
	return ts.transpileModule(script, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
		.replace(/^import[^;]+;\s*/gm, '')
		.replace(/^export\s*\{\s*\};?\s*/gm, '');
}

// Verify the code strings users copy, not just the surrounding documentation component.
const strings = new Function(`${plainScript(scriptOf('content/doc/examples/Example2.svelte'))}\nreturn { singleFile, multiFile };`)();
for (const file of strings.multiFile) {
	if (file.name.endsWith('.svelte')) compile(file.code, { filename: file.name, generate: false });
	else assert.equal(ts.createSourceFile(file.name, file.code, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
}
assert.equal(ts.createSourceFile('example.ts', strings.singleFile, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
console.log('Validated all three embedded documentation code strings. Raw examples are covered by the scoped type check.');

// Exercise the actual grid example's conversion functions without Svelte or browser state.
const gridScript = plainScript(scriptOf('scheduling/resource-manager/examples/Example3.svelte'))
	.replace(/\$(?:state|derived)\(/g, '(');
function grid() {
	return new Function('calendar', `${gridScript}\nreturn { gridItems, updateAllocations, get allocations() { return allocations; } };`)(calendar);
}
const unchanged = grid();
const original = structuredClone(unchanged.allocations);
unchanged.updateAllocations(unchanged.gridItems);
assert.deepEqual(unchanged.allocations, original);

const moved = grid();
moved.updateAllocations(moved.gridItems.map(item => item.id === 'a1' ? { ...item, x: item.x + 2, y: 2 } : item));
assert.equal(moved.allocations[0].resourceId, 'clara');
assert.equal(moved.allocations[0].projectId, 'website');
assert.equal(moved.allocations[0].id, 'a1');
assert.equal(moved.allocations[0].startDate, calendar.addDays(original[0].startDate, 2));
assert.equal(moved.allocations[0].endDate, calendar.addDays(original[0].endDate, 2));
assert.deepEqual(moved.allocations.slice(1), original.slice(1));

const resized = grid();
resized.updateAllocations(resized.gridItems.map(item => item.id === 'a1' ? { ...item, w: 1 } : item));
assert.equal(resized.allocations[0].startDate, resized.allocations[0].endDate);
assert.equal(resized.allocations[0].resourceId, original[0].resourceId);

const lastDay = grid();
lastDay.updateAllocations(lastDay.gridItems.map(item => item.id === 'a1' ? { ...item, x: 13, w: 1 } : item));
assert.equal(lastDay.allocations[0].startDate, calendar.addDays(original[0].startDate, 13));
assert.equal(lastDay.allocations[0].endDate, lastDay.allocations[0].startDate);

for (const [start, end] of [['2026-03-07', '2026-03-10'], ['2026-10-31', '2026-11-03'], ['2026-12-30', '2027-01-02']]) {
	const width = calendar.dayDiff(start, end) + 1;
	assert.equal(width, 4);
	assert.equal(calendar.addDays(start, width - 1), end);
}
console.log('Allocation assertions passed: round trip, reassignment, move, metadata retention, resize, final-column boundary, DST and year boundaries.');
