<script lang="ts">
	import BlockEditor2 from '../../lib/dev/block-editor-2/BlockEditor.svelte';

	const INITIAL_MARKDOWN = `# Heading 1 with **bold** and *italic*

## Heading 2

Normal paragraph with **bold**, *italic*, ~~strikethrough~~, __underline__, and \`inline code\`. Also a [link](https://example.com).

> Blockquote block. Supports *inline* **markup** too.

- Bullet list item
- Another item with \`code\`
- Third item **bold**

1. Ordered list item
2. Second item
3. Third item

- [ ] Unchecked todo item
- [x] Completed todo item

---

\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

Final paragraph after the code block.`;

	let markdown      = $state(INITIAL_MARKDOWN);
	let savedMarkdown = $state(INITIAL_MARKDOWN);
	let saveCount     = $state(0);

	function save()  { savedMarkdown = markdown; saveCount++; }
	function reset() { markdown = INITIAL_MARKDOWN; savedMarkdown = INITIAL_MARKDOWN; saveCount = 0; }
</script>

<div class="min-h-screen bg-canvas p-8">
	<div class="mx-auto max-w-3xl space-y-6">

		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-canvas-contrast">Block Editor v2 — Dev Sandbox</h1>
			<div class="flex gap-2">
				<button
					onclick={save}
					class="rounded bg-accent px-4 py-1.5 text-sm font-medium text-accent-contrast hover:bg-accent/90"
				>Save</button>
				<button
					onclick={reset}
					class="rounded border border-frame px-4 py-1.5 text-sm font-medium text-canvas-contrast hover:bg-surface-primary"
				>Reset</button>
			</div>
		</div>

		<p class="text-sm text-muted-contrast">
			EDITOR2-01 — Focus-to-Reveal architecture. Unfocused blocks show formatted preview; focused blocks reveal raw Markdown with muted markers.
		</p>

		<div class="rounded-lg border border-frame overflow-hidden">
			<p class="px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-contrast border-b border-frame bg-surface-primary">
				Editor
			</p>
			<BlockEditor2 bind:value={markdown} class="rounded-none border-none" />
		</div>

		<div class="rounded-lg border border-frame bg-surface-primary p-4">
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-contrast">
				Saved output (saves: {saveCount})
			</p>
			<pre class="whitespace-pre-wrap font-mono text-sm text-canvas-contrast">{savedMarkdown}</pre>
		</div>

	</div>
</div>
