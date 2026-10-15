# SvelteKit

## Purpose

Organize Svelte pages, components, and their supporting code by ownership and
actual reuse. Use `(+page)` and `(+lib)` to distinguish page-private code from
shared components at route branches, without adding wrappers to every leaf.
Use Svelte 5 component contracts and focused Svelte Helpers instead of duplicating
common types and utilities.

## Copyable instructions

````markdown
## SvelteKit

### Pages and component placement

Keep route pages focused on composition. Place feature-specific state, derived
presentation data, and interaction behavior in the closest component that owns
it. A parent coordinates shared source state; it does not precompute every
child's labels, images, and display details merely because it has the data.

Use these placement conventions:

- A leaf route keeps `+page.svelte` and its private components/helpers beside
  each other. Do not add a `(+page)` wrapper when there are no route children.
- At a branch with its own page and real child routes, put that page and its
  private supporting code in `(+page)/`.
- Put code shared by two or more pages or components in `(+lib)/` at their
  nearest common route ancestor. Create it only when that reuse exists.
- A zone shared by sibling routes can have its own `(+lib)/`. Move components
  shared across zones to `src/routes/(+lib)/`, not to an arbitrary zone.
- Keep application-specific presentation components near their route consumers.
  Use `$lib` for portable helpers and shared infrastructure, rather than as a
  default dumping ground for page-specific components.
- Split large components by coherent UI responsibilities: for example, move tab
  content into separate components while the shell owns tab and save coordination.
- Avoid speculative shared abstractions and unrelated file moves.

Example with two independent zones:

```text
src/
  lib/
    format-value.ts                  # portable utility
  routes/
    (+lib)/
      BrandHeader.svelte             # actually used by both zones
    (zone-a)/
      workspace/                     # /workspace has a page AND child routes
        (+page)/
          +page.svelte               # /workspace
          WorkspaceSummary.svelte    # private to that page
        (+lib)/
          ItemSummary.svelte         # used by list and details
        list/                        # leaf route: no wrapper
          +page.svelte               # /workspace/list
          ListFilters.svelte
        details/
          +page.svelte               # /workspace/details
          DetailPanel.svelte
    (zone-b)/
      (+lib)/
        SectionHeader.svelte         # used by multiple pages in this zone
      help/
        +page.svelte                 # /help
        HelpContent.svelte
      contact/
        +page.svelte                 # /contact
```

SvelteKit route groups in parentheses do not add URL segments. `(+page)` and
`(+lib)` are project naming conventions, not special SvelteKit APIs. Keep
`(+lib)` free of route entry files. Do not also put a second `+page.svelte` at the
parent URL already owned by `(+page)/+page.svelte`.

A private component can start as one sibling file. If it grows subcomponents,
keep its shell as `Editor.svelte` and place the parts under `Editor/`. Do not
assume importing a directory automatically resolves an `index.svelte`.

### Svelte 5 and Svelte Helpers

Before using `@atom-forge/svelte-helpers`, start with
`node_modules/@atom-forge/svelte-helpers/README-AI.md` at the package root, then
follow its documentation pointers and check the exported types for the installed
version. Follow dependency symlinks to the library repository when present. This
is a filesystem Markdown path, not a package import subpath. Use the helpers where
their contracts fit; do not introduce a local replacement for a suitable helper.

- Import type-only helpers with `import type`.
- Use `ClassProp` for a public class prop, and `ChildrenProp` or
  `ChildrenPropOptional` for required or optional children snippets. Specify a
  tuple argument type when the snippet receives parameters.
- For native-element wrappers, prefer Svelte's specific HTML attribute types.
  Use `AnyProp` only for deliberately broad additional props, as the final member
  of the intersection, and forward attributes intentionally.
- Use `XOR` for mutually exclusive prop variants and `AtLeastOne` when at least
  one field is required. These describe compile-time contracts, not runtime
  validation. Include an empty `XOR` alternative only when selecting no variant is allowed.
- Use `variantMap` to map boolean variant props to an internal value. Wrap it in
  `$derived` when the value should follow prop changes; take a one-time snapshot
  only when ignoring later changes is intentional.
- Render ordinary children with `{@render children()}` or
  `{@render children?.()}`, not legacy slots. Use `RenderSnippet` when an API
  expects a component but the content is a snippet; check its installed props
  before wiring it to a modal or drawer.
- Use `debounce` or `debounceAsync` for interactions that benefit from delayed
  callbacks. Handle async failures and stale responses separately; debouncing
  alone does not guarantee response order.
- Treat `as` as a type assertion, not conversion or validation. Do not use it to
  hide a real type mismatch or assume it is required for template expressions.

Example of a small component with typed optional children:

```svelte
<script lang="ts">
  import type { ClassProp, ChildrenPropOptional } from '@atom-forge/svelte-helpers';

  let { class: classes, children }: ClassProp & ChildrenPropOptional = $props();
</script>

<section class={classes}>
  {@render children?.()}
</section>
```
````

## Usage

Adopt this note for SvelteKit placement and Svelte 5 component best practices. Zone names and component
names in the tree are illustrative, not prescribed product structure. Move code
only when a task needs it; do not reorganize the whole application solely to
make the existing tree match the example.
