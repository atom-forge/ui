<script lang="ts">
	import {CodeInput} from '$lib';

	let license = $state('');
</script>

<div class="flex flex-col gap-3">
	<CodeInput
		bind:value={license}
		layout={[4, 4, 4, 4]}
		separator="-"
		characterSet="alphanumeric"
		uppercase
		placeholder="·"
	/>
	<p class="text-xs text-muted-contrast">Value: <strong>{license || '—'}</strong></p>
</div>

