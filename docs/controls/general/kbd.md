# Kbd

Renders keyboard shortcut keys styled as physical keycaps. Supports single keys and multi-key combinations.

## Import

```ts
import { Kbd } from '@atom-forge/ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `string \| string[]` | — | A single key or an array of keys. Arrays are rendered with `+` separators. |
| `class` | `string` | — | Extra Tailwind classes on the wrapper `<span>`. |

---

## Usage

```sveltehtml
<!-- Single key -->
<Kbd keys="Enter"/>
<Kbd keys="⌘"/>
<Kbd keys="Escape"/>

<!-- Key combination -->
<Kbd keys={['⌘', 'K']}/>
<Kbd keys={['⌘', '⇧', 'Z']}/>
<Kbd keys={['Ctrl', 'Alt', 'Del']}/>
```

### Keyboard symbols reference

| Symbol | Meaning |
|--------|---------|
| `⌘` | Command (Mac) |
| `⌥` | Option/Alt (Mac) |
| `⇧` | Shift |
| `⌃` | Control |
| `⌫` | Backspace/Delete |
| `↩` | Return/Enter |

## When to use

Use to display a shortcut in help text, menus, or tooltips.

## Alternatives

Use [Button](button.md) for an action the user can invoke; Kbd is only a visual description.

## Setup and behavior

No key listeners are registered. `meta` is displayed as Command on detected Apple platforms and Ctrl otherwise; `cmd` always displays Command. Platform detection occurs at initialization and the server has no navigator, so use explicit keys if identical server/client labels matter.
