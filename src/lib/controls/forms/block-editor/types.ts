import type { Component } from 'svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Block {
	id: string;
	type: string;
	content: string;
	metadata: any;
}

/**
 * Plugin interface for non-text block types.
 * The core editor has no knowledge of specific types beyond `text` —
 * all other types are registered externally via this interface.
 *
 * Block content format in Markdown:
 *   block:<type>
 *   <plugin-specific payload>
 *
 * @example
 * const myPlugin: BlockPlugin = {
 *   type: 'my-type',
 *   parse: (raw) => {
 *     const [, ...lines] = raw.split('\n');
 *     return { value: lines.join('\n') };
 *   },
 *   serialize: (meta) => `block:my-type\n${meta.value}`,
 *   component: MyBlockComponent,
 * };
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BlockPlugin<M = any> {
	/** Matches the `block:<type>` prefix in the raw Markdown content string. */
	type: string;
	/** Extracts structured metadata from the raw block content string. */
	parse: (raw: string) => M;
	/** Serializes metadata back to a raw Markdown content string. */
	serialize: (metadata: M) => string;
	/**
	 * Svelte component rendered in-flow.
	 * Receives `metadata` and an `oncontent` callback as props.
	 * Call `oncontent(newRawContent)` to write updates back to the block.
	 */
	component: Component<{ metadata: M; oncontent: (content: string) => void }>;
}
