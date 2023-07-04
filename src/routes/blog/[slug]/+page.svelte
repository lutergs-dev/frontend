<script>
    import {Alert, Group, Loader, Paper, Seo, Space, Stack, Text, Title} from "@svelteuidev/core";
    import {InfoCircled} from "radix-icons-svelte";
    import TinyMceViewer from "../../../utils/tinyMce/TinyMceViewer.svelte";
    import {getEnv} from "../../env/envVarGetter.ts";
    import FloatingButton from "../../../utils/ui/FloatingButton.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    const pageId = data.title;

    // get page list from server
    const getPageData = async () => {
        const backendServer = await getEnv("BACKEND_SERVER");
        const result = await fetch(`${backendServer}/page/` + pageId)
            .then(result => result.json());
        pageName = result.name;
        pageParagraphs = result.paragraphs;
    }
    let pageName = '';
    let pageParagraphs = [];
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
    {#await getPageData()}
        <Paper>
            <Group position="center">
                <Loader variant="bars" />
            </Group>
        </Paper>
    {:then _}
        {#each pageParagraphs as paragraph}
            <Paper>
                <TinyMceViewer>{@html paragraph.data}</TinyMceViewer>
            </Paper>
            <Space h="md"/>
        {/each}
    {:catch err}
        <Paper>
            <Alert icon={InfoCircled}  title="이런!">
                <p>글을 받아오는 데 실패했습니다! 재시도 해 주세요.</p>
                <p>err : {err}</p>
            </Alert>
        </Paper>
    {/await}

    <FloatingButton backlink={'blog'}/>
</main>