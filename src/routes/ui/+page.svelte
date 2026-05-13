<script lang="ts">
	import {UI} from '../../lib/ui/index.js';
	import {Plus, ArrowRight, Trash, Save} from 'lucide-svelte';

	let progress = $state<number | false>(false);

	function simulateUpload() {
		if (progress !== false) return;
		progress = 0;
		const interval = setInterval(() => {
			if (progress === false) return clearInterval(interval);
			progress += Math.random() * 12 + 3;
			if (progress >= 100) {
				progress = 100;
				clearInterval(interval);
				setTimeout(() => progress = false, 600);
			}
		}, 200);
	}
</script>

<div class="p-8 flex flex-col gap-10">

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Variants</h2>
		<div class="flex flex-wrap gap-2">
			<UI.Button label="Primary"/>
			<UI.Button label="Secondary" secondary/>
			<UI.Button label="Destructive" destructive/>
			<UI.Button label="Ghost" ghost/>
			<UI.Button label="Link" link/>
			<UI.Button label="Muted" muted/>
			<UI.Button label="Accent" accent/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Outline</h2>
		<div class="flex flex-wrap gap-2">
			<UI.Button label="Primary" outline/>
			<UI.Button label="Secondary" secondary outline/>
			<UI.Button label="Destructive" destructive outline/>
			<UI.Button label="Muted" muted outline/>
			<UI.Button label="Accent" accent outline/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Sizes</h2>
		<div class="flex flex-wrap items-center gap-2">
			<UI.Button label="Normal"/>
			<UI.Button label="Compact" compact/>
			<UI.Button label="Small" small/>
			<UI.Button label="Micro" micro/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Icons</h2>
		<div class="flex flex-wrap items-center gap-2">
			<UI.Button icon={Plus} label="Add item"/>
			<UI.Button label="Next" endIcon={ArrowRight}/>
			<UI.Button icon={Trash} destructive/>
			<UI.Button icon={Trash} destructive compact/>
			<UI.Button icon={Save} outline/>
			<UI.Button icon={Plus} label="Add" endIcon={ArrowRight} secondary/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Loading</h2>
		<div class="flex flex-wrap items-center gap-2">
			<UI.Button label="Saving..." loading/>
			<UI.Button label="Saving..." loading secondary/>
			<UI.Button label="Saving..." loading outline/>
			<UI.Button label="Upload" loading={progress !== false && progress} onclick={simulateUpload}/>
			<UI.Button label="Upload" loading={progress !== false && progress} onclick={simulateUpload} secondary/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Disabled</h2>
		<div class="flex flex-wrap gap-2">
			<UI.Button label="Primary" disabled/>
			<UI.Button label="Outline" outline disabled/>
			<UI.Button label="Ghost" ghost disabled/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Modifiers</h2>
		<div class="flex flex-wrap items-center gap-2">
			<UI.Button label="Pill" pill/>
			<UI.Button label="Pill Outline" outline pill/>
			<UI.Button icon={Plus} pill/>
			<UI.Button label="Borderless" endIcon={ArrowRight} borderless/>
		</div>
		<div class="w-64">
			<UI.Button label="Full width" grow/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Custom content</h2>
		<div class="flex flex-wrap gap-2">
			<UI.Button>
				<span class="flex items-center gap-2">
					<span class="w-4 h-4 rounded-full bg-accent"></span>
					Custom slot
				</span>
			</UI.Button>
		</div>
	</section>

</div>
