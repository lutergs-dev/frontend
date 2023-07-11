<script lang="ts">
    import {Button, Divider, Paper, Seo, Space, TextInput} from "@svelteuidev/core";
    import {useId} from "@svelteuidev/composables";
    import TinyMceViewer from "$lib/tinyMce/TinyMceViewer.svelte";
    import TinyMceEditor from "$lib/tinyMce/TinyMceEditor.svelte";
    import {Pencil1} from "radix-icons-svelte";
    import {browser} from "$app/environment";
    import {PUBLIC_BACKEND_SERVER} from "$env/static/public";

    let title = '';
    let paragraphs: string[] = [];
    let bindValue = '';

    function addParagraph(){
        paragraphs.push(bindValue);
        bindValue = '';
        paragraphs = paragraphs;
    }

    const deleteParagraph = (index) => {
        paragraphs.splice(index, 1)
        paragraphs = paragraphs;
    }

    const saveArticle = async () => {
        const uuid = useId();
        const result: {isSaved:boolean, data} = await fetch(`${PUBLIC_BACKEND_SERVER}/page`, {
            method: 'POST',
            headers: {"Content-Type": "Application/Json"},
            body: JSON.stringify({
                title: {
                    id: uuid,
                    name: title
                },
                paragraphs: paragraphs
            })
        }).then(result => result.json())
        .then(jsonResult => {
            return {
                isSaved: true,
                data: jsonResult
            }
        })
        .catch(err => {
            return {
                isSaved: false,
                data: err
            }
        })
        if (browser) {
            if (result.isSaved) {
                alert("저장이 완료되었습니다! 확인을 누르면 저장한 글로 이동합니다.");
                window.location.href = `/blog/${uuid}`;
            } else {
                alert(`저장에 실패했습니다!\nerr : ${result.data}`);
            }
        }
    }

</script>

<main style="background-color: #f5f5f5">

    <Seo
        title="New Article"
        titleTemplate="%t% | LuterGS"
    />

    <Paper>
        <TextInput
            label='글 제목'
            placeholder='글 제목을 입력해주세요'
            icon={Pencil1}
            bind:value={title}
        />
    </Paper>
    <Divider />
    {#each paragraphs as paragraph, i}
        <Paper>
            <TinyMceViewer>{@html paragraph}</TinyMceViewer>
            <Space h="md"/>
<!--            <Button variant='outline' color="red" compact>수정</Button>-->
<!--            <Space w="md"/>-->
            <Button color="red" compact on:click={() => {deleteParagraph({i})}} >삭제</Button>
        </Paper>
        <Space h="md"/>
    {/each}
    <Paper>
        <svelte:component this={TinyMceEditor} bind:value={bindValue}></svelte:component>
        <Space h="md"/>
        <Button align="right" on:click={addParagraph}>단락 저장</Button>
    </Paper>
    <Space h="md"/>
    <Paper>
        <Button align="right" on:click={saveArticle}>글 저장</Button>
    </Paper>
</main>