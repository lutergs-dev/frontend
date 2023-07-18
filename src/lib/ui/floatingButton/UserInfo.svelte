<script>
    import {Status, userStore} from "$lib/auth/Auth.ts";
    import {Group, Paper, Text} from "@svelteuidev/core";
    import ClickablePaper from "$lib/ui/ClickablePaper.svelte";
    import {fly} from "svelte/transition";

    const userInfoCss = {
        // position: "fixed",
        backgroundColor: "#f5f5f5",
        zIndex: '999',
        padding: "0.4rem"
    }


</script>

<div class="userInfo" transition:fly={{x: "-1rem", duration: 200}}>
    <Paper override={userInfoCss}>
        <ClickablePaper>
            <Group position="apart">
                {#if $userStore.status === Status.Normal}
                    <Text align='left'>Hello, </Text>
                    <Text align='right' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>{$userStore.userInfo?.nickname}</Text>
                {:else if $userStore.status === Status.NoCredential}
                    <Text align='left'>Please</Text>
                    <Text align='right' weight="bold">Login</Text>
                {:else}
                    <Text align='left' color="orange" weight="bold">Unknown Error!</Text>
                {/if}
            </Group>
        </ClickablePaper>
    </Paper>
</div>

<style>
    .userInfo {
        position: fixed;
        right: var(--right, 6rem);
        bottom: var(--bottom, 1.7rem);
        /*background-color: #f5f5f5;*/
        /*z-index: 999;*/
        /*padding: 0.4rem;*/
    }
</style>