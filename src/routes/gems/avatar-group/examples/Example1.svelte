<script lang="ts">
	import { AvatarGroup } from '$lib';

	const team = [
		{ name: 'Alice Johnson' },
		{ name: 'Bob Smith' },
		{ name: 'Carol White' },
		{ name: 'David Lee' },
		{ name: 'Eve Martinez' },
		{ name: 'Frank Brown' },
		{ name: 'Grace Kim' },
	];
</script>

<div class="flex flex-col gap-6">
	<div>
		<p class="text-xs text-muted-contrast mb-3">Normal (max 4)</p>
		<AvatarGroup avatars={team} max={4}/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Compact (max 5)</p>
		<AvatarGroup avatars={team} max={5} compact/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Small (max 6)</p>
		<AvatarGroup avatars={team} max={6} small/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Micro (max 5, all fit)</p>
		<AvatarGroup avatars={team.slice(0, 5)} max={5} micro/>
	</div>
</div>
