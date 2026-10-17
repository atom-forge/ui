<script lang="ts">
	import { Checkbox, CheckboxView } from '@atom-forge/ui';

	let checked = $state(false);
	let lastChange = $state('No change yet');
	let status = $state<'checked' | 'some' | 'unchecked'>('some');

	function cycle() {
		status = status === 'unchecked' ? 'some' : status === 'some' ? 'checked' : 'unchecked';
	}
</script>

<div class="flex flex-col gap-3">
	<Checkbox bind:checked label="Checked alias" onchange={(next) => lastChange = String(next)}/>
	<p class="text-xs text-muted-contrast">Last onchange: {lastChange}</p>
	<CheckboxView {status} label="Controlled view — click to cycle" onclick={cycle}/>
	<p class="text-xs text-muted-contrast">Status: {status}</p>
</div>
