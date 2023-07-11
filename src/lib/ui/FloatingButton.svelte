<script lang="ts">
    import {Paper, Stack, Text, UnstyledButton} from "@svelteuidev/core";
    import {HamburgerMenu} from "radix-icons-svelte";
    import ClickablePaper from "./ClickablePaper.svelte";
    import {browser} from "$app/environment";

    const mainFloatingButtonCss = {
        position: "fixed",
        width: "5rem",
        height: "5rem",
        bottom: "1.5rem",
        right: "1.5rem",
        background: "linear-gradient(45deg, var(--svelteui-colors-black) 0%, var(--svelteui-colors-cyan600) 100%)",
        color: "white",
        borderRadius: "2.5rem",
        textAlign: "center",
        boxShadow: "0.1rem 0.1rem 0.1rem #999",
        zIndex: '999'
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

    let isClicked = false;
    const switchClick = () => {
        isClicked = !isClicked;
        isMoreMenuClicked = false;
    }

    let isMoreMenuClicked = false;
    const moreMenuClick = () => {
        isMoreMenuClicked = !isMoreMenuClicked;
    }

    const movePage = (pageName: string) => {
        if (browser) {
            window.location.href = `/${pageName}`;
        }
    }

    export let backlink
</script>


<UnstyledButton
    override={mainFloatingButtonCss}
    variant="gradient"
    gradient={{ from: 'dark', to: 'cyan"'}}
    on:click={switchClick}
>
    <HamburgerMenu size="1.5rem" />
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