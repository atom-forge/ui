export type GanttTask = {
	id: string;
	label: string;
	startDate: string; // YYYY-MM-DD
	endDate: string;   // YYYY-MM-DD
	progress?: number; // 0–100
	color?: string;
	children?: GanttTask[];
	dependencies?: string[]; // task ids this task depends on
};

export type FlatTask = {
	task: GanttTask;
	depth: number;
	parentId: string | null;
	hasChildren: boolean;
	index: number; // row index in visible list
};

export type DragState =
	| { type: 'move'; taskId: string; startX: number; originalStart: string; originalEnd: string }
	| { type: 'resize-left'; taskId: string; startX: number; originalStart: string; originalEnd: string }
	| { type: 'resize-right'; taskId: string; startX: number; originalStart: string; originalEnd: string }
	| null;
