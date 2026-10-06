# ImgEditor

Browser image editor with orientation, leveling, crop operations, a focal point, and a safe-area annotation. Changes are represented as an edit chain, not as an uploaded file.

## Import

```ts
import { ImgEditor, imgEditor, type ImgEditorTypes } from '@atom-forge/ui';
```

## When to use

Use to author nondestructive edit instructions and focal/safe-area metadata for an image.

## Alternatives

Use a plain image for display, a file input for upload selection, or an application-owned raster export workflow when the required output is a file.

## Setup

Apply [Getting Started](../../guides/getting-started.md) CSS. Supply a browser-loadable image URL with appropriate CORS permission for cross-origin images. Editing requires canvas, `createImageBitmap`, and `OffscreenCanvas`. No image-specific context provider is required.

## Minimal example

```sveltehtml
<script lang="ts">
  import { ImgEditor, imgEditor, type ImgEditorTypes } from '@atom-forge/ui';
  // This self-contained data URL supplies an actual image without a server file.
  const src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="240"%3E%3Crect width="320" height="240" fill="steelblue"/%3E%3C/svg%3E';
  let image = $state<ImgEditorTypes.ImgEditorData>(imgEditor.makeDefaultImgEditorData(src));
</script>

<ImgEditor {src} value={image} onchange={(next) => image = next} height="480px"/>
```

## Behavior

The original bitmap is retained while applied operations create working bitmaps. Pending changes can be applied or canceled. Crop coordinates are relative to the working image at the moment of Apply. `onchange` reports `{ src, steps, focalPoint, safeArea }`; it does not return encoded image bytes. Initial data and feature flags are read during initialization.

## API

| Prop | Type | Default |
|---|---|---|
| `src` | `string` (required) | — |
| `value` | `ImgEditorTypes.ImgEditorData` | Default data for `src` |
| `onchange` | `(value: ImgEditorTypes.ImgEditorData) => void` | — |
| `height` | `string` | `'640px'` |
| `orientation`, `leveling`, `cropping`, `focus` | `boolean` | `true` each |

### Public types

- `NormalizedPoint`: `{ x: number; y: number }`.
- `NormalizedRect`: `{ x: number; y: number; w: number; h: number }`.
- `EditStep`: `{ type: 'rotate'; quarters: 1 | 2 | 3 }`, `{ type: 'flip'; axis: 'H' | 'V' }`, `{ type: 'level'; deg: number }`, or `{ type: 'crop'; x: number; y: number; w: number; h: number }`.
- `ImgEditorData`: `{ src: string; steps: EditStep[]; focalPoint: NormalizedPoint; safeArea: NormalizedRect }`.

### Public `imgEditor` utilities

| Function | Result / purpose |
|---|---|
| `makeDefaultImgEditorData(src: string)` | `ImgEditorData`; empty chain, centered focal point, centered half-size safe area. |
| `computeSmartCrop(focal, safe, targetAspect, imgAspect)` | `NormalizedRect`; first two arguments are point/rect, aspect arguments are numbers. |
| `computeInscribedRect(w: number, h: number, deg: number)` | `NormalizedRect` for a rotated image. |
| `applyStepToBitmap(source: ImageBitmap, step: EditStep)` | `Promise<ImageBitmap>`. |
| `applyChainToBitmap(original: ImageBitmap, steps: EditStep[])` | `Promise<ImageBitmap>`; returns the original when the chain is empty. |

## Limitations

`value` is not bindable and is initialization data, not an externally synchronized controlled value. Feature flags are also initialization-only; remount to reset these inputs. There is no declared `class`, download, upload, or encoded-image output prop. Browser memory usage scales with image dimensions; callers of bitmap utilities own returned resources and should close bitmaps when finished, while remembering an empty chain returns the original. CORS failures or unsupported bitmap/canvas APIs can prevent editing. Persistence and raster encoding belong to the application.

Source: `src/lib/controls/editors/img-editor/{index.ts,types.ts,utils.ts,ImgEditor.svelte}`.
