import type {IconDefinition} from "../../../index";

export type TreeNode = {
	id: string;
	label?: string;
	icon?: IconDefinition;
	type?: string;
	children?: TreeNode[];
	data?: Record<string, any>;
};

export type TreeDropPosition = 'before' | 'inside' | 'after';

export type TreeDropDecision = boolean | {
	allowed: boolean;
	reason?: string;
};

export type TreeMove = {
	node: TreeNode;
	nodeId: string;
	previousParent: TreeNode | null;
	previousParentId: string | null;
	previousIndex: number;
	parent: TreeNode | null;
	parentId: string | null;
	index: number;
	position: TreeDropPosition;
};

export type TreeDropContext = TreeMove & {
	target: TreeNode | null;
	targetId: string | null;
	tree: TreeNode[];
};

export type TreeDndOptions = {
	/** Returns the kind used by `allowedChildren` for a node. */
	getNodeKind: (node: TreeNode) => string;
	/**
	 * Allowed direct children by parent kind. `true` accepts every kind, an
	 * array accepts only the listed kinds, and `false` accepts none. Omitted
	 * parent kinds accept none.
	 */
	allowedChildren: Record<string, true | false | string[]>;
	/** Maximum zero-based depth allowed in the tree. */
	maxDepth?: number;
	/** Optional application-level validation for a proposed move. */
	canDrop?: (context: TreeDropContext) => TreeDropDecision;
	/** Called after a valid drop. The component does not mutate `data`. */
	onMove: (move: TreeMove) => void;
};
