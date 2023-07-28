<script lang="ts">

    import {getHotkeyHandler, hotkey, focus} from '@svelteuidev/composables';
    import {Paper, TextInput} from "@svelteuidev/core";
    let isVimVisible = false;
    let command = ':';
    const openVim = () => {
        isVimVisible = true;
    }
    const closeVim = () => {
        isVimVisible = false;
        command = ':';
    }

    // export let onEnter = (value: string) => {
    //
    // }
    export let onEnter;
</script>

<div use:hotkey={[['shift+:', () => openVim()]]}></div>
{#if isVimVisible}
    <div class="vim">
        <Paper>
            <TextInput use={[[focus]]} bind:value={command} on:keydown={getHotkeyHandler([['Enter', () => {onEnter(command); closeVim();}], ['Escape', () => closeVim()]])}></TextInput>
        </Paper>
    </div>
{/if}

<style>
    .vim {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 20rem;
        height: 4rem;
    }
</style>