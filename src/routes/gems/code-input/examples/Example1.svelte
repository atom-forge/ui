<script lang="ts">
	import {CodeInput, getToastManager} from '$lib';

	const toast = getToastManager();
	let otp = $state('');
</script>

<div class="flex flex-col gap-3">
	<CodeInput bind:value={otp} layout={6} characterSet="numeric" placeholder="·"
		onComplete={(v: string) => toast.show(`Code entered: ${v}`, {type: 'success'})}
	/>
	<p class="text-xs text-muted-contrast">Value: <strong>{otp || '—'}</strong></p>
</div>


