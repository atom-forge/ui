# Tree

A collapsible tree view for hierarchical data. Supports node selection, custom row rendering, and click callbacks.

## Import

```sveltehtml
import { TreeView, type TreeNode } from '@atom-forge/ui';
```

---

## TreeView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TreeNode[]` | — | Root-level nodes. |
| `selectedId` | `string` | — | ID of the currently selected node (highlighted). |
| `onNodeClick` | `(node: TreeNode) => void` | — | Called when any node is clicked. |
| `row` | `Snippet<[TreeNode]>` | — | Custom row renderer. Overrides the default icon + label layout. |
| `dnd` | `TreeDndOptions` | — | Enables validated drag-and-drop tree reordering. |
| `class` | `string` | — | Extra Tailwind classes on the wrapper. |

---

## TreeNode type

```ts
type TreeNode = {
  id: string;
  label: string;
  icon?: IconDefinition;
  children?: TreeNode[];
  [key: string]: any;  // Arbitrary extra data
};
```

---

## Usage

### Basic

```sveltehtml
<script>
  import { TreeView, type TreeNode } from '@atom-forge/ui';

  const data: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'components', label: 'components', children: [
          { id: 'Button', label: 'Button.svelte' },
        ]},
        { id: 'routes', label: 'routes' },
      ]
    },
    { id: 'package', label: 'package.json' },
  ];

  let selected = $state<string>();
</script>

<TreeView
  {data}
  selectedId={selected}
  onNodeClick={(node) => selected = node.id}
/>
```

### Custom row

```sveltehtml
{#snippet customRow(node)}
  <div class="flex items-center gap-2">
    <Icon icon={node.icon ?? IconFile} size="4" class="text-muted-c"/>
    <span class="truncate">{node.label}</span>
    {#if node.modified}
      <span class="ml-auto text-xs text-accent">M</span>
    {/if}
  </div>
{/snippet}

<TreeView {data} row={customRow} onNodeClick={...}/>
```

### Drag and drop

Pass `dnd` to enable node moves. The component prevents cycles, rejects no-op moves, validates child kinds, and includes the entire dragged subtree when enforcing `maxDepth`. The component does not modify `data`; apply the emitted move in `onMove`.

```sveltehtml
<script lang="ts">
  import { TreeView, type TreeNode, type TreeMove } from '@atom-forge/ui';

  function moveNode(move: TreeMove) {
    // Update local state and persist the move.
  }
</script>

<TreeView
  {data}
  dnd={{
    getNodeKind: (node) => node.type ?? 'document',
    allowedChildren: {
      folder: true,
      document: ['image'],
      image: false,
    },
    maxDepth: 3,
    canDrop: ({ node, parent }) => !node.data?.locked && !parent?.data?.locked,
    onMove: moveNode,
  }}
/>
```

`allowedChildren` uses the destination parent kind. `true` accepts every child kind, a string array accepts only those kinds, and `false` accepts none. An omitted parent kind also accepts none. Root-level moves are always allowed by this rule.

`maxDepth` is zero-based: root nodes are at depth `0`. A node with descendants can only move where its deepest descendant remains at or below the configured maximum.

`canDrop` receives the proposed `TreeDropContext` and may return either a boolean or `{ allowed, reason? }` for application-specific validation.

---

## Behavior

- Nodes with `children` show a chevron — click to expand/collapse.
- Leaf nodes (no children) show a small dot indicator.
- Expanded state is managed internally via a `Set<string>` of node IDs.
- Indentation increases by `1.25rem` per level.
- A subtle vertical guide line connects children to their parent.
