<script lang='ts'>
    import {Grid, Paper, Code, Text, Space, Seo, Group} from '@svelteuidev/core';
    import {browser} from "$app/environment";
    import ClickablePaper from "../../utils/ui/ClickablePaper.svelte";

    const movePage = (pageName: string) => {
        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/' + pageName;
        }
    }
</script>

<main>
    <Seo
        title="Intro"
        titleTemplate="%t% | LuterGS"
    />

    <Paper>
        <Group position="apart">
            <Text override={{fontSize: '5rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                LuterGS
            </Text>
            <Group direction="column">
<!--                <a href="https://hits.sh/lutergs.dev/"><img alt="Hits" src="https://hits.sh/lutergs.dev.svg?style=flat-square&label=total"/></a>-->
<!--                <a href="https://hits.sh/lutergs.dev/"><img alt="Hits" src="https://hits.sh/lutergs.dev.svg?view=today-total&style=flat-square&label=today"/></a>-->
            </Group>
        </Group>

        <Space  h='md'/>
        <Text override={{fontSize: '2rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
            currently working on migrate
                <Code color='blue' override={{ fontSize: '1.8rem', '-webkit-text-fill-color': 'black' }}>
                    <a href='https://github.com/LuterGS/LuterGS/blob/master/README.md'>LuterGS README</a>
                </Code>
             page to this site
        </Text>
        <Space  h='md'/>
        <Text override={{fontSize: '2rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
            by LuterGS, develop using
                <Code override={{ fontSize: '1.8rem', '-webkit-text-fill-color': 'black' }} color='orange' >svelte</Code>
            .
        </Text>
    </Paper>
    <Space h="md"/>
    <Paper>
        <Grid spacing="lg" override={{backgroundColor: '#f5f5f5'}}>
            <Grid.Col span={6}>
                <ClickablePaper onClick={() => {movePage('blog')}}>
                    <Text override={{fontSize: '2rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                        Blog
                    </Text>
                    <Space h="md"/>
                    <Text>개발기록 / 개인일지를 적는 페이지입니다.</Text>
                </ClickablePaper>
            </Grid.Col>
            <Grid.Col span={6}>
                <ClickablePaper onClick={() => {movePage('guestbook')}}>
                    <Text override={{fontSize: '2rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                        Guestbook
                    </Text>
                    <Space h="md"/>
                    <Text>방명록을 적는 페이지입니다. 현재 개발 중입니다.</Text>
                </ClickablePaper>
            </Grid.Col>
            <Grid.Col span={6}>
                <ClickablePaper onClick={() => {movePage('todo')}}>
                    <Text override={{fontSize: '2rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                        ToDo
                    </Text>
                    <Space h="md"/>
                    <Text>샘플 To-do list 입니다. 현재 개발 중입니다.</Text>
                </ClickablePaper>
            </Grid.Col>
            <Grid.Col span={6}>
                <ClickablePaper onClick={() => {movePage('eugene')}}>
                    <Text override={{fontSize: '2rem'}} align='left' variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} class='title'>
                        Eugene
                    </Text>
                    <Space h="md"/>
                    <Text>Eugene 입니다.</Text>
                </ClickablePaper>
            </Grid.Col>
        </Grid>
    </Paper>

</main>

<style>
    a {
        color: black;
    }
</style>