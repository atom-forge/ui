<script lang="ts">
    import { createModalManager, createDrawerManager, createPopupManager, createToastManager } from '@atom-forge/ui';
    import type { Component } from 'svelte';

    let { Page }: { Page: Component } = $props();
    createModalManager();
    createDrawerManager();
    createPopupManager();
    createToastManager();
</script>

<Page />
