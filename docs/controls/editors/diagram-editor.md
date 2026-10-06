# DiagramEditor

Diagram preview and XML import/export with an embedded diagrams.net editing session.

## Import

```ts
import { DiagramEditor, diagramEditor, type DiagramEditorTypes } from '@atom-forge/ui';
```

## When to use

Use to edit diagrams.net XML and retain an SVG preview alongside it.

## Alternatives

Use an application-owned SVG/image viewer for display-only diagrams, or [BlockEditor](./block-editor.md) to embed diagrams in a document.

## Setup

Apply the library CSS and render inside `Root`; the component retrieves the theme manager during initialization. See [Getting Started](../../guides/getting-started.md). Browser network access and CSP must allow `https://embed.diagrams.net/`. The iframe is a third-party editing service: diagram content is sent to it via `postMessage`.

## Minimal example

```sveltehtml
<script lang="ts">
  import { Root, DiagramEditor, diagramEditor, type DiagramEditorTypes } from '@atom-forge/ui';
  let diagram = $state<DiagramEditorTypes.DiagramData>(diagramEditor.makeDefaultDiagramData());
</script>

<Root>
  <DiagramEditor value={diagram} onchange={(next) => diagram = next}/>
</Root>
```

In an application already wrapped in `Root`, omit the additional wrapper.

## Behavior

The component holds a local copy synchronized from `value`. Opening the editor loads XML into a diagrams.net iframe. Saving requests an SVG export and reports the resulting data via `onchange`. Import accepts file text as XML, clears stale SVG, and opens the editor to regenerate it. Export downloads `diagram.drawio`. Light/dark diagram scheme is separate from the application's theme.

## API

| Prop | Type | Default |
|---|---|---|
| `value` | `DiagramEditorTypes.DiagramData` (declared bindable) | `diagramEditor.makeDefaultDiagramData()` |
| `onchange` | `(value: DiagramEditorTypes.DiagramData) => void` | — |
| `class` | `string` | — |

`DiagramData` requires `xml: string`, `svg: string`, `scheme: 'light' | 'dark'`; optional `caption: string`, `description: string`. `diagramEditor.makeDefaultDiagramData(): DiagramData` returns empty strings with light scheme.

## Limitations

Although `value` is declared bindable, the save function updates local data and calls `onchange`, rather than assigning `value`. Use the callback for persistence; do not rely on binding alone. The exported save payload contains XML, SVG, and scheme and does not preserve caption/description automatically. Browser APIs are required for file import/export and the iframe workflow. SVG is rendered as HTML; only use trusted diagram data. The message handler does not validate message origin/source, and messages are posted with wildcard target origin; assess this before use in security-sensitive contexts. There is no service URL, readonly, or disabled prop.

Source: `src/lib/controls/editors/diagram-editor/{index.ts,types.ts,utils.ts,DiagramEditor.svelte}`.
