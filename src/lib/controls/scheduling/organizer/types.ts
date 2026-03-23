export type OrganizerItem = {
	id: string;
	x: number; // oszlop index (0-based)
	y: number; // sor index (0-based)
	w: number; // szélesség oszlopokban
	h: number; // magasság sorokban
	[key: string]: any;
};

export type OrganizerItemRendered = OrganizerItem & {
	_lane: number;         // 0-based sávindex a conflict groupon belül
	_laneCount: number;    // conflict group sávjainak száma (1 = nincs átfedés)
	_renderLeft: string;   // CSS left (%)
	_renderWidth: string;  // CSS width (%)
	_renderTop?: string;   // CSS top px — calendar-v tölti ki, felülírja y * rowHeight
	_renderHeight?: string; // CSS height px — calendar-v tölti ki, felülírja h * rowHeight
};

export type OverlapStrategy = 'compress' | 'expand' | 'calendar' | 'calendar-v';

export type BlockedRegion = { x: number; y: number; w: number; h: number };

export type GhostState = {
	left: string;
	width: string;
	top: number;
	height: number;
};
