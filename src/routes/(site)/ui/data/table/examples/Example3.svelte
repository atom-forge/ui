<script lang="ts">
	import {Table, TableSettings, Button, getPopupManager, type ColumnDef} from '@atom-forge/ui';
	import {Settings} from "lucide-svelte";

	type User = {
		id: number;
		name: string;
		email: string;
		role: 'Admin' | 'User' | 'Guest';
	};

	const popupManager = getPopupManager();

	const data: User[] = [
		{id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin'},
		{id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User'},
		{id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', role: 'User'},
		{id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Guest'},
	];

	let columns = $state<ColumnDef<User>[]>([
		{key: 'id', label: 'ID', shrink: true},
		{key: 'name', label: 'Name', grow: true},
		{key: 'email', label: 'Email', grow: true},
		{key: 'role', label: 'Role', visible: false},
	]);

	function openSettings(event: MouseEvent) {
		popupManager.open.snippet(settings, {}, {anchor: event});
	}
</script>

{#snippet settings()}
    <TableSettings bind:columns onToggleColumn={() => { columns = [...columns]; }} />
{/snippet}

<div class="flex flex-col gap-4">
	<div class="flex justify-end">
		<Button label="Table Settings" icon={Settings} onclick={openSettings}/>
	</div>
	<div class="h-72">
		<Table {data} bind:columns/>
	</div>
</div>
