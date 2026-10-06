# Compose data displays

Start from the question the user needs to answer. Keep data acquisition and transformations outside the display control, and choose an explicit loading, error, empty, or populated branch.

## Select by task

| Task | Compose | Decision |
|---|---|---|
| Compare flat records | [Table](../controls/data/table.md) | Typed columns, formatters, or cell snippets. |
| Search and browse records | [Input](../controls/forms/input.md) + Table + [Pagination](../controls/layout/pagination.md) | Caller filters, slices, and controls page state. |
| Explain an empty result | [EmptyState](../controls/display/empty-state.md) | Show only after loading finishes; compose a recovery action. |
| Group related content | [Card](../controls/display/card.md) | Supply padding, headings, and actions yourself. |
| Show hierarchy | [Tree](../controls/layout/tree.md) | Use hierarchical data instead of flattening relationships into a table. |
| Explain events over time | [Timeline](../controls/data/timeline.md) | Prefer an event narrative to a record grid. |
| Show trends or distribution | [Charts](../controls/data/charts.md), [Heatmap](../controls/data/heatmap.md) | Select the appropriate data shape and provide a textual alternative. |
| Show bounded completion | [ProgressRing](../controls/data/progress-ring.md), [MeterGroup](../controls/data/meter-group.md) | Check value/range contracts; these are not data loaders. |

## Setup

Use Svelte 5 in SvelteKit, with the theme and Tailwind 4 `dist` scan from [Getting Started](getting-started.md#css-setup). Import the CSS in the root layout and wrap page content in `Root`. Table retrieves popup context at initialization, but only uses it for the column settings menu. Root (or a manual popup provider/container) is required when `columnsEditable` is enabled; a plain Table with column editing disabled can render without it.

## Recipe: filter and page a local table

Complete page component beneath Root. The small page size makes pagination visible without a backend.

```sveltehtml
<script lang="ts">
  import { Card, EmptyState, Field, Input, Pagination, Table, type ColumnDef } from '@atom-forge/ui';
  import { Search } from 'lucide-svelte';

  type Person = { id: number; name: string; role: string };
  const searchId = $props.id();
  let people = $state<Person[]>([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Editor' },
    { id: 3, name: 'Carol', role: 'Reader' },
  ]);
  const columns: ColumnDef<Person>[] = [
    { key: 'name', label: 'Name', grow: true },
    { key: 'role', label: 'Role', width: '10rem' },
  ];
  let query = $state('');
  let page = $state(1);
  const pageSize = 2;
  const filtered = $derived(people.filter(person => person.name.toLowerCase().includes(query.toLowerCase())));
  const total = $derived(Math.max(1, Math.ceil(filtered.length / pageSize)));
  const currentPage = $derived(Math.min(Math.max(1, page), total));
  const visible = $derived(filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize));
</script>

<Card class="p-4 flex flex-col gap-4">
  <h2>People</h2>
  <Field label="Search by name" for={searchId}>
    <Input id={searchId} bind:value={query} oninput={() => page = 1}/>
  </Field>
  {#if filtered.length === 0}
    <EmptyState icon={Search} title="No matching people" description="Try another name."/>
  {:else}
    <Table data={visible} {columns}/>
    {#if total > 1}
      <Pagination page={currentPage} {total} onchange={next => page = next}/>
    {/if}
  {/if}
  <p role="status">{filtered.length} matching people</p>
</Card>
```

Filter before computing page count and slicing. `Pagination.total` is a **page count**, not a record count; pages start at 1 and `onchange` updates caller state. Reset on search input and clamp the effective page if the collection shrinks.

## Application responsibilities

- Fetch data, distinguish loading from errors and empty results, implement retry, and cancel/ignore stale requests. The local array above deliberately has no network lifecycle.
- Implement sorting, selection, editing, filtering, pagination, and virtualization as needed. Table renders the supplied rows in their supplied order; it is not a data-grid engine.
- Own URL synchronization, server-side paging, permissions, formatting, and accessible alternatives for visualizations.
- Treat columns as initialization configuration: Table captures the initial array internally and fills missing `visible` flags on its column objects. Later replacements require remounting; `bind:columns` currently does not report visibility-menu changes back to the caller.
- Do not combine `formatter` with `snippet`, or `grow` with `shrink`, in a column. `fixed` protects visibility and affects no-scroll weighting; it does not create a sticky column.
- For custom row actions, use explicit accessible buttons/links. Table's `rowClick` ignores interactive descendants, but caller-owned selection and navigation still need deliberate behavior.
