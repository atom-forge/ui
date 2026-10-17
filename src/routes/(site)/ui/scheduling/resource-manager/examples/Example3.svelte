<script lang="ts">
	import { Organizer, calendar, type OrganizerTypes, type ResourceManagerTypes } from '@atom-forge/ui';

	const rangeStart = calendar.todayStr();
	const days = Array.from({ length: 14 }, (_, index) => calendar.addDays(rangeStart, index));
	const resources: ResourceManagerTypes.RMResource[] = [
		{ id: 'anna', name: 'Anna Schmidt', role: 'Frontend' },
		{ id: 'ben', name: 'Ben Kovács', role: 'Backend' },
		{ id: 'clara', name: 'Clara Tóth', role: 'Design' },
	];
	const projects: ResourceManagerTypes.RMProject[] = [
		{ id: 'website', name: 'Website Redesign', color: '#6366f1' },
		{ id: 'api', name: 'API Platform', color: '#10b981' },
	];
	let allocations = $state<ResourceManagerTypes.RMAllocation[]>([
		{ id: 'a1', resourceId: 'anna', projectId: 'website', startDate: days[0], endDate: days[4] },
		{ id: 'a2', resourceId: 'ben', projectId: 'api', startDate: days[2], endDate: days[7] },
		{ id: 'a3', resourceId: 'clara', projectId: 'website', startDate: days[6], endDate: days[10] },
	]);

	const gridItems = $derived<OrganizerTypes.OrganizerItem[]>(allocations.map(allocation => ({
		id: allocation.id,
		x: calendar.dayDiff(rangeStart, allocation.startDate),
		y: resources.findIndex(resource => resource.id === allocation.resourceId),
		w: calendar.dayDiff(allocation.startDate, allocation.endDate) + 1,
		h: 1,
	})));

	function updateAllocations(items: OrganizerTypes.OrganizerItem[]) {
		allocations = items.map(item => {
			const allocation = allocations.find(allocation => allocation.id === item.id)!;
			return {
				...allocation,
				resourceId: resources[item.y].id,
				startDate: calendar.addDays(rangeStart, item.x),
				endDate: calendar.addDays(rangeStart, item.x + item.w - 1),
			};
		});
	}
</script>

<div class="w-full space-y-3">
	<Organizer
		bind:items={() => gridItems, updateAllocations}
		cols={days.length}
		rows={resources.length}
		rowHeight={56}
		rowHeaderWidth={150}
		minColWidth={56}
		resizable="horizontal"
		minH={1}
		maxH={1}
		subdivisions={{ x: { minorEvery: 1, majorEvery: 7, alternateEvery: 7 } }}
		class="rounded-lg border border-frame overflow-hidden"
	>
		{#snippet colHeader(mark)}
			<div class="py-2 text-center text-xs text-muted-contrast border-r border-b border-frame {mark.alternate ? 'bg-secondary' : 'bg-surface'}">
				{calendar.parseDate(days[mark.index]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
			</div>
		{/snippet}
		{#snippet rowHeader({ index })}
			<div class="h-14 px-3 flex flex-col justify-center border-r border-b border-frame bg-surface">
				<span class="text-xs font-medium text-canvas-contrast">{resources[index].name}</span>
				<span class="text-xs text-muted-contrast">{resources[index].role}</span>
			</div>
		{/snippet}
		{#snippet cell({ x })}
			<div class="h-full border-r border-b border-frame {x.alternate ? 'bg-secondary/40' : ''}"></div>
		{/snippet}
		{#snippet item(item)}
			{@const allocation = allocations.find(allocation => allocation.id === item.id)!}
			{@const project = projects.find(project => project.id === allocation.projectId)!}
			<div class="h-full rounded-md px-2 flex items-center text-xs text-white overflow-hidden" style="background-color: {project.color}">
				<span class="truncate">{project.name}</span>
			</div>
		{/snippet}
		{#snippet footer()}
			<p class="px-3 py-2 text-xs text-muted-contrast">Drag to reassign a resource or date range; resize horizontally to change the inclusive end date.</p>
		{/snippet}
	</Organizer>
	<details class="text-xs text-muted-contrast">
		<summary class="cursor-pointer">Allocation data</summary>
		<pre class="mt-2 p-3 bg-surface rounded-lg border border-frame overflow-auto">{JSON.stringify(allocations, null, 2)}</pre>
	</details>
</div>
