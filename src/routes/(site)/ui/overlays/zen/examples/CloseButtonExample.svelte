<script lang="ts">
	import { Button, Card, Zen } from '@atom-forge/ui';
	let active = $state(false);
</script>

<Button label="Open explicit-close focus mode" onclick={() => active = true} />
<Zen bind:active closeOnEsc={false} closeOnBackdrop={false}
	title="Close using the control above" backdropClass="bg-canvas/95" zenClass="px-4">
	{#snippet closeButton({ close })}
		<Button label="Exit focus mode" onclick={close} />
	{/snippet}
	<Card class="p-6">
		<p>Escape and backdrop dismissal are disabled. The custom close control still works.</p>
	</Card>
</Zen>
