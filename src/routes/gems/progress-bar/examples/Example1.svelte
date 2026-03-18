<script lang="ts">
	import { ProgressBar, Slider } from '$lib';

	let value = $state(40);
</script>

<div class="w-full space-y-4">
	<ProgressBar {value} />
	<Slider bind:value={value} />
</div>
