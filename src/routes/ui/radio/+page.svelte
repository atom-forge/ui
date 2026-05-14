<script lang="ts">
	import {UI} from '../../../lib/ui/index.js';

	let role = $state('user');
</script>

<div class="p-8 flex flex-col gap-10">

	<section class="flex flex-col gap-3">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Variants & layouts</h2>
		<div class="flex flex-wrap gap-8">
			<UI.RadioGroup bind:value={role} class="flex flex-col gap-1">
				<UI.RadioButtonView value="admin" label="Admin"/>
				<UI.RadioButtonView value="user" label="User"/>
				<UI.RadioButtonView value="guest" label="Guest" disabled/>
			</UI.RadioGroup>
			<UI.RadioGroup bind:value={role} primary class="flex flex-row gap-4">
				<UI.RadioButtonView value="admin" label="Admin"/>
				<UI.RadioButtonView value="user" label="User"/>
				<UI.RadioButtonView value="guest" label="Guest"/>
			</UI.RadioGroup>
			<UI.RadioGroup bind:value={role} accent size="compact" class="flex flex-col gap-1">
				<UI.RadioButtonView value="admin" label="Admin"/>
				<UI.RadioButtonView value="user" label="User"/>
				<UI.RadioButtonView value="guest" label="Guest"/>
			</UI.RadioGroup>
		</div>
		<p class="text-xs text-muted-contrast">Selected: {role}</p>
	</section>

</div>
