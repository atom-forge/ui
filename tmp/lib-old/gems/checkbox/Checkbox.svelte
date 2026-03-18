<script lang="ts">
	import type { AnyProp, ClassProp, XOR } from "$lib/tools/types";
	import { onMount, untrack } from 'svelte';
	import { getCheckboxGroupManager, type NamedCheckboxGroupManager } from "$lib/gems/checkbox/checkbox-group-manager.svelte.js";
	import CheckboxView from '../../../../src/lib/gems/checkbox/CheckboxView.svelte';

	let {
		value = $bindable(false),
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
	}: & AnyProp
		& ClassProp
		& XOR<{}, { primary: true }, { accent: true }>
		& XOR<{}, { compact: true }, { small: true }>
		& {
		value?: boolean
		label?: string
		disabled?: boolean
		master?: boolean
		group?: string
	} = $props();

	const id = crypto.randomUUID();
	const manager = getCheckboxGroupManager();
	const group = untrack(() => group_const);

	if (group && manager === undefined) throw new Error("Ui Checkbox with a group must have a manager in context");

	let groupManager: NamedCheckboxGroupManager;

	// Group-managed checkboxes (especially masters) need a separate $state because
	// the manager drives the 'some' indeterminate state which can't be derived from value alone.
	// Standalone checkboxes derive status directly from value so external binding changes reflect immediately.
	let managedStatus: 'checked' | 'unchecked' | 'some' = $state(value ? 'checked' : 'unchecked');
	const status = $derived(group ? managedStatus : (value ? 'checked' : 'unchecked'));

	function changeState(newStatus: 'checked' | 'unchecked' | 'some') {
		managedStatus = newStatus;
		if (!master) value = managedStatus === 'checked';
	}

	if (group) {
		onMount(() => {
			groupManager = master
				? manager.registerMaster(group, id, changeState)
				: manager.registerValue(group, id, value, changeState);
			return () => {
				if (master) manager.unregisterMaster(group, id);
				else manager.unregisterValue(group, id);
			};
		});
	}

	function handleClick() {
		if (disabled) return;
		if (group) {
			if (master) groupManager.toggleAll();
			else groupManager.set(id, !value);
		} else {
			value = !value;
		}
	}
</script>

<CheckboxView {status} {label} {disabled} {primary} {accent} {compact} {small} onclick={handleClick} class={classes} {...props}/>
