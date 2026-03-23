export type RMResource = {
	id: string;
	name: string;
	role?: string;
	avatar?: string; // image URL
};

export type RMProject = {
	id: string;
	name: string;
	color?: string;
};

export type RMAllocation = {
	id: string;
	resourceId: string;
	projectId: string;
	startDate: string; // YYYY-MM-DD
	endDate: string;   // YYYY-MM-DD
};

export type LanedAllocation = {
	alloc: RMAllocation;
	lane: number;
};

export type ResourceRow = {
	resource: RMResource;
	laned: LanedAllocation[];
	laneCount: number;
	rowHeight: number;
	offsetY: number; // cumulative y offset
};

export type DragState =
	| { type: 'move'; allocId: string; startX: number; originalStart: string; originalEnd: string }
	| { type: 'resize-right'; allocId: string; startX: number; originalStart: string; originalEnd: string }
	| { type: 'resize-left'; allocId: string; startX: number; originalStart: string; originalEnd: string }
	| { type: 'create'; resourceId: string; startX: number; startDate: string; endDate: string }
	| null;
