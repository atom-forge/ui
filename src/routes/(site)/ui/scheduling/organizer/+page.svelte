<script lang="ts">
	import { DocApiBlock, DocApiTable, DocShowCode, ProsePage, ProseParagraph, type PropDef } from '@atom-forge/ui';
	import { twMerge } from 'tailwind-merge';
	import CalendarDemo   from './CalendarDemo.svelte';
	import ConferenceDemo from './ConferenceDemo.svelte';
	import ShiftDemo      from './ShiftDemo.svelte';
		import calendarCode from './CalendarDemo.svelte?raw';
		import conferenceCode from './ConferenceDemo.svelte?raw';
		import shiftCode from './ShiftDemo.svelte?raw';

		const props: PropDef[] = [
			{ name: 'items', type: 'OrganizerTypes.OrganizerItem[]', default: '[]', description: 'Bindable grid items with id, x, y, w, h and optional application metadata. Coordinates and sizes are in grid units.' },
			{ name: 'item', type: 'Snippet<[OrganizerTypes.OrganizerItemRendered]>', description: 'Required renderer. Receives item data and computed lane/render metadata.' },
			{ name: 'cols / rows / rowHeight', type: 'number', default: '12 / auto / 50', description: 'Grid dimensions and pixel height per vertical unit. Omitted rows grow from item extents.' },
			{ name: 'draggable / resizable', type: "boolean / (boolean | 'vertical' | 'horizontal')", default: 'true / true', description: 'Enable moving or resizing; directional values constrain resizing.' },
			{ name: 'allowOverlap / overlapStrategy', type: "boolean / ('compress' | 'expand' | 'calendar' | 'calendar-v')", default: "false / 'compress'", description: 'Overlap validation and layout strategy.' },
			{ name: 'blocked', type: 'OrganizerTypes.BlockedRegion[]', default: '[]', description: 'Unavailable rectangles with x, y, w, h.' },
			{ name: 'subdivisions', type: 'OrganizerTypes.OrganizerSubdivisions', default: '{}', description: 'Optional x/y rules: minorEvery, majorEvery, alternateEvery, offset. All intervals are measured in grid units.' },
			{ name: 'colHeader / rowHeader', type: 'Snippet<[OrganizerTypes.OrganizerAxisMark]>', description: 'Receives { index, minor, major, alternate }, not a numeric index. Destructure index to label days or times.' },
			{ name: 'cell', type: 'Snippet<[OrganizerTypes.OrganizerCellMeta]>', description: 'Receives { x, y }, each an axis-mark object. Use x.index/y.index for coordinates or minor/major/alternate for subdivision styling.' },
			{ name: 'rowHeaderWidth', type: 'number | string', description: 'Optional fixed row-label width instead of content measurement.' },
			{ name: 'minColWidth', type: 'number', default: '0', description: 'Minimum column width in pixels; enables horizontal scrolling when needed.' },
			{ name: 'minW / minH / maxW / maxH', type: 'number', default: '1 / 1 / unset / unset', description: 'Minimum and maximum item dimensions in grid units.' },
			{ name: 'footer', type: 'Snippet', description: 'Optional footer below the scrollable grid body.' },
			{ name: 'class', type: 'string', default: "''", description: 'Additional root classes.' },
		];

	type Demo = 'calendar' | 'conference' | 'shifts';
	let activeDemo = $state<Demo>('calendar');

	const demos: { id: Demo; label: string; desc: string }[] = [
		{ id: 'calendar',   label: 'Weekly Calendar',     desc: 'Drag & resize events across days' },
		{ id: 'conference', label: 'Conference Schedule', desc: 'Multi-track session planner'      },
		{ id: 'shifts',     label: 'Shift Planner',       desc: 'Employee shifts with role colors' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<div class="min-h-screen bg-canvas p-6 space-y-6">
			<div>
				<h1 class="text-xl font-bold text-canvas-contrast">Organizer — Demo Gallery</h1>
				<p class="text-sm text-muted-contrast mt-0.5">Grid-based drag-and-drop scheduler component</p>
								<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
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
								<DocShowCode code={calendarCode} file="CalendarDemo.svelte" title="Show Code" open={false} />
			{:else if activeDemo === 'conference'}
				<ConferenceDemo />
								<DocShowCode code={conferenceCode} file="ConferenceDemo.svelte" title="Show Code" open={false} />
			{:else if activeDemo === 'shifts'}
				<ShiftDemo />
								<DocShowCode code={shiftCode} file="ShiftDemo.svelte" title="Show Code" open={false} />
			{/if}
		</div>
	</ProseParagraph>
</ProsePage>
