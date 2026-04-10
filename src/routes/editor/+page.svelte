<script lang="ts">
	// Dev sandbox for the block editor (src/lib/controls/forms/block-editor)
	// Updated each phase to reflect new capabilities.
	import BlockEditor from '../../lib/controls/forms/block-editor/BlockEditor.svelte';

	// ── Phase 1: core block structure ──────────────────────────────────────────

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

Another plain paragraph after the code block.`;

	let markdown    = $state(INITIAL_MARKDOWN);
	let savedMarkdown = $state(INITIAL_MARKDOWN);
	let saveCount   = $state(0);

	function save() {
		savedMarkdown = markdown;
		saveCount++;
	}

	function reset() {
		markdown      = INITIAL_MARKDOWN;
		savedMarkdown = INITIAL_MARKDOWN;
		saveCount     = 0;
	}

	// Plugin stubs — registered at instantiation time once Phase 4 lands.
	const plugins: { type: string; label: string }[] = [
		{ type: 'youtube', label: 'YouTube embed' },
		{ type: 'gallery', label: 'Image gallery' },
	];
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
			Phase 3 — Block navigation. <kbd class="rounded border border-frame px-1 font-mono text-xs">Enter</kbd> = soft line break; <kbd class="rounded border border-frame px-1 font-mono text-xs">Enter Enter</kbd> = new block. <kbd class="rounded border border-frame px-1 font-mono text-xs">↑</kbd> / <kbd class="rounded border border-frame px-1 font-mono text-xs">↓</kbd> moves between blocks preserving horizontal position.
		</p>

		<!-- Editor -->
		<div class="rounded-lg border border-frame overflow-hidden">
			<p class="px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-contrast border-b border-frame bg-surface-primary">
				Editor
			</p>
			<BlockEditor bind:value={markdown} class="rounded-none border-none" />
		</div>

		<!-- Save round-trip output -->
		<div class="rounded-lg border border-frame bg-surface-primary p-4">
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-contrast">
				Saved output (saves: {saveCount})
			</p>
			<pre class="whitespace-pre-wrap font-mono text-sm text-canvas-contrast">{savedMarkdown}</pre>
		</div>

		<!-- Registered plugins -->
		<div class="rounded-lg border border-frame bg-surface-primary p-4">
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-contrast">
				Registered plugins (Phase 4)
			</p>
			<ul class="space-y-1">
				{#each plugins as plugin}
					<li class="text-sm text-canvas-contrast">
						<span class="font-mono text-accent">{plugin.type}</span>
						— {plugin.label}
					</li>
				{/each}
			</ul>
		</div>

	</div>
</div>
