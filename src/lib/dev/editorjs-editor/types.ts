import type { OutputData, ToolConstructable, ToolSettings } from '@editorjs/editorjs';

export type { OutputData };

/** Record of extra or override tool definitions passed to EditorJS. */
export type EditorTools = Record<string, ToolConstructable | ToolSettings>;

export interface EditorJsEditorProps {
	/** Two-way bindable document data. Written by the editor on every change. */
	data?: OutputData;
	/** Placeholder text shown in an empty editor. */
	placeholder?: string;
	/** Toggle read-only mode. Reactive after mount. */
	readonly?: boolean;
	/** Additional or override tool definitions merged on top of the built-in set. */
	tools?: EditorTools;
	/** Extra CSS class(es) applied to the wrapper. */
	class?: string;
}
