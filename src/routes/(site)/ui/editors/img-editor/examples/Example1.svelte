<script lang="ts">
	import { ImgEditor } from '@atom-forge/ui';

	const DEMO_IMAGES = [
		{ label: 'Landscape', src: 'https://picsum.photos/seed/landscape/1920/1080' },
		{ label: 'Portrait',  src: 'https://picsum.photos/seed/portrait/1080/1440'  },
		{ label: 'Square',    src: 'https://picsum.photos/seed/square/1200/1200'    },
		{ label: 'Wide',      src: 'https://picsum.photos/seed/wide/2560/800'       },
	];

	let selectedSrc = $state(DEMO_IMAGES[0].src);
</script>

<div class="space-y-3">
	<div class="flex items-center gap-2 flex-wrap">
		<span class="text-xs text-muted-contrast font-medium">Image:</span>
		{#each DEMO_IMAGES as img}
			<button
				class="px-2.5 py-1 rounded border text-xs transition-colors {selectedSrc === img.src ? 'bg-accent/10 text-accent border-accent/30' : 'border-frame text-muted-contrast hover:bg-secondary'}"
				onclick={() => selectedSrc = img.src}
			>{img.label}</button>
		{/each}
	</div>

	{#key selectedSrc}
		<ImgEditor src={selectedSrc} />
	{/key}
</div>
