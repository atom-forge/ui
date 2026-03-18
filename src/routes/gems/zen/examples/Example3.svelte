<script lang="ts">
	import {Zen, Field, FieldGroup, FieldSpan, Input, Textarea, Button, Card} from '$lib';
	import {Maximize} from 'lucide-svelte';

	let active = $state(false);
	let name = $state('');
	let email = $state('');
	let message = $state('');
</script>

<Button icon={Maximize} label="Write a message" onclick={() => active = true}/>

<Zen bind:active title="New Message">
	<Card>

		<FieldGroup labelWidth="100px" class="w-full">
			<Field label="Name" layout="horizontal">
				<Input bind:value={name} placeholder="Alice Johnson"/>
			</Field>
			<Field label="Email" layout="horizontal" required>
				<Input bind:value={email} placeholder="you@example.com"/>
			</Field>
			<Field label="Message" layout="horizontal">
				<Textarea bind:value={message} rows={8} showCounter maxLength={500} class="flex-1"/>
			</Field>
			<FieldSpan class="flex justify-end gap-2">
				<Button label="Cancel" ghost onclick={() => active = false}/>
				<Button label="Send" onclick={() => active = false}/>
			</FieldSpan>
		</FieldGroup>
	</Card>
</Zen>
