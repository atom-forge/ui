/**
 * All supported block type identifiers.
 */
export type BlockType =
	| 'paragraph'
	| 'heading'
	| 'bullet-list'
	| 'ordered-list'
	| 'todo-list'
	| 'quote'
	| 'code'
	| 'divider';

/**
 * A single content block in the editor.
 */
export interface Block {
	id: string;
	type: BlockType;
	content: string;
	/** True when this block is in edit mode (contenteditable). */
	focused: boolean;
}
