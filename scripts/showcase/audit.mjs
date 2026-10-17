import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'svelte/compiler';
import ts from 'typescript';
import { createServer } from 'vite';

// Run from any directory, after `bun run package`: node scripts/showcase/audit.mjs
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'dist');
const owned = ['src/routes/(site)/ui/data', 'src/routes/(site)/ui/overlays'];
const pkg = JSON.parse(await readFile(path.join(dist, '../package.json'), 'utf8'));
const AUDITED_VERSION = '0.0.34';
if (pkg.version !== AUDITED_VERSION) console.warn(`WARNING: the API inventory was last audited against ${AUDITED_VERSION}; the packaged library is ${pkg.version}. Re-audit the API.`);
async function files(dir) {
    const entries = await readdir(path.join(root, dir), { withFileTypes: true });
    return (await Promise.all(entries.map(entry => entry.isDirectory()
        ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]))).flat();
}
const all = (await Promise.all(owned.map(files))).flat().filter(file => file.endsWith('.svelte')).sort();
const pages = all.filter(file => file.endsWith('/+page.svelte'));
const entry = path.join(dist, 'index.d.ts');
const program = ts.createProgram([entry], {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext, skipLibCheck: true,
});
const checker = program.getTypeChecker();
const exported = new Set(checker.getExportsOfModule(checker.getSymbolAtLocation(program.getSourceFile(entry))).map(symbol => symbol.name));
let rawImports = 0;
let literalSnippets = 0;
for (const file of all) {
    const source = await readFile(path.join(root, file), 'utf8');
    for (const generate of ['client', 'server']) compile(source, { filename: file, generate, runes: true });
    for (const match of source.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]@atom-forge\/ui['"]/g)) {
        for (const specifier of match[1].split(',').filter(part => part.trim())) {
            const name = specifier.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0];
            assert(exported.has(name), `${file}: ${name} is not publicly exported`);
        }
    }
    for (const match of source.matchAll(/from\s+['"]([^'"]+\?raw)['"]/g)) {
        const target = path.resolve(root, path.dirname(file), match[1].slice(0, -4));
        assert(target.startsWith(path.join(root, 'src/routes/(site)/ui/')), 'Unexpected raw import outside routes');
        await readFile(target, 'utf8');
        rawImports++;
    }
    // Inline code strings are invisible to svelte-check; parse their TS syntax separately.
    for (const match of source.matchAll(/code=\{`([\s\S]*?)`\}/g)) {
        if (/<(?:script|[A-Z])\b/.test(match[1])) {
            for (const generate of ['client', 'server']) compile(match[1], { filename: `${file}.snippet.svelte`, generate, runes: true });
        } else {
            const snippet = ts.createSourceFile(`${file}.snippet.ts`, match[1], ts.ScriptTarget.Latest, true);
            assert.equal(snippet.parseDiagnostics.length, 0, `${file}: invalid literal snippet syntax`);
        }
        literalSnippets++;
    }
}

// Check all component prop names against the actual $props destructuring in dist,
// including accepted-but-unused compatibility props. Semantics/defaults still require source review.
const coverage = {
    'data/bar-chart': ['data/diagrams/BarChart'],
    'data/charts/base': ['data/charts/Chart'],
    'data/charts/bar': ['data/charts/BarChart'],
    'data/charts/line': ['data/charts/LineChart'],
    'data/charts/pie': ['data/charts/PieChart', 'data/charts/DoughnutChart'],
    'data/charts/radar': ['data/charts/RadarChart'],
    'data/charts/scatter': ['data/charts/ScatterChart', 'data/charts/BubbleChart'],
    'data/dnd': ['data/sortable/SortableList', 'data/sortable/SortableGroup', 'data/sortable/DropSlot', 'data/sortable/DropIndicator'],
    'data/heatmap': ['data/heatmap/Heatmap'],
    'data/meter-group': ['data/meter-group/MeterGroup', 'data/meter-group/MeterGroupLegend'],
    'data/progress-ring': ['data/progress-ring/ProgressRing'],
    'data/table': ['data/table/Table', 'data/table/TableSettings'],
        'data/table-settings': ['data/table/TableSettings'],
    'data/timeline': ['data/timeline/Timeline'],
    'overlays/command': ['overlays/command/CommandPalette'],
    'overlays/command-palette': [], // formerly ui-pro; checked by migration-check.mjs, no prop inventory yet
        'overlays/containers': ['overlays/modal/ModalContainer', 'overlays/drawer/DrawerContainer', 'overlays/popup/PopupContainer', 'overlays/toast/ToastContainer'],
    'overlays/context-menu': ['overlays/context-menu/ContextMenu'],
    'overlays/drawer': ['overlays/drawer/Drawer'],
    'overlays/modal': [],
    'overlays/popup': ['overlays/popup/Popup', 'overlays/popup/PopupContainer'],
    'overlays/toast': ['overlays/toast/Toast'],
    'overlays/tooltip': ['overlays/tooltip/Tooltip'],
    'overlays/zen': ['overlays/zen/Zen'],
};
for (const page of pages) {
    const route = page.replace('src/routes/(site)/ui/', '').replace('/+page.svelte', '');
    assert(Object.hasOwn(coverage, route), `Add new page to API coverage: ${route}`);
    const docs = await readFile(path.join(root, page), 'utf8');
    const documented = [...docs.matchAll(/name:\s*(['"])(.*?)\1/g)].map(match => match[2]).join(' ');
    for (const control of coverage[route]) {
        const source = await readFile(path.join(dist, 'controls', `${control}.svelte`), 'utf8');
        for (const script of source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) {
            const ast = ts.createSourceFile(control, script[1], ts.ScriptTarget.Latest, true);
            function visit(node) {
                if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name)
                    && node.initializer && ts.isCallExpression(node.initializer)
                    && node.initializer.expression.getText(ast) === '$props') {
                    for (const element of node.name.elements) {
                        if (element.dotDotDotToken) continue;
                        const prop = (element.propertyName ?? element.name).getText(ast);
                        assert(new RegExp(`\\b${prop}\\b`).test(documented), `${route}: undocumented public prop ${control}.${prop}`);
                    }
                }
                ts.forEachChild(node, visit);
            }
            visit(ast);
        }
    }
}
console.log(`Compiled ${all.length} owned Svelte files for client and server; checked public imports, ${rawImports} raw sources, ${literalSnippets} inline snippets and ${pages.length} page API inventories.`);

// Middleware mode: no listening HTTP server and no browser/visual claim.
const server = await createServer({ root, optimizeDeps: { noDiscovery: true, entries: [], include: [] }, server: { middlewareMode: true, hmr: false, ws: false, watch: null } });
try {
    const { render } = await server.ssrLoadModule('svelte/server');
    const { default: Host } = await server.ssrLoadModule('/src/site/audit/AuditHost.svelte');
    const { OverlayStackManager } = await server.ssrLoadModule('/src/lib/controls/overlays/shared/overlay-manager.svelte.ts');
    const stack = new OverlayStackManager();
    const Content = () => {};
    const modalResult = stack.open('modal', Content, {}, { key: 'shared-key', closable: false });
    assert.equal(await stack.open('modal', Content, {}, { key: 'shared-key', closable: true }), undefined);
    const drawerResult = stack.open('drawer', Content, {}, { key: 'shared-key', closable: false });
    assert.equal(stack.items.length, 2, 'Keys must deduplicate within each overlay kind, not globally');
    stack.closeTopmostIfClosable();
    assert.equal(stack.items.length, 2, 'User dismissal must not close a non-closable topmost overlay');
    stack.close('modal', 'confirmed');
    assert.equal(await modalResult, 'confirmed', 'Programmatic close targets the last overlay of that kind');
    assert.equal(stack.items[0].kind, 'drawer');
    stack.closeAll();
    assert.equal(await drawerResult, undefined, 'Navigation-style cleanup resolves even non-closable overlays');
    assert.equal(stack.items.length, 0);
    const { default: ToastContract } = await server.ssrLoadModule('/src/site/audit/ToastContract.svelte');
    const customToast = render(Host, { props: { Page: ToastContract } });
    assert(customToast.body.includes('Contract User'), 'Custom toast must receive the explicitly supplied props');
    console.log('PASS shared-stack result/deduplication/dismissal contracts and custom-toast props rendering');
    for (const page of pages) {
        const { default: Page } = await server.ssrLoadModule(`/${page}`);
        const result = render(Host, { props: { Page } });
        assert(result.body.length > 0, `${page}: empty SSR output`);
        assert(!result.body.includes('[object Object]'), `${page}: object rendered as text`);
        console.log(`SSR PASS /ui/${page.replace('src/routes/(site)/ui/', '').replace('/+page.svelte', '')}`);
    }
} finally {
    await server.close();
}
console.log('All owned pages passed. SSR does not execute browser effects, canvas drawing, portal positioning or drag interactions.');
