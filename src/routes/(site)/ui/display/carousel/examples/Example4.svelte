<script lang="ts">
	import { Carousel, CarouselIndicator, Switch } from '@atom-forge/ui';

	const slides = ['Explore components', 'Compose your interface', 'Customize the theme'];
	let currentIndex = $state(0);
	let automatic = $state(false);
</script>

<div class="space-y-3">
	<Switch bind:value={automatic} label="Advance every 3 seconds"/>
	<Carousel items={slides} bind:currentIndex showcase={automatic ? 3 : undefined}>
		{#snippet children({ item })}
			<div class="h-40 flex items-center justify-center bg-secondary rounded-surface text-secondary-contrast">{item}</div>
		{/snippet}
	</Carousel>
	<CarouselIndicator total={slides.length} bind:currentIndex/>
</div>
