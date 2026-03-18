<script lang="ts">
	import {Button, Input, Tabs, TabList, Tab, getModalManager, getToastManager} from '$lib';
	import {Plus, Search, Users} from 'lucide-svelte';
	import KpiBar from './widgets/KpiBar.svelte';
	import MonthlySales from './widgets/MonthlySales.svelte';
	import Q4Goals from './widgets/Q4Goals.svelte';
	import ContactList from './widgets/ContactList.svelte';
	import Pipeline from './widgets/Pipeline.svelte';
	import ActivityFeed from './widgets/ActivityFeed.svelte';
	import TeamStructure from './widgets/TeamStructure.svelte';
	import ContactModal from './ContactModal.svelte';

	const modal = getModalManager();
	const toast = getToastManager();

	let search = $state('');
	let activeTab = $state<'contacts' | 'pipeline' | 'team'>('contacts');

	function addContact() {
		modal.open(ContactModal, {
			onAdd: (contact: any) => {
				toast.show(`${contact.name} added to contacts`, {type: 'success'});
			}
		});
	}
</script>

<div class="flex flex-col gap-4">
	<!-- Header -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
		<div>
			<h2 class="text-2xl font-semibold text-canvas-contrast flex items-center gap-2">
				<Users size={24} class="text-accent"/>
				CRM
			</h2>
			<p class="text-sm text-muted-contrast">Contacts, deals, and activity</p>
		</div>
		<div class="flex items-center gap-2">
			<Input bind:value={search} placeholder="Search contacts…" compact class="flex-1 sm:w-48 sm:flex-none">
				{#snippet prefix()}<Search size={14} class="text-muted-contrast"/>{/snippet}
			</Input>
			<Button label="Add Contact" icon={Plus} accent compact onclick={addContact}/>
		</div>
	</div>

	<!-- KPI bar – full width -->
	<div class="shrink-0"><KpiBar/></div>

	<!-- Charts row – full width, two equal-height cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
		<div class="h-64 md:h-72"><MonthlySales/></div>
		<div class="h-64 md:h-72"><Q4Goals/></div>
	</div>

	<!-- Tabs – full width -->
	<Tabs initialTabId={activeTab} onTabChange={(id) => activeTab = id as 'contacts' | 'pipeline' | 'team'}>
		<TabList>
			<Tab id="contacts">Contacts</Tab>
			<Tab id="pipeline">Deal Pipeline</Tab>
			<Tab id="team">Team Structure</Tab>
		</TabList>
	</Tabs>

	<!-- Content -->
	<div class="flex flex-col lg:flex-row gap-4 min-h-96">
		{#if activeTab === 'contacts'}
			<!-- Contacts + Activity Feed side by side on large screens -->
			<div class="flex-1 min-w-0 overflow-x-auto">
				<ContactList {search}/>
			</div>
			<div class="w-full lg:w-72 shrink-0">
				<ActivityFeed/>
			</div>
		{:else if activeTab === 'pipeline'}
			<!-- Pipeline: full width -->
			<div class="flex-1 min-w-0 overflow-x-auto">
				<Pipeline/>
			</div>
		{:else}
			<!-- Team Structure: full width -->
			<div class="flex-1 min-w-0">
				<TeamStructure/>
			</div>
		{/if}
	</div>
</div>
