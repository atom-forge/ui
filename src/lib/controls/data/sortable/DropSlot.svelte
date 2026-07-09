<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Snippet } from 'svelte';

	let {
		atIndex,
		insertIndex,
		draggingItem,
		orientation,
		class: classes,
		dropIndicatorSnippet,
	}: {
		atIndex: number;
		insertIndex: number;
		draggingItem: any;
		orientation: 'vertical' | 'horizontal' | 'grid';
		class?: string;
		dropIndicatorSnippet?: Snippet<[any]>;
	} = $props();

	const active = $derived(insertIndex === atIndex);
	const isHorizontal = $derived(orientation === 'horizontal' || orientation === 'grid');
	const cls = $derived(twMerge(
		'pointer-events-none relative shrink-0 overflow-visible',
		isHorizontal ? 'w-3 self-stretch' : 'h-3 self-stretch',
		classes,
	));

	function grow(node: Element, { axis }: { axis: 'x' | 'y' }) {
		const rect = node.getBoundingClientRect();
		const size = axis === 'x' ? rect.width : rect.height;
		const property = axis === 'x' ? 'width' : 'height';

		return {
			duration: 140,
			css: (t: number) => `${property}: ${t * size}px; opacity: ${t};`,
		};
	}
</script>

{#if dropIndicatorSnippet}
	{#if active}
		{@render dropIndicatorSnippet(draggingItem)}
	{/if}
{:else}
	{#if active}
		<div class={cls} aria-hidden="true" transition:grow={{axis: isHorizontal ? 'x' : 'y'}}>
			{#if isHorizontal}
				<div class="relative mx-auto h-full w-1.5">
					<div class="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 border-l border-dotted border-accent/55 drop-shadow-[0_0_3px_var(--color-accent)]"></div>
					<div class="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/75 drop-shadow-[0_0_3px_var(--color-accent)]"></div>
				</div>
			{:else}
				<div class="relative h-1.5 w-full translate-y-[3px]">
					<div class="absolute left-0 top-1/2 h-0 w-full -translate-y-1/2 border-t border-dotted border-accent/55 drop-shadow-[0_0_3px_var(--color-accent)]"></div>
					<div class="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/75 drop-shadow-[0_0_3px_var(--color-accent)]"></div>
				</div>
			{/if}
		</div>
	{/if}
{/if}
