<script lang="ts">
    import {Notification} from "@svelteuidev/core";
    import { fly } from "svelte/transition";


    export let visible = false;
    export let title;
    export let icon;
    export let width, height;
    export let override = {};
    export let transition = {
        y: "3rem", duration: 1000
    }
</script>

<body bind:clientWidth={width} bind:clientHeight={height} >
    <div class="defaultBox">
        {#if visible}
            <div transition:fly={transition}>
                <Notification color="red" icon={icon} title={title} withCloseButton={false} override={override}>
                    <slot></slot>
                </Notification>
            </div>
        {/if}
    </div>
</body>


<style>
    .defaultBox {
        position: var(--position, fixed);
        right: var(--right, 1.5rem);
        top: var(--top, 1.5rem);
        width: var(--width, 20rem);
    }
</style>