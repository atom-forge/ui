<script lang="ts">
	import {MultiSelect} from '$lib';

	const roles = [
		{ label: 'Admin', value: 'role_admin' },
		{ label: 'Editor', value: 'role_editor' },
		{ label: 'Viewer', value: 'role_viewer' },
		{ label: 'Moderator', value: 'role_mod' },
	];
</script>

<div class="flex flex-col gap-3 w-80">
	<MultiSelect options={roles} placeholder="Normal"/>
	<MultiSelect options={roles} compact placeholder="Compact"/>
	<MultiSelect options={roles} small placeholder="Small"/>
</div>
