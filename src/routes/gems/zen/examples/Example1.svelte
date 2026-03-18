<script lang="ts">
	import { Zen, Field, Textarea, Button } from '$lib';
	import { Maximize } from 'lucide-svelte';

	let text = $state('Start writing your masterpiece here...\n\nThe zen mode gives you a distraction-free environment to focus on your work.');
	let zenActive = $state(false);
</script>

<div class="flex flex-col gap-2 w-96">
	<Field label="Article">
		<Textarea bind:value={text} rows={4} showCounter/>
	</Field>
	<div class="flex justify-end">
		<Button compact ghost icon={Maximize} label="Zen mode" onclick={() => zenActive = true}/>
	</div>
</div>

<Zen bind:active={zenActive} title="Edit zen mode">
	<Textarea bind:value={text} rows={10} showCounter class="flex-1"/>
</Zen>
