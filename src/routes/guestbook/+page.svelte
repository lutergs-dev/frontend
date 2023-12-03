<script lang="ts">
    import {Alert, Button, Group, Paper, Seo, Space, Text, TextInput} from "@svelteuidev/core";
    import TinyMceViewer from "$lib/tinyMce/TinyMceViewer.svelte";
    import TinyMceEditor from "$lib/tinyMce/TinyMceEditor.svelte";
    import FloatingButton from "$lib/ui/floatingButton/FloatingButton.svelte";
    import {Person, LockClosed, InfoCircled} from "radix-icons-svelte";
    import ClickablePaper from "$lib/ui/ClickablePaper.svelte";
    import { env } from "$env/dynamic/public";
    import AnimatedNotification from "$lib/ui/AnimatedNotification.svelte";
    import {useThrottle} from "@svelteuidev/composables";
    import {goto} from "$app/navigation";

    export let data;

    // save and reload page
    let commentAuthor = '';
    let commentValue = '';
    let commentPassword = '';
    const addComment = async () => {
        window.onbeforeunload = () => {}
        if (commentAuthor === '') {
            alert("Error : 이름이 비어있습니다.");
            return;
        }
        if (commentValue === '') {
            alert("Error : 내용이 비어있습니다.");
            return;
        }

        const res = await fetch(`${env.PUBLIC_BACKEND_SERVER}/guestbook`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: commentAuthor,
                value: commentValue,
                password: commentPassword
            })
        })
        if (res.ok) {
            commentAuthor = '';
            commentValue = '';
            commentPassword = '';
            window.location.reload();       // goto 로 페이지가 새로고침되지 않음.
        }else{
            alert(`Error : ${(await res.json()).error}`);
        }
    }
    // delete comment function
    const deleteComment = async (comment: {
        name: string,
        password: string,
        value: string,
        createdAt: string,
        uuid: string,
        deletePressed: boolean
    }) => {
        console.log(comment);
        const res = await fetch(`${env.PUBLIC_BACKEND_SERVER}/guestbook/${comment.uuid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": comment.password
            }
        })
        if (res.ok) {
            window.location.reload();
        }else {
            res.json().then(json => {
                if (json.error == "wrong password") {
                    alert(`Error : 잘못된 패스워드입니다.`);
                } else {
                    alert(`Error : 삭제에 실패했습니다. ${json.error}\nlutergs@lutergs.dev 에게 문의해주세요.`)
                }
                comment.deletePressed = false;
            })
        }
    }

    // 앞 / 뒤로가기 버튼 함수
    let isFirst = false;
    const throttleFirstWarning = useThrottle(() => {
        isFirst = true;
        setTimeout(() => {
            isFirst = false;
        }, 1500);
    }, 1500)
    const movePreviousPage = async () => {
        if (data.position.index == 1) {
            throttleFirstWarning();
        } else {
            await goto('/guestbook?' + new URLSearchParams({
                index: data.position.index - 1,
                size: data.position.size
            }));
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
        if (data.comments.length < data.position.size) {
            throttleLastWarning();
        } else {
            await goto('/guestbook?' + new URLSearchParams({
                index: +data.position.index + 1,
                size: data.position.size
            }))
        }
    }

    $: notificationBottom = width < 400 ? "25rem" : "26rem";
    let width, height;
</script>

<main style="background-color: #f5f5f5" bind:clientWidth={width} bind:clientHeight={height}>
    <Seo
        title="Guestbook"
        titleTemplate="%t% | LuterGS"
    />

    <!-- 제목 -->
    <Paper>
        <Group position="center">
            <Text override={{fontSize: '2rem'}} variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>방명록</Text>
        </Group>
    </Paper>
    <Space h="md"/>

    <!-- 댓글 -->
    <Paper>
        {#if data.isReceived}
            {#each data.comments as comment}
                <Paper>
                    <Group position="apart">
                        <Text variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>{comment.name}</Text>
                        <Text>{comment.createdAt.slice(0, 19)}</Text>
                    </Group>
                    <Space h="xs" />
                    <TinyMceViewer>{@html comment.value}</TinyMceViewer>
                    <Group position="left">
                        {#if comment.deletePressed}
                            <TextInput placeholder="비밀번호 입력" bind:value={comment.password}></TextInput>
                            <Button compact variant='gradient' gradient={{ from: 'orange', to: 'dark', deg: 45 }}
                                    on:click={() => {deleteComment(comment)}}>
                                확인
                            </Button>
                        {:else}
                            <Button compact variant='gradient' gradient={{ from: 'red', to: 'gray', deg: 45 }}
                                    on:click={() => {comment.deletePressed = true}}>
                                삭제
                            </Button>
                        {/if}
                    </Group>
                </Paper>
                <Space h="md"/>
            {/each}
        {:else}
            <Alert icon={InfoCircled}  title="이런!">
                <p>방명록 목록을 받아오는 데 실패했습니다! 재시도 해 주세요.</p>
                <p>err : {data.error}</p>
            </Alert>
        {/if}
    </Paper>
    <Space h="md"/>

    <!-- 에디터 -->
    <Paper>
        <TextInput placeholder="별명을 입력해주세요" icon={Person} bind:value={commentAuthor} />
        <Space h="md"/>
        <svelte:component this={TinyMceEditor} bind:value={commentValue}></svelte:component>
        <Space h="md"/>
        <Group position="left">
            <Button variant='gradient' gradient={{ from: 'dark', to: 'cyan', deg: 45 }} on:click={addComment}>저장</Button>
            <TextInput placeholder="비밀번호를 입력해주세요" icon={LockClosed} bind:value={commentPassword}/>
        </Group>
    </Paper>

    <!-- 알림 리스트 -->
    <AnimatedNotification
            visible={isFirst}
            transition={{y: "-3rem", duration: 1000}}
            override={{backgroundColor: '#ffd699'}}
            --bottom={notificationBottom}
            --width="10rem"
    >
        첫 번째 페이지입니다.
    </AnimatedNotification>

    <AnimatedNotification
            visible={isLast}
            transition={{y: "-3rem", duration: 1000}}
            override={{backgroundColor: '#ffd699'}}
            --bottom={notificationBottom}
            --width="10rem"
    >
        마지막 페이지입니다.
    </AnimatedNotification>

    <!-- 플로팅 버튼에 앞 / 뒤로가기 추가 -->
    <FloatingButton backlink={''}>
        <Paper override={{padding: "6px 6px 6px 6px"}}>
            <Group position="apart">
                <ClickablePaper onClick={movePreviousPage} padding={"13px 10px 13px 10px"}>◀️</ClickablePaper>
                <ClickablePaper onClick={moveNextPage} padding={"13px 10px 13px 10px"}>▶️</ClickablePaper>
            </Group>
        </Paper>
        <Paper>
            <Group position="center">
                <Text variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>{data.position.index}</Text>
            </Group>
        </Paper>
    </FloatingButton>
</main>