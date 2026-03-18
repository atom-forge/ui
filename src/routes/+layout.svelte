<script lang="ts">
  import "./layout.css";
  import { afterNavigate } from "$app/navigation";
  import { Root } from "$lib";
  import favicon from "../assets/favicon.svg";
  import CookieConsent from "../components/CookieConsent.svelte";
  import Header from "../components/Header.svelte";
  import KeyboardHandler from "./KeyboardHandler.svelte";
  import NavMenu from "../components/NavMenu.svelte";

  let { children } = $props();

  let mainEl = $state<HTMLElement | undefined>();

  afterNavigate(() => {
    mainEl?.scrollTo({ top: 0 });
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href={favicon} />
</svelte:head>

<Root>
  <KeyboardHandler />
  <div class="flex flex-col w-screen h-dvh bg-canvas text-canvas-contrast">
    <Header />
    <div class="flex flex-row grow overflow-hidden">
      <nav
        class="hidden md:flex flex-col w-64 border-r border-frame bg-surface shrink-0 overflow-y-auto"
      >
        <NavMenu />
      </nav>
      <main bind:this={mainEl} class="overflow-y-auto grow">
        <div class="space-y-8 min-h-full max-w-5xl mx-auto py-10 px-4">
          {@render children()}
        </div>
      </main>
    </div>
  </div>

  <CookieConsent />
</Root>
