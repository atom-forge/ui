<script lang="ts">
	import { AvatarGroup } from '$lib';

	const mixed = [
		{ name: 'Alice Johnson', src: 'https://i.pravatar.cc/150?img=1' },
		{ name: 'Bob Smith', src: 'https://i.pravatar.cc/150?img=2' },
		{ name: 'Carol White' },
		{ name: 'David Lee' },
		{ name: 'Eve Martinez', src: 'https://i.pravatar.cc/150?img=5' },
		{ name: 'Frank Brown' },
	];
</script>

<div class="flex flex-col gap-6">
	<div>
		<p class="text-xs text-muted-contrast mb-3">Mixed photos & initials (max 4)</p>
		<AvatarGroup avatars={mixed} max={4}/>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">All visible (max 10)</p>
		<AvatarGroup avatars={mixed} max={10} compact/>
	</div>
</div>
