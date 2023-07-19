<script lang="ts">
    import {Paper, Stack, Text, UnstyledButton} from "@svelteuidev/core";
    import {HamburgerMenu, Cross1} from "radix-icons-svelte";
    import ClickablePaper from "../ClickablePaper.svelte";
    import {browser} from "$app/environment";
    import UserInfo from "$lib/ui/floatingButton/UserInfo.svelte";
    import {goto} from "$app/navigation";
    import { fly } from 'svelte/transition';

    // define dynamic resolution parameter
    let lessThan400px = false;


    let mainButton;
    const mainButtonCss = {
        width: "",
        height: "",
        background: "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-cyan600) 100%)",
        color: "white",
        borderRadius: "2.5rem",
        textAlign: "center",
        boxShadow: "0.1rem 0.1rem 0.1rem #999",
        zIndex: '999'
    }
    $: {
        mainButtonCss.width = lessThan400px ? "4rem" : "5rem";
        mainButtonCss.height = lessThan400px ? "4rem" : "5rem";
    }


    let mainMenu;
    const mainMenuCss = {
        padding: "0.4rem",
        width: "8rem",
        bottom: "7rem",
        right: "1.5rem",
        backgroundColor: "#f5f5f5",
        zIndex: '999'
    }
    $: {
        if (mainMenu) {
            mainMenu.style.setProperty('--main-menu-bottom', `${lessThan400px ? "6rem" : "7rem"}`);
            mainMenu.style.setProperty('--main-menu-right', `1.5rem`);
        }
    }

    let moreMenu;
    const moreMenuCss = {
        padding: "0.4rem",
        width: "9rem",
        backgroundColor: "#f5f5f5",
        zIndex: '999'
    }
    $: {
        if (moreMenu) {
            moreMenu.style.setProperty('--more-menu-bottom', `${lessThan400px ? "6rem" : "7rem"}`);
            moreMenu.style.setProperty('--more-menu-right', "10.5rem");
        }
    }



    const userInfoCss = {
        position: "fixed",
        // width: "15rem",
        bottom: "2.2rem",
        right: "12.5rem",
        backgroundColor: "#f5f5f5",
        zIndex: '999',
        padding: "0.4rem"
    }
    $: {
        userInfoCss.bottom = lessThan400px ? "1.7rem" : "2.2rem";
        userInfoCss.right = lessThan400px ? "6rem" : "7rem";
    }

    let isClicked = false;
    const switchClick = () => {
        if (isClicked === false) {
            isClicked = true;
            mainButtonCss.background = "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-yellow600) 100%)"
        } else {
            isClicked = false;
            mainButtonCss.background = "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-cyan600) 100%)"
        }
        // isClicked = !isClicked;
        isMoreMenuClicked = false;
    }

    let isMoreMenuClicked = false;
    const moreMenuClick = () => {
        isMoreMenuClicked = !isMoreMenuClicked;
    }

    const movePage = (pageName: string) => {
        if (browser) {
            goto(`/${pageName}`);
            // window.location.href = `/${pageName}`;
        }
    }

    export let backlink
    export let width, height;
    let userInfoRight, userInfoBottom;

    $: {
        if (width < 400) {
            lessThan400px = true;
            userInfoRight = "6rem";
            userInfoBottom = "1.7rem";
        } else {
            lessThan400px = false;
            userInfoRight = "7rem";
            userInfoBottom = "2.2rem";
        }
    }
</script>

<body bind:clientWidth={width} bind:clientHeight={height}>
    <div class="mainButton" bind:this={mainButton}>
        <UnstyledButton
                override={mainButtonCss}
                variant="gradient"
                gradient={{ from: 'dark', to: 'cyan"'}}
                on:click={switchClick}
        >
            {#if !isClicked}
                <HamburgerMenu size="1.5rem" />
            {:else}
                <Cross1 size="1.5rem" />
            {/if}
        </UnstyledButton>
    </div>



    {#if isClicked}
        <div class="mainMenu" bind:this={mainMenu} transition:fly={{y: "2rem", duration: 200}}>
            <Paper override={mainMenuCss}>
                <Stack spacing="xs">
                    <ClickablePaper onClick={moreMenuClick}>
                        <Text>ℹ️ others</Text>
                    </ClickablePaper>
                    <ClickablePaper onClick={() => {movePage('')}}>
                        <Text>🏠 home</Text>
                    </ClickablePaper>
                    <ClickablePaper onClick={() => {movePage(backlink)}}>
                        <Text>◀️ back</Text>
                    </ClickablePaper>
                    <slot></slot>
                </Stack>
            </Paper>
        </div>
        <UserInfo --bottom={userInfoBottom} --right={userInfoRight} />
    {/if}

    {#if isMoreMenuClicked}
        <div class="moreMenu" bind:this={moreMenu} transition:fly={{x: "2rem", duration: 200}}>
            <Paper override={moreMenuCss}>
                <Stack spacing="xs">
                    <ClickablePaper onClick={() => {movePage('blog')}}>
                        <Text align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Blog
                        </Text>
                    </ClickablePaper>
                    <ClickablePaper onClick={() => {movePage('guestbook')}}>
                        <Text align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Guestbook
                        </Text>
                    </ClickablePaper>
                    <ClickablePaper onClick={() => {movePage('todo')}}>
                        <Text align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            ToDo
                        </Text>
                    </ClickablePaper>
                    <ClickablePaper onClick={() => {movePage('eugene')}}>
                        <Text align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                            Eugene
                        </Text>
                    </ClickablePaper>
                </Stack>
            </Paper>
        </div>
    {/if}
</body>

<style>
    :root {
        --main-menu-bottom: inherit;
        --main-menu-right: inherit;

        --more-menu-bottom: inherit;
        --more-menu-right: inherit;
    }

    .mainButton {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
    }

    .mainMenu {
        position: fixed;
        right: var(--main-menu-right);
        bottom: var(--main-menu-bottom);
    }

    .moreMenu {
        position: fixed;
        right: var(--more-menu-right);
        bottom: var(--more-menu-bottom);
    }
</style>
