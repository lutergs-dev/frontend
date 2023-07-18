<script lang="ts">
    import {Group, Paper, Stack, Text, UnstyledButton} from "@svelteuidev/core";
    import {HamburgerMenu, Cross1} from "radix-icons-svelte";
    import ClickablePaper from "../ClickablePaper.svelte";
    import {browser} from "$app/environment";
    import {getUserInfo, Status} from "$lib/auth/Auth";
    import {fly} from "svelte/transition";
    import UserInfo from "$lib/ui/floatingButton/UserInfo.svelte";
    import {goto} from "$app/navigation";

    // define dynamic resolution parameter
    let lessThan400px = false;

    const mainFloatingButtonCss = {
        position: "fixed",
        width: "",
        height: "",
        bottom: "1.5rem",
        right: "1.5rem",
        background: "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-cyan600) 100%)",
        color: "white",
        borderRadius: "2.5rem",
        textAlign: "center",
        boxShadow: "0.1rem 0.1rem 0.1rem #999",
        zIndex: '999'
    }
    $: {
        if (lessThan400px) {
            mainFloatingButtonCss.width = "4rem";
            mainFloatingButtonCss.height = "4rem";
        } else {
            mainFloatingButtonCss.width = "5rem";
            mainFloatingButtonCss.height = "5rem";
        }
    }

    const popupFloatingCss = {
        position: "fixed",
        width: "10rem",
        bottom: "7rem",
        right: "1.5rem",
        backgroundColor: "#f5f5f5",
        zIndex: '999'
    }
    const moreMenuFloatingCss = {
        position: "fixed",
        width: "10rem",
        bottom: "7rem",
        right: "12.5rem",
        backgroundColor: "#f5f5f5",
        zIndex: '999'
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
        if (lessThan400px) {
            userInfoCss.right = "6rem";
            userInfoCss.bottom = "1.7rem";
        } else {
            userInfoCss.right = "7rem";
            userInfoCss.bottom = "2.2rem";
        }
    }

    let isClicked = false;
    const switchClick = () => {
        if (isClicked === false) {
            isClicked = true;
            mainFloatingButtonCss.background = "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-yellow600) 100%)"
        } else {
            isClicked = false;
            mainFloatingButtonCss.background = "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-cyan600) 100%)"
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
    <UnstyledButton
            override={mainFloatingButtonCss}
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

    {#if isClicked}
        <Paper override={popupFloatingCss}>
            <Stack>
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

        <UserInfo --bottom={userInfoBottom} --right={userInfoRight} />
    {/if}

    {#if isMoreMenuClicked}
        <Paper override={moreMenuFloatingCss}>
            <Stack>
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

    {/if}
</body>
