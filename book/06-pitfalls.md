---
type: chapter
title: Pitfalls and troubleshooting
---

# Pitfalls and troubleshooting

| Symptom | Likely cause | Where to fix |
|---|---|---|
| Components look unstyled | Missing Tailwind `@source` for the library | [CSS setup](https://github.com/atom-forge/ui/blob/main/docs/guides/getting-started.md#css-setup) |
| White flash in dark mode | No pre-load script; `Root` reads the `dark` class only | [Preventing flash](https://github.com/atom-forge/ui/blob/main/docs/guides/getting-started.md#preventing-flash-on-load) |
| Prose looks plain | `@tailwindcss/typography` not installed | [Optional setup](https://github.com/atom-forge/ui/blob/main/docs/guides/getting-started.md#optional-prose-components-contentprose) |
| Code blocks have no colors | No `svelte-highlight` theme imported | [Optional setup](https://github.com/atom-forge/ui/blob/main/docs/guides/getting-started.md#optional-code-highlighting-docshowcode-blockviewcode) |
| Manager getter throws | Called outside a descendant of `Root`, or in a handler | [Mental models](03-mental-models.md) |
| Modal resolves `undefined` | Backdrop, Escape, or navigation dismissed it | [Overlays recipe](https://github.com/atom-forge/ui/blob/main/docs/guides/overlays.md#recipe-confirm-removal-then-notify) |
| Wrong page after filtering | Page not reset or clamped | [Data Display recipe](https://github.com/atom-forge/ui/blob/main/docs/guides/data-display.md#recipe-filter-and-page-a-local-table) |
| Items swap between unrelated lists | Duplicate list IDs share a drag type | [Sortable Lists](https://github.com/atom-forge/ui/blob/main/docs/guides/sortable-lists.md#application-responsibilities) |

> [!danger] Do not trust UI state as truth
> A bound value or a type assertion is not validated data. Validate and authorize on the server.

## When the docs do not answer it

Do not guess exports or props. Check the installed package's declarations and root exports, then the control's source and existing usages. For AI-assisted work start from the [AI Consumer Entry Point](https://github.com/atom-forge/ui/blob/main/README-AI.md).
