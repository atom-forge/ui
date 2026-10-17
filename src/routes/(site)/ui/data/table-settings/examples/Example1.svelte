<script lang="ts">
	import { Table, TableSettings, type ColumnDef } from '@atom-forge/ui';

	type Project = { id: number; name: string; owner: string; status: string };
	const data: Project[] = [
		{ id: 1, name: 'Design system', owner: 'Alice', status: 'In review' },
		{ id: 2, name: 'Documentation', owner: 'Bob', status: 'In progress' },
	];
	let columns = $state<ColumnDef<Project>[]>([
		{ key: 'id', label: 'ID', fixed: true, visible: true, width: '4rem' },
		{ key: 'name', label: 'Project', visible: true, grow: true },
		{ key: 'owner', label: 'Owner', visible: true },
		{ key: 'status', label: 'Status', visible: false },
	]);
	let lastChanged = $state('No visibility changes yet.');
</script>

<div class="flex flex-col gap-4">
	<TableSettings bind:columns onToggleColumn={(key) => {
		// TableSettings has already changed visible; do not toggle it a second time.
		lastChanged = `${key}: ${columns.find(column => column.key === key)?.visible ? 'shown' : 'hidden'}`;
	}} />
	<Table {data} bind:columns hideHeader noScroll />
	<p aria-live="polite" class="text-sm text-muted-contrast">{lastChanged}</p>
</div>
