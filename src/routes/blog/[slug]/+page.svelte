<script lang="ts">
    import {Alert, Box, Group, Paper, Seo, Space, Stack, Text, Title} from "@svelteuidev/core";
    import {InfoCircled} from "radix-icons-svelte";
    import TinyMceViewer from "$lib/tinyMce/TinyMceViewer.svelte";
    import FloatingButton from "$lib/ui/FloatingButton.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    const pageName = data.isReceived ? data.pageKey.title : "로딩 실패!";

    const createdAtString = () => {
        const raw = data.pageKey.createdAt;
        return `${raw.slice(0, 4)}년 ${raw.slice(5, 7)}월 ${raw.slice(8, 10)}일, ${raw.slice(11, 13)}시 ${raw.slice(14, 16)}분`
    }

</script>

<main style="background-color: #f5f5f5">

    <Seo
        title={pageName}
        titleTemplate="%t% | LuterGS"
    />

    <Paper>
        <Stack>
            <Group position="left">
                <Title  order={1} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                    {pageName}
                </Title>
            </Group>
            <Group position="apart">
                <Text>by <b>LuterGS</b></Text>
                <Text>at {createdAtString()}</Text>
            </Group>
        </Stack>

    </Paper>
    <Space h="md"/>
    {#if data.isReceived === true}
        {#each data.pageValue.paragraphs as paragraph}
            <Paper>
                <TinyMceViewer>{@html paragraph}</TinyMceViewer>
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