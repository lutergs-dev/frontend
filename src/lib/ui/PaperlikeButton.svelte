<script>
	import { Button } from '@svelteuidev/core';

	export let onClick;
	export let padding = '0px';
</script>

<Button
	on:click={onClick}
	override={{
		padding: padding,
		outline: '0px',
		color: 'black',
		textDecoration: 'none',
		backgroundColor: 'white',
		boxSizing: 'border-box',
		'-webkit-tap-highlight-color': 'transparent',
		boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px',
		'&:hover': {
			backgroundColor: '#F1F1F1'
		}
	}}
>
	<slot />
</Button>
