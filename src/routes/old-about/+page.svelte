<script lang='ts'>
    import {Grid, Paper, Code, Text, Space, Seo, Group} from '@svelteuidev/core';
    import {browser} from "$app/environment";
    import {Check} from "radix-icons-svelte";
    import DisappeableNotification from "$lib/ui/DisappeableNotification.svelte";

    const movePage = (pageName: string) => {
        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/' + pageName;
        }
    }
    let visible = false;
    //
    // setInterval(() => {
    //     visible = !visible;
    // }, 2000)
</script>

<main>
    <Seo
        title="Intro"
        titleTemplate="%t% | LuterGS"
    />

    <DisappeableNotification icon={Check} title="hi" visible={visible}  >omg23</DisappeableNotification>

</main>

<style>
    a {
        color: black;
    }
</style>