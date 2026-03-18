<script lang="ts">
	import { Timeline, Card } from '$lib';
	import { CheckCircle, Clock, Circle } from 'lucide-svelte';

	type Status = 'done' | 'active' | 'pending';

	const milestones: { title: string; date: string; desc: string; status: Status }[] = [
		{ title: 'Requirements', date: 'Jan 5', desc: 'Collected all user stories and acceptance criteria.', status: 'done' },
		{ title: 'Design', date: 'Jan 12', desc: 'Delivered UI mockups and a component library.', status: 'done' },
		{ title: 'Development', date: 'Jan 26', desc: 'Feature implementation in progress.', status: 'active' },
		{ title: 'QA & Testing', date: 'Feb 9', desc: 'Automated and manual test suite.', status: 'pending' },
		{ title: 'Launch', date: 'Feb 20', desc: 'Production deployment and monitoring.', status: 'pending' },
	];

	const dotColor: Record<Status, string> = {
		done:    'text-emerald-500',
		active:  'text-accent',
		pending: 'text-muted-contrast',
	};
</script>

<Timeline items={milestones} right alternate>
	{#snippet dot(m)}
		{#if m.status === 'done'}
			<CheckCircle size={18} class={dotColor[m.status as Status]} />
		{:else if m.status === 'active'}
			<Clock size={18} class={dotColor[m.status as Status]} />
		{:else}
			<Circle size={18} class={dotColor[m.status as Status]} />
		{/if}
	{/snippet}

	{#snippet children(m)}
		<Card class="p-3 mb-0">
			<div class="flex items-baseline justify-between gap-2 mb-1">
				<span class="text-sm font-semibold text-canvas-contrast">{m.title}</span>
				<span class="text-xs text-muted-contrast shrink-0">{m.date}</span>
			</div>
			<p class="text-xs text-muted-contrast">{m.desc}</p>
		</Card>
	{/snippet}
</Timeline>
