<script lang="ts">
	import { Calendar, Checkbox, DocApiBlock, DocApiTable, Icon, ProseDivider, ProsePage, ProseParagraph, ProseTitle, calendar, getDrawerManager, type PropDef } from '@atom-forge/ui';
	import type { CalendarTypes } from '@atom-forge/ui';

	import { Briefcase, Users, Flame, Star, ChevronLeft, ChevronRight } from 'lucide-svelte';

	import EventEditorDrawer from './EventEditorDrawer.svelte';

	const drawer = getDrawerManager();

	const props: PropDef[] = [
		{ name: 'year / month', type: 'number', default: 'current year / current month', description: 'Bindable displayed year and zero-based month.' },
		{ name: 'events', type: 'CalendarTypes.CalendarEvent[]', default: '[]', description: 'Controlled events. Not bindable: update the array in move/resize/create callbacks.' },
		{ name: 'viewOnly / allowCreate / wrapMultiDay', type: 'boolean', default: 'false / false / true', description: 'Disable editing, allow day-click creation, and wrap multi-week events.' },
		{ name: 'workdays', type: 'string', default: "'12345'", description: 'Working weekday numbers; the calendar uses JavaScript weekdays (0=Sunday, 1=Monday … 6=Saturday).' },
		{ name: 'extraRest', type: 'CalendarTypes.RestDayEntry[]', default: '[]', description: 'Date strings or { date, name? } holiday entries.' },
		{ name: 'extraWork', type: 'string[]', default: '[]', description: 'Working date overrides in YYYY-MM-DD format.' },
		{ name: 'firstDayOfWeek', type: '0 | 1', default: '1', description: 'Sunday or Monday as the first column.' },
		{ name: 'onEventMove / onEventResize', type: '(id: string, newStart: string, newEnd: string) => void', description: 'Apply date changes to the controlled event array.' },
		{ name: 'onEventCreate', type: '(date: string) => void', description: 'Create an event on the selected date.' },
		{ name: 'onEventClick', type: '(id: string) => void', description: 'Open details or an editor for the selected event.' },
		{ name: 'class', type: 'string', default: "''", description: 'Additional root classes.' },
	];

	// Current month as default
	const todayDate = calendar.parseDate(calendar.todayStr());
	let year  = $state(todayDate.getFullYear());
	let month = $state(todayDate.getMonth()); // 0-based

	const monthName = $derived(calendar.getMonthName(year, month));

	function prevMonth() {
		if (month === 0) { month = 11; year--; } else month--;
	}
	function nextMonth() {
		if (month === 11) { month = 0; year++; } else month++;
	}
	function goToday() {
		year  = todayDate.getFullYear();
		month = todayDate.getMonth();
	}

	// Build demo events around the current month
	const now = new Date();
	const y   = now.getFullYear();
	const m   = String(now.getMonth() + 1).padStart(2, '0');
	const pad = (n: number) => String(n).padStart(2, '0');
	const d   = (day: number) => `${y}-${m}-${pad(day)}`;

	let events = $state<CalendarTypes.CalendarEvent[]>([
		{ id: '1', startDate: d(3),  endDate: d(5),  title: 'Sprint Planning', subtitle: 'Q2 kickoff', icon: Briefcase, color: 'blue'   },
		{ id: '2', startDate: d(7),  endDate: d(7),  title: 'Team Standup',    subtitle: 'All hands',  icon: Users,     color: 'green'  },
		{ id: '3', startDate: d(7),  endDate: d(7),  title: 'Design Review',                                             color: 'purple' },
		{ id: '4', startDate: d(10), endDate: d(14), title: 'Conference',      subtitle: 'TechConf',   icon: Flame,     color: 'orange' },
		{ id: '5', startDate: d(15), endDate: d(15), title: 'Public Holiday',                                             color: 'red',   readOnly: true },
		{ id: '6', startDate: d(18), endDate: d(21), title: 'Design Sprint',                                              color: 'teal'  },
		{ id: '7', startDate: d(22), endDate: d(22), title: 'Release Day',                              icon: Star,      color: 'yellow' },
	]);

	const extraRest: CalendarTypes.RestDayEntry[] = [
		{ date: `${y}-12-25`, name: 'Christmas'   },
		{ date: `${y}-12-26`, name: 'Boxing Day'  },
		{ date: `${y}-01-01`, name: "New Year's"  },
		{ date: `${y}-03-15`, name: 'National Day' },
		{ date: d(15),        name: 'Holiday'     },
	];

	let viewOnly     = $state(false);
	let allowCreate  = $state(true);
	let wrapMultiDay = $state(true);

	function onEventMove(id: string, newStart: string, newEnd: string) {
		events = events.map(e => e.id === id ? { ...e, startDate: newStart, endDate: newEnd } : e);
	}
	function onEventResize(id: string, newStart: string, newEnd: string) {
		events = events.map(e => e.id === id ? { ...e, startDate: newStart, endDate: newEnd } : e);
	}
	function onEventCreate(date: string) {
		const newEvent: CalendarTypes.CalendarEvent = {
			id: crypto.randomUUID(),
			startDate: date,
			endDate: date,
			title: 'New Event',
			color: 'blue',
		};
		events = [...events, newEvent];
		openEditor(newEvent);
	}
	function onEventClick(id: string) {
		const ev = events.find(e => e.id === id);
		if (ev) openEditor(ev);
	}

	function openEditor(ev: CalendarTypes.CalendarEvent) {
		drawer.open(EventEditorDrawer, {
			event: ev,
			onSave(updated: CalendarTypes.CalendarEvent) {
				events = events.map(e => e.id === updated.id ? updated : e);
			},
			onDelete(id: string) {
				events = events.filter(e => e.id !== id);
			},
		}, { size: 'small' });
	}

	const navBtnClass = 'p-1.5 rounded hover:bg-secondary text-muted-contrast hover:text-canvas-contrast transition-colors cursor-pointer';
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Calendar</ProseTitle>
		<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>

		<div class="p-6 space-y-3 max-w-5xl mx-auto">
			<!-- Toolbar: navigation + options -->
			<div class="flex items-center justify-between flex-wrap gap-3">
				<div class="flex items-center gap-2">
					<button onclick={prevMonth} class={navBtnClass} aria-label="Previous month">
						<Icon icon={ChevronLeft} size="4" />
					</button>
					<button onclick={nextMonth} class={navBtnClass} aria-label="Next month">
						<Icon icon={ChevronRight} size="4" />
					</button>
					<span class="text-sm font-semibold text-canvas-contrast min-w-36">{monthName}</span>
					<button
						onclick={goToday}
						class="text-xs px-3 py-1.5 rounded border border-frame text-muted-contrast hover:text-canvas-contrast hover:bg-secondary transition-colors cursor-pointer"
					>Today</button>
				</div>

				<div class="flex items-center gap-5">
					<Checkbox bind:value={viewOnly} label="View only" />
					<Checkbox bind:value={allowCreate} label="Allow create" />
					<Checkbox bind:value={wrapMultiDay} label="Wrap multi-week" />
				</div>
			</div>

			<!-- Calendar: receives year/month from parent -->
			<Calendar
				bind:year
				bind:month
				{events}
				{viewOnly}
				{allowCreate}
				{wrapMultiDay}
				{onEventMove}
				{onEventResize}
				{onEventCreate}
				{onEventClick}
				{extraRest}
			/>

			<details class="text-xs">
				<summary class="text-muted-contrast cursor-pointer select-none">events JSON</summary>
				<pre class="mt-2 p-3 bg-surface rounded border border-frame overflow-auto text-canvas-contrast">{JSON.stringify(events, null, 2)}</pre>
			</details>
		</div>
	</ProseParagraph>
</ProsePage>
