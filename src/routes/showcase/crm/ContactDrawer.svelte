<script lang="ts">
	import {Avatar, Button, Chip, Input, NativeSelect, TagEditor, Textarea, getDrawerManager, getToastManager, defineIcon} from '$lib';
	import {Mail, Phone, Building, Trash, Save} from 'lucide-svelte';

	const drawer = getDrawerManager();
	const toast = getToastManager();

	type Contact = {
		id: number; name: string; company: string; email: string; phone: string;
		status: 'lead' | 'prospect' | 'customer' | 'churned';
		value: string; starred: boolean; tags: string[];
	};

	let {contact, onSave, onDelete}: {
		contact: Contact;
		onSave?: (c: Contact) => void;
		onDelete?: (id: number) => void;
	} = $props();

	let name    = $state('');
	let company = $state('');
	let email   = $state('');
	let phone   = $state('');
	let status  = $state<Contact['status']>('lead');
	let value   = $state('');
	let tags    = $state<string[]>([]);
	let notes   = $state('');

	$effect(() => {
		if (contact) {
			name    = contact.name;
			company = contact.company;
			email   = contact.email;
			phone   = contact.phone;
			status  = contact.status;
			value   = contact.value;
			tags    = [...contact.tags];
			notes   = '';
		}
	});

	const statusOptions = [
		{value: 'lead',     label: 'Lead'},
		{value: 'prospect', label: 'Prospect'},
		{value: 'customer', label: 'Customer'},
		{value: 'churned',  label: 'Churned'},
	];

	const statusColor: Record<Contact['status'], 'green' | 'blue' | 'accent' | 'red'> = {
		customer: 'green', prospect: 'blue', lead: 'accent', churned: 'red'
	};

	function save() {
		const updated = {...contact, name, company, email, phone, status, value, tags};
		onSave?.(updated);
		toast.show(`${name} updated`, {type: 'success'});
		drawer.close();
	}

	function remove() {
		onDelete?.(contact.id);
		toast.show(`${contact.name} deleted`, {type: 'error'});
		drawer.close();
	}
</script>

{#if contact}
<div class="flex flex-col h-full">
	<!-- Header -->
	<div class="flex items-center gap-4 p-6 border-b border-frame">
		<Avatar name={contact.name} />
		<div class="flex-1 min-w-0">
			<p class="font-semibold text-canvas-contrast text-lg leading-tight truncate">{contact.name}</p>
			<p class="text-sm text-muted-contrast truncate">{contact.company}</p>
		</div>
		<Chip color={statusColor[status]}>{status}</Chip>
	</div>

	<!-- Form -->
	<div class="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
		<!-- Contact info section -->
		<div class="flex flex-col gap-3">
			<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide">Contact Info</p>
			<Input label="Full name" bind:value={name} placeholder="Jane Doe"/>
			<div class="grid grid-cols-2 gap-3">
				<div class="flex flex-col gap-1.5">
					<span class="text-xs font-medium text-muted-contrast">Company</span>

					<Input label="Company" bind:value={company} placeholder="Acme Corp">
						{#snippet prefix()}<Building size={14} class="text-muted-contrast"/>{/snippet}
					</Input>
				</div>
				<div class="flex flex-col gap-1.5">
					<span class="text-xs font-medium text-muted-contrast">Status</span>
					<NativeSelect bind:value={status} options={statusOptions}/>
				</div>
			</div>
			<Input label="Email" bind:value={email} placeholder="jane@acme.com">
				{#snippet prefix()}<Mail size={14} class="text-muted-contrast"/>{/snippet}
			</Input>
			<Input label="Phone" bind:value={phone} placeholder="+1 555-0100">
				{#snippet prefix()}<Phone size={14} class="text-muted-contrast"/>{/snippet}
			</Input>
			<Input label="Deal value" bind:value={value} placeholder="$0">
				{#snippet prefix()}<span class="text-xs text-muted-contrast font-medium">$</span>{/snippet}
			</Input>
		</div>

		<!-- Tags section -->
		<div class="flex flex-col gap-2">
			<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide">Tags</p>
			<TagEditor bind:value={tags} placeholder="Add tag…" sortable/>
		</div>

		<!-- Notes section -->
		<div class="flex flex-col gap-2">
			<p class="text-xs font-semibold text-muted-contrast uppercase tracking-wide">Notes</p>
			<Textarea bind:value={notes} placeholder="Add a note about this contact…" rows={4}/>
		</div>
	</div>

	<!-- Footer actions -->
	<div class="p-4 border-t border-frame flex items-center gap-2">
		<Button ghost onclick={remove} class="text-error hover:bg-error/10 mr-auto" label="Delete"/>
		<Button label="Cancel" ghost onclick={() => drawer.close()}/>
		<Button accent onclick={save} label="Save changes" />
	</div>
</div>
{/if}
