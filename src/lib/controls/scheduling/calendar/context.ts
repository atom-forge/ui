import { getContext, setContext } from 'svelte';

const KEY = Symbol('calendar');

export interface CalendarCtx {
	readonly viewOnly: boolean;
	readonly hoveredDate: string | null;
	setHoveredDate(d: string | null): void;
	readonly resizingId: string | null;
	onEventDrop(eventId: string, targetDate: string): void;
	onResizeStart(eventId: string, startDate: string, endDate: string, side: 'left' | 'right', e: MouseEvent): void;
	onEventClick(eventId: string): void;
	readonly allowCreate: boolean;
	onDayClick(dateStr: string): void;
}

export function setCalendarCtx(ctx: CalendarCtx): void {
	setContext(KEY, ctx);
}

export function getCalendarCtx(): CalendarCtx {
	return getContext<CalendarCtx>(KEY);
}
