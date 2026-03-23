import type { DiagramData } from './types.ts';

export function makeDefaultDiagramData(): DiagramData {
	return { xml: '', svg: '', scheme: 'light', caption: '', description: '' };
}
