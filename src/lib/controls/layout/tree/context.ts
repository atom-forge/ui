import type {Snippet} from 'svelte';
import type {TreeDropContext, TreeDropPosition, TreeDndOptions, TreeMove, TreeNode} from './types';

export type TreeDropTarget = {
	nodeId: string | null;
	position: TreeDropPosition;
};

export type TreeViewContext = {
	toggleExpanded: (id: string) => void;
	isExpanded: (id: string) => boolean;
	row?: Snippet<[TreeNode]>;
	onNodeClick?: (node: TreeNode) => void;
	isSelected: (id: string) => boolean;
	dnd?: TreeDndOptions;
	setDragging: (id: string | null) => void;
	draggingId: () => string | null;
	isDragging: (id: string) => boolean;
	resolveDrop: (nodeId: string | null, target: TreeNode | null, position: TreeDropPosition) => TreeDropContext | null;
	setDropTarget: (target: TreeDropTarget | null) => void;
	isDropTarget: (nodeId: string | null, position: TreeDropPosition) => boolean;
	move: (drop: TreeDropContext) => void;
};

export const TREE_VIEW_CONTEXT = 'treeview';
