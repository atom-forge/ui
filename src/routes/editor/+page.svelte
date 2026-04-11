<script lang="ts">
	// Dev sandbox for the block editor (src/lib/controls/forms/block-editor)
	// Updated each phase to reflect new capabilities.
	import BlockEditor from '../../lib/controls/forms/block-editor/BlockEditor.svelte';
	import { youtubePlugin } from '../../lib/controls/forms/block-editor/plugins/youtube/index.ts';
	import { galleryPlugin } from '../../lib/controls/forms/block-editor/plugins/gallery/index.ts';

	// ── Phase 1–3: core block structure, syntax highlighting, navigation ──────

	const INITIAL_MARKDOWN = `# Heading 1

## Heading 2 with **bold** and *italic*

### Heading 3

Normal paragraph with **bold**, *italic*, ~~strikethrough~~, __underline__, and \`inline code\`. Also a [link](https://example.com).

> Blockquote block. Supports *inline* **markup** too.

- Unordered list item
- Another item with \`code\`
- Third item **bold**

1. Ordered list item
2. Second item
3. Third item

---

| Name | Type | Default |
|------|------|---------|
| value | string | \`""\` |
| class | string | — |

\`\`\`typescript
function add(a: number, b: number): number {
  const result = a + b;
  return result;
}
\`\`\`

Another plain paragraph after the code block.

block:youtube
https://www.youtube.com/watch?v=dQw4w9WgXcQ

A paragraph between plugin blocks.

block:gallery
https://picsum.photos/seed/alpha/400/300
https://picsum.photos/seed/beta/400/300
https://picsum.photos/seed/gamma/400/300

Final paragraph after the gallery.`;

	let markdown    = $state(INITIAL_MARKDOWN);
	let savedMarkdown = $state(INITIAL_MARKDOWN);
	let saveCount   = $state(0);

	// ── Phase 4: plugin system ────────────────────────────────────────────────
	const plugins = [youtubePlugin, galleryPlugin];

	function save() {
		savedMarkdown = markdown;
		saveCount++;
	}

	function reset() {
		markdown      = INITIAL_MARKDOWN;
		savedMarkdown = INITIAL_MARKDOWN;
		saveCount     = 0;
	}
</script>

<div class="min-h-screen bg-canvas p-8">
	<div class="mx-auto max-w-3xl space-y-6">

		<!-- Header -->
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-canvas-contrast">Block Editor — Dev Sandbox</h1>
			<div class="flex gap-2">
				<button
					onclick={save}
					class="rounded bg-accent px-4 py-1.5 text-sm font-medium text-accent-contrast hover:bg-accent/90"
				>
					Save
				</button>
				<button
					onclick={reset}
					class="rounded border border-frame px-4 py-1.5 text-sm font-medium text-canvas-contrast hover:bg-surface-primary"
				>
					Reset
				</button>
			</div>
		</div>

		<!-- Phase badge -->
		<p class="text-sm text-muted-contrast">
			Phase 4 — Plugin system. <kbd class="rounded border border-frame px-1 font-mono text-xs">youtube</kbd> and <kbd class="rounded border border-frame px-1 font-mono text-xs">gallery</kbd> plugins are registered. Plugin blocks render inline within the text flow using the <kbd class="rounded border border-frame px-1 font-mono text-xs">block:&lt;type&gt;</kbd> prefix.
		</p>

		<!-- Registered plugins -->
		<div class="rounded-lg border border-frame bg-surface-primary p-4">
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-contrast">
				Registered plugins
			</p>
			<ul class="space-y-1">
				{#each plugins as plugin}
					<li class="text-sm text-canvas-contrast">
						<span class="font-mono text-accent">{plugin.type}</span>
						— use <span class="font-mono text-muted-contrast">block:{plugin.type}</span> as the first line of a block
					</li>
				{/each}
			</ul>
		</div>

		<!-- Editor -->
		<div class="rounded-lg border border-frame overflow-hidden">
			<p class="px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-contrast border-b border-frame bg-surface-primary">
				Editor
			</p>
			<BlockEditor bind:value={markdown} {plugins} class="rounded-none border-none" />
		</div>

		<!-- Save round-trip output -->
		<div class="rounded-lg border border-frame bg-surface-primary p-4">
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-contrast">
				Saved output (saves: {saveCount})
			</p>
			<pre class="whitespace-pre-wrap font-mono text-sm text-canvas-contrast">{savedMarkdown}</pre>
		</div>

	</div>
</div>
