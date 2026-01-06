<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="/">home</a>
<a href="/yo">Yko</a>

<main class="container">
	{@render children()}
</main>
