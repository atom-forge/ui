<script lang="ts">
	import { ResourceManager } from '@atom-forge/ui';
	import type { ResourceManagerTypes } from '@atom-forge/ui';

	const today = new Date();
	const d = (offset: number) => {
		const dt = new Date(today);
		dt.setDate(dt.getDate() + offset);
		return dt.toISOString().slice(0, 10);
	};

	const resources: ResourceManagerTypes.RMResource[] = [
		{ id: 'r1', name: 'Anna Schmidt',   role: 'Frontend' },
		{ id: 'r2', name: 'Ben Kovács',     role: 'Backend'  },
		{ id: 'r3', name: 'Clara Tóth',     role: 'Design'   },
		{ id: 'r4', name: 'David Molnár',   role: 'QA'       },
	];

	const projects: ResourceManagerTypes.RMProject[] = [
		{ id: 'p1', name: 'Website Redesign', color: '#6366f1' },
		{ id: 'p2', name: 'Mobile App',       color: '#10b981' },
		{ id: 'p3', name: 'API Platform',     color: '#f59e0b' },
	];

	let allocations = $state<ResourceManagerTypes.RMAllocation[]>([
		{ id: 'a1',  resourceId: 'r1', projectId: 'p1', startDate: d(-8),  endDate: d(5)  },
		{ id: 'a2',  resourceId: 'r1', projectId: 'p2', startDate: d(7),   endDate: d(20) },
		{ id: 'a3',  resourceId: 'r2', projectId: 'p3', startDate: d(-3),  endDate: d(14) },
		{ id: 'a4',  resourceId: 'r2', projectId: 'p1', startDate: d(16),  endDate: d(25) },
		{ id: 'a5',  resourceId: 'r3', projectId: 'p1', startDate: d(-10), endDate: d(8)  },
		{ id: 'a6',  resourceId: 'r3', projectId: 'p2', startDate: d(10),  endDate: d(22) },
		{ id: 'a7',  resourceId: 'r4', projectId: 'p2', startDate: d(5),   endDate: d(18) },
		{ id: 'a8',  resourceId: 'r4', projectId: 'p3', startDate: d(20),  endDate: d(30) },
	]);
</script>

<div class="w-full" style="height: 380px">
	<ResourceManager {resources} {projects} {allocations} onchange={(next) => allocations = next} class="h-full" />
</div>
