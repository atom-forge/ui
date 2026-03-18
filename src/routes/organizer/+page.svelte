<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import CalendarDemo   from './CalendarDemo.svelte';
	import ConferenceDemo from './ConferenceDemo.svelte';
	import ShiftDemo      from './ShiftDemo.svelte';

	type Demo = 'calendar' | 'conference' | 'shifts';
	let activeDemo = $state<Demo>('calendar');

	const demos: { id: Demo; label: string; desc: string }[] = [
		{ id: 'calendar',   label: 'Weekly Calendar',     desc: 'Drag & resize events across days' },
		{ id: 'conference', label: 'Conference Schedule', desc: 'Multi-track session planner'      },
		{ id: 'shifts',     label: 'Shift Planner',       desc: 'Employee shifts with role colors' },
	];
</script>

<div class="min-h-screen bg-canvas p-6 space-y-6">
	<div>
		<h1 class="text-xl font-bold text-canvas-contrast">Organizer — Demo Gallery</h1>
		<p class="text-sm text-muted-contrast mt-0.5">Grid-based drag-and-drop scheduler component</p>
	</div>

	<div class="flex gap-2 flex-wrap">
		{#each demos as d}
			<button
				class={twMerge(
					'px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors text-left',
					activeDemo === d.id
						? 'bg-accent text-accent-contrast border-transparent shadow-sm'
						: 'bg-secondary text-canvas-contrast border-frame hover:border-accent/40',
				)}
				onclick={() => (activeDemo = d.id)}
			>
				<div class="font-semibold">{d.label}</div>
				<div class={twMerge('text-xs mt-0.5', activeDemo === d.id ? 'text-accent-contrast/80' : 'text-muted-contrast')}>{d.desc}</div>
			</button>
		{/each}
	</div>

	{#if activeDemo === 'calendar'}
		<CalendarDemo />
	{:else if activeDemo === 'conference'}
		<ConferenceDemo />
	{:else if activeDemo === 'shifts'}
		<ShiftDemo />
	{/if}
</div>
