<script lang="ts">
	import { GanttChart } from '@atom-forge/ui';
	import type { GanttTypes } from '@atom-forge/ui';

	const today = new Date();
	const d = (offset: number) => {
		const dt = new Date(today);
		dt.setDate(dt.getDate() + offset);
		return dt.toISOString().slice(0, 10);
	};

	let tasks = $state<GanttTypes.GanttTask[]>([
		{
			id: 'phase-1', label: 'Phase 1 — Design', startDate: d(-5), endDate: d(10), color: '#6366f1', progress: 60,
			children: [
				{ id: 't1', label: 'Requirements',    startDate: d(-5), endDate: d(0),  progress: 100 },
				{ id: 't2', label: 'Wireframes',      startDate: d(1),  endDate: d(6),  progress: 50  },
				{ id: 't3', label: 'Design review',   startDate: d(7),  endDate: d(10), progress: 0   },
			],
		},
		{
			id: 'phase-2', label: 'Phase 2 — Build', startDate: d(11), endDate: d(35), color: '#10b981', progress: 0,
			children: [
				{ id: 't4', label: 'Frontend',        startDate: d(11), endDate: d(25), progress: 0, dependencies: ['t2'] },
				{ id: 't5', label: 'Backend',         startDate: d(11), endDate: d(28), progress: 0, dependencies: ['t2'] },
				{ id: 't6', label: 'Integration',     startDate: d(26), endDate: d(35), progress: 0, dependencies: ['t4', 't5'] },
			],
		},
		{ id: 't7', label: 'QA & Launch', startDate: d(36), endDate: d(42), color: '#f59e0b', progress: 0, dependencies: ['t6'] },
	]);
</script>

<div class="w-full" style="height: 420px">
	<GanttChart {tasks} onchange={(next) => tasks = next} class="h-full" />
</div>
