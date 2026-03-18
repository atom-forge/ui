<script lang="ts">
	import {Button, DatePicker, NativeSelect, Textarea, getModalManager, getToastManager, Field} from "$lib";

	const modal = getModalManager();
	const toast = getToastManager();

	let {onSubmit}: {onSubmit: () => void} = $props();

	let from = $state<Date | null>(null);
	let to   = $state<Date | null>(null);
	let type = $state('annual');
	let note = $state('');

	const typeOptions = [
		{value: 'annual', label: 'Annual leave'},
		{value: 'sick', label: 'Sick leave'},
		{value: 'personal', label: 'Personal day'},
		{value: 'unpaid', label: 'Unpaid leave'},
	];

	function submit() {
		if (!from || !to) return;
		onSubmit();
		toast.show('Leave request submitted for approval', {type: 'success'});
		modal.close();
	}
</script>

<div class="p-6 bg-surface rounded-lg shadow-lg w-96 flex flex-col gap-4">
	<h2 class="text-lg font-semibold text-canvas-contrast">Request Leave</h2>

	<div class="grid grid-cols-2 gap-3">
		<Field label="From">
			<DatePicker bind:value={from}/>
		</Field>
		<Field label="To">
			<DatePicker bind:value={to}/>
		</Field>
	</div>

	<Field label="Leave type">
		<NativeSelect options={typeOptions} bind:value={type}/>
	</Field>

	<Field label="Handover / note (optional)">
		<Textarea bind:value={note} rows={3} placeholder="Who covers for you, any important notes..."/>
	</Field>

	<div class="flex justify-end gap-2">
		<Button label="Cancel" ghost onclick={() => modal.close()}/>
		<Button label="Submit Request" accent onclick={submit}/>
	</div>
</div>
