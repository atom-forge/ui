import type {IconDefinition} from "$lib";

export type TreeNode = {
	id: string;
	label?: string;
	icon?: IconDefinition;
	type?: string;
	children?: TreeNode[];
	data?: Record<string, any>;
};
