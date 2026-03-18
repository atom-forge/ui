<script lang="ts">
	type Swatch = { bg: string; text: string; label: string; sublabel: string };
	type TokenRow = { name: string; swatches: Swatch[] };

	const tokens: TokenRow[] = [
		{ name: 'Surfaces', swatches: [
			{ bg: 'bg-canvas',      text: 'text-canvas-contrast',      label: 'bg',      sublabel: 'base' },
			{ bg: 'bg-surface', text: 'text-surface-contrast', label: 'surface', sublabel: 'cards' },
			{ bg: 'bg-muted',   text: 'text-muted-contrast',   label: 'muted',   sublabel: 'subtle' },
		]},
		{ name: 'Actions', swatches: [
			{ bg: 'bg-primary',   text: 'text-primary-contrast',   label: 'primary',   sublabel: 'inverse' },
			{ bg: 'bg-accent',    text: 'text-accent-contrast',    label: 'accent',    sublabel: 'brand' },
			{ bg: 'bg-secondary', text: 'text-secondary-contrast', label: 'secondary', sublabel: 'ghost' },
			{ bg: 'bg-error',     text: 'text-error-contrast',     label: 'error',     sublabel: 'danger' },
		]}
	];
</script>

<div class="flex flex-col gap-1.5">
	{#each tokens as token}
		<div class="flex items-stretch rounded-lg overflow-hidden border border-frame text-xs font-mono">
			<div class="bg-secondary text-muted-contrast w-24 shrink-0 flex items-center px-3 border-r border-frame">
				{token.name}
			</div>
			{#each token.swatches as swatch, i}
				<div class="{swatch.bg} {swatch.text} flex-1 min-w-0 px-3 py-2.5 {i > 0 ? 'border-l border-black/5 dark:border-white/5' : ''}">
					<div class="font-semibold">{swatch.label}</div>
					<div class="opacity-60 mt-0.5">{swatch.sublabel}</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
