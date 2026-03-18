<script lang="ts">
	import {CodeInput} from '$lib';

	let sms = $state('');
</script>

<div class="flex flex-col gap-3">
	<CodeInput
		bind:value={sms}
		layout={[3, 3]}
		separator="-"
		characterSet="numeric"
		prefix="ABC"
		placeholder="·"
	/>
	<p class="text-xs text-muted-contrast">
		Editable value: <strong>{sms || '—'}</strong>
		&nbsp;·&nbsp;
		Full code: <strong>{sms ? `ABC-${sms}` : '—'}</strong>
	</p>
</div>

