<script lang="ts">

    import {getEnv} from "../env/envVarGetter";
    import {page} from "$app/stores";
    import {
        Alert,
        Box,
        Button,
        Center,
        Container,
        Grid,
        Group,
        Loader, Modal, Notification,
        Paper,
        Seo,
        Space,
        Stack,
        Text, TextInput
    } from "@svelteuidev/core";
    import {Cross2, InfoCircled} from "radix-icons-svelte";
    import {PUBLIC_BACKEND_SERVER, PUBLIC_OAUTH_CLIENT_ID} from "$env/static/public";
    import FloatingButton from "$lib/ui/FloatingButton.svelte";
    import ClickablePaper from "$lib/ui/ClickablePaper.svelte";

    const userInfo = {
        email: "",
        createdAt: "",
        nickName: ""
    }
    const getUserInfo = async() => {
        return await fetch(`${PUBLIC_BACKEND_SERVER}/user`, {credentials: 'include'})
    }

    const getErrMsgFromResponse = async(response: Response) => {
        return (await response.json()).error
    }

    const setUserInfo = (response: Response) => {
        response.json()
            .then(json => {
                userInfo.email = `${json.email.username}@${json.email.provider}`;
                userInfo.createdAt = json.createdAt;
                userInfo.nickName = json.nickName;
            })
    }

    let newNickName = '';
    let isValidNickname: boolean;
    let changeNickNameOpened = false;
    let errorOccured = false;
    let errorMessage = ''
    $: { isValidNickname = /^[A-Za-z0-9\-_'.]+$/.test(newNickName); }
    const setNickName = async() => {
        fetch(`${PUBLIC_BACKEND_SERVER}/user`, {
            method: 'POST',
            credentials: 'include',
            headers: {"Content-Type": "Application/Json"},
            body: JSON.stringify({
                nickname: newNickName
            })
        }).then(result => {
            if (result.status === 200) {        // 정상 동작
                // close modal (refresh page)
                window.location.reload();
            } else {
                if (result.status === 406) {            // 닉네임 형식이 잘못되었거나 사용중임

                    errorOccured = true
                    result.json().then(json => {errorMessage = json.error});
                    console.log(errorMessage);
                } else if (result.status === 401) {     // 토큰 해독 실패

                    errorMessage = "유저 정보 해독에 실패했습니다. 로그아웃 후 재로그인해 주세요.";
                } else if (result.status === 403) {     // 토큰은 정상이나 유저를 찾을 수 없음

                } else if (result.status === 404) {     // 기타 에러 발생

                } else {                                // 백엔드에서 처리하지 못한 에러 발생

                }
            }
        })
    }
    const resetModal = () => {
        newNickName = '';
        changeNickNameOpened = false;
        errorOccured = false;
        errorMessage = ''
    }


    const googleAuth = async(api: string) => {
        const clientId = encodeURI(PUBLIC_OAUTH_CLIENT_ID);
        const redirectUrl = encodeURI(`${PUBLIC_BACKEND_SERVER}${api}`);
        // TODO : state 용 key 를 서버에서 생성 후 검증하는 로직 필요 (defend XSS)
        // const state = encodeURI(reqResult[3]);
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=online`
    }

    const logout = (api: string) => {
        fetch(`${PUBLIC_BACKEND_SERVER}${api}`, {credentials: 'include'})
            .then(result => {
                if (result.status === 200) {
                    window.location.reload()
                } else {
                    alert("로그아웃 실패! 토큰이 존재하지 않습니다.")
                }
            })
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

    <Space h="md"></Space>

    <Paper>
        {#await getUserInfo()}
                <Group position="center">
                    <Loader variant="bars" />
                </Group>
        {:then response}
            {#if response.status === 200}           <!-- get user success -->
                {setUserInfo(response) || ""}
                <Group direction="column">
                    <Container override={{ px: 0, backgroundColor: "#CBE0D2FF", width: "20rem", height: "3rem", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                        <Group position="apart" override={{ width: "20rem" }}>
                            <Modal opened={changeNickNameOpened} withCloseButton={false} title="닉네임 변경">
                                <TextInput placeholder="변경할 닉네임 입력" bind:value={newNickName}></TextInput>
                                <Space h="md"/>
                                <Text>* 영어 소문자, 숫자, 대시(-), 밑줄(_), 아포스트로피('), 마침표(.) 만 허용됩니다.</Text>
                                <Space h="md"/>
                                <Group position="apart">
                                    {#if isValidNickname === true}
                                        <Button variant='gradient' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} on:click={() => {setNickName()}}>변경</Button>
                                    {:else}
                                        <Button disabled={true} variant='gradient' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>형식이 맞지 않습니다</Button>
                                    {/if}
                                    <Button variant='outline' outline={{ from: 'dark', to: 'cyan', deg: 45 }} on:click={() => {resetModal()}}>닫기</Button>
                                </Group>
                                {#if errorOccured === true}
                                    <Space h="md"/>
                                    <Alert icon={InfoCircled}>{errorMessage}</Alert>
                                {/if}
                            </Modal>
                            <Text override={{fontSize: '1rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>닉네임 : {userInfo.nickName}</Text>
                            <Button variant='gradient' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} on:click={() => {changeNickNameOpened = true; console.log(changeNickNameOpened)}}>변경</Button>
                        </Group>
                    </Container>
                    <Container override={{ px: 0, backgroundColor: "#CBE0D2FF", width: "20rem", height: "3rem", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                        <Text override={{fontSize: '1rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>이메일 : {userInfo.email}</Text>
                    </Container>
                    <Container override={{ px: 0, backgroundColor: "#CBE0D2FF", width: "20rem", height: "3rem", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                        <Text override={{fontSize: '1rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>가입일자 : {userInfo.createdAt}</Text>
                    </Container>
                </Group>
                {:else if response.status === 400}
                {#await getErrMsgFromResponse(response)}
                    <Group position="center">       <!-- unknown error -->
                        <Loader variant="bars" />
                    </Group>
                {:then errMessage}
                    <Alert icon={InfoCircled} title="Unknown error" color="red">
                        <p>알 수 없는 에러가 발생했습니다. lutergs@lutergs.dev 에게 문의해주세요.</p>
                        <p>err={errMessage}</p>
                    </Alert>
                {/await}
            {:else if response.status === 401}      <!-- JSON decryption failed -->
                <Alert icon={InfoCircled} title="Token Validation Failed!" color="red">
                    유저 정보 해독에 실패했습니다. 로그아웃 후 재로그인해 주세요. 문제가 지속될 경우, lutergs@lutergs.dev 에게 문의해주세요.
                </Alert>
            {:else if response.status === 403}      <!-- user not found -->
                <Alert icon={InfoCircled} title="Token Validation Failed!" color="red">
                    유저가 존재하지 않습니다. 문제가 지속될 경우, lutergs@lutergs.dev 에게 문의해주세요.
                </Alert>
            {:else if response.status === 404}      <!-- no token (logout) -->
                <Group position="center" direction="column">
                    <Text>계정 정보가 없습니다. 아래 버튼을 눌러 구글로 로그인 혹은 회원가입 해 주세요.</Text>
                    <Text>회원가입할 경우, 최초 닉네임은 구글 이메일의 ID 와 동일합니다. 변경을 권장드립니다.</Text>
                    <Text>lutergs.dev 는 가입하는 유저의 "이메일" 만 저장합니다.</Text>
                    <img
                        src="/btn_google_signin_light_normal_web.png"
                        onmouseover="this.src='/btn_google_signin_light_pressed_web.png';"
                        onmouseout="this.src='/btn_google_signin_light_normal_web.png';"
                        on:click={() => googleAuth("/user/signup")}
                        alt="google-login-image"
                    />
                </Group>
            {/if}
        {/await}
    </Paper>

    <FloatingButton backlink={''}>
        <ClickablePaper onClick={() => {logout("/user/logout")}}>
            <Text>👋 logout</Text>
        </ClickablePaper>
    </FloatingButton>
</main>

<style>
</style>