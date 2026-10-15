---
children:
  - "[SvelteKit](08-ai-notes-sveltekit.md)"
---
# AI Notes

A coding agent works best when it reads the documentation of the package first and knows the decisions your project has already made. Copy the fenced block below into the instruction file of your project (for example `AGENTS.md`) and replace every `<...>` field with a fact you have verified in your application.

## Purpose

Direct an agent to the installed package documentation before it chooses or
composes controls, establish Tailwind spacing conventions, and document reusable
UI compositions for consistent screens.


## Copyable instructions

````markdown
## AtomForge UI

Before implementing UI with `@atom-forge/ui`, read:
`node_modules/@atom-forge/ui/README-AI.md`.

Follow its documentation pointers and read the relevant control
documentation before choosing or composing components.

The Markdown files are filesystem documentation, not package import subpaths.
If the dependency is symlinked, follow the symlink to the library repository.
Use documentation matching the installed package version.

Prefer an existing documented capability over new local infrastructure that
solves the same problem. Explain any package limitation that requires a local
implementation. Keep application-owned behavior separate from library behavior.

### CSS and layout spacing

Use Tailwind utilities wherever possible. Write custom CSS only when utilities
cannot express the required styling clearly.

Avoid padding on layout containers. Give their children the necessary margins
instead, using utilities such as `mx-*`, `mt-*`, and `mb-*`. Keep spacing ownership
explicit: do not combine container padding and child margins for the same inset,
or compensate for container padding with negative margins.

For example, a container provides layout and appearance, while its children
provide the insets:

```svelte
<section class="flex flex-col rounded-lg border">
  <h2 class="mx-6 mt-6 text-xl font-semibold">Section title</h2>
  <p class="mx-6 mt-3">Section content.</p>
  <div class="mx-6 mt-4 mb-6">Section actions</div>
</section>
```

This convention applies to layout containers, not intrinsic padding inside
controls such as buttons or inputs. Use flex or grid where needed to prevent
child margins from collapsing through a container.

### Reusable UI compositions

Consult existing UI composition patterns before building a similar interface.
When a composition works well and is useful beyond one screen, document it as a
reusable pattern so future screens follow the same structure and styling.

Describe when to use the pattern, its component structure, spacing, and supported
variations. Include a minimal, copyable example using the current UI components
and Tailwind utilities, without feature-specific content or business logic.

For example, a modal pattern should explain the header, body, and action area;
which elements own margins; where long content scrolls; how primary and secondary
actions are aligned; and which parts are optional.

Document the working composition, not just a screenshot. Keep the example current
when the adopted pattern changes. Store application-specific compositions in the
project's UI documentation, separate from the package API reference. A documented
pattern does not require a shared component; extract one when shared code is also
useful.
````

## Usage

Add this block to the project's existing agent instructions. Do not copy the
entire control reference into project rules: the versioned package documentation
is the reference. Projects using an older release need the corresponding older
documentation or a separately approved dependency upgrade.

