<script lang="ts">
	import {Button, Card} from '$lib';
	import {language} from '../language.svelte';
	import {Languages, ThumbsDown, ThumbsUp} from "lucide-svelte";
	import {onMount} from 'svelte';

	let {googleAnalyticsId = '', policyUrl = '/privacy-policy'}: { googleAnalyticsId?: string; policyUrl?: string } = $props();

	let isVisible = $state(false);

	const translations = {
		hu: {
			title: 'Sütiket használunk 🍪',
			message: 'A működéshez szükséges sütiken felül Google Analytics-et is használunk. Részletek az ',
			policyLinkText: 'Adatkezelési Tájékoztatóban',
			declineButton: 'Elutasítom',
			acceptButton: 'Rendben',
			langSwitchLabel: 'English'
		},
		en: {
			title: 'We use cookies 🍪',
			message: 'In addition to essential cookies, we also use Google Analytics. Details in the ',
			policyLinkText: 'Privacy Policy',
			declineButton: 'Decline',
			acceptButton: 'Accept',
			langSwitchLabel: 'Magyar'
		}
	};

	// Ezzel a függvénnyel bárhonnan (pl. footerből) újranyitható a beállítás
	export function openSettings() {
		isVisible = true;
	}

	onMount(() => {
		const savedConsent = localStorage.getItem('cookie-consent');
		if (savedConsent === 'granted') loadGoogleAnalytics();
		else if (savedConsent === null) isVisible = true;
	});

	function loadGoogleAnalytics() {
		const w = window as any;
		if (w.dataLayer) return;
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
		script.async = true;
		document.head.appendChild(script);

		w.dataLayer = w.dataLayer || [];
		function gtag(...args: any[]) { w.dataLayer.push(args); }
		gtag('js', new Date());
		gtag('config', googleAnalyticsId);
	}

	function handleConsent(status: 'granted' | 'denied') {
		localStorage.setItem('cookie-consent', status);
		if (status === 'granted') loadGoogleAnalytics();
		isVisible = false;
	}
</script>

{#if isVisible}
	<Card elevate="6" class="fixed bottom-0 left-0 right-0 z-50 m-2 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
		<Button
			label={translations[language.current].langSwitchLabel}
			icon={Languages}
			ghost
			onclick={() => language.toggle()}
		/>
		<div class="text-sm text-canvas-contrast grow">
			<p class="font-bold">{translations[language.current].title}</p>
			<p>
				{translations[language.current].message}
				<a href={policyUrl} class="underline text-accent">{translations[language.current].policyLinkText}</a>.
			</p>
		</div>

		<div class="flex gap-2 shrink-0">
			<Button
				icon={ThumbsDown}
				label={translations[language.current].declineButton}
				secondary
				onclick={() => handleConsent('denied')}
			/>
			<Button
				icon={ThumbsUp}
				label={translations[language.current].acceptButton}
				onclick={() => handleConsent('granted')}
			/>
		</div>
	</Card>
{/if}