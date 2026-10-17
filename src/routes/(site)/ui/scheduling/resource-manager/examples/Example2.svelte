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
		{ id: 'r1', name: 'Anna Schmidt', role: 'Frontend' },
		{ id: 'r2', name: 'Ben Kovács',   role: 'Backend'  },
	];

	const projects: ResourceManagerTypes.RMProject[] = [
		{ id: 'p1', name: 'Alpha', color: '#6366f1' },
		{ id: 'p2', name: 'Beta',  color: '#ec4899' },
	];

	const allocations: ResourceManagerTypes.RMAllocation[] = [
		{ id: 'a1', resourceId: 'r1', projectId: 'p1', startDate: d(-5), endDate: d(10) },
		{ id: 'a2', resourceId: 'r2', projectId: 'p2', startDate: d(0),  endDate: d(15) },
	];
</script>

<div class="w-full" style="height: 240px">
	<ResourceManager {resources} {projects} {allocations} viewOnly class="h-full" />
</div>
