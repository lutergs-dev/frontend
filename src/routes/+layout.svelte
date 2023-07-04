<script>
    import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<SvelteUIProvider withGlobalStyles themeObserver={"light"}>
    <slot />
</SvelteUIProvider>