<script lang="ts">
	import { RadioButton, RadioGroup } from '$lib';

	let valueDefault = $state('b');
	let valuePrimary = $state('b');
	let valueAccent  = $state('b');
</script>

<div class="flex flex-row gap-8">
	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-contrast">Default</p>
		<RadioGroup bind:value={valueDefault} class="flex flex-col gap-0">
			<RadioButton value="a" label="Option A" />
			<RadioButton value="b" label="Option B" />
			<RadioButton value="c" label="Option C" />
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-contrast">Primary</p>
		<RadioGroup bind:value={valuePrimary} primary class="flex flex-col gap-0">
			<RadioButton value="a" label="Option A" />
			<RadioButton value="b" label="Option B" />
			<RadioButton value="c" label="Option C" />
		</RadioGroup>
	</div>

	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-contrast">Accent</p>
		<RadioGroup bind:value={valueAccent} accent class="flex flex-col gap-0">
			<RadioButton value="a" label="Option A" />
			<RadioButton value="b" label="Option B" />
			<RadioButton value="c" label="Option C" />
		</RadioGroup>
	</div>
</div>
