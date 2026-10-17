<script lang="ts">
	import { TreeView, type TreeDndOptions, type TreeMove, type TreeNode } from '@atom-forge/ui';
	import { File, Folder } from 'lucide-svelte';

	let data = $state<TreeNode[]>([
		{ id: 'drafts', label: 'Drafts', type: 'folder', icon: Folder, children: [
			{ id: 'proposal', label: 'Proposal.md', type: 'file', icon: File },
		] },
		{ id: 'published', label: 'Published', type: 'folder', icon: Folder, children: [
			{ id: 'release', label: 'Release.md', type: 'file', icon: File },
		] },
	]);
	let selectedId = $state<string>();
	let lastMove = $state('No moves yet.');

	function applyMove(move: TreeMove) {
		function remove(nodes: TreeNode[]): TreeNode[] {
			return nodes.filter((node) => node.id !== move.nodeId).map((node) => ({
				...node, ...(node.children ? { children: remove(node.children) } : {}),
			}));
		}
		const next = remove(data);
		function insert(nodes: TreeNode[]): TreeNode[] {
			return nodes.map((node) => {
				if (node.id === move.parentId) {
					const children = [...(node.children ?? [])];
					children.splice(move.index, 0, move.node);
					return { ...node, children };
				}
				return node.children ? { ...node, children: insert(node.children) } : node;
			});
		}
		if (move.parentId === null) {
			next.splice(move.index, 0, move.node);
			data = next;
		} else {
			data = insert(next);
		}
		lastMove = `${move.node.label} → ${move.parent?.label ?? 'root'} at index ${move.index}`;
	}

	const dnd: TreeDndOptions = {
		getNodeKind: (node) => node.type ?? 'file',
		allowedChildren: { folder: ['folder', 'file'], file: false },
		maxDepth: 2,
		canDrop: ({ node }) => node.id !== 'release',
		onMove: applyMove,
	};
</script>

<div class="w-full max-w-md space-y-3">
	<TreeView {data} {dnd} {selectedId} onNodeClick={(node) => selectedId = node.id}/>
	<p class="text-xs text-muted-contrast">{lastMove}</p>
	<p class="text-xs text-muted-contrast">Open the folders, then drag Proposal.md. Release.md is protected by canDrop.</p>
</div>
