<script lang="ts">
	import {Skeleton} from '$lib';

	let animated = $state(true);
</script>

<div class="flex flex-col gap-4 w-80">
	<label class="flex items-center gap-2 text-sm text-canvas-contrast cursor-pointer">
		<input type="checkbox" bind:checked={animated}/>
		Animated
	</label>
	<div class="flex items-center gap-3">
		<Skeleton circle {animated} class="w-12 h-12 shrink-0"/>
		<Skeleton length={[80, 50]} {animated} class="flex-1"/>
	</div>
</div>

