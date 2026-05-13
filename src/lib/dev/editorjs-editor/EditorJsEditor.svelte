<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type EditorJS from '@editorjs/editorjs';
	import type { OutputData, ToolConstructable } from '@editorjs/editorjs';
	import type { EditorJsEditorProps } from './types.ts';

	let {
		data = $bindable<OutputData | undefined>(undefined),
		placeholder = 'Start writing…',
		readonly = false,
		tools: extraTools = {},
		class: classes,
	}: EditorJsEditorProps = $props();

	let holderEl = $state<HTMLDivElement | undefined>(undefined);
	let instance = $state<EditorJS | undefined>(undefined);

	/** Programmatically save and return the current document. */
	export async function save(): Promise<OutputData | undefined> {
		return instance?.save();
	}

	// ── Initialization ──────────────────────────────────────────────────────────

	$effect(() => {
		const holder = holderEl;
		if (!holder) return;

		let active = true;

		async function init() {
			const [
				{ default: EditorJSClass },
				{ default: DragDrop },
				{ default: Header },
				{ default: List },
				{ default: Quote },
				{ default: Code },
				{ default: Delimiter },
				{ default: Table },
			] = await Promise.all([
				import('@editorjs/editorjs'),
				import('editorjs-drag-drop'),
				import('@editorjs/header'),
				import('@editorjs/list'),
				import('@editorjs/quote'),
				import('@editorjs/code'),
				import('@editorjs/delimiter'),
				import('@editorjs/table'),
			]);

			if (!active) return;

			// EditorJS uses `export as namespace` which TypeScript doesn't resolve as
			// constructable from a dynamic import — cast is required.
			const editor = new (EditorJSClass as unknown as new (c: unknown) => EditorJS)({
				holder,
				data,
				placeholder,
				readOnly: readonly,
				onReady: () => {
					new DragDrop(editor);
				},
				tools: {
					header: {
						class: Header as unknown as ToolConstructable,
						config: { levels: [1, 2, 3, 4], defaultLevel: 2 },
					},
					list: {
						class: List as unknown as ToolConstructable,
						inlineToolbar: true,
						config: { defaultStyle: 'unordered' },
					},
					quote: {
						class: Quote as unknown as ToolConstructable,
						inlineToolbar: true,
					},
					code: { class: Code as unknown as ToolConstructable },
					delimiter: { class: Delimiter as unknown as ToolConstructable },
					table: {
						class: Table as unknown as ToolConstructable,
						inlineToolbar: true,
					},
					...extraTools,
				},
				onChange: async () => {
					data = await editor.save();
				},
			});

			await editor.isReady;
			if (active) instance = editor;
		}

		init();

		return () => {
			active = false;
			instance?.destroy();
			instance = undefined;
		};
	});

	// ── Reactive readonly sync ──────────────────────────────────────────────────

	$effect(() => {
		if (!instance) return;
		if (instance.readOnly.isEnabled !== readonly) {
			instance.readOnly.toggle();
		}
	});

	const wrapperCls = $derived(twMerge(
		'w-full rounded-control border border-frame bg-surface-primary',
		classes,
	));
</script>

<div class={wrapperCls}>
	<div bind:this={holderEl}></div>
</div>
