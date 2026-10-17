<script lang="ts">
	import { EmptyState, defineIcon } from '@atom-forge/ui';
	import { Inbox, Search, FolderOpen } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-8 divide-y divide-frame">
	<EmptyState icon={defineIcon(Inbox)} title="No messages" description="When you receive messages, they'll appear here."/>
	<EmptyState icon={defineIcon(Search)} title="No results" description="Try adjusting your search or filters to find what you're looking for." class="pt-8"/>
	<EmptyState icon={defineIcon(FolderOpen)} title="Folder is empty" class="pt-8"/>
</div>
