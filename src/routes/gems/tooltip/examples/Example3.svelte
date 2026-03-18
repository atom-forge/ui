<script lang="ts">
	import { Tooltip, Button } from "$lib";
	import { Star, User } from "lucide-svelte";
</script>

<div class="flex gap-3 items-center flex-wrap">
	<Tooltip delay={0}>
		{#snippet content()}
			<div class="flex flex-col gap-1">
				<p class="font-semibold">Alice Johnson</p>
				<p class="text-muted-contrast">alice@example.com</p>
			</div>
		{/snippet}
		<Button label="Rich content" icon={User}/>
	</Tooltip>
	<Tooltip inverted delay={0}>
		{#snippet content()}
			<div class="flex items-center gap-1.5">
				<Star size={12}/>
				<span>4.9 / 5.0</span>
			</div>
		{/snippet}
		<Button label="Inverted rich" ghost/>
	</Tooltip>
</div>

