<script lang="ts">
	import { Timeline } from '$lib';

	const events = [
		{ time: '09:00', title: 'Project kickoff', desc: 'Initial planning session with all stakeholders.' },
		{ time: '10:30', title: 'Design review', desc: 'Reviewed wireframes and approved the color palette.' },
		{ time: '13:00', title: 'Development started', desc: 'Frontend and backend teams began implementation.' },
		{ time: '17:00', title: 'First build deployed', desc: 'Staging environment updated successfully.' },
	];
</script>

<Timeline items={events} right>
	{#snippet children(event)}
		<div class="mb-1">
			<span class="text-xs text-muted-contrast font-mono">{event.time}</span>
			<p class="text-sm font-medium text-canvas-contrast">{event.title}</p>
			<p class="text-xs text-muted-contrast">{event.desc}</p>
		</div>
	{/snippet}
</Timeline>
