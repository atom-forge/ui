<script lang="ts">
	import {CodeInput} from '@atom-forge/ui';

	let sms = $state('');
</script>

<div class="flex flex-col gap-3">
	<CodeInput
		bind:value={sms}
		layout={[3, 3, 3]}
		separator="-"
		characterSet="numeric"
		prefix="ABC"
		placeholder="·"
	/>
	<p class="text-xs text-muted-contrast">
		Editable value: <strong>{sms || '—'}</strong>
		&nbsp;·&nbsp;
		Full code: <strong>{sms ? `ABC-${sms.slice(0, 3)}-${sms.slice(3)}` : '—'}</strong>
	</p>
</div>

