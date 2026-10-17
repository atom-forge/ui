<script lang="ts">
	import App from '../../site/App.svelte';
	import type {ChildrenProp} from '../../lib/helpers/types';

	let {children}: ChildrenProp = $props();

	const title = 'AtomForge UI — Components, live';
	const description = 'Live examples of every AtomForge UI component: forms, data, overlays, editors, scheduling and complete showcase applications.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}/>
	<meta property="og:title" content={title}/>
	<meta property="og:description" content={description}/>
	<meta property="og:type" content="website"/>
</svelte:head>

<App>
	{@render children()}
</App>
