# UI 0.0.34 migration verification

## Scope and evidence

Only `src/routes/ui-pro/**` and `src/routes/showcase/**` were edited. No navigation, package, App, root-layout, or shared-style changes were made.

The installed `node_modules/@atom-forge/ui/package.json` reports **0.0.34**. Review used the installed documentation (`docs/guides/getting-started.md`, `component-overview.md`, contribution coding standards, and relevant Organizer, drawer, Chip, and Sortable references), actual `dist/index.js`/`index.d.ts`, component entry-point exports, component Svelte source, and declaration files. Where documentation and implementation differ, the installed implementation determines the examples.

## Exact pages verified

All paths below are relative to `src/routes`. Every listed page's imports, component arguments, API descriptions, and examples were reviewed; supporting files are included even when no edit was needed.

| Page | Supporting examples/components and verification |
| --- | --- |
| `ui-pro/block-editor/+page.svelte` | Built-in editor/render maps, block data shapes, structural-change history, exported component instance methods, public `getBlockAPI`, previewComponents. Documented the omitted textarea/code/link block types. |
| `ui-pro/calendar/+page.svelte` | `EventEditorDrawer.svelte`; controlled event callbacks, bindable year/month, zero-based month, holiday entries, actual day-click creation, Root-provided drawer manager, current drawer sizes. Drawer draft snapshots remain intentional via untrack; labels are associated with controls. |
| `ui-pro/content-doc/+page.svelte` | `examples/Example1.svelte`, `Example2.svelte`; all five Doc primitives, CodeFile shape, optional example component, raw-source display. Repaired all three embedded code strings, including missing public imports and invalid Calendar event binding. |
| `ui-pro/content-prose/+page.svelte` | `examples/Example1.svelte` through `Example5.svelte`; all exported Prose primitives, supported heading levels, callout variants, quotes, links, Markdown, YouTube URLs. Corrected empty-URL placeholder documentation. |
| `ui-pro/diagram-editor/+page.svelte` | `examples/Example1.svelte`, `Example2.svelte`; namespaced types/factory, required scheme and optional metadata, callback-based parent persistence despite nominal value bindability. |
| `ui-pro/gantt/+page.svelte` | `examples/Example1.svelte`, `Example2.svelte`; namespaced task types, nested tasks/dependencies, callback persistence, mount-time task initialization, working-day notation, actual recurring MM.DD holiday/override format. |
| `ui-pro/img-editor/+page.svelte` | `examples/Example1.svelte` through `Example3.svelte`; namespaced types/factory, edit steps, height, callbacks, mount-time feature flags and initial state, keyed remounts. Bitmap replay requires browser-compatible canvas/bitmap APIs, not a generic server runtime. |
| `ui-pro/markdown-editor/+page.svelte` | `examples/Example1.svelte`, `Example2.svelte`; non-bindable value with onchange, Edit/Split/Preview modes, plain-text input, paste/format callbacks, navigation/split/join callbacks, focus/focusAt methods. |
| `ui-pro/organizer/+page.svelte` | `CalendarDemo.svelte`, `ConferenceDemo.svelte`, `ShiftDemo.svelte`; all header/cell snippets use axis-mark objects, existing index-based styling preserved, bind:items, overlaps, blocked rectangles and directional resizing. Added API reference and actual raw demo source. |
| `ui-pro/resource-manager/+page.svelte` | `examples/Example1.svelte`, `Example2.svelte`, new `Example3.svelte`; non-bindable allocations with callback persistence, initial-state semantics, view-only navigation, MM.DD holidays. New Organizer-based resource grid maps inclusive dates to x/y/w/h and converts movement/resizing back to allocation IDs, resource IDs, project IDs, and date ranges. |
| `ui-pro/table-editor/+page.svelte` | `examples/Example1.svelte` through `Example3.svelte`; exported factory/types, required sumDecorator, callback persistence despite nominal bindability, internal commit-before-callback semantics. |
| `ui-pro/table-preview/+page.svelte` — new | `examples/Example.svelte`; required data prop, editor-to-preview callback updates, stored totals (not calculated formulas), heading/sum decoration, empty data behavior. |
| `ui-pro/block-view/+page.svelte` — new | `examples/Example.svelte`; required blocks/previewComponents, public defaultPreviewComponents, renderer data prop, empty/unknown-type fallbacks, trusted-content caveat. |
| `ui-pro/command-palette/+page.svelte` — new | `examples/Example.svelte`; exported CommandItem type, static/async sources, grouping/search metadata, selection callbacks, option snippet, explicit modal close integration. |
| `showcase/crm/+page.svelte` | `ContactDrawer.svelte`, `ContactModal.svelte`; widgets `ActivityFeed`, `ContactList`, `KpiBar`, `MonthlySales`, `Pipeline`, `Q4Goals`, `TeamStructure`. Reviewed Tabs, forms, overlay managers, charts/table row styling, FlipCard snippets, SortableGroup/List bindings, TreeView/DatePicker APIs. Fixed drawer size, Chip colors/status display, ignored Input label props, and ignored Button href props. Lead status retains accent styling. |
| `showcase/inbox/+page.svelte` | `SettingsDrawer.svelte`; drawer sizing, Input icon prop, pagination binding, EmptyState, current Button variants, radio/slider/switch/forms and conditional variant spreads. |
| `showcase/intranet/+page.svelte` | Widgets `BookingModal`, `BookingTab`, `DocumentsTab`, `FeedTab`, `LeaveTab`, `RequestLeaveModal`. Reviewed Tabs, modal props, date/select controls, chips, table snippets, pagination, accordions/collapsibles, progress and avatars. Fixed ignored Input icon prop, unsupported ButtonBar compact prop, and lucide strokeWidth typing. |

Both route `+layout.svelte` files were also reviewed and checked. Total: **17 pages, 64 Svelte files**.

## Navigation additions for the navigation owner

The new routes are available directly, but global navigation was deliberately not edited:

- **Table Preview** → `/ui-pro/table-preview` (suggest alongside Table Editor).
- **Block View** → `/ui-pro/block-view` (suggest alongside Block Editor).
- **Command Palette** → `/ui-pro/command-palette` (suggest in advanced/overlay controls).

The resource allocation grid is an additional example on the existing `/ui-pro/resource-manager` page; it needs no new navigation item. There is **no ResourceManagerGrid export** in the installed package; unexported `dist/dev` experiments were not presented as public components.

## Reproducible validation

Run from the website root:

```sh
node node_modules/svelte-check/bin/svelte-check --tsconfig src/routes/ui-pro/tsconfig.check.json --output human
TZ=America/New_York node src/routes/ui-pro/migration-check.mjs
git --no-pager diff --check -- src/routes/ui-pro src/routes/showcase
```

Results:

- Scoped Svelte/TypeScript check: **0 errors, 0 warnings**. The scoped config extends the existing project configuration and includes Vite ambient declarations, both owned route trees, and SvelteKit ambient types; it does not disable strict checking or add API shims.
- All **64 Svelte files** compiled with the Svelte compiler, without browser rendering.
- All **three embedded DocShowCode strings** passed Svelte compilation or TypeScript syntax parsing as appropriate. Executable raw examples are covered by the scoped type check. The unrelated illustrative RPC/Python content in the block editor is not executed as part of this UI migration.
- Allocation assertions passed for round trips, resource reassignment, movement, identity/project retention, unaffected allocations, one-day resizing, the final-column boundary, daylight-saving transitions, and year boundaries. Tests execute conversion code extracted from the actual grid example, using the installed date utilities.
- Scoped git diff whitespace check passed.

## Residuals and limits

- **No remaining scoped compiler/type diagnostics.** Other route trees and the full production build were not checked in this scoped task.
- Package behavior remains unchanged: ResourceManager initializes allocations/range/calendar options at mount rather than synchronizing later allocation replacements; GanttChart similarly initializes its task tree at mount. Remount when replacing these initial datasets/options. Resource/project lists and viewOnly have their own synchronization paths in ResourceManager.
- DiagramEditor, TableEditor, and GanttChart declare bindable data props but their internal save paths do not assign those props in this release. Examples retain parent data through callbacks instead. No node_modules patch or weakening of types was used.
- External diagram/image/video integrations were source-reviewed only. No browser, visual-regression, remote-service, drag interaction, or end-to-end execution claims are made.
- Existing demo-only business behavior (mock bookings, toast-only actions, etc.) was preserved rather than rewritten as part of this API migration.
