<script lang="ts">
	import {
		Alert,
		Button,
		Divider,
		Group,
		Paper,
		Seo,
		Space,
		Stack,
		Text,
		TextInput,
		Title
	} from '@svelteuidev/core';
	import { InfoCircled, Pencil1 } from 'radix-icons-svelte';
	import TinyMceViewer from '$lib/tinyMce/TinyMceViewer.svelte';
	import FloatingButton from '$lib/ui/floatingButton/FloatingButton.svelte';
	import { goto } from '$app/navigation';
	import Vim from '$lib/ui/Vim.svelte';
	import TinyMceEditor from '$lib/tinyMce/TinyMceEditor.svelte';
	import { env } from '$env/dynamic/public';
	import { browser } from '$app/environment';

	/** @type {import('./$types').PageData} */
	export let data;
	const pageName = data.isReceived ? data.pageKey.title : '로딩 실패!';

	let title = pageName;
	let paragraphs: string[] = data.pageValue.paragraphs;
	let bindValue = '';

	function addParagraph() {
		paragraphs.push(bindValue);
		bindValue = '';
		paragraphs = paragraphs;
	}

	const deleteParagraph = (index) => {
		paragraphs.splice(index.i, 1);
		paragraphs = paragraphs;
	};

	const editArticle = async () => {
		return fetch(`${env.PUBLIC_BACKEND_SERVER}/pages/${data.pageKey.endpoint}`, {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'Application/Json' },
			body: JSON.stringify({
				title: title,
				paragraphs: paragraphs
			})
		}).then(async (response) => {
			if (browser) {
				if (response.status === 200) {
					alert('저장이 완료되었습니다! 확인을 누르면 저장한 글로 이동합니다.');
					await goto(`/blog/${data.pageKey.endpoint}`);
				} else {
					response.json().then((json) => {
						alert(`저장에 실패했습니다!\nerr: ${json.error}`);
					});
				}
			}
		});
	};

	const onEnter = async (value: string) => {
		if (value == ':q') {
			await goto(`/blog/${data.pageKey.endpoint}`);
		} else if (value == ':q!') {
			await goto('/');
		} else if (value == ':/help') {
			const helpMessage =
				'Below commands are available\n' +
				`":w : update article\n` +
				`":q" : go back to blog article page\n` +
				`":q!" : go back to main page\n` +
				`":/help" : show this help message`;
			alert(helpMessage);
		}
	};
</script>

<main style="background-color: #f5f5f5">
	<Seo title={pageName} titleTemplate="%t% | {data.pageKey.nickname}" />

	<Paper>
		<TextInput
			label="글 제목"
			placeholder="글 제목을 입력해주세요"
			icon={Pencil1}
			bind:value={title}
		/>
	</Paper>
	<Divider />
	{#if data.isReceived === true}
		{#each paragraphs as paragraph, i}
			<Paper>
				<TinyMceViewer>{@html paragraph}</TinyMceViewer>
				<Space h="md" />
				<Button
					color="red"
					compact
					on:click={() => {
						deleteParagraph({ i });
					}}>삭제</Button
				>
			</Paper>
			<Space h="md" />
		{/each}
		<Paper>
			<svelte:component this={TinyMceEditor} bind:value={bindValue} />
			<Space h="md" />
			<Button
				align="right"
				on:click={() => {
					addParagraph();
				}}>단락 저장</Button
			>
		</Paper>
		<Space h="md" />
		<Paper>
			<Button
				align="right"
				on:click={() => {
					editArticle();
				}}>글 저장</Button
			>
		</Paper>
	{:else}
		<Paper>
			<Alert icon={InfoCircled} title="이런!">
				<p>글을 받아오는 데 실패했습니다! 새로고침해 주세요.</p>
				<p>err : {data.error}</p>
			</Alert>
		</Paper>
	{/if}

	<FloatingButton backlink={'blog'} />
	<Vim {onEnter} />
</main>
