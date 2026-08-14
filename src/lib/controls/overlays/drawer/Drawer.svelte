<script lang="ts">
	import type { DrawerPosition, DrawerSize } from './drawer-manager.svelte';
	import type { ChildrenProp, ClassProp } from '../../../helpers/types';
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';
	import {twMerge} from 'tailwind-merge';

	let {
		position,
		size,
		class: classes,
		children
	}: ChildrenProp & ClassProp & {
		position: DrawerPosition;
		size: DrawerSize;
	} = $props();

	const isHorizontal = $derived(position === 'left' || position === 'right');
	const axis = $derived(isHorizontal ? 'x' : 'y');
	const panelClass = $derived(twMerge(
		'fixed bg-surface border-frame shadow-2xl flex flex-col',
		isHorizontal && 'top-0 bottom-0 max-w-full',
		!isHorizontal && 'left-0 right-0 max-h-full',
		position === 'left' && 'left-0 border-r',
		position === 'right' && 'right-0 border-l',
		position === 'top' && 'top-0 border-b',
		position === 'bottom' && 'bottom-0 border-t',
		isHorizontal && size === 'small' && 'w-80',
		isHorizontal && size === 'compact' && 'w-96',
		isHorizontal && size === 'normal' && 'w-128',
		!isHorizontal && size === 'small' && 'h-48',
		!isHorizontal && size === 'compact' && 'h-64',
		!isHorizontal && size === 'normal' && 'h-96',
		classes
	));

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
		const start = position === 'left' || position === 'top' ? -primary_property_value : primary_property_value;

		return {
			delay: 0,
			duration,
			easing: cubicOut,
			css: (t, u) =>
				`transform: ${transform} translate${axis.toUpperCase()}(${u * start}px); opacity: ${t * opacity};`
		};
	}

</script>

<div
	class={panelClass}
	transition:trueSlide={{ axis, duration: 300 }}
>
	{@render children()}
</div>
