# ATOM-FORGE / UI

Welcome to the documentation for the AtomForge UI component library.

## Documentation

- **[The UI book](https://books.atom-forge.eu)**: The learning path — mental models, choosing controls, recipes, and pitfalls — embedding the reference below.
- **[Live showcase](https://ui.atom-forge.eu/)**: Every control running live.

## Guides

- **[AI Consumer Entry Point](README-AI.md)**: Start here when an AI coding agent uses this library in an application. Task-driven discovery, reading routes, and usage contracts.
- **[Getting Started](docs/guides/getting-started.md)**: A guide to installation, CSS configuration, and basic library usage.
- **[Component Overview](docs/guides/component-overview.md)**: A task-driven capability map and linked component category index.
- **[Forms](docs/guides/forms.md)**: Choose and compose inputs, labels, and validation feedback.
- **[Overlays](docs/guides/overlays.md)**: Choose dialogs, drawers, and anchored overlays; understand provider and result contracts.
- **[Data Display](docs/guides/data-display.md)**: Compose filtering, tables, pagination, and empty states.
- **[Sortable Lists](docs/guides/sortable-lists.md)**: Compose reorderable and cross-list interfaces.
- **[Color System](docs/guides/color-system.md)**: Documentation on semantic color tokens and maintaining consistency across themes.

## Documentation Access

The markdown documentation is shipped in the package under `docs/`, but it is not exposed as an importable package subpath. In local consumers that depend on `file:../../AtomForge/ui`, read the files directly from the sibling repository, for example `../../AtomForge/ui/docs/guides/getting-started.md`, or follow symlinks under `node_modules/@atom-forge/ui` with tools such as `find -L`.

## Development & Contribution

Rules for developing the library itself — for people and coding agents alike — start in [`AGENTS.md`](AGENTS.md), which links to the shared AtomForge rules and to the library's own standards in `AGENTS/local/`.

---

For licensing information and other details, please visit **[atom-forge.eu](https://atom-forge.eu)** or subscribe to our **[Substack](https://atomforge.substack.com)**.

---

Happy coding!

**- AtomForge Team**
