<script lang="ts">
	import { ImgEditor } from '@atom-forge/ui';

	let enableOrientation = $state(true);
	let enableLeveling    = $state(true);
	let enableCropping    = $state(true);
	let enableFocus       = $state(true);
</script>

<div class="space-y-3">
	<div class="flex items-center gap-4 flex-wrap text-xs">
		{#each [
			{ label: 'orientation', bind: () => enableOrientation, toggle: () => enableOrientation = !enableOrientation },
			{ label: 'leveling',    bind: () => enableLeveling,    toggle: () => enableLeveling    = !enableLeveling    },
			{ label: 'cropping',    bind: () => enableCropping,    toggle: () => enableCropping    = !enableCropping    },
			{ label: 'focus',       bind: () => enableFocus,       toggle: () => enableFocus       = !enableFocus       },
		] as f}
			<label class="flex items-center gap-1.5 cursor-pointer select-none text-muted-contrast">
				<input type="checkbox" checked={f.bind()} onchange={f.toggle} class="accent-accent" />
				<code class="text-accent">{f.label}</code>
			</label>
		{/each}
	</div>

	{#key `${enableOrientation}-${enableLeveling}-${enableCropping}-${enableFocus}`}
		<ImgEditor
			src="https://picsum.photos/seed/landscape/1920/1080"
			orientation={enableOrientation}
			leveling={enableLeveling}
			cropping={enableCropping}
			focus={enableFocus}
		/>
	{/key}
</div>
