<script lang="ts">
	import {UI} from '../../../lib/ui/index.js';
	import {Sun, Moon} from 'lucide-svelte';

	let sw1 = $state(false);
	let sw2 = $state(true);
	let sw3 = $state(false);
</script>

<div class="p-8 flex flex-col gap-10">

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Variants</h2>
		<div class="flex flex-wrap gap-4">
			<UI.Switch bind:value={sw1}/>
			<UI.Switch bind:value={sw2} label="Dark mode"/>
			<UI.Switch bind:value={sw3} label={{ on: 'Enabled', off: 'Disabled' }}/>
			<UI.Switch bind:value={sw1} icons={{ on: Moon, off: Sun }}/>
			<UI.Switch bind:value={sw1} disabled/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Sizes</h2>
		<div class="flex flex-wrap items-center gap-4">
			<UI.Switch bind:value={sw1}/>
			<UI.Switch bind:value={sw1} compact/>
			<UI.Switch bind:value={sw1} small/>
		</div>
	</section>

</div>
