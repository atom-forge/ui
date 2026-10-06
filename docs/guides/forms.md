# Compose forms

Use this recipe when a task asks for an editable record with labels, errors, and a submit action. Keep form state and business rules in the consuming application; controls provide presentation and interaction.

## Select controls by task

| Task | Compose | Decision |
|---|---|---|
| Short text or password | [Field](../controls/forms/field.md) + [Input](../controls/forms/input.md) | Bind strings; numeric input modes still return strings. |
| Longer text | Field + [Textarea](../controls/forms/textarea.md) | Use for multiline content. |
| One choice | [NativeSelect](../controls/forms/native-select.md), [Select](../controls/forms/select.md), or [Radio](../controls/forms/radio.md) | Native for simple options; Select for search/custom rendering; Radio for visible choices. |
| Several choices | [MultiSelect](../controls/forms/multi-select.md) or [Checkbox](../controls/forms/checkbox.md) | IDs versus independently visible choices. |
| Boolean setting | [Switch](../controls/forms/switch.md) | Bind a boolean. |
| Date/time | [DatePicker](../controls/forms/date-picker.md), [TimePicker](../controls/forms/time-picker.md), [DateTimePicker](../controls/forms/date-time-picker.md) | Check each control's value format before designing the payload. |
| Aligned horizontal fields | FieldGroup + horizontal Field + FieldSpan | Layout only, not a form-state provider. |

## Setup

Use Svelte 5 runes in a SvelteKit application. Follow [Getting Started](getting-started.md#css-setup) to load Tailwind 4, the theme, and scan the library's `dist` directory. Import the CSS in the root layout and render pages beneath `Root` (required for popup-based choices). Do not pass undocumented `dark`/`light` props to Root; the current source exposes `children` and `manageBodyStyle`.

## Recipe: edit a display name

Complete page component, rendered beneath the application's Root. This example validates locally and records a local snapshot; it does not claim to save to a server.

```sveltehtml
<script lang="ts">
  import { Button, Field, Input } from '@atom-forge/ui';

  const id = $props.id();
  let name = $state('');
  let submitted = $state(false);
  let savedName = $state<string | undefined>();
  const error = $derived(submitted && !name.trim() ? 'Enter a display name.' : undefined);

  function submit(event: SubmitEvent) {
    event.preventDefault();
    submitted = true;
    if (!name.trim()) return;
    savedName = name.trim();
  }
</script>

<form onsubmit={submit} novalidate class="flex flex-col gap-4 max-w-md">
  <Field label="Display name" for={id} required error={error}>
    <Input
      id={id}
      name="displayName"
      bind:value={name}
      required
      invalid={!!error}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {#snippet errorSnippet()}
      {#if error}<span id={`${id}-error`}>{error}</span>{/if}
    {/snippet}
  </Field>
  <Button type="submit" label="Save locally"/>
  <p role="status">{savedName === undefined ? '' : `Local snapshot: ${savedName}`}</p>
</form>
```

`Field.for` and the input ID establish the label association. The error snippet supplies an ID because Field does not generate `aria-describedby` connections. Always supplying `errorSnippet` suppresses Field hints even when the snippet is empty; this recipe intentionally has no hint. `novalidate` lets the demonstrated application rule run instead of native required-field blocking.

## Application responsibilities

- Implement full validation, server-side validation, serialization, persistence, permissions, and submission error handling. Field's required marker and Input's `invalid` styling do not implement those rules.
- For async submission, maintain pending/error state, prevent duplicate requests, and use [Button](../controls/general/button.md) `loading`/`disabled`; only announce success after persistence succeeds.
- Convert numeric strings explicitly. Keep Select ID types consistent (`string` and `number` are not interchangeable); Select has no public `onchange` prop.
- Own reset/dirty state, accessible help/error associations, focus on invalid fields, and native form integration for controls that do not forward form attributes.
- For async options, implement throttling, failure handling, and stale-response protection in the source; these are not a form engine feature.
