<script lang="ts">
	import { Field, FieldGroup, FieldSpan, Input, Switch } from '$lib';

	let first = $state('');
	let last  = $state('');
	let bio   = $state('');
	let agreed = $state(false);
</script>

<FieldGroup labelWidth="120px">
	<Field label="First name" layout="horizontal" required>
		<Input bind:value={first} placeholder="Alice"/>
	</Field>

	<Field label="Last name" layout="horizontal">
		<Input bind:value={last} placeholder="Johnson"/>
	</Field>

	<Field label="Biography" layout="horizontal" hint="Tell us a bit about yourself.">
		<Input bind:value={bio} placeholder="I'm a developer..."/>
	</Field>

	<FieldSpan>
		<hr class="border-frame"/>
	</FieldSpan>

	<Field label="Agree to terms" layout="horizontal">
		<Switch bind:value={agreed} label="I accept the terms and conditions"/>
	</Field>
</FieldGroup>

