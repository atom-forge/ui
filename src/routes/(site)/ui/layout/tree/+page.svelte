<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
		import Example3 from './examples/Example3.svelte';
		import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'TreeView', name: 'data', type: 'TreeNode[]', description: 'Root-level array of nodes to render.' },
		{ group: 'TreeView', name: 'selectedId', type: 'string', description: 'Controlled ID of the selected node. The matching row is highlighted; update it in onNodeClick, not bind:selectedId.' },
		{ group: 'TreeView', name: 'onNodeClick', type: '(node: TreeNode) => void', description: 'Callback fired when any node is clicked.' },
		{ group: 'TreeView', name: 'row', type: 'Snippet<[TreeNode]>', description: 'Custom snippet for rendering each row. Replaces the default icon + label layout.' },

		{ group: 'TreeView', name: 'class', type: 'string', description: 'Extra classes on the root wrapper.' },
				{ group: 'TreeView', name: 'dnd', type: 'TreeDndOptions', description: 'Enable native drag-and-drop with type rules, optional depth/application restrictions, and an onMove callback. Data is never mutated by TreeView.' },
				{ group: 'TreeDndOptions', name: 'getNodeKind', type: '(node: TreeNode) => string', description: 'Required node-kind resolver for allowedChildren.' },
				{ group: 'TreeDndOptions', name: 'allowedChildren', type: 'Record<string, true | false | string[]>', description: 'Required allowed child kinds for each parent kind. Omitted parent kinds accept none; root-level drops are allowed independently of this map.' },
				{ group: 'TreeDndOptions', name: 'maxDepth', type: 'number', description: 'Maximum zero-based depth; includes the height of the entire moved subtree.' },
				{ group: 'TreeDndOptions', name: 'canDrop', type: '(context: TreeDropContext) => boolean | { allowed: boolean; reason?: string }', description: 'Optional application validation after built-in cycle, kind, and depth checks.' },
				{ group: 'TreeDndOptions', name: 'onMove', type: '(move: TreeMove) => void', description: 'Required. Apply the move to your data. Includes node/nodeId, previousParent/previousParentId/previousIndex, parent/parentId, final index, and before/inside/after position.' },
				{ group: 'TreeItem', name: 'node / level', type: 'TreeNode / number', default: 'level: 0', description: 'Public recursive row component used by TreeView. Requires the context created by TreeView; it is not a standalone renderer.' },
				{ group: 'TreeNode', name: 'id', type: 'string', description: 'Unique identifier for the node. Used for expansion and selection state.' },
		{ group: 'TreeNode', name: 'label', type: 'string', description: 'Display text shown in the default row layout.' },
		{ group: 'TreeNode', name: 'icon', type: 'IconDefinition', description: 'Icon shown before the label in the default row layout.' },
		{ group: 'TreeNode', name: 'children', type: 'TreeNode[]', description: 'Child nodes. A nonempty children array makes the node expandable.' },
		{ group: 'TreeNode', name: 'type', type: 'string', description: 'Arbitrary type tag. Useful for distinguishing node kinds inside a custom <code>row</code> snippet.' },
		{ group: 'TreeNode', name: 'data', type: 'Record<string, any>', description: 'Arbitrary extra data attached to the node, accessible in the <code>row</code> snippet.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Tree View</ProseTitle>
		<ProseText>Renders hierarchical data as an expandable, indented tree. Nodes can show icons, support selection, and accept a custom <DocInlineCode>row</DocInlineCode> snippet for full layout control.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Pass a nested <DocInlineCode>TreeNode[]</DocInlineCode> array to <DocInlineCode>data</DocInlineCode>. Nodes with <DocInlineCode>children</DocInlineCode> are expandable.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Row</ProseTitle>
				<ProseText>Use the <DocInlineCode>row</DocInlineCode> snippet to render anything per node — avatars, badges, action buttons.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Controlled selection and drag-and-drop</ProseTitle>
		<ProseText>Update selectedId from onNodeClick. With dnd enabled, TreeView validates proposed moves and calls onMove without changing data. The destination index already accounts for removal from the original parent. Persist the change or replace your tree state in that callback.</ProseText>
		<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
