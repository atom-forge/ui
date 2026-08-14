<script lang="ts">
	import {twMerge} from 'tailwind-merge';
	import {Organizer, type OrganizerTypes} from '../../../lib/controls/scheduling/organizer';

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const startHour = 7;
	const rows = 12 * 12;
	const rowHeight = 8;
	const minColWidth = 180;
	const rowHeaderWidth = 64;
	const subdivisions: OrganizerTypes.OrganizerSubdivisions = {
		x: {majorEvery: 1},
		y: {minorEvery: 3, majorEvery: 12, alternateEvery: 12},
	};

	let events = $state<OrganizerTypes.OrganizerItem[]>([
		{id: 'standup', x: 0, y: 24, w: 1, h: 6, title: 'Standup', meta: 'Frontend', tone: 'bg-accent text-accent-contrast'},
		{id: 'planning', x: 1, y: 36, w: 2, h: 12, title: 'Planning', meta: 'Roadmap', tone: 'bg-surface-inverse text-surface-inverse-contrast'},
		{id: 'design', x: 2, y: 54, w: 1, h: 18, title: 'Design review', meta: 'Flows', tone: 'bg-control text-control-contrast'},
		{id: 'deep-work', x: 3, y: 12, w: 2, h: 24, title: 'Deep work', meta: 'Organizer', tone: 'bg-surface text-surface-contrast'},
		{id: 'release', x: 4, y: 96, w: 1, h: 12, title: 'Release check', meta: 'Package', tone: 'bg-accent text-accent-contrast'},
		{id: 'retro', x: 5, y: 108, w: 2, h: 9, title: 'Retro', meta: 'Team', tone: 'bg-control text-control-contrast'},
		{id: 'overlap-a', x: 0, y: 60, w: 1, h: 18, title: 'Interview', meta: 'Candidate', tone: 'bg-surface text-surface-contrast'},
		{id: 'overlap-b', x: 0, y: 66, w: 1, h: 12, title: 'Support', meta: 'Customer', tone: 'bg-control text-control-contrast'},
		{id: 'late', x: 6, y: 126, w: 1, h: 12, title: 'Wrap-up', meta: 'Notes', tone: 'bg-surface-inverse text-surface-inverse-contrast'},
	]);

	const blocked: OrganizerTypes.BlockedRegion[] = [
		{x: 5, y: 0, w: 2, h: 24},
		{x: 0, y: 132, w: 7, h: 12},
	];

	const eventCount = $derived(events.length);
	const totalSlots = $derived(events.reduce((sum, event) => sum + event.h, 0));

	function timeLabel(unit: number) {
		const totalMinutes = startHour * 60 + unit * 5;
		const hour = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hour}:${String(minutes).padStart(2, '0')}`;
	}
</script>

<div class="flex min-h-screen flex-col gap-6 bg-surface p-8 text-surface-contrast">
	<header class="flex flex-col gap-2">
		<h1 class="text-lg font-semibold">Organizer</h1>
		<p class="max-w-3xl text-sm text-muted-contrast">
			Fixed column header and footer with vertical and horizontal body scrolling.
		</p>
	</header>

	<section class="flex flex-col gap-3">
		<div class="flex items-center justify-between gap-3">
			<h2 class="text-sm font-semibold">Fixed header and footer</h2>
			<div class="text-xs text-muted-contrast tabular-nums">{eventCount} events · {totalSlots} slots</div>
		</div>

		<Organizer
			bind:items={events}
			cols={7}
			{rows}
			{rowHeight}
			allowOverlap
			overlapStrategy="calendar"
			resizable="vertical"
			{subdivisions}
			{minColWidth}
			{rowHeaderWidth}
			{blocked}
			class="h-[520px] rounded border border-frame bg-surface"
		>
			{#snippet colHeader(x)}
				<div class={x.index < days.length - 1 ? 'border-b border-r border-frame bg-surface px-3 py-2 text-center text-xs font-semibold' : 'border-b border-frame bg-surface px-3 py-2 text-center text-xs font-semibold'}>
					{days[x.index]}
				</div>
			{/snippet}

			{#snippet rowHeader(y)}
				<div class="relative h-full w-full border-r border-frame bg-surface">
					{#if y.major}
						<div
							class={twMerge(
								'absolute left-0 top-0 z-10 flex w-full items-start justify-end bg-surface pr-2 pt-1 text-xs text-muted-contrast tabular-nums',
								y.index > 0 && 'border-t border-frame',
							)}
							style="height:{rowHeight * 12}px"
						>
							{timeLabel(y.index)}
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet cell({x, y})}
				<div
					class={twMerge(
						'h-full',
						y.alternate && 'bg-muted/20',
						y.major && y.index > 0 ? 'border-t border-frame' : y.minor && 'border-t border-frame/60',
					)}
				></div>
			{/snippet}

			{#snippet footer()}
				<div class="flex items-center justify-between gap-3 border-t border-frame bg-surface px-4 py-2 text-xs text-muted-contrast">
					<span>Body scrolls both ways</span>
					<span class="tabular-nums">Rows: {rows} · Row height: {rowHeight}px · Min column: {minColWidth}px</span>
				</div>
			{/snippet}

			{#snippet item(event)}
				<div class={`m-px flex h-[calc(100%-2px)] w-[calc(100%-2px)] flex-col overflow-hidden rounded border border-frame p-2 text-xs shadow-sm ${event.tone}`}>
					<span class="truncate font-semibold">{event.title}</span>
					<span class="truncate opacity-75">{event.meta}</span>
				</div>
			{/snippet}
		</Organizer>
	</section>
</div>
