<script lang="ts">
	import {Button} from "@atom-forge/ui";
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button>
		<img src="https://i.pravatar.cc/24?u=af" alt="Avatar" class="w-5 h-5 rounded-full"/>
		<span>John Doe</span>
	</Button>
	<Button secondary>
		<span class="text-lg leading-none">🚀</span>
		<span>Launch</span>
	</Button>
	<Button
		label="Gradient"
		class="bg-linear-to-r from-accent to-accent/80 border-transparent text-accent-contrast hover:brightness-110"
	/>
</div>
