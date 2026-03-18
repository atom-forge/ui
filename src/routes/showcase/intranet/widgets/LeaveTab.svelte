<script lang="ts">
	import {Avatar, Button, Card, Chip, NativeSelect, Pagination, ProgressBar, Table, Tooltip, getModalManager, type ColumnDef, Field} from "$lib";
	import {CalendarPlus} from "lucide-svelte";
	import RequestLeaveModal from "./RequestLeaveModal.svelte";

	const modal = getModalManager();

	type LeaveRecord = {
		id: number;
		name: string;
		type: string;
		from: string;
		to: string;
		days: number;
		status: 'approved' | 'pending' | 'rejected';
	};

	const statusChipColor = {
		approved: 'green' as const,
		pending:  'yellow' as const,
		rejected: 'red' as const,
	};

	let filterMonth = $state('all');
	const monthOptions = [
		{value: 'all', label: 'All months'},
		{value: '01', label: 'January'},
		{value: '02', label: 'February'},
		{value: '03', label: 'March'},
		{value: '04', label: 'April'},
	];

	const leaveData: LeaveRecord[] = [
		{id: 1, name: 'John Martinez',  type: 'Annual',   from: 'Jan 6',  to: 'Jan 10', days: 5, status: 'approved'},
		{id: 2, name: 'Andras Kovacs',  type: 'Sick',     from: 'Jan 15', to: 'Jan 16', days: 2, status: 'approved'},
		{id: 3, name: 'Laura Kim',      type: 'Annual',   from: 'Feb 3',  to: 'Feb 7',  days: 5, status: 'approved'},
		{id: 4, name: 'Tom Reed',       type: 'Personal', from: 'Feb 14', to: 'Feb 14', days: 1, status: 'pending'},
		{id: 5, name: 'Sarah Connor',   type: 'Annual',   from: 'Mar 10', to: 'Mar 21', days: 10, status: 'pending'},
		{id: 6, name: 'Elvis',          type: 'Annual',   from: 'Apr 28', to: 'May 2',  days: 5, status: 'approved'},
	];

	const columns: ColumnDef<LeaveRecord>[] = [
		{key: 'name', label: 'Employee', grow: true, snippet: nameSnippet},
		{key: 'type', label: 'Type'},
		{key: 'from', label: 'From'},
		{key: 'to', label: 'To'},
		{key: 'days', label: 'Days', style: {cell: 'text-right', header: 'text-right'}, formatter: r => `${r.days}d`},
		{key: 'status', label: 'Status', snippet: statusSnippet},
	];

	const perPage = 3;
	let leavePage = $state(1);
	const pagedLeave = $derived(leaveData.slice((leavePage - 1) * perPage, leavePage * perPage));
	const leavePageCount = $derived(Math.ceil(leaveData.length / perPage));

	// My leave stats
	const myTotal = 25;
	const myUsed = 8;
	const myPending = 5;
	const myRemaining = myTotal - myUsed - myPending;

	function requestLeave() {
		modal.open(RequestLeaveModal, {onSubmit: () => {}});
	}
</script>

{#snippet nameSnippet(row: LeaveRecord)}
	<div class="flex items-center gap-2">
		<Avatar name={row.name} small/>
		<span>{row.name}</span>
	</div>
{/snippet}

{#snippet statusSnippet(row: LeaveRecord)}
	<Chip color={statusChipColor[row.status]}>{row.status}</Chip>
{/snippet}

<div class="flex flex-col gap-4">
	<!-- My leave summary -->
	<div class="grid grid-cols-2 sm:grid-4 gap-3">
		{#each [
			{label: 'Total days', value: myTotal, color: 'text-canvas-contrast', pct: 100},
			{label: 'Used', value: myUsed, color: 'text-muted-contrast', pct: (myUsed/myTotal)*100},
			{label: 'Pending', value: myPending, color: 'text-yellow-500', pct: (myPending/myTotal)*100},
			{label: 'Remaining', value: myRemaining, color: 'text-green-500', pct: (myRemaining/myTotal)*100},
		] as stat}
			<Card class="p-4">
				<p class="text-xs text-muted-contrast mb-1">{stat.label}</p>
				<p class="text-2xl font-bold {stat.color}">{stat.value}</p>
				<div class="mt-2">
					<ProgressBar value={stat.pct} small/>
				</div>
			</Card>
		{/each}
	</div>

	<!-- Team leave table -->
	<Card class="p-5 flex flex-col gap-4">
		<div class="flex flex-wrap items-center gap-2 justify-between">
			<h3 class="text-base font-semibold text-canvas-contrast">Team Leave Schedule</h3>
			<div class="flex flex-wrap items-center gap-2">
				<div class="w-36">
					<Field label="Filter by month">
						<NativeSelect options={monthOptions} bind:value={filterMonth} compact/>
					</Field>
				</div>
				<Button icon={CalendarPlus} label="Request Leave" accent compact onclick={requestLeave}/>
			</div>
		</div>
		<Table data={pagedLeave} {columns}/>
		{#if leavePageCount > 1}
			<div class="flex justify-end pt-1">
				<Pagination page={leavePage} total={leavePageCount} compact onchange={p => leavePage = p}/>
			</div>
		{/if}
	</Card>

	<!-- Absence calendar — simplified visual -->
	<Card class="p-5 flex flex-col gap-3">
		<h3 class="text-base font-semibold text-canvas-contrast">February Overview</h3>
		<div class="grid grid-cols-7 gap-1 text-center text-xs text-muted-contrast font-medium">
			{#each ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as d}
				<div class="pb-1">{d}</div>
			{/each}
		</div>
		<div class="grid grid-cols-7 gap-1">
			{#each Array.from({length: 28}, (_, i) => i + 1) as day}
				{@const isWeekend = (day + 4) % 7 >= 5}
				{@const lauraLeave = day >= 3 && day <= 7}
				{@const tomLeave = day === 14}
				{@const isToday = day === 1}
				<Tooltip label={lauraLeave ? 'Laura Kim — Annual leave' : tomLeave ? 'Tom Reed — Personal day' : ''}>
					<div class="h-8 rounded flex items-center justify-center text-xs font-medium transition-colors
						{isToday ? 'bg-accent text-accent-contrast' : ''}
						{lauraLeave && !isToday ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : ''}
						{tomLeave ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' : ''}
						{isWeekend && !isToday && !lauraLeave && !tomLeave ? 'text-muted-contrast/50' : ''}
						{!isToday && !lauraLeave && !tomLeave ? 'hover:bg-secondary cursor-default' : 'cursor-default'}
					">{day}</div>
				</Tooltip>
			{/each}
		</div>
		<div class="flex gap-4 text-xs text-muted-contrast pt-1">
			<span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-orange-200 dark:bg-orange-900/50"></span>Laura — Annual</span>
			<span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-teal-200 dark:bg-teal-900/50"></span>Tom — Personal</span>
		</div>
	</Card>
</div>
