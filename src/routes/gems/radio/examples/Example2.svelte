<script lang="ts">
	import { RadioGroup, RadioButton } from '$lib';

	let selectedSize = $state('normal');
</script>

<div class="space-y-4">
	<RadioGroup bind:value={selectedSize}>
		<RadioButton value="normal" label="Normal"/>
		<RadioButton value="compact" label="Compact" compact />
		<RadioButton value="small" label="Small" small />
	</RadioGroup>
</div>
