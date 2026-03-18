<script lang="ts">
	import Organizer from '../../pro/organizer/Organizer.svelte';
	import type { BlockedRegion, OrganizerItem, OverlapStrategy } from '../../pro/organizer/types.js';
	import { twMerge } from 'tailwind-merge';

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	const startHour = 8;
	const rowHeight = 44;
	const rows = 20;

	function timeLabel(row: number): string {
		const totalMinutes = startHour * 60 + row * 30;
		const h = Math.floor(totalMinutes / 60);
		const m = totalMinutes % 60;
		return m === 0 ? `${h}:00` : '';
	}

	function rowToTime(row: number): string {
		const totalMinutes = startHour * 60 + row * 30;
		const h = Math.floor(totalMinutes / 60);
		const m = totalMinutes % 60;
		return `${h}:${String(m).padStart(2, '0')}`;
	}

	type CalEvent = OrganizerItem & { title: string; color: string };

	let events = $state<CalEvent[]>([
		{ id: '1',  x: 0, y: 2,  w: 1, h: 4, title: 'Team Standup',     color: '#3b82f6' },
		{ id: '2',  x: 0, y: 4,  w: 1, h: 3, title: 'Design Review',    color: '#a855f7' },
		{ id: '3',  x: 0, y: 8,  w: 1, h: 2, title: 'Lunch Break',      color: '#22c55e' },
		{ id: '4',  x: 1, y: 2,  w: 1, h: 5, title: 'Project Work',     color: '#f59e0b' },
		{ id: '5',  x: 1, y: 3,  w: 1, h: 3, title: '1:1 with Alice',   color: '#f43f5e' },
		{ id: '6',  x: 1, y: 4,  w: 1, h: 4, title: 'Sprint Planning',  color: '#06b6d4' },
		{ id: '7',  x: 2, y: 0,  w: 1, h: 3, title: 'Morning Sync',     color: '#14b8a6' },
		{ id: '8',  x: 2, y: 6,  w: 1, h: 4, title: 'Client Call',      color: '#f97316' },
		{ id: '9',  x: 3, y: 1,  w: 1, h: 6, title: 'Deep Work',        color: '#6366f1' },
		{ id: '10', x: 3, y: 5,  w: 1, h: 3, title: 'Code Review',      color: '#ec4899' },
		{ id: '11', x: 4, y: 3,  w: 1, h: 4, title: 'Retro',            color: '#84cc16' },
		{ id: '12', x: 0, y: 12, w: 3, h: 2, title: 'Offsite Workshop', color: '#8b5cf6' },
		{ id: '13', x: 1, y: 12, w: 3, h: 2, title: 'Team Offsite',     color: '#0ea5e9' },
		{ id: '14', x: 2, y: 15, w: 2, h: 3, title: 'Conf Talk Prep',   color: '#d97706' },
	]);

	const blocked: BlockedRegion[] = [{ x: 1, y: 8, w: 1, h: 12 }];

	let strategy     = $state<OverlapStrategy>('calendar');
	let allowOverlap = $state(true);
	let resizable    = $state<'vertical' | 'horizontal' | true | false>('vertical');

	const strategies: OverlapStrategy[] = ['calendar', 'calendar-v', 'compress'];
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between flex-wrap gap-3">
		<div>
			<h2 class="text-base font-semibold text-canvas-contrast">Weekly Calendar</h2>
			<p class="text-xs text-muted-contrast mt-0.5">Drag events to reschedule · Resize from the bottom edge</p>
		</div>

		<div class="flex items-center gap-3 flex-wrap">
			<div class="flex items-center gap-1 bg-secondary border-frame rounded-lg p-1">
				{#each strategies as s}
					<button
						class={twMerge(
							'px-3 py-1 rounded-md text-sm font-medium transition-colors',
							strategy === s ? 'bg-accent text-accent-contrast shadow-sm' : 'text-muted-contrast hover:text-canvas-contrast',
						)}
						onclick={() => (strategy = s)}
					>{s}</button>
				{/each}
			</div>

			<label class="flex items-center gap-2 text-sm text-canvas-contrast cursor-pointer select-none">
				<input type="checkbox" bind:checked={allowOverlap} class="rounded" />
				Allow overlap
			</label>

			<div class="flex items-center gap-1 bg-secondary border-frame rounded-lg p-1">
				{#each ([false, 'vertical', 'horizontal', true] as const) as r}
					<button
						class={twMerge(
							'px-3 py-1 rounded-md text-sm font-medium transition-colors',
							resizable === r ? 'bg-accent text-accent-contrast shadow-sm' : 'text-muted-contrast hover:text-canvas-contrast',
						)}
						onclick={() => (resizable = r)}
					>{r === false ? 'no resize' : r === true ? 'both' : r}</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="bg-surface border-frame rounded-xl overflow-hidden">
		<Organizer
			bind:items={events}
			cols={5}
			{rows}
			{rowHeight}
			{allowOverlap}
			overlapStrategy={strategy}
			{resizable}
			{blocked}
		>
			{#snippet colHeader(c)}
				<div class="text-center text-sm font-semibold text-canvas-contrast py-2.5 border-b border-r border-frame bg-surface last:border-r-0">
					{days[c]}
				</div>
			{/snippet}

			{#snippet rowHeader(r)}
				<div class="w-14 flex items-start justify-end pr-2 text-[11px] text-muted-contrast border-r border-frame" style="height:{rowHeight}px; padding-top:2px">
					{timeLabel(r)}
				</div>
			{/snippet}

			{#snippet cell({ y })}
				<div class={y % 2 === 0 ? 'h-full w-full border-b border-frame' : 'h-full w-full border-b border-frame/30'}></div>
			{/snippet}

			{#snippet item(ev)}
				{@const isNarrow = ev._laneCount > 1}
				{@const title = ev.title as string}
				{@const color = ev.color as string}
				<div
					class="h-full w-full rounded-md text-white shadow-sm overflow-hidden flex flex-col px-1.5 py-1 text-xs"
					style="background-color:{color}; margin:1px; width:calc(100% - 2px); height:calc(100% - 2px)"
				>
					<span class="font-semibold truncate leading-tight">{title}</span>
					{#if !isNarrow}
						<span class="opacity-75 truncate">{rowToTime(ev.y)} – {rowToTime(ev.y + ev.h)}</span>
					{/if}
				</div>
			{/snippet}
		</Organizer>
	</div>

	<details class="text-xs text-muted-contrast">
		<summary class="cursor-pointer hover:text-canvas-contrast">Event data (JSON)</summary>
		<pre class="mt-2 p-3 bg-surface rounded-lg border border-frame overflow-auto">{JSON.stringify(events, null, 2)}</pre>
	</details>
</div>
