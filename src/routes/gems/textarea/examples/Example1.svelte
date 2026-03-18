<script lang="ts">
	import { Field, Textarea } from '$lib';

	let message = $state('');
	let bio = $state('');
</script>

<div class="flex flex-col gap-4 w-96">
	<Field label="Message" hint="Tell us what's on your mind.">
		<Textarea bind:value={message} placeholder="Write something..." rows={3}/>
	</Field>

	<Field label="Biography" optional>
		<Textarea bind:value={bio} placeholder="I'm a developer..." rows={4} maxRows={8} showCounter maxLength={200}/>
	</Field>
</div>

