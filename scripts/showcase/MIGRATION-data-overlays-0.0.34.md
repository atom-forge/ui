# Data and overlay documentation migration — @atom-forge/ui 0.0.34

## Scope and evidence

Only `src/routes/ui/data/**` and `src/routes/ui/overlays/**` were edited. Existing changes were retained. The pre-existing `dnd/examples/DragHandleExample.svelte` diff (typed Task state and snippet parameter) was inspected before implementation and left unchanged.

The installed package version is asserted by `audit.mjs`. Review used the packaged `docs/guides/component-overview.md`, `docs/contribution/documentation.md`, `docs/contribution/coding-standards.md`, `docs/contribution/helpers.md`, every packaged data/overlay component guide, and the corresponding published dist entry points, Svelte source, manager implementations and declarations. The installed `svelte-dnd-action` keyboard implementation was also inspected because the wrapper guide alone does not explain its finalize timing or Escape behavior. Package guides are not treated as authoritative when they disagree with the installed source.

## Exact page inventory

Every route below was reviewed along with its owned examples and displayed raw source. “Verified” means source/type review, scoped compiler checks and SSR, not browser or visual testing.

| Route | Public surface / review focus |
| --- | --- |
| `/ui/data/bar-chart` | CSS BarChart, ChartData/segment/series shapes; segment labels are not consumed by the tooltip |
| `/ui/data/charts/base` | ChartBase configuration, bound instance lifecycle, palette/theme helpers and declaration limitation |
| `/ui/data/charts/bar` | CjsBarChart, grouped/stacked/horizontal datasets and options |
| `/ui/data/charts/line` | LineChart, smoothing, area fill and datasets |
| `/ui/data/charts/pie` | PieChart and DoughnutChart, colors/cutout/options |
| `/ui/data/charts/radar` | RadarChart and per-dataset fill |
| `/ui/data/charts/scatter` | ScatterChart and BubbleChart, point/radius shapes |
| `/ui/data/dnd` | SortableList/Group, binding/finalize metadata, handle dragging, orientation, shadow snippets, empty state, DropSlot/Indicator and separate native dnd actions |
| `/ui/data/heatmap` | Data matrix, installed defaults, label styling, legend, mouse callbacks and keyboard activation |
| `/ui/data/meter-group` | MeterGroup/Legend, proportions, sizes/orientation, both snippet override paths and pointer-only built-in callbacks |
| `/ui/data/progress-ring` | Single/concentric rings, geometry, labels/children and non-forwarded ARIA attributes |
| `/ui/data/table` | Table, ColumnDef/rendering/sizing/overflow/row activation, row-bar helper and visibility limitations |
| `/ui/data/table-settings` **new** | Dedicated TableSettings API, inline headerless table and anchored popup integration |
| `/ui/data/timeline` | Direction XOR, alternation, item/dot snippets and connecting-line class |
| `/ui/overlays/command` | CommandPalette/CommandItem, static/async items, custom option, explicit close callback and deduplication |
| `/ui/overlays/containers` **new** | ModalContainer/DrawerContainer/PopupContainer/ToastContainer, Root vs manual setup, shared stack and navigation cleanup |
| `/ui/overlays/context-menu` | Config union, centered/disabled/destructive entries, click-only submenu and root results |
| `/ui/overlays/drawer` | Manager/results/options, all edge orientations, named sizes, class overrides and explicit dismissal |
| `/ui/overlays/modal` | Manager/snippet/component results, stacking/options, setup and child content props |
| `/ui/overlays/popup` | Snippet/component opening, anchoring/alignment, scoped child manager, result/ref/dismissal semantics |
| `/ui/overlays/toast` | Standard/custom toasts, options/timers/actions and explicit custom-content dismissal |
| `/ui/overlays/tooltip` | Delay/content/fixed positioning/portal behavior and mouse-only accessibility limitations |
| `/ui/overlays/zen` | Bindable focus mode, editor/form examples, custom close button, dismissal policy and unused class prop |

## Important installed-version discrepancies

- SortableList uses `svelte-dnd-action`; the legacy `dnd`, DropSlot and DropIndicator exports do not automatically interoperate with it.
- SortableGroup rules/typeField and SortableList preservePreviewSize/previewOffset are accepted but not enforced/used by the current list implementation.
- Keyboard arrow movement emits finalize immediately. Escape drops at the current position rather than restoring the original order. Do not describe onchange as exclusively a final pointer-drop callback.
- TableSettings mutates visible before its notification. Table's built-in header menu toggles it again; the documentation's working integration uses an external shared-state snippet. Table captures its initial columns array. noScroll forces weighted fixed layout and does not disable vertical scrolling.
- ToastContainer does **not** inject an id or options into custom components. The custom-toast example now passes a callback closing over the id returned by showCustom, without an any cast. SSR contract coverage checks supplied props.
- ModalContainer and DrawerContainer render the same shared stack. Do not mount both or add either beneath Root. Modal/drawer keys are kind-scoped and duplicates resolve with undefined; popup ref duplicates return the active promise instead.
- Root is the actual exported provider; the packaged guides still refer to AtomForge. Root clears managed dialogs/drawers/popups on navigation, but not toast timers.
- Chart dataset types are exported by declarations (use type-only imports). ChartBase's generated declaration shadows the Chart.js instance type; the existing example guards the runtime instance method. Wrapper alpha suffixes require suitable six-digit hex override colors.
- Heatmap's installed legend/column-label defaults are false, unlike its packaged guide. ProgressRing does not forward arbitrary ARIA attributes. Tooltip lacks keyboard-focus activation and automatic tooltip ARIA wiring. Zen's class prop is accepted but unused, and it has no focus trap.

These are documented/package limitations, not changes to the dependency itself.

## Navigation suggestions (not implemented outside ownership)

- Data: **Table Settings** → `/ui/data/table-settings`, beside Table.
- Overlays: **Containers & Lifecycle** → `/ui/overlays/containers`, before the individual overlay pages.
- Ensure the previously existing Chart Base & Helpers page has an entry at `/ui/data/charts/base` if the global navigation does not already expose it.

Related links were added inside owned pages. No global navigation, package configuration or dependency source was edited.

## Reproducible scoped validation

Run from the website root:

```sh
npx svelte-check --tsconfig src/routes/ui/data/tsconfig.audit.json
node src/routes/ui/data/audit/audit.mjs
git --no-pager diff --check -- src/routes/ui/data src/routes/ui/overlays
```

The audit compiles all owned Svelte files for client and server, resolves public imports and raw-source references, checks component prop-name inventories against dist $props, tests shared-stack result/deduplication/dismissal contracts, renders the custom-toast props contract, and SSR-renders every page under a manager provider. Displayed examples use raw Svelte imports and are therefore included in compilation/type checking; literal code strings have a separate syntax check when present.

Validation does not execute browser effects, drag interactions, canvas drawing, focus management, portals or positioning. No visual validation is claimed.
