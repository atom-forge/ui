import { getContext, setContext } from 'svelte';
import type { GanttTask, DragState } from './gantt.types';
import {
	parseDate, formatDate, addDays, daysBetween,
	flattenTasks, updateTaskInTree, deleteTaskFromTree,
	addChildTask, generateId, collectAllDates,
} from './gantt-utils';

const KEY = Symbol('gantt');

export const ROW_HEIGHT = 44;
export const HEADER_HEIGHT = 56;
export const TASK_LIST_WIDTH = 280;

export const ZOOM_LEVELS = [14, 20, 30, 44, 64]; // px per day
export const ZOOM_LABELS = ['Month', 'Week+', 'Week', 'Day', 'Day+'];

export class GanttContext {
	tasks: GanttTask[] = $state([]);
	dayWidth: number = $state(30);
	collapsedIds: Set<string> = $state(new Set());
	editingId: string | null = $state(null);
	selectedId: string | null = $state(null);
	viewOnly: boolean = $state(false);
	workdays: string = $state('12345');
	extraRest: string[] = $state([]);
	extraWork: string[] = $state([]);
	drag: DragState = $state(null);
	scrollLeft: number = $state(0);

	// History for undo/redo
	private history: GanttTask[][] = [];
	private historyIndex: number = $state(-1);

	snapshot() {
		// truncate forward history, push current
		this.history = this.history.slice(0, this.historyIndex + 1);
		this.history.push(JSON.parse(JSON.stringify(this.tasks)));
		this.historyIndex = this.history.length - 1;
	}

	undo() {
		if (this.historyIndex > 0) {
			this.historyIndex--;
			this.tasks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
		}
	}

	redo() {
		if (this.historyIndex < this.history.length - 1) {
			this.historyIndex++;
			this.tasks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
		}
	}

	get canUndo() { return this.historyIndex > 0; }
	get canRedo() { return this.historyIndex < this.history.length - 1; }

	get flatTasks() {
		return flattenTasks(this.tasks, this.collapsedIds);
	}

	get bounds() {
		const dates = collectAllDates(this.tasks);
		if (!dates) {
			const today = new Date();
			return { start: addDays(today, -7), end: addDays(today, 30) };
		}
		return { start: addDays(dates.min, -7), end: addDays(dates.max, 14) };
	}

	get totalDays() {
		return daysBetween(this.bounds.start, this.bounds.end) + 1;
	}

	get totalWidth() {
		return this.totalDays * this.dayWidth;
	}

	dateToX(dateStr: string): number {
		return daysBetween(this.bounds.start, parseDate(dateStr)) * this.dayWidth;
	}

	xToDate(x: number): string {
		const days = Math.round(x / this.dayWidth);
		return formatDate(addDays(this.bounds.start, days));
	}

	xToDateSnap(x: number): string {
		const days = Math.round(x / this.dayWidth);
		return formatDate(addDays(this.bounds.start, Math.max(0, days)));
	}

	todayX(): number {
		return this.dateToX(formatDate(new Date()));
	}

	toggleCollapse(id: string) {
		const next = new Set(this.collapsedIds);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		this.collapsedIds = next;
	}

	addTask(parentId: string | null = null) {
		this.snapshot();
		const today = formatDate(new Date());
		const newTask: GanttTask = {
			id: generateId(),
			label: 'New task',
			startDate: today,
			endDate: formatDate(addDays(new Date(), 7)),
			progress: 0,
		};
		this.tasks = addChildTask(this.tasks, parentId, newTask);
		this.editingId = newTask.id;
	}

	deleteTask(id: string) {
		this.snapshot();
		this.tasks = deleteTaskFromTree(this.tasks, id);
		if (this.selectedId === id) this.selectedId = null;
	}

	renameTask(id: string, label: string) {
		this.snapshot();
		this.tasks = updateTaskInTree(this.tasks, id, { label });
	}

	updateTask(id: string, patch: Partial<GanttTask>) {
		this.tasks = updateTaskInTree(this.tasks, id, patch);
	}

	commitUpdate(id: string, patch: Partial<GanttTask>) {
		this.snapshot();
		this.tasks = updateTaskInTree(this.tasks, id, patch);
	}

	zoomIn() {
		const idx = ZOOM_LEVELS.indexOf(this.dayWidth);
		if (idx < ZOOM_LEVELS.length - 1) this.dayWidth = ZOOM_LEVELS[idx + 1];
		else this.dayWidth = Math.min(128, this.dayWidth + 10);
	}

	zoomOut() {
		const idx = ZOOM_LEVELS.indexOf(this.dayWidth);
		if (idx > 0) this.dayWidth = ZOOM_LEVELS[idx - 1];
		else this.dayWidth = Math.max(8, this.dayWidth - 10);
	}

	exportJSON(): string {
		return JSON.stringify(this.tasks, null, 2);
	}

	importJSON(json: string) {
		try {
			const parsed = JSON.parse(json);
			this.snapshot();
			this.tasks = parsed;
		} catch {
			// invalid JSON, ignore
		}
	}

	init(initial: GanttTask[]) {
		this.tasks = JSON.parse(JSON.stringify(initial));
		this.snapshot(); // initial snapshot so undo stack starts populated
		// Adjust historyIndex so we can't undo past the initial state
	}
}

export function createGanttContext(): GanttContext {
	const ctx = new GanttContext();
	setContext(KEY, ctx);
	return ctx;
}

export function getGanttContext(): GanttContext {
	return getContext<GanttContext>(KEY);
}
