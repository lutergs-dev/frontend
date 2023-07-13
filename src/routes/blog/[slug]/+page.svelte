<script lang="ts">
    import {Alert, Paper, Seo, Space, Title} from "@svelteuidev/core";
    import {InfoCircled} from "radix-icons-svelte";
    import TinyMceViewer from "$lib/tinyMce/TinyMceViewer.svelte";
    import FloatingButton from "$lib/ui/FloatingButton.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    const pageName = data.isReceived ? data.pageKey.title : "로딩 실패!";
</script>

<main style="background-color: #f5f5f5">

    <Seo
        title={pageName}
        titleTemplate="%t% | LuterGS"
    />

    <Paper>
        <Title order={1} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>{pageName}</Title>
    </Paper>
    <Space h="md"/>
    <TinyMceViewer data={"12345"}/>
    {#if data.isReceived === true}
        {#each data.pageValue.paragraphs as paragraph}
            <Paper>
                <TinyMceViewer data={paragraph}>{@html paragraph}</TinyMceViewer>
            </Paper>
            <Space h="md"/>
        {/each}
    {:else}
        <Paper>
            <Alert icon={InfoCircled}  title="이런!">
                <p>글을 받아오는 데 실패했습니다! 새로고침해 주세요.</p>
                <p>err : {data.error}</p>
            </Alert>
        </Paper>
    {/if}

    <FloatingButton backlink={'blog'}/>
</main>