# AI Consumer Entry Point

Use this guide when building an application with `@atom-forge/ui`. It is a navigation and selection guide, not a replacement for the control documentation or a workflow for modifying the library itself.

## Start from the task

1. Identify the interaction or presentation the user needs, including loading, empty, error, and disabled states.
2. Consult the [capability map](./docs/guides/component-overview.md#choose-by-task). Compare relevant alternatives instead of defaulting to familiar primitives.
3. Read the selected control's **When to use**, **Setup**, **Behavior**, and **Limitations** sections before implementing it. Read the API for the props, snippets, and methods you actually use.
4. Prefer the highest-level existing tool that meets the requirements. Compose existing controls before creating a custom implementation; do not force a component into a role it does not support.
5. Follow a composition guide when several tools need to work together. Keep application responsibilities such as data fetching, persistence, authorization, and business validation explicit.
6. Validate against the installed version: check imports and types, then test the relevant interaction in the application.

Do not limit discovery to inputs and buttons. The library also includes content rendering, editors, charts, scheduling surfaces, command palettes, and overlay managers. Their contracts and limitations are linked from the capability map.

## Reading routes

| Task | Start here | Then read |
|---|---|---|
| Install or diagnose missing styles | [Getting Started](./docs/guides/getting-started.md) | [Color System](./docs/guides/color-system.md) |
| Choose a tool | [Component Overview](./docs/guides/component-overview.md) | The linked control documentation |
| Compose labeled, validated inputs | [Forms](./docs/guides/forms.md) | The individual field and input contracts |
| Choose a dialog, panel, or anchored overlay | [Overlays](./docs/guides/overlays.md) | Modal, Drawer, Popup, or Context Menu |
| Display, filter, or page data | [Data Display](./docs/guides/data-display.md) | Table, chart, and state components |
| Reorder or transfer items | [Sortable Lists](./docs/guides/sortable-lists.md) | SortableList and SortableGroup |
| Render or edit structured content | [Content and editors](./docs/guides/component-overview.md#content) | The selected renderer or editor |
| Plan dates, tasks, or resources | [Scheduling](./docs/guides/component-overview.md#scheduling) | Calendar, Gantt, Organizer, or Resource Manager |

## Important usage contracts

- The library uses Svelte 5. Examples use runes, snippet composition, and callback-style events; preserve each control's actual binding and callback API.
- Complete the Tailwind scanning and theme CSS setup in [Getting Started](./docs/guides/getting-started.md#css-setup). Optional typography and highlighting styles are documented there too.
- Place consuming components beneath `Root` for theme and overlay contexts. Calling a context getter in a component that merely renders `Root` around its children does not make that component a descendant of the provider.
- Retrieve context-dependent managers during initialization of the consuming component; use the retrieved manager in event handlers. Do not treat context getters as global service locators.
- Modal is an imperative manager API, not a `<Modal>` component. Read each overlay's result and dismissal contract rather than assuming all overlays return the same result.
- Prefer documented root imports from `@atom-forge/ui`. Catalog source-folder names are not package import subpaths.
- Named imports and the `UI` namespace are both available. See [importing components](./docs/guides/getting-started.md#importing-components) for context requirements and bundle tradeoffs. Types and general-purpose helpers remain separate named exports.
- A bindable value describes local UI state, not server persistence. A type assertion is not runtime data validation.

## When documentation is incomplete

Do not invent exports, props, methods, or behavior. First inspect the installed package's public declarations and root exports. If source is available, inspect the relevant implementation and existing usages to resolve the missing contract.

Use file/path search to locate documentation, content search to find symbols and usages, and targeted reads to understand contracts. Independent discovery questions can be investigated in parallel. Use the application's own check and test commands rather than assuming this library's development commands apply to every consumer.

Distinguish verified behavior from assumptions. Ask the user when a product decision remains unresolved, not when a searchable API fact can be established locally. Do not infer stability or recommended usage solely because a symbol is exported.

## Finding the documentation

This entry point is shipped as `README-AI.md` in the package root, with detailed Markdown documentation under `docs/`; they are filesystem documentation, not importable package subpaths. Read this file from the installed package or the linked library repository. For local `file:` dependencies, follow the package symlink or read the sibling repository directly.

Use documentation matching the installed package version. This entry point provides routes into the shared guides and controls; those pages remain the detailed source of usage information.
