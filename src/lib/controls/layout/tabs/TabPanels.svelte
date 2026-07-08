<script lang="ts">
	import type {ChildrenProp, ClassProp} from "../../../index";
	import {twMerge} from 'tailwind-merge';
	import {getContext} from 'svelte';
	import {Spring} from 'svelte/motion';

	let {
		children,
		class: classes,
		smooth = false,
		scrollClass
	}: & ChildrenProp
		& ClassProp
		& {
		smooth?: boolean;
		scrollClass?: string;
	} = $props();

	const context = getContext<{activeId: string}>('tabs-context');

	let scrollEl = $state<HTMLDivElement | null>(null);
	let contentEl = $state<HTMLDivElement | null>(null);
	let measuredOnce = false;
	const panelHeight = new Spring(0, {stiffness: 0.3, damping: 0.85});

	function measureNow(instant = false) {
		if (!contentEl) return;
		const h = contentEl.getBoundingClientRect().height;
		if (h <= 0) return;
		panelHeight.set(h, {instant});
		measuredOnce = true;
	}

	// Explicit re-measure tied to the tab click itself — the most reliable trigger.
	// Double rAF: 1st waits for Svelte to apply the DOM swap, 2nd waits for layout to settle.
	function remeasureAfterRender() {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => measureNow(!measuredOnce));
		});
	}

	$effect(() => {
		if (!smooth) return;
		context?.activeId;
		if (scrollEl) scrollEl.scrollTop = 0;
		remeasureAfterRender();
	});

	$effect(() => {
		if (smooth && contentEl) remeasureAfterRender();
	});

	// Catches size changes from within a panel (toggles, error messages, image loads, etc.)
	// that don't originate from a tab switch, so aren't covered by the effect above.
	$effect(() => {
		if (!smooth || !contentEl) return;
		const observer = new ResizeObserver(() => measureNow(false));
		observer.observe(contentEl);
		return () => observer.disconnect();
	});
</script>

{#if smooth}
	<div bind:this={scrollEl} class={twMerge("max-h-[70vh] overflow-y-auto", scrollClass)} style="height: {panelHeight.current}px">
		<div bind:this={contentEl} class={twMerge("py-4", classes)}>
			{@render children()}
		</div>
	</div>
{:else}
	<div class={twMerge("py-4", classes)}>
		{@render children()}
	</div>
{/if}
