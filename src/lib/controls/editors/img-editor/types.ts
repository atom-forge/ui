export type EditStep =
	| { type: 'rotate'; quarters: 1 | 2 | 3 }
	| { type: 'flip';   axis: 'H' | 'V' }
	| { type: 'level';  deg: number }
	| { type: 'crop';   x: number; y: number; w: number; h: number }  // normalized 0-1, relative to workingImage at Apply time

export interface NormalizedPoint { x: number; y: number }
export interface NormalizedRect  { x: number; y: number; w: number; h: number }

export interface ImgEditorData {
	src:        string;
	steps:      EditStep[];
	focalPoint: NormalizedPoint;
	safeArea:   NormalizedRect;
}

