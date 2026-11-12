# Textarea

A multi-line text input styled consistently with `Input`. Features autogrow, character/word counter, dirty tracking, smart Tab indentation, and a programmatic API for text manipulation via `bind:this`.

## Import

```ts
import { Textarea } from '@atom-forge/ui';
import type { TextareaAPI } from '@atom-forge/ui';
```

---

## Props

| Prop | Group | Type | Default | Description |
|------|-------|------|---------|-------------|
| `value` | Core | `string` | `''` | Bindable text content. |
| `dirty` | Core | `boolean` | `false` | Bindable. `true` if the value has changed from initial. |
| `placeholder` | Core | `string` | — | Placeholder text. |
| `disabled` | Core | `boolean` | `false` | Disables the textarea. |
| `invalid` | Core | `boolean` | `false` | Shows a destructive red border. |
| `rows` | Sizing | `number` | `3` | Minimum number of visible rows. |
| `maxRows` | Sizing | `number` | — | Maximum rows for autogrow. |
| `resizable` | Sizing | `boolean` | `false` | Enables the native resize handle. |
| `compact` | Sizing | `boolean` | — | Compact size. Mutually exclusive with `small`. |
| `small` | Sizing | `boolean` | — | Small size. Mutually exclusive with `compact`. |
| `maxLength` | Functional | `number` | — | Maximum allowed characters. |
| `showCounter` | Functional | `boolean` | `false` | Shows a character counter in the bottom-right corner. |
| `monospace` | Functional | `boolean` | `false` | Uses `font-mono`. |
| `handleTab` | Functional | `boolean` | `false` | Smart Tab / Shift+Tab indent handling. |
| `tabSize` | Functional | `number` | `2` | Indent size in spaces. `0` = literal tab character. |
| `adornment` | Snippets | `Snippet` | — | Bottom-right corner content. Overrides `showCounter`. |
| `counter` | Snippets | `Snippet<[{count, max, words, letters}]>` | — | Custom counter snippet. |

---

## TextareaAPI (bind:this)

```ts
interface TextareaAPI {
  // Wraps the current selection.
  // wrap: a single string used as both prefix and suffix, or [prefix, suffix] for asymmetric markers.
  // unwrapWhenWrapped: if true and the selection (or surrounding characters) already have the markers, removes them instead.
  wrapSelection(wrap: string | [string, string], unwrapWhenWrapped?: boolean): void;

  // Inserts text at the current cursor position.
  insertAtCursor(text: string): void;

  // Selects all text.
  selectAll(): void;

  // Focuses the textarea, optionally placing the cursor at an edge.
  focus(at?: 'beginning' | 'end'): void;
}
```

---

## Usage

### Basic with autogrow and counter

```sveltehtml
<Field label="Biography">
  <Textarea bind:value={bio} rows={3} maxRows={8} showCounter maxLength={200}/>
</Field>
```

### Code editor

```sveltehtml
<Textarea bind:value={code} bind:dirty monospace handleTab tabSize={2} rows={5}/>
```

### Toolbar with bind:this API

```sveltehtml
<script lang="ts">
  let text = $state('');
  let api: TextareaAPI;
</script>

{@render toolbar()}
<Textarea bind:value={text} bind:this={api} rows={6}/>

{#snippet toolbar()}
  <ButtonBar>
    <!-- symmetric: **text** — toggle on/off -->
    <Button compact ghost icon={IconBold}   onclick={() => api.wrapSelection('**', true)}/>
    <Button compact ghost icon={IconItalic} onclick={() => api.wrapSelection('*', true)}/>
    <Button compact ghost icon={IconCode}   onclick={() => api.wrapSelection('`', true)}/>
    <!-- asymmetric: <mark>text</mark> -->
    <Button compact ghost label="mark" onclick={() => api.wrapSelection(['<mark>', '</mark>'], true)}/>
  </ButtonBar>
{/snippet}
```

### Custom counter snippet

```sveltehtml
<Textarea bind:value showCounter>
  {#snippet counter({ count, max, words })}
    <span class="text-xs text-muted-contrast">{words} words · {count}/{max}</span>
  {/snippet}
</Textarea>
```


## When to use

Use for multiline plain text, with optional counters, autogrow, and selection editing.

## Alternatives

Use [Input](input.md) for a single line. This control is not a syntax-aware code editor or a rich-text editor.

## Setup and behavior

Bind `value`; `dirty` is recalculated in an effect against the initial value and has no reset-baseline API. Autogrow runs after DOM/value updates; `maxRows` limits height, not text length. `maxLength` uses the native textarea limit; programmatic edits and external assignments can exceed it. `handleTab` consumes Tab for indentation, changing normal keyboard focus navigation. There is no toolbar prop or generic native-attribute/event forwarding; compose a toolbar outside the component. The selection API is usable only after the textarea mounts.
