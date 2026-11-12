# Coding Standards

This guide outlines the technical coding standards and best practices for developing components in this library.

---

## Scoped Exports

Every component folder must export its public types and utilities in a **namespaced** form via `index.ts`.

- Types → `export type * as XxxTypes from './types.ts'`
- Utilities → `export * as xxx from './utils.ts'`

This keeps the consumer's import namespace clean and makes the origin of each symbol explicit.

✅ Use:

```ts
// index.ts
export {default as Calendar} from './Calendar.svelte';
export type * as CalendarTypes from './types.ts';
export * as calendar from './utils.ts';
```

Consumer:

```ts
import {Calendar, type CalendarTypes, calendar} from '@atom-forge/ui';

const event: CalendarTypes.CalendarEvent = {...base, startDate: calendar.todayStr()};
```

---

## Relative Imports

Inside `src/lib`, **ALWAYS use relative imports**. Never use `$lib` alias within the library itself to ensure consumer compatibility.

❌ Never:

```ts
import {Icon} from '$lib/controls/general/icon';
```

✅ Use:

```ts
import {Icon} from '../../general/icon';
```

Import a library module from its own folder, not from the root barrel (`../../../index`): the barrel imports every control, and importing it from inside the library can create circular imports that fail at runtime (`Cannot access '…' before initialization`). External packages, including `@atom-forge/svelte-helpers`, are imported by package name.

---

## Svelte 5 rules

### Runes

Use only Svelte 5 runes for reactivity ($state, $derived, $derived.by, $props, $bindable, $effect, untrack). Never use Svelte 4 stores (writable, readable, derived) or legacy reactivity patterns.

### State Declaration

Plain `let` is not reactive in Svelte 5 — changes won't trigger updates.

❌ Never:

```ts
let x = false;
```

✅ Use:

```ts
let x = $state(false);
```

---

### Mutating Derived Values

Derived values are read-only computed properties.

❌ Never:

```ts
$derived = newValue;
```

✅ Use:

```ts
let x = $state(initialValue);
// then later
x = newValue;
```

---

### Complex Logic in Derived

The IIFE pattern passes the result not a function — `$derived.by(() => { … })` is the correct multi-statement form.

❌ Never:

```ts
$derived((() => {
	return someLogic();
})());
```

✅ Use:

```ts
$derived.by(() => {
	return someLogic();
});
```

---

### Props Typing

Generic `$props<T>()` syntax is deprecated in Svelte 5.

❌ Never:

```ts
let {foo} = $props<{ foo: string }>();
```

✅ Use:

```ts
let {foo}: { foo: string } = $props();
```

---

## Snippets

### Children Snippet

Consistent naming, reusable across the library.

❌ Never:

```ts
let props = {children}:{children: Snippet} = $props();
```

✅ Use:

```typescript
let props = {children}:ChildrenProp = $props();
```

---

### Slots

`slot` does not exist in Svelte 5.

❌ Never:

```sveltehtml
<slot/>
```

✅ Use:

```sveltehtml
{@render children()}
```

---

### Scoped Data (let:item)

`let:` is Svelte 4 slot syntax, removed in Svelte 5.

❌ Never:

```sveltehtml
<Component let:item={data}>
	{data.name}
</Component>
```

✅ Use:

```sveltehtml
{#snippet row(data)}
	{data.name}
{#/snippet}
	
<Component {row}/>
```

---

### Type Casting (as)

The TypeScript `as` keyword is not allowed inside Svelte template expressions. Since Svelte 5 also lacks type annotations for snippet parameters, use the `as` helper from `@atom-forge/svelte-helpers` to restore type safety.

❌ Never:
```sveltehtml
{@const on = td[k as keyof TableData] as boolean}
```

**1. Primitive shorthands — recommended for inline use:**

Svelte's parser does not support generic syntax with primitive type keywords (`string`, `number`, `boolean`, etc.) inline in templates. Use the dedicated shorthands instead:

```sveltehtml
{@const on = as.boolean(td[k])}
{@const label = as.string(item.value)}
```

Available shorthands: `as.string`, `as.number`, `as.boolean`, `as.array`, `as.object`, `as.function`, `as.any`, `as.unknown`.

**2. Complex types & interfaces:**

Generic syntax `as<T>(v)` works inline for custom interfaces. For complex or frequently reused types, a script-side caster is cleaner:

```ts
import { as } from '@atom-forge/svelte-helpers';
const toTask = as<{ title: string; done: boolean }>;
const toKey  = as<keyof TableData>;
```
```sveltehtml
{@const task = toTask(_task)}
{@const on   = as.boolean(td[toKey(k)])}
```

---

### Snippet Parameter Types
Inline type annotations in snippet params are verbose and hard to read — destructure with `{@const}` instead.

❌ Never:
```sveltehtml
{#snippet item(task: { title: string })}
    {task.title}
{#/snippet}
```
✅ Use:
```sveltehtml

<script lang="ts">
	import {as} from '@atom-forge/svelte-helpers';
	const itemArgType = as<{ title: string }>;
</script>

{#snippet item(_task)}
	{@const task = itemArgType(_task)}
	{@const title = task.title}
	{title}
{/snippet}
```

---

## Component rendering & Events

### Dynamic Components

`svelte:component` is deprecated; direct component variable usage is idiomatic Svelte 5.

❌ Never:

```sveltehtml

<svelte:component this={x}/>
```

✅ Use:

```sveltehtml
{@const MyComponent = x}
<MyComponent/>
```

---

### Event Directives

`on:` directive syntax is Svelte 4; Svelte 5 uses plain HTML event attributes.

❌ Never:

```sveltehtml

<button on:click={handler}>
```

✅ Use:

```sveltehtml

<button onclick={handler}>
```

---

### Global Listeners

Manual listeners require manual cleanup; `svelte:window` is automatically removed on destroy.

❌ Never:

```ts
window.addEventListener('keydown', handler);
```

✅ Use:

```sveltehtml

<svelte:window onkeydown={handler}/>
```

### Escape in floating elements

A modal or drawer closes on an Escape that reaches its `window` listener, unless the event is already `defaultPrevented`. A popup, dropdown, or menu that closes on Escape must therefore:

- call `e.preventDefault()` when it handles the Escape;
- listen on its own element or on `document` in the capture phase (`<svelte:document onkeydowncapture={...}/>`), never on `window`, so it runs before the modal, the drawer, and Zen (which listens on `document` in the bubble phase).

A floating element that must appear above an open modal is moved with the `portal` action (see [Helpers](./helpers.md#portal)).
