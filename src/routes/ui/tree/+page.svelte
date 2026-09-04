<script lang="ts">
	import {FileText, Folder, Image, Lock, RotateCcw} from 'lucide-svelte';
	import {Button} from '../../../lib/controls/general/button';
	import {Icon} from '../../../lib/controls/general/icon';
	import {TreeView, type TreeMove, type TreeNode} from '../../../lib/controls/layout/tree';

	const initialTree: TreeNode[] = [
		{
			id: 'workspace',
			label: 'Workspace',
			type: 'folder',
			children: [
				{
					id: 'design',
					label: 'Design',
					type: 'folder',
					children: [
						{id: 'logo', label: 'logo.svg', type: 'image'},
						{id: 'cover', label: 'cover.png', type: 'image'},
					],
				},
				{
					id: 'brief',
					label: 'Project brief',
					type: 'document',
					children: [
						{id: 'brief-cover', label: 'brief-cover.png', type: 'image'},
					],
				},
			],
		},
		{id: 'readme', label: 'README', type: 'document'},
		{
			id: 'archive',
			label: 'Archive',
			type: 'folder',
			data: {locked: true},
			children: [{id: 'old-logo', label: 'old-logo.png', type: 'image'}],
		},
	];

	let tree = $state<TreeNode[]>(cloneTree(initialTree));
	let lastMove = $state('No move yet.');

	const dnd = {
		getNodeKind: (node: TreeNode) => node.type ?? 'document',
		allowedChildren: {
			folder: true,
			document: ['image'],
			image: false,
		},
		maxDepth: 2,
		canDrop: ({node, parent}: TreeMove) => {
			if (node.data?.locked || parent?.data?.locked) {
				return {allowed: false, reason: 'Locked nodes cannot be moved or receive children.'};
			}
			return true;
		},
		onMove: applyMove,
	};

	function cloneTree(nodes: TreeNode[]): TreeNode[] {
		return nodes.map(node => ({
			...node,
			data: node.data ? {...node.data} : undefined,
			children: node.children ? cloneTree(node.children) : undefined,
		}));
	}

	function takeNode(nodes: TreeNode[], nodeId: string): TreeNode | null {
		const index = nodes.findIndex(node => node.id === nodeId);
		if (index >= 0) return nodes.splice(index, 1)[0];
		for (const node of nodes) {
			const removed = takeNode(node.children ?? [], nodeId);
			if (removed) return removed;
		}
		return null;
	}

	function insertNode(nodes: TreeNode[], parentId: string | null, index: number, node: TreeNode): boolean {
		if (parentId === null) {
			nodes.splice(index, 0, node);
			return true;
		}
		for (const parent of nodes) {
			if (parent.id === parentId) {
				const children = parent.children ??= [];
				children.splice(index, 0, node);
				return true;
			}
			if (insertNode(parent.children ?? [], parentId, index, node)) return true;
		}
		return false;
	}

	function applyMove(move: TreeMove) {
		const nextTree = cloneTree(tree);
		const node = takeNode(nextTree, move.nodeId);
		if (!node || !insertNode(nextTree, move.parentId, move.index, node)) return;
		tree = nextTree;
		lastMove = `${move.node.label ?? move.nodeId} → ${move.parent?.label ?? 'root'} (index ${move.index})`;
	}

	function reset() {
		tree = cloneTree(initialTree);
		lastMove = 'Demo reset.';
	}

	function nodeIcon(node: TreeNode) {
		if (node.type === 'folder') return Folder;
		if (node.type === 'image') return Image;
		return FileText;
	}
</script>

<div class="min-h-screen bg-canvas p-8 text-canvas-contrast">
	<div class="mx-auto flex max-w-4xl flex-col gap-8">
		<header class="flex flex-col gap-3">
			<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Layout controls</p>
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 class="text-2xl font-semibold">TreeView drag and drop</h1>
					<p class="mt-1 text-sm text-muted-contrast">Click folders to expand them, then drag any row to reorder it or change its parent.</p>
				</div>
				<Button label="Reset demo" icon={RotateCcw} compact secondary onclick={reset}/>
			</div>
		</header>

		<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
			<section class="rounded-control border border-frame bg-surface-primary p-4 shadow-sm">
				<TreeView data={tree} {dnd}>
					{#snippet row(node)}
						<div class="flex min-w-0 flex-1 items-center gap-2">
							<Icon icon={nodeIcon(node)} size="4" class="shrink-0 text-muted-contrast"/>
							<span class="truncate">{node.label}</span>
							<span class="ml-auto rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-contrast">{node.type}</span>
							{#if node.data?.locked}
								<Icon icon={Lock} size="3.5" class="shrink-0 text-warning"/>
							{/if}
						</div>
					{/snippet}
				</TreeView>
			</section>

			<aside class="flex flex-col gap-4 rounded-control border border-frame bg-surface-primary p-4 text-sm">
				<div>
					<h2 class="font-semibold">Rules</h2>
					<ul class="mt-2 flex list-disc flex-col gap-1 pl-4 text-xs text-muted-contrast">
						<li>Folder: every kind</li>
						<li>Document: image only</li>
						<li>Image: no children</li>
						<li>Maximum depth: 2</li>
						<li>Archive is locked</li>
					</ul>
				</div>
				<div class="border-t border-frame pt-4">
					<h2 class="font-semibold">Last move</h2>
					<p class="mt-2 break-words text-xs text-muted-contrast">{lastMove}</p>
				</div>
			</aside>
		</div>
	</div>
</div>
