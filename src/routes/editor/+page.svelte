<script lang="ts">
	// Dev sandbox for the block editor (src/lib/controls/forms/block-editor)
	// This page is updated after each phase to reflect new capabilities.
	// It is never exported from src/lib/index.ts.

	// ── Phase 0: scaffold ──────────────────────────────────────────────────────
	// BlockEditor component does not exist yet — created in Phase 1.
	// The load/save state and plugin list are pre-wired so Phase 1 can drop
	// the component in with minimal changes.

	const INITIAL_MARKDOWN = `# Hello Block Editor

This is a paragraph block. It supports **bold**, *italic*, and \`inline code\`.

> A blockquote block.

Another paragraph. Edit me.`;

	let markdown = $state(INITIAL_MARKDOWN);
	let savedMarkdown = $state(INITIAL_MARKDOWN);
	let saveCount = $state(0);

	function save() {
		savedMarkdown = markdown;
		saveCount++;
	}

	function reset() {
		markdown = INITIAL_MARKDOWN;
		savedMarkdown = INITIAL_MARKDOWN;
		saveCount = 0;
	}

	// Plugin stubs — registered at instantiation time once Phase 4 lands.
	// Each plugin will follow the BlockPlugin interface defined in Phase 4.
	const plugins: { type: string; label: string }[] = [
		{type: 'youtube', label: 'YouTube embed'},
		{type: 'gallery', label: 'Image gallery'},
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
			Phase 0 — Dev page scaffold. BlockEditor component drops in during Phase 1.
		</p>

		<!-- Editor placeholder (replaced with <BlockEditor> in Phase 1) -->
		<div class="rounded-lg border border-frame bg-surface-primary p-4">
			<p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-contrast">
				Editor (Phase 1 placeholder)
			</p>
			<textarea
				bind:value={markdown}
				class="w-full resize-y rounded border border-frame bg-canvas p-3 font-mono text-sm text-canvas-contrast focus:outline-none focus:ring-1 focus:ring-accent"
				rows={12}
			></textarea>
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
