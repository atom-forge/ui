<script lang="ts">
	import { GanttChart } from '@atom-forge/ui';
	import type { GanttTypes } from '@atom-forge/ui';

	const today = new Date();
	const d = (offset: number) => {
		const dt = new Date(today);
		dt.setDate(dt.getDate() + offset);
		return dt.toISOString().slice(0, 10);
	};

	const tasks: GanttTypes.GanttTask[] = [
		{ id: 't1', label: 'Discovery',  startDate: d(-10), endDate: d(-3), progress: 100, color: '#8b5cf6' },
		{ id: 't2', label: 'Delivery',   startDate: d(0),   endDate: d(14), progress: 20,  color: '#3b82f6' },
		{ id: 't3', label: 'Handover',   startDate: d(15),  endDate: d(20), progress: 0,   color: '#10b981', dependencies: ['t2'] },
	];
</script>

<div class="w-full" style="height: 260px">
	<GanttChart {tasks} viewOnly class="h-full" />
</div>
