<script lang="ts">
    import { browser } from '$app/environment';
    import {
        Alert,
        Space,
        Paper,
        Text,
        Button,
        Seo,
        Stack,
        Divider,
        Group,
        Grid, Box,
    } from '@svelteuidev/core';
    import {InfoCircled} from 'radix-icons-svelte';
    import FloatingButton from "$lib/ui/FloatingButton.svelte";

    export let data;

    // get page data from server
    function movePage(endpoint: string){
        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/blog/' + endpoint;
        }
    }

    let width, height;
</script>

<main style="background-color: #f5f5f5" bind:clientWidth={width} bind:clientHeight={height}>
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
    <Paper >
        {#if data.isReceived}
            <Stack >
                <Divider variant="dashed"/>
                {#if width > 500}
                    {#each data.pageList as page}
                        <Box css={{display:'flex'}}>
                            <Box css={{width:'7rem'}}>
                                <Text override={{fontSize: '1.2rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                                    {page.nickName.value}
                                </Text>
                            </Box>
                            <Box css={{flexGrow:1}}>
                                <Text align="left" override={{fontSize: '1.2rem'}} underline weight='bold' on:click={() => {movePage(page.endpoint.value)}}>
                                    {page.title}
                                </Text>
                            </Box>
                            <Box css={{width:'11rem'}}>
                                <Text align="right" override={{fontSize: '1rem'}} >
                                    {page.createdAt.slice(0, 19)}
                                </Text>
                            </Box>
                        </Box>
                        <Divider variant="dashed"/>
                    {/each}
                {:else}
                    {#each data.pageList as page}
                        <Box>
                            <Box css={{flexGrow:1}}>
                                <Text align="left" override={{fontSize: '1.2rem'}} underline weight='bold' on:click={() => {movePage(page.endpoint.value)}}>
                                    {page.title}
                                </Text>
                            </Box>
                            <Space h="md"/>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Text override={{fontSize: '1.2rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>
                                        {page.nickName.value}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Text align="right" override={{fontSize: '1rem'}} >
                                        {page.createdAt.slice(5, 10) + ", " +page.createdAt.slice(11, 16)}
                                    </Text>
                                </Grid.Col>
                            </Grid>
                        </Box>
                        <Divider variant="dashed"/>
                    {/each}
                {/if}
            </Stack>
        {:else}
            <Alert icon={InfoCircled}  title="이런!">
                글 목록을 받아오는 데 실패했습니다! 재시도 해 주세요.
            </Alert>
        {/if}
    </Paper>
    <Space  h="xl"  />
    <Paper>
        <Group position="left">
            <Button on:click={() => {movePage("write")}}>글 작성</Button>
        </Group>
    </Paper>

    <!-- TODO : guestbook 처럼 왔다갔다 하는거 구현 -->
    <FloatingButton backlink={''}/>
</main>