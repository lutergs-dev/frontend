<script lang="ts">
	import { Alert, Button, Group, Paper, Seo, Space, Stack, Text, Title } from '@svelteuidev/core';
	import { InfoCircled } from 'radix-icons-svelte';
	import TinyMceViewer from '$lib/tinyMce/TinyMceViewer.svelte';
	import FloatingButton from '$lib/ui/floatingButton/FloatingButton.svelte';
	import { goto } from '$app/navigation';
	import Vim from '$lib/ui/Vim.svelte';
	import type { UserResponse } from '$lib/auth/Auth';
	import { Status, userStore } from '$lib/auth/Auth';

	/** @type {import('./$types').PageData} */
	export let data;
	let userResponse: UserResponse;
	userStore.subscribe((value: UserResponse) => {
		userResponse = value;
	});

	const pageName = data.isReceived ? data.pageKey.title : '로딩 실패!';

	const createdAtString = () => {
		const raw = data.pageKey.createdAt;
		return `${raw.slice(0, 4)}년 ${raw.slice(5, 7)}월 ${raw.slice(8, 10)}일, ${raw.slice(
			11,
			13
		)}시 ${raw.slice(14, 16)}분`;
	};

	const editPage = async () => {
		if (userResponse.status === Status.Normal) {
			await goto(`/blog/${data.pageKey.endpoint}/edit`);
		} else {
			// TODO : 잘못된 접근이라는 API 구현 필요
		}
	};

	// const deletePage = async() => {
	//     if (userResponse.status === Status.Normal) {
	//
	//     }
	// }

	const onEnter = async (value: string) => {
		if (value == ':q') {
			await goto('/blog');
		} else if (value == ':q!') {
			await goto('/');
		} else if (value == ':/help') {
			const helpMessage =
				'Below commands are available\n' +
				`":q" : go back to blog article list page\n` +
				`":q!" : go back to main page\n` +
				`":/help" : show this help message`;
			alert(helpMessage);
		}
	};
</script>

<main style="background-color: #f5f5f5">
	<Seo title={pageName} titleTemplate="%t% | {data.pageKey.nickname}" />

	<Paper>
		<Stack>
			<Group position="left">
				<Title
					order={1}
					variant="gradient"
					weight="bold"
					gradient={{ from: 'dark', to: 'cyan', deg: 45 }}
				>
					{pageName}
				</Title>
			</Group>
			<Group position="apart">
				<Text>by <b>{data.pageKey.nickname}</b></Text>
				<Text>at {createdAtString()}</Text>
			</Group>
		</Stack>
	</Paper>
	<Space h="md" />
	{#if data.isReceived === true}
		{#each data.pageValue.paragraphs as paragraph}
			<Paper>
				<TinyMceViewer>{@html paragraph}</TinyMceViewer>
			</Paper>
			<Space h="md" />
		{/each}
<!--		<Paper>-->
<!--			<Group position="right">-->
<!--				<Button-->
<!--					variant="gradient"-->
<!--					gradient={{ from: 'dark', to: 'cyan', deg: 45 }}-->
<!--					on:click={() => {}}-->
<!--				>-->
<!--					글 수정-->
<!--				</Button>-->
<!--				<Space w="md" />-->
<!--				&lt;!&ndash;                <Button variant="gradient" gradient={{ from: 'red', to: 'gray', deg: 45 }} on:click={() => {}}>&ndash;&gt;-->
<!--				&lt;!&ndash;                    글 삭제&ndash;&gt;-->
<!--				&lt;!&ndash;                </Button>&ndash;&gt;-->
<!--			</Group>-->
<!--		</Paper>-->
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
