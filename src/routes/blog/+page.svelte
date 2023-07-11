<script lang="ts">
    import { browser } from '$app/environment';
    import {
        Alert,
        Space,
        Paper,
        Text,
        Loader,
        Button,
        Seo,
        Stack,
        Divider,
        Group,
        Grid,
        Center
    } from '@svelteuidev/core';
    import {InfoCircled, Rocket} from 'radix-icons-svelte';
    import FloatingButton from "$lib/ui/FloatingButton.svelte";
    import {PUBLIC_BACKEND_SERVER} from "$env/static/public";

    // get page list from server
    const getPageList = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_SERVER}/page/list`);
        return await response.json();
    }

    // get page data from server
    function movePage(pageName: string){
        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/blog/' + pageName;
        }
    }
</script>

<main style="background-color: #f5f5f5">
    <Seo
        title="Blog"
        titleTemplate="%t% | LuterGS"
    />
    <Paper>
        <Group position="center">
            <Text override={{fontSize: '2rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>글 목록</Text>
        </Group>
    </Paper>
    <Space  h="xl"  />
    <Paper>
        {#await getPageList()}
            <Group position="center">
                <Loader variant="bars" />
            </Group>
        {:then pageNameJson}
            <Stack>
                <Divider variant="dashed"/>
                {#each pageNameJson.pages as page}
                    <Grid spacing="lg">
                        <Grid.Col span={2}>
                            <Center>
                                <Rocket/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={10}>
                            <Text override={{fontSize: '1.2rem'}} underline weight='bold' on:click={() => {movePage(page.endpoint)}}>{page.name}</Text>
                        </Grid.Col>
                    </Grid>
                    <Divider variant="dashed"/>
                {/each}
            </Stack>

        {:catch err}
            <Alert icon={InfoCircled}  title="이런!">
                글 목록을 받아오는 데 실패했습니다! 재시도 해 주세요.
            </Alert>
        {/await}
    </Paper>
    <Space  h="xl"  />
    <Paper>
        <Group position="right">
            <Button on:click={() => {movePage("write")}}>글 작성</Button>
        </Group>
    </Paper>

    <FloatingButton backlink={''}/>
</main>