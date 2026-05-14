<script lang="ts">
	import * as BitsUI from "bits-ui";
	import type {AnyProp, ClassProp, XOR} from "../../helpers/types";
	import {onMount, untrack} from 'svelte';
	import {Icon} from "../../controls/general/icon";
	import {Check, Minus} from 'lucide-svelte';
	import {twMerge} from 'tailwind-merge';
	import {getCheckboxGroupManager, type NamedCheckboxGroupManager} from "./checkbox-group-manager.svelte";

	let {
		value = $bindable(false),
		checked = $bindable(undefined as boolean | undefined),
		onchange,
		label = '',
		disabled = false,
		master = false,
		group: group_const = undefined,
		primary,
		accent,
		compact,
		small,
		class: classes,
		...props
	}: AnyProp & ClassProp
		& XOR<{ value?: boolean }, { checked?: boolean }>
		& XOR<{}, { primary: true }, { accent: true }>
		& XOR<{}, { compact: true }, { small: true }>
		& {
		onchange?: (checked: boolean) => void
		label?: string
		disabled?: boolean
		master?: boolean
		group?: string
	} = $props();

	const id = Math.random().toString(36).slice(2);
	const manager = getCheckboxGroupManager();
	const group = untrack(() => group_const);
	const usingChecked = untrack(() => checked !== undefined);
	const isNormal = $derived(!compact && !small);

	if (group && manager === undefined) throw new Error("UI.Checkbox with a group must have a CheckboxGroupManager in context");

	let groupManager: NamedCheckboxGroupManager;
	const externalValue = $derived(usingChecked ? (checked ?? false) : value);

	// bits-ui state — driven by external value or group manager
	let bitsChecked = $state(untrack(() => externalValue));
	let bitsIndeterminate = $state(false);

	function setBoolValue(newVal: boolean) {
		if (usingChecked) checked = newVal;
		else value = newVal;
		onchange?.(newVal);
	}

	function changeState(newStatus: 'checked' | 'unchecked' | 'some') {
		bitsChecked = newStatus === 'checked';
		bitsIndeterminate = newStatus === 'some';
		if (!master) setBoolValue(newStatus === 'checked');
	}

	function handleCheckedChange(newVal: boolean) {
		if (disabled) return;
		if (group) {
			if (master) groupManager.toggleAll();
			else groupManager.set(id, newVal);
		} else {
			setBoolValue(newVal);
			bitsChecked = newVal;
		}
	}

	// Sync external value changes → bits-ui (standalone mode)
	$effect(() => {
		if (!group) {
			bitsChecked = externalValue;
			bitsIndeterminate = false;
		}
	});

	if (group) {
		onMount(() => {
			groupManager = master
				? manager.registerMaster(group, id, changeState)
				: manager.registerValue(group, id, externalValue, changeState);
			return () => {
				if (master) manager.unregisterMaster(group, id);
				else manager.unregisterValue(group, id);
			};
		});
	}

	const isActive = $derived(bitsChecked || bitsIndeterminate);

	const wrapperClass = $derived(twMerge(
		'inline-flex items-center gap-2 select-none rounded-control-sm py-1 px-2 transition-colors duration-150',
		!disabled && !primary && !accent && 'cursor-pointer hover:bg-secondary',
		!disabled && !!primary            && 'cursor-pointer hover:bg-primary/10',
		!disabled && !!accent             && 'cursor-pointer hover:bg-accent/10',
		disabled && 'cursor-not-allowed opacity-50',
		classes
	));

	const boxClass = $derived(twMerge(
		'flex items-center justify-center shrink-0 rounded border-2 transition-colors',
		isNormal  && 'w-5 h-5',
		!!compact && 'w-4 h-4',
		!!small   && 'w-3.5 h-3.5',
		isActive && !primary && !accent && 'bg-secondary border-frame text-secondary-contrast',
		isActive && !!primary           && 'bg-primary border-primary text-primary-contrast',
		isActive && !!accent            && 'bg-accent border-accent text-accent-contrast',
		!isActive && 'bg-control border-frame',
	));
</script>

<BitsUI.Checkbox.Root
	bind:checked={bitsChecked}
	bind:indeterminate={bitsIndeterminate}
	{disabled}
	onCheckedChange={handleCheckedChange}
	class={wrapperClass}
	{...props}
>
	<span class={boxClass} aria-hidden="true">
		{#if bitsChecked}
			<Icon icon={Check} stroke="9" size={isNormal ? '4' : '3'}/>
		{:else if bitsIndeterminate}
			<Icon icon={Minus} stroke="9" size={isNormal ? '4' : '3'}/>
		{/if}
	</span>
	{#if label}
		<span class={twMerge(
			'text-canvas-contrast',
			!!compact && 'text-sm',
			!!small   && 'text-xs'
		)}>{label}</span>
	{/if}
</BitsUI.Checkbox.Root>
