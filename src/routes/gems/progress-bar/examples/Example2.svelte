<script lang="ts">
	import { ProgressBar } from '$lib';
</script>

<div class="w-full space-y-4">
	<ProgressBar value={70} max={100} />
	<ProgressBar value={50} max={100} compact />
	<ProgressBar value={30} max={100} small />
</div>
