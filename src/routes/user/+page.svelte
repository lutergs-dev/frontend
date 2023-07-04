<script lang="ts">

    import {getEnv} from "../env/envVarGetter";
    import {Button, Group, Loader, Paper, Seo, Space, Text} from "@svelteuidev/core";
    import { page } from '$app/stores';

    const loadPage = async() => {
        return {
            "token": $page.url.searchParams.get("token"),
            "backendServer": await getEnv("BACKEND_SERVER")
        }
    }

    let test = null;

    const auth = async(api: string) => {
        const reqResult = await Promise.all(
            [getEnv("BACKEND_SERVER"), getEnv("OAUTH_CLIENT_ID"), getEnv("BACKEND_SERVER"), Promise.resolve("LetHTpe4L6CgQgz9pIUo3bL6DO9CoD")
            // TODO : need to change to random generate string
        ])
        const clientId = encodeURI(reqResult[1]);
        const redirectUrl = encodeURI(`${reqResult[2]}${api}`);
        const state = encodeURI(reqResult[3]);

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=online&state=${state}`
    }

    const logout = async() => {
        window.location.href = 'http://localhost:3000/user'
    }

    let mail = null;
    let createdAt = null;
    const testUser = async(api: string) => {
        const response = await fetch(`http://localhost:10000${api}`, {credentials: 'include'})
        const responseCode = response.status;
        const json = await response.json()
        mail = `${json.email.username}@${json.email.provider}`;
        createdAt = json.createdAt;
    }


</script>

<main style="background-color: #f5f5f5">

    <Seo
        title="LoginTest"
        titleTemplate="%t% | LuterGS"
    />

    <!-- 제목 -->
    <Paper>
        <Group position="center">
            <Text override={{fontSize: '2rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>회원 정보</Text>
        </Group>
    </Paper>
    <Space h="md"/>

    <Paper>

    </Paper>

    <Button on:click={() => auth("/user/login")}>로그인</Button>
    <Button on:click={() => auth("/user/signup")}>회원가입</Button>
    <Button on:click={() => testUser("/user")}>인증확인</Button>

    <Text>{mail}</Text>
    <p></p>
    <Text>{createdAt}</Text>


    <!--{#await loadPage()}-->
    <!--    <Group position="center">-->
    <!--        <Loader variant="bars" />-->
    <!--    </Group>-->
    <!--{:then result}-->
    <!--    {#if result.token == null}-->
    <!--        <Paper>-->
    <!--            <Text>로그인되지 않았습니다! 로그인 혹은 가입해주세요.</Text>-->
    <!--            <Button on:click={() => {login()}}>로그인</Button>-->
    <!--        </Paper>-->
    <!--    {:else}-->
    <!--        <Paper>-->
    <!--            <Text>로그인되었습니다. 로그인 정보 : {result.token}</Text>-->
    <!--            <Button on:click={() => {logout()}}></Button>-->
    <!--        </Paper>-->
    <!--    {/if}-->
    <!--{:catch err}-->
    <!--    <Paper>-->
    <!--        <Text>서버 통신에 실패했습니다! 관리자에게 문의해주세요.</Text>-->
    <!--    </Paper>-->
    <!--{/await}-->

    <Text>{test}</Text>

</main>