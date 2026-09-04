<script lang="ts">
	import {ChevronRight} from 'lucide-svelte';
	import {getContext} from 'svelte';
	import {slide} from 'svelte/transition';
	import {twMerge} from 'tailwind-merge';
	import {Icon} from "../../general/icon";
	import {TREE_VIEW_CONTEXT, type TreeViewContext} from './context';
	import TreeItem from './TreeItem.svelte';
	import type {TreeDropPosition, TreeNode} from './types';

	let {
		node,
		level = 0,
	}: {
		node: TreeNode
		level?: number
	} = $props();

	const treeview = getContext<TreeViewContext>(TREE_VIEW_CONTEXT);

	const isExpanded = $derived(treeview.isExpanded(node.id));
	const hasChildren = $derived(node.children && node.children.length > 0);
	const isSelected = $derived(treeview.isSelected(node.id));
	const isDragging = $derived(treeview.isDragging(node.id));
	const isDropBefore = $derived(treeview.isDropTarget(node.id, 'before'));
	const isDropInside = $derived(treeview.isDropTarget(node.id, 'inside'));
	const isDropAfter = $derived(treeview.isDropTarget(node.id, 'after'));
	const isDndEnabled = $derived(Boolean(treeview.dnd));

	const rowClass = $derived(twMerge(
		'flex items-center p-1.5 rounded-md cursor-pointer select-none relative transition-colors',
		isSelected ? 'bg-secondary' : 'hover:bg-secondary/50',
		isDndEnabled && 'cursor-grab active:cursor-grabbing',
		isDropInside && 'bg-accent/15 ring-1 ring-inset ring-accent',
		isDragging && 'opacity-40',
	));

	function getDropPosition(element: Element, clientY: number): TreeDropPosition {
		const rect = element.getBoundingClientRect();
		const offset = clientY - rect.top;
		if (offset < rect.height * 0.25) return 'before';
		if (offset > rect.height * 0.75) return 'after';
		return 'inside';
	}

	function resolveDrop(element: Element, clientY: number) {
		return treeview.resolveDrop(treeview.draggingId(), node, getDropPosition(element, clientY));
	}

	function handleClick() {
		if (hasChildren) {
			treeview.toggleExpanded(node.id);
		}
		if (treeview.onNodeClick) {
			treeview.onNodeClick(node);
		}
	}

	function handleDragStart(event: DragEvent) {
		if (!isDndEnabled) {
			event.preventDefault();
			return;
		}
		event.dataTransfer?.setData('text/plain', node.id);
		if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
		treeview.setDragging(node.id);
	}

	function handleDragOver(event: DragEvent) {
		const drop = resolveDrop(event.currentTarget as HTMLElement, event.clientY);
		if (!drop) return;
		event.preventDefault();
		if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
		treeview.setDropTarget({nodeId: node.id, position: drop.position});
	}

	function handleDragLeave(event: DragEvent) {
		const target = event.currentTarget as HTMLElement;
		if (!target.contains(event.relatedTarget as Node)) treeview.setDropTarget(null);
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const drop = resolveDrop(event.currentTarget as HTMLElement, event.clientY);
		if (drop) treeview.move(drop);
		else treeview.setDropTarget(null);
	}
</script>

<div class="relative">
	<div
		role="button"
		tabindex="0"
		class={rowClass}
		style:margin-left="{level * 1.25}rem"
		draggable={isDndEnabled}
		ondragstart={handleDragStart}
		ondragend={() => {
			treeview.setDragging(null);
			treeview.setDropTarget(null);
		}}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
		onclick={handleClick}
		onkeydown={(e) => e.key === 'Enter' && handleClick()}
	>
		{#if isDropBefore}
			<div class="absolute left-0 right-0 top-0 h-0.5 -translate-y-1/2 rounded bg-accent"></div>
		{/if}
		<div class="w-6 shrink-0 text-left items-center flex flex-row">
			{#if hasChildren}
				<span class="inline-block aspect-square items-center transition-transform duration-200" class:rotate-90={isExpanded}>
					<Icon icon={ChevronRight} size="4" class="text-muted-contrast"/>
				</span>
			{:else}
				<div class="inline-block h-2 w-2 ml-1.5 rounded-full bg-muted"></div>
			{/if}
		</div>
		{#if treeview.row}
			{@render treeview.row(node)}
		{:else}
			{#if node.icon}
				<Icon icon={node.icon} size="4" class="mr-2 text-muted-contrast"/>
			{/if}
			<span class="truncate text-canvas-contrast">{node.label}</span>
		{/if}
		{#if isDropAfter}
			<div class="absolute left-0 right-0 bottom-0 h-0.5 translate-y-1/2 rounded bg-accent"></div>
		{/if}
	</div>

	{#if hasChildren && isExpanded}
		<div class="relative" transition:slide={{ duration: 150 }}>
			<div class="absolute top-1 bottom-1 w-px bg-frame rounded-full" style:left="{level * 1.25 + .75}rem"></div>
			{#each node.children as childNode}
				<TreeItem node={childNode} level={level + 1}/>
			{/each}
		</div>
	{/if}
</div>
