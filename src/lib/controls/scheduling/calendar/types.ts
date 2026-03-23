export type CalendarEventColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'teal' | 'yellow';

/** A rest-day entry: either a plain date string or an object with an optional display name */
export type RestDayEntry = string | { date: string; name?: string };

export interface CalendarEvent {
	id: string;
	startDate: string; // YYYY-MM-DD
	endDate: string;   // YYYY-MM-DD
	title: string;
	subtitle?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: any;        // Lucide icon component
	color?: CalendarEventColor;
	class?: string;    // extra CSS classes
	readOnly?: boolean;
}

export interface EventSlot {
	event: CalendarEvent;
	startCol: number; // 1-7
	endCol: number;   // 1-7
	lane: number;     // 0-based vertical track
	isStart: boolean; // this segment is the event's actual start
	isEnd: boolean;   // this segment is the event's actual end
}
