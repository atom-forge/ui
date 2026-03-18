<script lang="ts">
	import { Avatar } from '$lib';
</script>

<div class="flex flex-col gap-6">
	<div>
		<p class="text-xs text-muted-contrast mb-3">Normal</p>
		<div class="flex gap-3 items-center">
			<Avatar name="Alice Johnson"/>
			<Avatar name="Bob Smith"/>
			<Avatar name="Carol White"/>
			<Avatar name="David Lee"/>
			<Avatar name="Eve Martinez"/>
		</div>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Compact</p>
		<div class="flex gap-2 items-center">
			<Avatar name="Alice Johnson" compact/>
			<Avatar name="Bob Smith" compact/>
			<Avatar name="Carol White" compact/>
			<Avatar name="David Lee" compact/>
		</div>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Small</p>
		<div class="flex gap-2 items-center">
			<Avatar name="Alice Johnson" small/>
			<Avatar name="Bob Smith" small/>
			<Avatar name="Carol White" small/>
			<Avatar name="David Lee" small/>
		</div>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Micro</p>
		<div class="flex gap-1.5 items-center">
			<Avatar name="Alice Johnson" micro/>
			<Avatar name="Bob Smith" micro/>
			<Avatar name="Carol White" micro/>
			<Avatar name="David Lee" micro/>
		</div>
	</div>
</div>
