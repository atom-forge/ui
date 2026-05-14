<script lang="ts">
	import {UI, createCheckboxGroupManager} from '../../../lib/ui/index.js';

	let cb1 = $state(false);
	let cb2 = $state(true);
	let cb3 = $state(false);
	createCheckboxGroupManager();
</script>

<div class="p-8 flex flex-col gap-10">

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Standalone</h2>
		<div class="flex flex-wrap gap-2">
			<UI.Checkbox label="Default" bind:value={cb1}/>
			<UI.Checkbox label="Primary" primary bind:value={cb1}/>
			<UI.Checkbox label="Accent" accent bind:value={cb1}/>
			<UI.Checkbox label="Disabled" disabled value={true}/>
		</div>
		<div class="flex flex-wrap gap-2 items-center">
			<UI.Checkbox label="Normal" bind:value={cb1}/>
			<UI.Checkbox label="Compact" compact bind:value={cb1}/>
			<UI.Checkbox label="Small" small bind:value={cb1}/>
		</div>
	</section>

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Group + master</h2>
		<UI.CheckboxGroupManager>
			<div class="flex flex-col gap-1">
				<UI.Checkbox group="items" label="Select All" master/>
				<hr class="border-frame my-1"/>
				<UI.Checkbox group="items" label="Option A" bind:value={cb1}/>
				<UI.Checkbox group="items" label="Option B" bind:value={cb2}/>
				<UI.Checkbox group="items" label="Option C" bind:value={cb3}/>
			</div>
		</UI.CheckboxGroupManager>
	</section>

</div>
