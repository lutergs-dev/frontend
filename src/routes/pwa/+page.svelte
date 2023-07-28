<script lang="ts">
    import {onMount} from "svelte";
    import {Button} from "@svelteuidev/core";

    onMount(async() => {
        const status = await Notification.requestPermission();
        if (status !== "granted") {
            alert("please allow notification to receive notifications!");
        }
        const reg = await navigator.serviceWorker.ready;
        await reg.pushManager.subscribe({userVisibleOnly: true})
    })

    const showNotification = () => {
        new Notification("hello!");
    }
</script>


<h1>Hello PWA!</h1>
<Button on:click={() => {showNotification()}}>show noty</Button>