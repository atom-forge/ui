---
type: chapter
---
# Upgrading

This chapter lists the changes that may require action when you move to a newer version of `@atom-forge/ui`. Each section covers one version step, newest first, and each change ends with a **What to do:** paragraph.

Changes that need no action from you — new controls and exports, fixes, documentation updates — are listed only in the changelog (`CHANGELOG.md`, shipped with the package).

## From 0.0.39 to Unreleased

### The editors, Gantt and ResourceManager were removed

These controls are no longer part of the package:

| Removed | Replacement |
|---|---|
| `BlockEditor`, `BlockView`, `BlockItem`, the `BlockEdit*` and `BlockView*` components, `getBlockAPI` | `Editor` and `Preview` from `@atom-forge/brickee` |
| `MarkdownEditor` | `@atom-forge/brickee` (a markdown block editor), or a `Textarea` with `ProseMarkdown` for a preview |
| `TableEditor`, `TablePreview` | the table plugin of `@atom-forge/brickee`, or a `Table` for read-only data |
| `DiagramEditor` | none in the package |
| `ImgEditor` (with `ImgEditorTypes` and `imgEditor`) | none in the package |
| `GanttChart`, `ResourceManager` | none in the package; `Organizer` covers unit-based timelines and resource rows |

The `UI` namespace lost the same entries.

**What to do:** remove the imports and replace the controls as above. Brickee stores documents as JSON blocks of its own, so content saved by `BlockEditor` needs a one-time conversion. If you need the removed source, it is kept in the `archive/complex-controls` tag of the repository.

### The documentation moved to `docs/en/`

The Markdown documentation shipped in the package moved from `docs/` to `docs/en/`, and a Hungarian translation was added in `docs/hu/`. The file names below these folders did not change.

| Before | After |
|---|---|
| `node_modules/@atom-forge/ui/docs/guides/getting-started.md` | `node_modules/@atom-forge/ui/docs/en/guides/getting-started.md` |
| `node_modules/@atom-forge/ui/docs/controls/forms/select.md` | `node_modules/@atom-forge/ui/docs/en/controls/forms/select.md` |

`README-AI.md` stays in the package root and links to the new paths.

**What to do:** if your project's agent instructions, scripts, or links point into `docs/guides/` or `docs/controls/` of the package, change them to `docs/en/guides/` and `docs/en/controls/`. Instructions that point only to `README-AI.md` need no change.
