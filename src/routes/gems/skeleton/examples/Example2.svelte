<script lang="ts">
	import {Card, Skeleton} from '$lib';
	import {Image} from 'lucide-svelte';
</script>

<!-- Card skeleton -->
<div class="w-72">
	<Card class="p-0 overflow-hidden">
		<Skeleton rect icon={Image} class="w-full h-40"/>
		<div class="p-4 flex flex-col gap-3">
			<div class="flex items-center gap-3">
				<Skeleton circle class="w-8 h-8 shrink-0"/>
				<Skeleton length={[70]} class="flex-1"/>
			</div>
			<Skeleton length={[100, 100, 60]}/>
		</div>
	</Card>
</div>

