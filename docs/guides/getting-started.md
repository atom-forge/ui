# Getting Started

UI is a Svelte 5 component library built with Tailwind CSS 4. It provides composable, themeable UI components — from basic inputs and buttons to overlays, charts, and data tables.

AI coding agents: start with the [AI Consumer Entry Point](../../README-AI.md) for a task-driven reading workflow. To choose components rather than configure the library, use the [capability map](./component-overview.md#choose-by-task).

---

## Requirements

- Svelte 5
- SvelteKit
- Tailwind CSS 4

Svelte and SvelteKit are declared peer dependencies. Tailwind CSS 4 is part of the consuming application's styling setup. The library declares `lucide-svelte` and `tailwind-merge` as dependencies; if your application imports either directly, declare it in your application's dependencies too.

### Optional: prose components (`content/prose`)

The `ProseMarkdown`, `ProsePage`, `ProseCallout` and related components render Tailwind typography classes. To use them, install `@tailwindcss/typography` and add it to your CSS:

```bash
npm install @tailwindcss/typography
```

```css
/* src/app.css */
@plugin "@tailwindcss/typography";
```

Without this plugin the prose components will render without typographic styling.

### Optional: code highlighting (`DocShowCode`, `BlockViewCode`)

`DocShowCode` and `BlockViewCode` use `svelte-highlight` for syntax highlighting. The library ships the highlighter logic but **not** the theme CSS — you must import a theme yourself. If importing `svelte-highlight` directly, declare it in your application's dependencies:

```ts
// e.g. in your layout or app entry
import 'svelte-highlight/styles/github-dark.css';
```

Available themes are listed in the [`svelte-highlight` documentation](https://github.com/metonym/svelte-highlight#styles).

---

## Installation

```bash
npm install @atom-forge/ui
```

---

## CSS setup

First integrate Tailwind CSS 4 into your application's build (for example, install `tailwindcss` and `@tailwindcss/vite` and register the Tailwind plugin in `vite.config.ts`, alongside the SvelteKit plugin). Installing `@atom-forge/ui` alone does not process Tailwind directives.

Then add these lines to your app's CSS entry point (`src/app.css`):

```css
@import "tailwindcss";

/* 1. Import semantic tokens and base styles */
@import "../node_modules/@atom-forge/ui/dist/core/theme.css";

/* 2. Tell Tailwind to scan the library for utility classes */
@source "../node_modules/@atom-forge/ui/dist";

/* 3. Ensure your own project files are scanned */
@source ".";
```

The `@source` directive for `node_modules` is required because Tailwind CSS 4 does not scan `node_modules` by default. Without it, the utility classes used inside **atom-forge** components won't be included in your bundle.

`@atom-forge/ui/dist/core/theme.css` defines the semantic color tokens, surface layers, and utility classes that all components depend on.

---

## Layout setup

Import your CSS and wrap the root layout with `<Root>`. This single component:

- Registers all overlay managers (Modal, Toast, Drawer, Popup)
- Provides theme state and persists changes to `localStorage`; initial preference detection requires the app-level script below
- Renders portal targets and overlay containers

```sveltehtml
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { Root } from '@atom-forge/ui';
  let { children } = $props();
</script>

<Root>
  {@render children()}
</Root>
```

### Root props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Content rendered beneath the theme and overlay providers. |
| `manageBodyStyle` | `boolean` | `true` | Applies the canvas background and text colors to `document.body`. |

Root has no `dark` or `light` props. On mount it initializes theme state from the `<html>` element's `dark` class, not directly from saved preferences or `prefers-color-scheme`. Install the [pre-load script](#preventing-flash-on-load) below to apply those preferences before Root mounts; otherwise an initially unclassed document starts light.

---

## Importing components

All components are exported from the root package:

```ts
import { Button, Input, Card, Select, Switch } from '@atom-forge/ui';
```

### Alternative: the UI namespace

The flat `UI` object provides the same public components and UI manager functions under a single import. It references the existing implementations; named exports remain available and can be mixed with namespace usage.

```sveltehtml
<script lang="ts">
  import { UI } from '@atom-forge/ui';
  let enabled = $state(false);
</script>

<UI.Root>
  <UI.Button label="Save"/>
  <UI.Checkbox label="Enabled" bind:value={enabled}/>
</UI.Root>
```

Context-bound APIs are also available, including `UI.getThemeManager()`, `UI.getModalManager()`, `UI.getDrawerManager()`, `UI.getPopupManager()`, `UI.getToastManager()`, `UI.getCheckboxGroupManager()`, and `UI.getBlockAPI()`. Existing manager creation and context setter functions are included as well.

Retrieve managers during initialization of a component **inside** the appropriate provider (`Root`, `CheckboxGroupManager`, or `BlockEditor`). Then call the retrieved manager from event handlers. The namespace does not create global manager instances or change context requirements.

```sveltehtml
<!-- A child component rendered inside UI.Root -->
<script lang="ts">
  import { UI } from '@atom-forge/ui';

  const toast = UI.getToastManager();
</script>

<UI.Button label="Notify" onclick={() => toast.show('File saved!', { type: 'success' })}/>
```

For dialogs, retrieve `const modal = UI.getModalManager()` during initialization, then call the existing `await modal.open(DialogComponent, props)` API from an event handler. Drawer and popup managers work the same way as their named-export counterparts.

Types, general-purpose helpers (such as `debounce`), and utility namespaces remain separate named exports. There is no `UI.Modal` component: the existing modal API consists of `UI.ModalContainer` and the modal manager functions.

The namespace's properties are readonly in TypeScript and preserve the original component and function types. Because the object references the entire component collection, namespace usage may retain more code than direct named imports. Prefer named imports when minimizing bundle size is important; equivalent tree-shaking is not guaranteed.

---

## Your first component

```sveltehtml
<script lang="ts">
  import { Button } from '@atom-forge/ui';
  import { Plus, Trash } from 'lucide-svelte';
</script>

<Button label="Add item" icon={Plus}/>
<Button label="Delete" destructive/>
<Button label="Cancel" ghost/>
<Button icon={Trash} destructive compact/>
```

---

## Dark mode

`getThemeManager()` is available anywhere inside the `<Root>` tree. Bind `theme.dark` directly:

```sveltehtml
<script lang="ts">
  import { getThemeManager, Switch } from '@atom-forge/ui';
  import { Moon, Sun } from 'lucide-svelte';

  const theme = getThemeManager();
</script>

<Switch bind:value={theme.dark} icons={{ on: Moon, off: Sun }}/>
```

### Preventing flash on load

Without extra steps, users in dark mode will briefly see a white page before the saved preference is applied — a classic FOUC. To eliminate this, add a small blocking script to `app.html` **before** `%sveltekit.head%`. It reads `localStorage` synchronously and adds the `dark` class to `<html>` before the first paint:

```html
<!-- src/app.html -->
<head>
  <!-- Add this BEFORE %sveltekit.head% -->
  <script>
    (function() {
      try {
        var saved = localStorage.getItem('dark');
        if (saved !== null) {
          if (JSON.parse(saved)) document.documentElement.classList.add('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  </script>
  %sveltekit.head%
</head>
```

The script is intentionally render-blocking (no `async`/`defer`) so it always runs before any content is painted. The `try/catch` handles environments where `localStorage` is unavailable (e.g. private browsing with strict settings).

---

## Overlay managers

Root provides four imperative managers for overlay UI. Modal and Drawer opening APIs return result promises; Popup opening APIs also return promises, with replacement and pending-open limitations documented in [Popup](../controls/overlays/popup.md#setup-and-limitations). Toast's `show()` returns an identifier. Retrieve all context getters during descendant component initialization, then use the managers in event handlers.

### Toast

```ts
const toast = getToastManager();
toast.show('File saved!', { type: 'success' });
toast.show('Upload failed.', { type: 'error', duration: 0 });
```

### Modal

```ts
const modal = getModalManager();
const result = await modal.open(ConfirmDialog, { message: 'Delete this?' });
```

### Drawer

```ts
const drawer = getDrawerManager();
const result = await drawer.open(SettingsPanel, {}, { position: 'right', size: 'normal' });
```

### Popup

```ts
const popup = getPopupManager();
const result = await popup.open.component(ContextMenu, { config: [...] }, { anchor: event });
```

None of these require manual container placement beneath `<Root>`. Root does not supply application validation or complete overlay accessibility; see [Overlays](./overlays.md#application-responsibilities).

---

## Next steps

- [Color System](./color-system.md) — semantic color tokens, dark/light theming
- [Button](../controls/general/button.md) — full prop reference for the most used component
- [Modal](../controls/overlays/modal.md) — async modal pattern in depth
- [Table](../controls/data/table.md) — generic typed data table
- [Forms](./forms.md) — labeled inputs and local validation
- [Overlays](./overlays.md) — selection and context-safe composition
- [Data Display](./data-display.md) — filtering, paging, and empty states
- [Sortable Lists](./sortable-lists.md) — reordering and cross-list transfers

---

## Community

Stay updated with the latest releases, component updates, and architectural discussions by subscribing to our **[Substack](https://atomforge.substack.com)**.
