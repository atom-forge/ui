<script lang="ts">
	import { EmptyState, Button, defineIcon, getToastManager } from '$lib';
	import { FilePlus, UserPlus } from 'lucide-svelte';

	const toast = getToastManager();
</script>

<div class="flex flex-col gap-8 divide-y divide-base-b">
	<EmptyState
		icon={defineIcon(FilePlus)}
		title="No documents yet"
		description="Create your first document to get started."
	>
		<Button accent icon={defineIcon(FilePlus)} label="New Document" onclick={() => toast.show('Creating document...')}/>
	</EmptyState>

	<EmptyState
		icon={defineIcon(UserPlus)}
		title="No team members"
		description="Invite people to collaborate on this project."
		class="pt-8"
	>
		<Button secondary icon={defineIcon(UserPlus)} label="Invite Member" onclick={() => toast.show('Opening invite dialog...')}/>
	</EmptyState>
</div>
