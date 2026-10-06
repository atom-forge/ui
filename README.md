# ATOM-FORGE / UI

Welcome to the documentation for the AtomForge UI component library.

## Guides

- **[AI Consumer Entry Point](docs/guides/ai-entrypoint.md)**: Start here when an AI coding agent uses this library in an application. Task-driven discovery, reading routes, and usage contracts.
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

- **[Contribution Guide](docs/contribution/index.md)**: The entry point for library developers, covering engineering standards and project structure.
- **[Documentation Guide](docs/contribution/documentation.md)**: Standards, structure, and rules for creating and maintaining component documentation.
- **[Workflow & Standards](docs/contribution/workflow.md)**: Development lifecycle, project layout, and the component reuse rule.
- **[Coding Standards](docs/contribution/coding-standards.md)**: Technical coding guidelines focusing on relative imports, runes, and Svelte 5 patterns.
- **[Styling & Color System](docs/contribution/styling.md)**: Visual consistency, `twMerge` usage, and semantic token standards.
- **[Library Tools & Utilities](docs/contribution/helpers.md)**: Documentation for shared internal types, utilities, and helper components.

---

For licensing information and other details, please visit **[atom-forge.eu](https://atom-forge.eu)** or subscribe to our **[Substack](https://atomforge.substack.com)**.

---

Happy coding!

**- AtomForge Team**
