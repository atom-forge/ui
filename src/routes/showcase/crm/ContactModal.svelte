<script lang="ts">
	import {Button, Input, NativeSelect, getModalManager, Field} from '$lib';

	const modal = getModalManager();
	let {onAdd}: {onAdd: (c: any) => void} = $props();

	let name     = $state('');
	let company  = $state('');
	let email    = $state('');
	let phone    = $state('');
	let status   = $state('lead');

	const statusOptions = [
		{value: 'lead',     label: 'Lead'},
		{value: 'prospect', label: 'Prospect'},
		{value: 'customer', label: 'Customer'},
	];

	function submit() {
		if (!name.trim()) return;
		onAdd({name, company, email, phone, status});
		modal.close();
	}
</script>

<div class="p-6 bg-surface rounded-lg shadow-lg w-96 flex flex-col gap-4">
	<h2 class="text-lg font-semibold text-canvas-contrast">New Contact</h2>

	<div class="grid grid-cols-2 gap-3">
		<Field label="Full name" class="col-span-2">
			<Input bind:value={name} placeholder="Jane Doe"/>
		</Field>
		<Field label="Company">
			<Input bind:value={company} placeholder="Acme Corp"/>
		</Field>
		<Field label="Status">
			<NativeSelect bind:value={status} options={statusOptions}/>
		</Field>
		<Field label="Email">
			<Input bind:value={email} placeholder="jane@acme.com"/>
		</Field>
		<Field label="Phone">
			<Input bind:value={phone} placeholder="+1 555-0100"/>
		</Field>
	</div>

	<div class="flex gap-2 justify-end pt-1">
		<Button label="Cancel" ghost onclick={() => modal.close()}/>
		<Button label="Add Contact" accent onclick={submit} disabled={!name.trim()}/>
	</div>
</div>

