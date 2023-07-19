<script>
    import {Status, userStore} from "$lib/auth/Auth.ts";
    import {Button, Group, Paper, Text} from "@svelteuidev/core";
    import {fly} from "svelte/transition";
    import {goto} from "$app/navigation";

    const userInfoCss = {
        // position: "fixed",
        backgroundColor: "#f5f5f5",
        zIndex: '999',
        padding: "0.4rem"
    }

</script>



<div class="userInfo" transition:fly={{x: "1rem", duration: 200}}>
    <Paper override={userInfoCss}>
        <Paper override={{padding: "0.5rem"}}>
            <Group position="apart">
                {#if $userStore.status === Status.Normal}
                    <Text align='left'>Hello, </Text>
                    <Text align='right' variant='gradient' weight='bold' underline
                          gradient={{ from: 'dark', to: 'cyan', deg: 45 }}
                          on:click={() => {goto('/user')}}
                    >{$userStore.userInfo?.nickname}</Text>
                    <Button compact variant='light' color="red"
                            on:click={userStore.logout}
                    >logout
                    </Button>
                {:else if $userStore.status === Status.NoCredential}
                    <Text align='left'>Please</Text>
                    <Button compact variant="light" color="green"
                            on:click={() => {goto('/user')}}
                    >login</Button>
                {:else}
                    <Text align='left' color="orange" weight="bold">Unknown Error!</Text>
                {/if}
            </Group>
        </Paper>
    </Paper>
</div>

<style>
    .userInfo {
        position: fixed;
        right: var(--right, 6rem);
        bottom: var(--bottom, 1.7rem);
    }
</style>