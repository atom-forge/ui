<script lang="ts">
	import { Button, Icon, getToastManager, TreeView } from "$lib";
	import {Plus, Users} from "lucide-svelte";

	const toastManager = getToastManager();

	const userData = [
		{
			id: 'users-root',
			label: 'Users',
			icon: Users,
			children: [
				{
					id: 'user-1',
					label: 'Alice',
					type: 'user',
					data: { avatarUrl: 'https://i.pravatar.cc/24?u=alice' }
				},
				{
					id: 'user-2',
					label: 'Bob',
					type: 'user',
					data: { avatarUrl: 'https://i.pravatar.cc/24?u=bob' }
				},
				{
					id: 'user-3',
					label: 'Charlie',
					type: 'user',
					data: { avatarUrl: 'https://i.pravatar.cc/24?u=charlie' }
				},
			]
		}
	];
</script>

<TreeView data={userData}>
	{#snippet row(node)}
		<div class="flex items-center justify-between w-full pr-2">
			<div class="flex items-center gap-2 truncate">
				{#if node.type === 'user'}
					<img src={node.data?.avatarUrl} alt={node.label} class="w-6 h-6 rounded-full"/>
					<span class="truncate">{node.label}</span>
				{:else if node.icon}
					<Icon icon={node.icon}/>
					<span class="truncate">{node.label}</span>
				{:else}
					<span class="truncate">{node.label}</span>
				{/if}
			</div>
			{#if node.type === 'user'}
				<Button
					icon={Plus}
					ghost small pill borderless
					onclick={(e) => {
						e.stopPropagation();
						toastManager.show("Add action for " + node.label);
					}}
				/>
			{/if}
		</div>
	{/snippet}
</TreeView>
