# Field

A wrapper that pairs a form control with a label, hint, and error message. Use `FieldGroup` to align multiple horizontal fields into a two-column grid, and `FieldSpan` to let any element span the full width.

## Import

```ts
import { Field, FieldGroup, FieldSpan } from '@atom-forge/ui';
```

---

## Field Props

| Prop           | Group    | Type                         | Default      | Description                                                                                         |
|----------------|----------|------------------------------|--------------|-----------------------------------------------------------------------------------------------------|
| `label`        | Content  | `string`                     | —            | Label text above (or beside) the control.                                                           |
| `info`         | Content  | `string`                     | —            | Right-aligned informational text rendered on the same row as the label.                             |
| `hint`         | Content  | `string`                     | —            | Helper text shown below the control.                                                                |
| `error`        | Content  | `string`                     | —            | Error message shown below the control. Takes precedence over `hint`.                                |
| `required`     | Content  | `boolean`                    | `false`      | Appends a red `*` to the label.                                                                     |
| `optional`     | Content  | `boolean`                    | `false`      | Appends an `(optional)` badge to the label.                                                         |
| `for`          | Content  | `string`                     | —            | Explicit `<label for>` target. Omit it to let Field bind the label to its first control automatically. |
| `layout`       | Layout   | `'vertical' \| 'horizontal'` | `'vertical'` | Vertical stacks label above control. Horizontal renders two grid cells for use inside `FieldGroup`. |
| `labelSnippet` | Snippets | `Snippet`                    | —            | Overrides `label`. Use for rich label content (icons, badges, etc.).                                |
| `hintSnippet`  | Snippets | `Snippet`                    | —            | Overrides `hint`.                                                                                   |
| `errorSnippet` | Snippets | `Snippet`                    | —            | Overrides `error`.                                                                                  |
| `action`       | Snippets | `Snippet`                    | —            | Rendered right-aligned in the label row (e.g. a "Forgot?" link).                                    |
| `class`        | Styling  | `string`                     | —            | Extra Tailwind classes on the wrapper element.                                                      |

---

## FieldGroup Props

| Prop         | Type     | Default  | Description                                                                              |
|--------------|----------|----------|------------------------------------------------------------------------------------------|
| `labelWidth` | `string` | `'auto'` | Width of the label column. Any CSS value: `"150px"`, `"30%"`. Defaults to `max-content`. |
| `class`      | `string` | —        | Extra Tailwind classes on the grid container.                                            |

---

## FieldSpan

No props. Wraps any content in a `col-span-2` div so it stretches across both columns inside a `FieldGroup` (e.g. a `<hr>`, a section heading, or a full-width button row).

---

## Usage

### Basic (vertical)

```sveltehtml
<Field label="Email address" info="Required" hint="We'll never share your email." required>
  <Input bind:value={email} placeholder="you@example.com"/>
</Field>

<Field label="Full name" optional>
  <Input bind:value={name}/>
</Field>

<Field label="Accept terms" error={!agreed ? 'You must accept the terms.' : undefined}>
  <Switch bind:value={agreed} label="I agree to the terms and conditions"/>
</Field>
```

### Horizontal layout with FieldGroup

```sveltehtml
<FieldGroup labelWidth="120px">
  <Field label="First name" layout="horizontal" required>
    <Input bind:value={first}/>
  </Field>

  <Field label="Last name" layout="horizontal">
    <Input bind:value={last}/>
  </Field>

  <FieldSpan>
    <hr class="border-frame"/>
  </FieldSpan>

  <Field label="Agree" layout="horizontal">
    <Switch bind:value={agreed} label="I accept the terms"/>
  </Field>
</FieldGroup>
```

### Snippet overrides

```sveltehtml
<Field required {labelSnippet} {action} {errorSnippet}>
  <Input bind:value={password} type="password"/>
</Field>

{#snippet labelSnippet()}
  <span class="flex items-center gap-1.5 text-sm font-medium">
    <IconLock size={14}/> Password
  </span>
{/snippet}

{#snippet action()}
  <a href="/forgot" class="text-xs text-accent hover:underline">Forgot?</a>
{/snippet}

{#snippet errorSnippet()}
  {#if weak}Password is too short.{/if}
{/snippet}
```

---

## Notes

- `error` takes precedence over `hint` — if both are set, only the error is shown.
- In `layout="horizontal"`, `Field` renders two grid children (label cell + control cell) that slot into a `FieldGroup`'s two-column grid.
- `FieldSpan` is only meaningful inside a `FieldGroup`.

## When to use

Use to compose a label, supporting text, and error presentation around a form control.

## Alternatives

Use a control’s own label when no separate hint/error layout is needed. FieldGroup is for aligned horizontal fields, not a form-state provider.

## Setup and behavior

Field binds its `<label>` to the first form control rendered inside it: it generates an ID, the control (`Input`, `Textarea`, `NativeSelect`, `Select`, `MultiSelect`, `DatePicker`, `DateTimePicker`, `TimePicker`, `ColorPicker`, `TagEditor`, `Switch`) puts it on its focusable element, and button-like triggers also reference the label with `aria-labelledby`. Screen readers announce the label as the control's name, and tests can query the control with `getByLabelText`. An `id` set on `Input` is kept and the label follows it. Further controls in the same Field are not bound. The hint or error text is connected to the same control with `aria-describedby`, and while an error is shown the control gets `aria-invalid="true"` (button-like triggers such as Select and the date/time pickers only get the description, because `aria-invalid` is not valid on buttons). An `aria-describedby` set on `Input` is kept and extended. Set `for` to opt out and wire the ID and ARIA attributes yourself. Custom controls can join the mechanism with `field.useFieldControl()` (exported from `@atom-forge/ui`), called during component initialisation.

Field does not bind values or set the child’s `invalid` styling / `required` attributes. Required/optional markers are presentation only. An `errorSnippet` takes precedence over hints even when it renders no text. A custom label snippet must supply its own accessible label association.
