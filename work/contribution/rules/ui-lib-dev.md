---
tags: [frontend]
applies_to: Any task that creates or modifies components in the atom-forge/ui library.
---

# UI Library Development Standards

---

## Project Rules

- **Pure Library**: This project contains only the library source and documentation. No app routes are published in the package.
- **Dev-only Routes**: `src/routes/` may be used for development-only sandboxes and test pages. These files are **never exported** from `src/lib/index.ts` and are not included in the published package. They exist solely to exercise library components during development.
- **Component Reuse**: **ALWAYS** reuse existing components within the library. If a control exists (e.g., `Checkbox`), use it instead of native elements or creating a new one. Refer to [docs/guides/component-overview.md](../../../docs/guides/component-overview.md) for the full list.
- **Grouping**: Components must be placed in the correct category folder: `data`, `display`, `forms`, `general`, `layout`, or `overlays`.
- **Atomic Components**: Each component gets its own folder with an `index.ts` for clean exports.
- **Documentation**: When modifying a control, **ALWAYS** update its `docs/controls/[category]/[component].md` file.
- **All documentation is in English** — never use Hungarian or any other language.
- **Bun**: Use `bun` for development (not `npm` or `pnpm`).

---

## New Component Workflow

New components must always be developed in a staging area before being placed in their final location.

1. **Develop in `src/lib/dev/`** — create the component and its documentation here during active development.
2. **Iterate freely** — `src/lib/dev/` is a sandbox; structure and naming can change.
3. **Move when done** — once the component is considered complete, move it to the correct `src/lib/controls/[category]/` folder and move its doc to `docs/controls/[category]/`.
4. **Then export** — only add the component to `src/lib/index.ts` after it has been moved out of `src/lib/dev/`.

`src/lib/dev/` is never exported and never published in the package.

---

## Project Structure

```
docs/controls/[category]/*.md  # component docs
src/lib/controls/[category]/   # component source (atomic folders)
src/lib/dev/                   # staging area for new components (not exported)
src/lib/core/                  # central library logic (Root, theme-manager, theme.css)
src/lib/helpers/               # shared utilities, types and snippets
src/lib/index.ts               # main entry point (re-exports)
scripts/                       # automation and helper scripts
```

---

## Scoped Exports

Every component folder must export its public types and utilities in a **namespaced** form via `index.ts`.

- Types → `export type * as XxxTypes from './types.ts'`
- Utilities → `export * as xxx from './utils.ts'`

```ts
// index.ts
export {default as ImgEditor} from './ImgEditor.svelte';
export type * as ImgEditorTypes from './types.ts';
export * as imgEditor from './utils.ts';
```

---

## Relative Imports

Inside `src/lib`, **ALWAYS use relative imports**. Never use the `$lib` alias — it breaks consumer compatibility.

❌ Never:
```ts
import {Icon} from '$lib/controls/general/icon';
```
✅ Use:
```ts
import {Icon} from '../../general/icon';
```

---

## @atom-forge/svelte-helpers

All shared utilities, types, and helper components live in `src/lib/helpers/`. **Always use these instead of reinventing common patterns.**

### Types

#### ClassProp
For components that accept external CSS classes.
```ts
let { class: classes }: ClassProp = $props();
const cls = $derived(twMerge('base-styles', classes));
```

#### AnyProp
For extra HTML attributes spread onto elements. Always place at the end of the intersection.
```ts
let { class: classes, ...props }: ClassProp & AnyProp = $props();
<input {...props} class={cls} />
```

#### ChildrenProp / ChildrenPropOptional
```ts
let { children }: ChildrenProp = $props();           // required
let { children }: ChildrenPropOptional = $props();   // optional
let { children }: ChildrenProp<[Item]> = $props();   // parameterized
```

#### XOR
Enforces mutually exclusive props.
```ts
type Props = XOR<{ small: true }, { compact: true }, {}>;
type ButtonProps = XOR<{ primary: true }, { secondary: true }, { ghost: true }, {}>;
```

#### AtLeastOne
Ensures at least one of the properties is provided.
```ts
type LabelOrIcon = AtLeastOne<{ label: string; icon: IconDefinition }>;
```

### Utilities

#### variantMap
Converts boolean props to a string variant. Works best with `XOR` or `AtLeastOne`.
```ts
const { small, compact, ...props } = $props();
const size = untrack(() => variantMap({ small, compact }, 'normal'));
// returns 'small' | 'compact' | 'normal'
```

#### debounce / debounceAsync
```ts
const handleInput = debounce((val) => console.log(val), 300);
const search = debounceAsync(async (query) => await api.fetch(query), 500);
```

#### as
Type cast helper for Svelte templates. The TypeScript `as` keyword is not allowed inside template expressions — use this instead.

**Primitive shorthands** — inline in templates:
```svelte
{@const on = as.boolean(td[k])}
{@const label = as.string(item.value)}
{@render list(as.array<string>(items))}
```
Available: `as.string`, `as.number`, `as.boolean`, `as.array`, `as.object`, `as.function`, `as.any`, `as.unknown`.

**Script-side casters** — for complex or frequently reused types:
```ts
import { as } from '../helpers/as';
const toTask = as<{ title: string; done: boolean }>;
const toKey  = as<keyof TableData>;
```
```svelte
{@const task = toTask(_task)}
{@const on   = as.boolean(td[toKey(k)])}
```

**Snippet parameter typing:**
```svelte
<script lang="ts">
    import { as } from '../helpers/as';
    const itemArgType = as<{ title: string }>;
</script>

{#snippet item(_task)}
    {@const task = itemArgType(_task)}
    {task.title}
{/snippet}
```

### Components

#### RenderSnippet
Renders snippets dynamically. Useful when an API expects a Component.
```svelte
<RenderSnippet {snippet} args={{ item, index }} />
```

#### Spinner
Simple SVG spinner with `ClassProp` support.
```svelte
<Spinner class="w-4 h-4 text-accent" />
```

---

## Styling

### twMerge

All components must use `tailwind-merge` for class merging.

```ts
// Reactive — depends on reactive state/props:
const labelClass = $derived(twMerge('base classes', condition && 'extra class'));

// Frozen — depends only on init-time props:
const trackClass = twMerge('base classes', size === 'normal' && 'h-6');
```

- Use `$derived` when classes depend on reactive props (`disabled`, `checked`, etc.)
- Use plain `const` when classes depend only on props frozen with `untrack()` (size, type, etc.)

### Color System

Only semantic color tokens are allowed. Never use hardcoded Tailwind palette utilities or hex codes.

❌ Never:
```svelte
<div class="text-blue-500 bg-[#ffffff]">
```
✅ Use:
```svelte
<div class="text-accent bg-surface-primary">
```

Opacity modifiers on tokens are allowed: `text-accent/80`.

Full color reference: [`docs/guides/color-system.md`](../../../docs/guides/color-system.md)

### Size Naming

Always use standardized size names — never Tailwind-style abbreviations.

✅ Use: `'normal' | 'compact' | 'small'`
❌ Never: `'sm' | 'md' | 'lg'`

Prefer boolean props over string unions, enforce mutual exclusivity with `XOR`, then resolve via `variantMap`:

❌ Never:
```ts
size?: 'small' | 'compact';
```
✅ Use:
```ts
small?: boolean;
compact?: boolean;

const size = untrack(() => variantMap({ small, compact }, 'normal'));
```

---

## Component Documentation

Component docs live in `docs/controls/[category]/[component-name].md` (kebab-case). When modifying a control, updating its doc file is mandatory.

### Structure

Every doc file must follow this order:

**1. Title & Description**
```markdown
# Button
A clickable element for triggering actions. Supports multiple variants, sizes, and icon composition.
```

**2. Import**
```svelte
import { Button } from '@atom-forge/ui';
```

**3. Props table** — grouped logically if long:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Button text. |
| `disabled` | `boolean` | `false` | Disables the button. |

**4. Feature sections** — Level 2 headers (`##`), each with a brief explanation and a `sveltehtml` code example.

### Writing Rules

- All docs in English — no exceptions.
- Use ` ```sveltehtml ` for Svelte examples, ` ```ts ` for pure TypeScript.
- Use tables for props, events, sizes, and constants.
- Professional, senior engineer tone — direct and concise, no filler.
- If props are mutually exclusive, state it explicitly.
- Link to related components/guides using relative paths.

### Verification Checklist

- [ ] Correct `docs/controls/[category]/` folder
- [ ] Language is English
- [ ] All props and types are accurate
- [ ] Code examples follow Svelte 5 / Runes standards
- [ ] Import section present
- [ ] Relative links work
