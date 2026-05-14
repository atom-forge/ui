<script lang="ts">
	import * as BitsUI from "bits-ui";
	import type {ChildrenProp, ClassProp} from "../../helpers/types";
	import {createRadioGroupManager} from "./radio-group-manager.svelte";
	import {untrack} from "svelte";

	let {
		value = $bindable(),
		size: _size,
		primary,
		accent,
		children,
		class: classes,
	}: ClassProp & ChildrenProp & {
		size?: 'small' | 'compact' | 'normal'
		primary?: boolean
		accent?: boolean
		value: any
	} = $props();

	const size = untrack(() => _size);
	const variant = untrack(() => primary ? 'primary' : accent ? 'accent' : 'default') as 'default' | 'primary' | 'accent';
	const manager = createRadioGroupManager(value, size, variant);

	$effect(() => { value = manager.value; });
	$effect(() => { manager.value = value; });
</script>

<BitsUI.RadioGroup.Root bind:value={manager.value} class={classes}>
	{@render children()}
</BitsUI.RadioGroup.Root>
