# atom-forge — CLAUDE.md

Svelte 5 component library + SvelteKit documentation app.

## Project layout

```
docs/*.md                     # concept docs
docs/gems/*.md                # component docs
src/lib/gems/<name>/          # component source
src/routes/gems/<name>/       # docs page
src/routes/gems/<name>/examples/ExampleN.svelte
src/routes/showcase/          # demo apps
```

## Rules

- Keep code simple. Always aim for maintainable, readable output.
- When modifying a component, update its docs page too.
- Keep the markdown files in the `docs/` folder in sync with any component changes.
- **All documentation is in English** — this applies to both `docs/*.md` files and `src/routes/` doc pages. Never write docs, labels, descriptions, or UI text in Hungarian or any other language.
- We are using `bun` for development (not `npm` or `pnpm` or else)

## Svelte 5 rules

### Runes

Only use runes: `$state`, `$derived`, `$derived.by`, `$props`, `$bindable`, `$effect`, `untrack`

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `let x = false` | `let x = $state(false)` | Plain `let` is not reactive in Svelte 5 — changes won't trigger updates |
| `$derived = newValue` | `let x = $state(…)` then assign | Derived values are read-only computed properties |
| `$derived((() => { … })())` | `$derived.by(() => { … })` | The IIFE pattern passes the *result* not a function — `$derived.by` is the correct multi-statement form |
| `$derived(() => { return x })` | `$derived(x)` or `$derived.by(() => x)` | Without `.by`, the arrow function itself becomes the value, not its return value |
| `let { foo } = $props<{ foo: string }>()` | `let { foo }: { foo: string } = $props()` | Generic `$props<T>()` syntax is deprecated in Svelte 5 |

### Props

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `size?: 'small' \| 'compact'` | `small?: boolean; compact?: boolean` with `XOR` | Boolean props are cleaner to use in templates (`{#if small}` vs `{#if size === 'small'}`) |
| Raw `class?: string` | `ClassProp` type | Consistent naming + signals intent across the codebase |
| Untyped rest props | `AnyProp` type | Makes spread safe and documents that extra HTML attrs are intentionally forwarded |

Freeze size string at init-time (not reactive):

```svelte
const size = untrack(() => small ? 'small' : compact ? 'compact' : 'normal');
```

If a string representation is needed internally, derive it via the `variantMap` utility.

### Snippets

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `let:item` directives | `{#snippet row(item)}` + `{@render row(item)}` | `let:` is Svelte 4 slot syntax, removed in Svelte 5 |
| `{#snippet item(task: { title: string; color: string })}` | untyped param + `{@const}` inside | Inline type annotations in snippet params are verbose and hard to read — destructure with `{@const}` instead |

Never annotate snippet parameters with inline types. Use `{@const}` inside the snippet body to extract and default values:

```svelte
<!-- ❌ Never -->
{#snippet myModal(data: { title: string; message: string })}
  <p>{data.title}</p>
{/snippet}

<!-- ✅ Use -->
{#snippet myModal(data)}
  {@const title = data?.title ?? 'Untitled'}
  {@const message = data?.message ?? ''}
  <p>{title}</p>
{/snippet}
```

### Component rendering

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `<svelte:component this={x}/>` | `{@const C = x}` then `<C {...p}/>` | `svelte:component` is deprecated; direct component variable usage is idiomatic Svelte 5 |

### Event handlers

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `on:click={…}` | `onclick={…}` | `on:` directive syntax is Svelte 4; Svelte 5 uses plain HTML event attributes |
| `window.addEventListener('keydown', …)` | `<svelte:window onkeydown={…}/>` | Manual listeners require manual cleanup; `svelte:window` is automatically removed on destroy |

## Styling

### Only twMerge — no tv(), no clsx

```svelte
import { twMerge } from 'tailwind-merge';

// Reactive (depends on reactive state/props):
const labelClass = $derived(twMerge(
    'base classes',
    condition && 'extra class',
));

// Frozen (depends only on init-time props, use plain const):
const trackClass = twMerge(
    'base classes',
    size === 'normal' && 'h-6',
    size === 'compact' && 'h-5',
    size === 'small'  && 'h-4',
);
```

- `twMerge(false && 'class')` — falsy values are silently ignored ✓
- Delete `*.tv.ts` files when removing tv()

### Frozen vs reactive class strings

- **Plain `const`**: classes that depend only on props frozen with `untrack()` (size, type, etc.)
- **`$derived`**: classes that depend on reactive props (`disabled`, `invalid`, `checked`, `value`, etc.)

## Color system — ALWAYS use semantic tokens from the theme

### Surface layers

| Token        | Usage                       |
|--------------|-----------------------------|
| `bg-base`    | App background (body)       |
| `bg-canvas`  | Panel / sidebar             |
| `bg-raised`  | Card, modal, drawer content |
| `bg-control` | Input, button, select       |

**Never use `bg-white dark:bg-base-*` for component surfaces.**

### Text

| Token            | Usage                            |
|------------------|----------------------------------|
| `text-control-c` | Primary text on control surfaces |
| `text-muted-c`   | Secondary/muted text             |
| `text-accent-c`  | Text on accent background        |
| `text-primary-c` | Text on primary background       |

### Other

- Border: `base-b`
- **Never use hardcoded `text-base-*`, `border-base-*`, `text-stone-*`** — use semantic tokens
- CSS color variables: `var(--color-accent)`, `var(--color-accent-v)` etc. — **no `var(--color-accent-500)`**, that doesn't exist

## Size naming

Always `normal` / `compact` / `small` — never `sm` / `md` / `lg`.

Freeze size at init:

```svelte
const size = untrack(() => small ? 'small' : compact ? 'compact' : 'normal');
```

## Tools — `src/lib/tools/`

### Types (`types.ts`)

#### `ClassProp` — CSS class prop
```ts
export type ClassProp = { class?: string }
```
Használd minden komponensnél ahol `class` prop-ot fogad. Mindig `twMerge`-el kombinálj.
```svelte
let { class: classes }: ClassProp = $props();
const cls = $derived(twMerge('base-styles', classes));
```

---

#### `AnyProp` — rest props
```ts
export type AnyProp = { [key: string]: any }
```
HTML elemre spreadelendő extra attribútumokhoz (`...props`). Mindig az intersect végére tedd.
```svelte
let { class: classes, ...props }: ClassProp & AnyProp = $props();
// ...
<input {...props} class={cls} />
```

---

#### `ChildrenProp` / `ChildrenPropOptional` — children snippet
```ts
export type ChildrenProp<P extends unknown[] = []>         = { children: Snippet<P> }
export type ChildrenPropOptional<P extends unknown[] = []> = { children?: Snippet<P> }
```

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `{ children: Snippet }` kézzel | `ChildrenProp` / `ChildrenPropOptional` | Egységes elnevezés, újrahasználható |
| `slot` (Svelte 4) | `{@render children()}` | `slot` nem létezik Svelte 5-ben |

Paraméterezett snippet esetén: `ChildrenProp<[Item]>` → `{@render children(item)}`.

---

#### `XOR` — kölcsönösen kizáró prop csoportok
```ts
XOR<T1, T2, T3?, …T8?>
```
Ha egy komponens egyszerre csak egy "módban" lehet, ne string union-t használj — `XOR`-t használj.

```ts
// ✅ small vagy compact, de egyszerre nem mindkettő:
XOR<{ small: true }, { compact: true }, {}>

// ✅ 3+ kizáró variáns:
XOR<{ primary: true }, { secondary: true }, { ghost: true }, {}>
```
Az üres `{}` ág azt jelenti, hogy egyik sem kötelező (mindkettő false lehet).

> **Belső típusok** (`AllKeys`, `Exclusive`) — ezeket ne használd közvetlenül, az `XOR` mögöttes implementációja.

---

#### `AtLeastOne<T>` — legalább egy mező kötelező
```ts
AtLeastOne<{ label?: string; icon?: IconDefinition }>
```
Ha egy objektumból legalább az egyiket meg kell adni, de mindkettő opcionális.

---

#### `variantMap` — boolean prop → string konverzió
```ts
variantMap({ small: props.small, compact: props.compact }, 'normal')
// → 'small' | 'compact' | 'normal'
```

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `size?: 'small' \| 'compact' \| 'normal'` prop | `small?: boolean; compact?: boolean` + `variantMap` | A template-ben boolean props egyszerűbbek, a belső logikához `variantMap` adja vissza a string értéket |

---

### `RenderSnippet.svelte` — snippet renderelés dinamikusan

```svelte
<RenderSnippet snippet={mySnippet} params={{ item, index }} />
```

**Mire való:** Amikor egy snippetet *dinamikusan*, változóból kell renderelni — pl. `ModalManager` esetén, ahol a modal tartalma tetszőleges snippet lehet.

**Mikor NEM kell:** Ha a snippet statikusan ismert, egyszerűen `{@render mySnippet(params)}`.

| ❌ Never | ✅ Use | 💡 Why |
|---|---|---|
| `<svelte:component this={…}>` snippet rendereléshez | `<RenderSnippet {snippet} {params}/>` | `svelte:component` komponensekhez való, snippetekhez nem alkalmazható |
| `{@render snippet(params)}` ha a snippet esetleg `undefined` | `{#if snippet}<RenderSnippet …/>{/if}` | `{@render}` undefined snippetre runtime errort dob |

**Jelenlegi használat:** `ModalManager.openSnippet()` — snippet alapú modal nyitásához.

---

### `Spinner.svelte` — loading indikátor

```svelte
<Spinner class="w-4 h-4 text-accent" />
```

Egyszerű SVG spinner, `animate-spin`-nel. Elfogad `ClassProp` + `AnyProp`-ot (méret, szín `currentColor`-ral).



## Docs pages

### Structure

```svelte
<DocTitle>Component Name</DocTitle>
<DocText>One sentence description.</DocText>

<ApiBlock title="API">
    <ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
    <div>
        <DocSubtitle>Section</DocSubtitle>
        <DocText>...</DocText>
        <ShowExample component={Example1} code={example1} />
    </div>
</div>
```

### ApiTable PropDef rules

```ts
const props: PropDef[] = [
	{group: 'GroupName', name: 'prop', type: 'string', default: "'foo'", description: 'Use <code>html</code> tags.'},
];
```

- `description` uses `{@html}` — write `<code>foo</code>`, **never `<InlineCode>` component**
- `<InlineCode>` is only for doc prose (DocText body)
- Use `group` to create section headers in the table — **one `ApiBlock` per page**
- `ApiBlock title="API"` always — not component-specific titles
