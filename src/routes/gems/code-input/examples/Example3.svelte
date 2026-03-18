<script lang="ts">
	import {CodeInput} from '$lib';

	let hex = $state('');
	const isHex = (char: string) => /^[0-9a-fA-F]$/.test(char);
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-center gap-3">
		<CodeInput bind:value={hex} layout={6} characterSet={isHex} uppercase placeholder="0"/>
		{#if hex.length === 6}
			<div class="w-8 h-8 rounded-md border border-frame shrink-0" style="background: #{hex}"></div>
		{/if}
	</div>
	<p class="text-xs text-muted-contrast">Hex: <strong>#{hex || '------'}</strong></p>
</div>

