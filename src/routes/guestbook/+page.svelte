<script lang="ts">
    import {Button, Group, Paper, Seo, Space, Text, TextInput} from "@svelteuidev/core";
    import TinyMceViewer from "$lib/tinyMce/TinyMceViewer.svelte";
    import TinyMceEditor from "$lib/tinyMce/TinyMceEditor.svelte";
    import FloatingButton from "$lib/ui/FloatingButton.svelte";
    import {Person, LockClosed} from "radix-icons-svelte";
    import ClickablePaper from "$lib/ui/ClickablePaper.svelte";
    import {PUBLIC_BACKEND_SERVER} from "$env/static/public";

    const defaultPageSize = 10;
    let currentPage = 0;
    const loadPage = async () => {
        fetch(`${PUBLIC_BACKEND_SERVER}/guestbook?` + new URLSearchParams({
            index: currentPage,
            size: defaultPageSize
        })).then(result => result.json())
            .then(result => {
                comments = result.comments.map(singleComment => {
                    return {
                        name: singleComment.name,
                        password: '',
                        value: singleComment.value,
                        createdAt: singleComment.createdAt,
                        deletePressed: false
                    }
                })
            })
    }
    let comments: {name: string, password: string, value: string, createdAt: string, deletePressed: string}[] = [];

    // save and reload page
    let commentAuthor = '';
    let commentValue = '';
    let commentPassword = '';
    const addComment = async () => {
        if (commentAuthor === '') {
            alert("Error : 이름이 비어있습니다.");
            return;
        }
        if (commentValue === '') {
            alert("Error : 내용이 비어있습니다.");
            return;
        }

        const res = await fetch(`${PUBLIC_BACKEND_SERVER}/guestbook`, {
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
            await loadPage();
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
        deletePressed: boolean
    }) => {
        const res = await fetch(`${PUBLIC_BACKEND_SERVER}/guestbook`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "name": comment.name,
                "createdAt": comment.createdAt,
                "password": comment.password
            })
        })
        if (res.ok) {
            await loadPage();
        }else {
            const responseBody = (await res.json());
            if (responseBody.isDeleted) {
                alert(`Error : 삭제에 실패했습니다.\nlutergs@lutergs.dev 에게 문의해주세요.`)
            } else {
                alert(`Error : 삭제 상태에 에러가 발생했습니다.\nlutergs@lutergs.dev 에게 문의해주세요.\nerr : ${responseBody}`)
            }
            comment.deletePressed = false;
        }
    }

    // 앞 / 뒤로가기 버튼 함수
    const movePreviousPage = async () => {
        if (currentPage === 0) {
            alert('첫 번째 페이지입니다.')
        } else {
            currentPage -= 1;
            await loadPage();
        }
    }
    const moveNextPage = async() => {
        if (comments.length < defaultPageSize) {
            alert('마지막 페이지입니다.')
        } else {
            currentPage += 1;
            await loadPage();
        }
    }

</script>

<main style="background-color: #f5f5f5">
    {#await loadPage()}{/await}

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
        {#each comments as comment}
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
                        <Button compact variant='gradient' gradient={{ from: 'dark', to: 'orange', deg: 45 }}
                                on:click={() => {comment.deletePressed = true}}>
                            삭제
                        </Button>
                    {/if}
                </Group>
            </Paper>
            <Space h="md"/>
        {/each}
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

    <!-- 플로팅 버튼에 앞 / 뒤로가기 추가 -->
    <FloatingButton backlink={''}>
        <Paper override={{padding: "6px 6px 6px 6px"}}>
            <Group position="apart">
                <ClickablePaper onClick={movePreviousPage} padding={'11px 16px 11px 16px'}>◀️</ClickablePaper>
                <ClickablePaper onClick={moveNextPage} padding={'11px 16px 11px 16px'}>▶️</ClickablePaper>
            </Group>
        </Paper>
        <Paper>
            <Group position="center">
                <Text variant='gradient' weight='bold' gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>{currentPage + 1}</Text>
            </Group>
        </Paper>
    </FloatingButton>
</main>