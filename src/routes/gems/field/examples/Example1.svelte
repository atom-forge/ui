<script lang="ts">
	import { Field, Input, Switch } from '$lib';

	let email = $state('');
	let name = $state('');
	let agreed = $state(false);
</script>

<div class="flex flex-col gap-4 w-80">
	<Field label="Email address" hint="We'll never share your email." required>
		<Input bind:value={email} placeholder="you@example.com"/>
	</Field>

	<Field label="Full name" optional>
		<Input bind:value={name} placeholder="Alice Johnson"/>
	</Field>

	<Field label="Accept terms" error={!agreed ? 'You must accept the terms.' : undefined}>
		<Switch bind:value={agreed} label="I agree to the terms and conditions"/>
	</Field>
</div>

