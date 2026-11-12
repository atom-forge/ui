# CommandPalette

Searchable command list with grouping, icons, custom option snippets, and optional asynchronous results.

## Import

```ts
import { CommandPalette, type CommandItem } from '@atom-forge/ui';
```

## When to use

Use for searching and executing application actions in a compact surface.

## Alternatives

Use [ContextMenu](./context-menu.md) for location-specific actions, [Select](../forms/select.md) for choosing a value, or [Modal](./modal.md) to host a command surface in a dialog.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. The palette can render inline without an overlay provider. If you host it with an overlay manager, retrieve the manager inside the appropriate provider as described in Getting Started. The palette itself does not open an overlay or register a global shortcut.

## Minimal example

```sveltehtml
<script lang="ts">
  import { CommandPalette, type CommandItem } from '@atom-forge/ui';
  let open = $state(true);
  let selected = $state('None');
  const items: CommandItem[] = [
    { id: 'save', label: 'Save document', group: 'Document', keywords: ['write'],
      onSelect: (item) => selected = item.label }
  ];
</script>

<button onclick={() => open = true}>Open commands</button>
{#if open}
  <CommandPalette {items} close={() => open = false}/>
{/if}
<p>Last command: {selected}</p>
```

## Behavior

For array input, filtering is case-insensitive substring matching across label, group, description, and keywords. Items are grouped in encounter order by `group`, with an unnamed group for missing values. An asynchronous source receives the current query and must return the desired results; array-style local filtering is not applied to its response. Selection calls the item's `onSelect(item)` and then `close()`. Search/keyboard behavior delegates to `SelectPopup`.

## API

| Prop | Type | Default |
|---|---|---|
| `items` | `CommandItem[] \| ((query: string) => Promise<CommandItem[]>)` | `[]` |
| `placeholder` | `string` | `'Search commands...'` |
| `close` | `() => void` | No-op |
| `option` | `Snippet<[CommandItem, boolean]>` | Built-in option renderer |

`CommandItem` requires `id: string`, `label: string`, and `onSelect: (item: CommandItem) => void`. Optional fields are `description: string`, `group: string`, `icon: IconDefinition`, and `keywords: string[]`. The snippet's boolean indicates whether the option is highlighted.

## Limitations

No `open`, `bind:value`, hotkey, disabled-item, or `class` prop is declared. Closing only invokes the callback; the application/overlay host must remove the component. Command callbacks are not awaited, so async action completion is not a prerequisite for closing. The palette does not itself implement request cancellation, debounce, or application error handling for the async source. Use unique IDs. The fixed base width is 520px, constrained to viewport width minus 1rem.

Source: `src/lib/controls/overlays/command/{index.ts,command.svelte.ts,CommandPalette.svelte}` and `src/lib/helpers/SelectPopup.svelte`.
