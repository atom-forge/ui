<script lang="ts">
	import {CodeInput} from '$lib';

	let a = $state('');
	let b = $state('');
	let c = $state('');
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-1">
		<p class="text-xs text-muted-contrast">Normal</p>
		<CodeInput bind:value={a} layout={4} characterSet="numeric" placeholder="·"/>
	</div>
	<div class="flex flex-col gap-1">
		<p class="text-xs text-muted-contrast">Compact</p>
		<CodeInput bind:value={b} layout={4} characterSet="numeric" placeholder="·" compact/>
	</div>
	<div class="flex flex-col gap-1">
		<p class="text-xs text-muted-contrast">Small</p>
		<CodeInput bind:value={c} layout={4} characterSet="numeric" placeholder="·" small/>
	</div>
</div>

