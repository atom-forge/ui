<script lang="ts">
	import type {AnyProp, ClassProp, XOR} from "../../../index";
	import {untrack} from "svelte";
	import {twMerge} from "tailwind-merge";
	import {InlineSvgIcon, IconDefiner, SvgIcon, type IconDefinition} from "./icon-definition";

	let {
		icon,
		size,
		pxSize,
		stroke: strokeProp,
		class: classes,
		...props
	}: & ClassProp
		& AnyProp
		& XOR<{ size: number | `${number}` }, { pxSize: number | `${number}` }, {}>
		& {
		icon: IconDefinition
		stroke?: number | `${number}`
	} = $props();

	const stroke = untrack(() => icon instanceof IconDefiner ?
		icon.stroke :
		strokeProp
			? parseInt(strokeProp + "")
			: 4)

	const strokeWidth: string = untrack(() => (0.5 + (stroke - 1) * 0.25).toString())
	pxSize = untrack(() => typeof pxSize !== "number" && pxSize ? parseInt(pxSize) : pxSize);
	size = untrack(() => typeof size !== "number" && size ? parseInt(size) : size);
	pxSize = untrack(() => size === undefined && pxSize === undefined ? 20 : pxSize ?? (size ? size * 4 : 20));
</script>

{#if icon}
	{@const definition = icon instanceof IconDefiner ? icon.component : icon}
	{@const iconClasses = twMerge(classes, icon instanceof IconDefiner ? icon.classes : definition instanceof InlineSvgIcon || definition instanceof SvgIcon ? definition.classes : undefined)}
	{#if definition instanceof InlineSvgIcon}
		<span
			class={iconClasses}
			style:width={`${pxSize}px`}
			style:height={`${pxSize}px`}
			style:color={definition.colorValue}
			{...props}
		>
			{@html definition.source}
		</span>
	{:else if definition instanceof SvgIcon}
		<img
			src={definition.source.href}
			alt=""
			width={pxSize}
			height={pxSize}
			class={iconClasses}
			{...props}
		/>
	{:else}
		{@const Component = definition}
		<Component size={pxSize}
		           class={iconClasses}
		           stroke={strokeWidth}
		           strokeWidth={strokeWidth}
		           {...props}
		/>
	{/if}
{/if}

<style>
	span :global(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
