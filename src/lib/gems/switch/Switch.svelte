<script lang="ts">
	import type {ClassProp, XOR} from "$lib";
	import {untrack} from 'svelte';
	import {Icon, type IconDefinition} from "$lib/gems/icon";
	import {twMerge} from "tailwind-merge";

	let {
		value = $bindable(),
		label = undefined as string | { on: string; off: string } | undefined,
		icons = undefined as { on: IconDefinition; off: IconDefinition } | undefined,
		disabled,
		compact,
		small,
		class: classes,
	}: & ClassProp
		& XOR<{ small: true }, { compact: true }, {}>
		& {
		value?: boolean
		label?: string | { on: string; off: string }
		icons?: { on: IconDefinition; off: IconDefinition }
		disabled?: boolean
	} = $props();

	const size = untrack(() => small ? 'small' : compact ? 'compact' : 'normal');

	// translateX when checked: track_w*0.25 - thumb_w*0.25 - 0.25rem (margin offset)
	const thumbTranslateX = untrack(() => size === 'normal' ? '1.25rem' : size === 'compact' ? '1rem' : '0.75rem');

	const wrapperClass = $derived(twMerge(
		'relative inline-flex items-center cursor-pointer',
		disabled && 'cursor-not-allowed opacity-50',
		classes,
	));

	const trackClass = $derived(twMerge(
		'rounded-full transition-colors duration-200 ease-in-out shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]',
		value ? 'bg-accent' : 'bg-secondary',
		disabled && 'striped-10',
		size === 'normal'  && 'w-11 h-6',
		size === 'compact' && 'w-9 h-5',
		size === 'small'   && 'w-7 h-4',
	));

	const thumbClass = twMerge(
		'bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out pointer-events-none flex items-center justify-center',
		size === 'normal'  && 'h-5 w-5',
		size === 'compact' && 'h-4 w-4',
		size === 'small'   && 'h-3 w-3',
	);

	const iconClass = twMerge(
		'text-muted-contrast',
		size !== 'normal' && 'hidden',
	);
</script>

<label class={wrapperClass}>
	<input type="checkbox" class="sr-only peer" bind:checked={value} {disabled}/>
	<div class="relative {trackClass}">
		<div class={thumbClass}
		     style="transform: {value ? `translateX(${thumbTranslateX})` : 'translateX(0)'}; margin: 0.125rem;">
			{#if icons}
				<div class="relative w-full h-full flex items-center justify-center text-xs">
					<span class="absolute transition-opacity duration-200" class:opacity-100={value} class:opacity-0={!value}>
						<Icon icon={icons.on} pxSize="18" class={iconClass}/>
					</span>
					<span class="absolute transition-opacity duration-200" class:opacity-100={!value} class:opacity-0={value}>
						<Icon icon={icons.off} pxSize="18" class={iconClass}/>
					</span>
				</div>
			{/if}
		</div>
	</div>
	{#if label}
		{#if typeof label === 'string'}
			<span class="ms-3 text-sm font-medium text-canvas-contrast">{label}</span>
		{:else}
			<div class="ms-3 grid grid-cols-1 grid-rows-1 text-sm font-medium text-canvas-contrast">
				<span class="col-start-1 row-start-1 transition-opacity duration-200" class:opacity-100={value} class:opacity-0={!value}>{label.on}</span>
				<span class="col-start-1 row-start-1 transition-opacity duration-200" class:opacity-100={!value} class:opacity-0={value}>{label.off}</span>
			</div>
		{/if}
	{/if}
</label>
