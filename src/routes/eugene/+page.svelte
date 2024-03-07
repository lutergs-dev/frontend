<script lang="ts">
	import FloatingButton from '$lib/ui/floatingButton/FloatingButton.svelte';
	import { Text } from '@svelteuidev/core';
	import { goto } from '$app/navigation';
	import Vim from '$lib/ui/Vim.svelte';

	const onEnter = async (value: string) => {
		if (value == ':q' || value == ':q!') {
			await goto('/');
		} else if (value == ':/help') {
			const helpMessage =
				'Below commands are available\n' +
				`":q" or ":q!" : go back to main page\n` +
				`":/help" : show this help message`;
			alert(helpMessage);
		}
	};
</script>

<main>
	<Text
		override={{ fontSize: '2rem' }}
		variant="gradient"
		weight="bold"
		gradient={{ from: 'dark', to: 'cyan', deg: 45 }}>유진이 토스!</Text
	>

	<FloatingButton backlink={''} />
	<Vim {onEnter} />
</main>
