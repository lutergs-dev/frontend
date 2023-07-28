<script>
    import { pwaInfo } from "virtual:pwa-info";

    $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

{#await import('$lib/pwa/ReloadPrompt.svelte') then { default: ReloadPrompt}}
    <ReloadPrompt />
{/await}

<slot/>