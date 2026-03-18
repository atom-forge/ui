<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type { PropDef } from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";

	const props: PropDef[] = [
		{ group: 'TreeView', name: 'data', type: 'TreeNode[]', description: 'Root-level array of nodes to render.' },
		{ group: 'TreeView', name: 'selectedId', type: 'string', description: 'ID of the currently selected node. The matching row is highlighted.' },
		{ group: 'TreeView', name: 'onNodeClick', type: '(node: TreeNode) => void', description: 'Callback fired when any node is clicked.' },
		{ group: 'TreeView', name: 'row', type: 'Snippet<[TreeNode]>', description: 'Custom snippet for rendering each row. Replaces the default icon + label layout.' },

		{ group: 'TreeNode', name: 'id', type: 'string', description: 'Unique identifier for the node. Used for expansion and selection state.' },
		{ group: 'TreeNode', name: 'label', type: 'string', description: 'Display text shown in the default row layout.' },
		{ group: 'TreeNode', name: 'icon', type: 'IconDefinition', description: 'Icon shown before the label in the default row layout.' },
		{ group: 'TreeNode', name: 'children', type: 'TreeNode[]', description: 'Child nodes. Presence of children makes the node expandable.' },
		{ group: 'TreeNode', name: 'type', type: 'string', description: 'Arbitrary type tag. Useful for distinguishing node kinds inside a custom <code>row</code> snippet.' },
		{ group: 'TreeNode', name: 'data', type: 'Record<string, any>', description: 'Arbitrary extra data attached to the node, accessible in the <code>row</code> snippet.' },
	];
</script>

<DocTitle>Tree View</DocTitle>
<DocText>Renders hierarchical data as an expandable, indented tree. Nodes can show icons, support selection, and accept a custom <InlineCode>row</InlineCode> snippet for full layout control.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Pass a nested <InlineCode>TreeNode[]</InlineCode> array to <InlineCode>data</InlineCode>. Nodes with <InlineCode>children</InlineCode> are expandable.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Custom Row</DocSubtitle>
		<DocText>Use the <InlineCode>row</InlineCode> snippet to render anything per node — avatars, badges, action buttons.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
