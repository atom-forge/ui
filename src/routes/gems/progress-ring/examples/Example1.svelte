<script lang="ts">
	import { ProgressRing } from '$lib';
</script>

<div class="flex flex-wrap gap-8 items-center">
	<ProgressRing value={0} />
	<ProgressRing value={25} />
	<ProgressRing value={65} />
	<ProgressRing value={100} />
</div>
