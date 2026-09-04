<script lang="ts">
	import type {ClassProp} from "../../../index";
	import {setContext, type Snippet, untrack} from 'svelte';
	import {twMerge} from "tailwind-merge";
	import {TREE_VIEW_CONTEXT, type TreeDropTarget, type TreeViewContext} from './context';
	import TreeItem from './TreeItem.svelte';
	import type {TreeDropContext, TreeDropDecision, TreeDropPosition, TreeDndOptions, TreeMove, TreeNode} from './types';

	let {
		data,
		row: _row,
		class: classes,
		onNodeClick: _onNodeClick,
		selectedId,
		dnd,
	}: & ClassProp
		& {
		data: TreeNode[];
		row?: Snippet<[TreeNode]>;
		onNodeClick?: (node: TreeNode) => void;
		selectedId?: string;
		dnd?: TreeDndOptions;
	} = $props();

	let expandedItems = $state<Set<string>>(new Set());
	let draggingId = $state<string | null>(null);
	let dropTarget = $state<TreeDropTarget | null>(null);
	const row = untrack(() => _row);
	const onNodeClick = untrack(() => _onNodeClick);
	const isRootDropTarget = $derived(dropTarget?.nodeId === null && dropTarget.position === 'after');

	function toggleExpanded(id: string) {
		const newSet = new Set(expandedItems);
		if (newSet.has(id)) newSet.delete(id);
		else newSet.add(id);
		expandedItems = newSet;
	}

	type NodeLocation = {
		node: TreeNode;
		parent: TreeNode | null;
		index: number;
		depth: number;
	};

	function findNode(id: string, nodes: TreeNode[] = data, parent: TreeNode | null = null, depth = 0): NodeLocation | null {
		for (let index = 0; index < nodes.length; index += 1) {
			const node = nodes[index];
			if (node.id === id) return {node, parent, index, depth};
			const child = findNode(id, node.children ?? [], node, depth + 1);
			if (child) return child;
		}
		return null;
	}

	function containsNode(node: TreeNode, id: string): boolean {
		return node.id === id || (node.children ?? []).some(child => containsNode(child, id));
	}

	function subtreeHeight(node: TreeNode): number {
		const children = node.children ?? [];
		return children.length === 0 ? 0 : 1 + Math.max(...children.map(subtreeHeight));
	}

	function isAllowedChild(parent: TreeNode | null, child: TreeNode): boolean {
		if (!parent) return true;
		const allowed = dnd?.allowedChildren[dnd.getNodeKind(parent)];
		if (allowed === true) return true;
		if (allowed === false || !allowed) return false;
		return allowed.includes(dnd.getNodeKind(child));
	}

	function isAllowedDecision(decision: TreeDropDecision | undefined): boolean {
		return decision === true || (typeof decision === 'object' && decision.allowed === true);
	}

	function resolveDrop(nodeId: string | null, target: TreeNode | null, position: TreeDropPosition): TreeDropContext | null {
		if (!dnd || !nodeId) return null;
		const source = findNode(nodeId);
		if (!source) return null;

		let parent: TreeNode | null;
		let index: number;
		if (position === 'inside') {
			if (!target) return null;
			parent = target;
			index = target.children?.length ?? 0;
		} else if (target) {
			const targetLocation = findNode(target.id);
			if (!targetLocation) return null;
			parent = targetLocation.parent;
			index = targetLocation.index + (position === 'after' ? 1 : 0);
		} else {
			parent = null;
			index = data.length;
		}

		if (parent && containsNode(source.node, parent.id)) return null;
		if (!isAllowedChild(parent, source.node)) return null;

		const parentDepth = parent ? (findNode(parent.id)?.depth ?? -1) : -1;
		const nodeDepth = parentDepth + 1;
		if (dnd.maxDepth !== undefined && nodeDepth + subtreeHeight(source.node) > dnd.maxDepth) return null;

		if (source.parent?.id === parent?.id && source.index < index) index -= 1;
		if (source.parent?.id === parent?.id && source.index === index) return null;

		const move: TreeMove = {
			node: source.node,
			nodeId: source.node.id,
			previousParent: source.parent,
			previousParentId: source.parent?.id ?? null,
			previousIndex: source.index,
			parent,
			parentId: parent?.id ?? null,
			index,
			position,
		};
		const context: TreeDropContext = {
			...move,
			target,
			targetId: target?.id ?? null,
			tree: data,
		};
		return isAllowedDecision(dnd.canDrop?.(context) ?? true) ? context : null;
	}

	function setDropTarget(target: TreeDropTarget | null) {
		dropTarget = target;
	}

	function move(drop: TreeDropContext) {
		dnd?.onMove(drop);
		dropTarget = null;
	}

	const treeview: TreeViewContext = {
		isExpanded: (id: string) => expandedItems.has(id),
		toggleExpanded,
		row,
		onNodeClick,
		isSelected: (id: string) => selectedId === id,
		get dnd() { return dnd; },
		setDragging: (id: string | null) => { draggingId = id; },
		draggingId: () => draggingId,
		isDragging: (id: string) => draggingId === id,
		resolveDrop,
		setDropTarget,
		isDropTarget: (nodeId: string | null, position: TreeDropPosition) => dropTarget?.nodeId === nodeId && dropTarget.position === position,
		move,
	};

	setContext(TREE_VIEW_CONTEXT, treeview);

	function resolveRootDrop() {
		return resolveDrop(draggingId, null, 'after');
	}

</script>

<div class={twMerge("w-full text-sm", classes)}>
	{#each data as node}
		<TreeItem {node}/>
	{/each}
	{#if dnd && data.length > 0}
		<div
			role="presentation"
			class={twMerge('h-3 rounded transition-colors', isRootDropTarget && 'bg-accent/15')}
			ondragover={(event) => {
				if (!resolveRootDrop()) return;
				event.preventDefault();
				if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
				setDropTarget({nodeId: null, position: 'after'});
			}}
			ondragleave={(event) => {
				const target = event.currentTarget as HTMLElement;
				if (!target.contains(event.relatedTarget as Node) && isRootDropTarget) setDropTarget(null);
			}}
			ondrop={(event) => {
				event.preventDefault();
				const drop = resolveRootDrop();
				if (drop) move(drop);
				else setDropTarget(null);
			}}
		></div>
	{/if}
</div>
