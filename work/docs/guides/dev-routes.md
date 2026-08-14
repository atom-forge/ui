# Dev Routes

`src/routes/` contains development-only sandbox pages for exercising library components.
These files are **never exported** from `src/lib/index.ts` and are not included in the published package.

## Shell files

| File | Purpose |
|---|---|
| `src/app.html` | SvelteKit HTML shell. Includes no-flash dark mode init (reads `localStorage('dark')`). |
| `src/routes/+layout.svelte` | Wraps all dev routes with `Root` (theme + overlay providers). |

## Import convention in routes

The project `tsconfig.json` overrides the `$lib` path alias (it points to the published package path, not `src/lib`).
Routes must use **relative imports** instead:

```ts
import Root from '../lib/core/Root.svelte';
import type { ChildrenProp } from '../lib/helpers/types';
```

## Current sandbox pages

| Route | Purpose |
|---|---|
| `/editor` | Dev sandbox for Block Editor v2 (`src/lib/dev/block-editor-2/`). Updated after each EDITOR2 phase. |
| `/ui` | Index — linkek az egyes komponens sandbox oldalakra. |
| `/ui/button` | `UI.Button` sandbox. |
| `/ui/checkbox` | `UI.Checkbox`, `UI.CheckboxGroupManager` sandbox. |
| `/ui/radio` | `UI.RadioGroup`, `UI.RadioButtonView` sandbox. |
| `/ui/switch` | `UI.Switch` sandbox. |
| `/ui/drawer` | Drawer edge, size, and class override sandbox. |
| `/ui/overlay` | Modal/Drawer shared-stack sandbox plus popup-backed controls (`Select`, `MultiSelect`, `DatePicker`, `TimePicker`, `TagEditor`, `ContextMenu`). |
