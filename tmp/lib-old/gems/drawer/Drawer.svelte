<script lang="ts">
	import type { DrawerPosition, DrawerSize } from '$lib/gems/drawer/drawer-manager.svelte.js';
	import { getDrawerManager } from '$lib';
	import type { ChildrenProp } from '$lib/tools/types';
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	let {
		position,
		size,
		children
	}: ChildrenProp & {
		position: DrawerPosition;
		size: DrawerSize;
	} = $props();

	const drawerManager = getDrawerManager();

	function trueSlide(
		node: Element,
		{ axis = 'x', duration = 300 }: { axis?: 'x' | 'y'; duration?: number } = {}
	): TransitionConfig {
		const style = getComputedStyle(node);
		const opacity = +style.opacity;
		const transform = style.transform === 'none' ? '' : style.transform;
		const width = (node as HTMLElement).offsetWidth;
		const height = (node as HTMLElement).offsetHeight;
		const primary_property_value = axis === 'y' ? height : width;
		const start = position === 'left' ? -primary_property_value : primary_property_value;

		return {
			delay: 0,
			duration,
			easing: cubicOut,
			css: (t, u) =>
				`transform: ${transform} translate${axis.toUpperCase()}(${u * start}px); opacity: ${t * opacity};`
		};
	}

	function swipeable(node: HTMLElement) {		let startX = 0;
		let currentX = 0;
		let isSwiping = false;

		function handleTouchStart(e: TouchEvent) {
			startX = e.touches[0].clientX;
			isSwiping = true;
			node.style.transition = 'none';
		}

		function handleTouchMove(e: TouchEvent) {
			if (!isSwiping) return;
			currentX = e.touches[0].clientX;
			const diff = currentX - startX;

			if ((position === 'right' && diff > 0) || (position === 'left' && diff < 0)) {
				node.style.transform = `translateX(${diff}px)`;
			}
		}

		function handleTouchEnd() {
			if (!isSwiping) return;
			isSwiping = false;
			node.style.transition = 'transform 0.3s ease';

			const diff = currentX - startX;
			const threshold = node.offsetWidth * 0.3;

			if ((position === 'right' && diff > threshold) || (position === 'left' && -diff > threshold)) {
				drawerManager.close();
			} else {
				node.style.transform = 'translateX(0)';
			}
		}

		node.addEventListener('touchstart', handleTouchStart);
		node.addEventListener('touchmove', handleTouchMove);
		node.addEventListener('touchend', handleTouchEnd);

		return {
			destroy() {
				node.removeEventListener('touchstart', handleTouchStart);
				node.removeEventListener('touchmove', handleTouchMove);
				node.removeEventListener('touchend', handleTouchEnd);
			}
		};
	}
</script>

<div
	use:swipeable
	class="fixed top-0 bottom-0 z-9999 bg-control-m shadow-2xl flex flex-col"
	class:left-0={position === 'left'}
	class:right-0={position === 'right'}
	class:w-96={size === 'sm'}
	class:w-128={size === 'md'}
	class:w-192={size === 'lg'}
	class:w-full={size === 'full'}
	transition:trueSlide={{ axis: 'x', duration: 300 }}
>
	{@render children()}
</div>
