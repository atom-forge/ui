<script lang="ts">
	import {Button} from "$lib";

	let progress = $state(0);
	let isLoading = $state(false);

	function simulateProgress() {
		progress = 0;
		const interval = setInterval(() => {
			progress += 7;
			if (progress >= 100) {
				clearInterval(interval);
				setTimeout(() => { progress = 0; }, 800);
			}
		}, 150);
	}
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button label="Save" loading/>
	<Button label="Save" loading secondary/>
	<Button label="Save" loading outline/>
	<Button label="Uploading..." loading={progress} onclick={simulateProgress}/>
</div>
