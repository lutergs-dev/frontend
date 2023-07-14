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
        Grid, Box, Modal,
    } from '@svelteuidev/core';
    import {CrossCircled, InfoCircled} from 'radix-icons-svelte';
    import FloatingButton from "$lib/ui/FloatingButton.svelte";
    import ClickablePaper from "$lib/ui/ClickablePaper.svelte";
    import DisappeableNotification from "$lib/ui/DisappeableNotification.svelte";
    import {goto, invalidate, invalidateAll} from "$app/navigation";
    import {useThrottle} from "@svelteuidev/composables";
    import {getUserInfo} from "$lib/auth/Auth";

    export let data;

    // get page data from serve
    const movePage = (endpoint: string) => {
        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/blog' + endpoint;
        }
    }

    let isUserNotLogined = false;
    const throttleUserLogined = useThrottle(() => {
        isUserNotLogined = true;
        setTimeout(() => {
            isUserNotLogined = false;
        }, 2000);
    }, 2000);
    const moveToWrite = async() => {
        const userInfo = await getUserInfo();
        if (userInfo.userInfo != undefined) {
            movePage("/write");
        } else {
            throttleUserLogined();
        }
    }


    let isFirst = false;
    const throttleFirstWarning = useThrottle(() => {
        isFirst = true;
        setTimeout(() => {
            isFirst = false;
        }, 1500);
    }, 1500);
    const movePreviousPage = async() => {
        if (data.position.index == 1) {
            throttleFirstWarning();
        } else {
            await goto(`/blog?index=${data.position.index - 1}&size=${data.position.size}`)
        }
    }

    let isLast = false;
    const throttleLastWarning = useThrottle(() => {
        isLast = true;
        setTimeout(() => {
            isLast = false;
        }, 1500);
    }, 1500);
    const moveNextPage = async() => {
        if (data.pageList.length < data.position.size) {
            throttleLastWarning();
        } else {
            await goto(`/blog?index=${+data.position.index + 1}&size=${data.position.size}`)
        }
    }




    // props from CSS / HTML tag
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
                                <Text align="left" override={{fontSize: '1.2rem'}} underline weight='bold' on:click={() => {movePage(`/${page.endpoint.value}`)}}>
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
                                <Text align="left" override={{fontSize: '1.2rem'}} underline weight='bold' on:click={() => {movePage(`/${page.endpoint.value}`)}}>
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
            <Button variant='gradient' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} on:click={() => {moveToWrite()}}>글 작성</Button>
        </Group>
    </Paper>

    <DisappeableNotification
        visible={isFirst}
        transition={{y: "-3rem", duration: 1000}}
        override={{backgroundColor: '#ffd699'}}
        --top="10rem"
        --width="10rem"
    >
        첫 번째 페이지입니다.
    </DisappeableNotification>

    <DisappeableNotification
            visible={isLast}
            transition={{y: "-3rem", duration: 1000}}
            override={{backgroundColor: '#ffd699'}}
            --top="10rem"
            --width="10rem"
    >
        마지막 페이지입니다.
    </DisappeableNotification>

    <DisappeableNotification
            visible={isUserNotLogined}
            icon={CrossCircled}
    >
        <p>유저 로그인이 되어있지 않습니다!</p>
        <p><b on:click={() => {goto("/user")}}>로그인</b> 해 주세요.</p>
    </DisappeableNotification>


    <FloatingButton backlink={''}>
        <Paper override={{padding: "6px 6px 6px 6px"}}>
            <Group position="apart">
                <ClickablePaper onClick={() => {movePreviousPage()}} padding={'11px 16px 11px 16px'}>◀️</ClickablePaper>
                <ClickablePaper onClick={() => {moveNextPage()}} padding={'11px 16px 11px 16px'}>▶️</ClickablePaper>
            </Group>
        </Paper>
        <Paper>
            <Group position="center">
                <Text variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>{data.position.index}</Text>
            </Group>
        </Paper>
    </FloatingButton>
</main>