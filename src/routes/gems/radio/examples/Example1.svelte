<script lang="ts">
	import {RadioButton, RadioGroup} from '$lib';

	let selectedTheme = $state('light');
</script>
<div class="flex flex-row gap-4">

	<div class="flex flex-col gap-4">
		<p class="text-sm">Selected: {selectedTheme}</p>
		<RadioGroup bind:value={selectedTheme} class="flex flex-col gap-0">
			<RadioButton value="light" label="Light Mode"/>
			<RadioButton value="dark" label="Dark Mode"/>
			<RadioButton value="system" label="System Default"/>
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-4">
		<p class="text-sm">Selected: {selectedTheme}</p>
		<RadioGroup bind:value={selectedTheme} class="flex flex-col gap-0">
			<RadioButton value="light" label="Light Mode" disabled/>
			<RadioButton value="dark" label="Dark Mode" disabled/>
			<RadioButton value="system" label="System Default" disabled/>
		</RadioGroup>
	</div>
</div>
