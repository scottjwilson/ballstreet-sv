<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
	<a href="/">home</a>
	<a href="/admin">Admin</a>
	<a href="/admin/athlete/new">New Athlete</a>
	<a href="/admin/school/new">New School</a>
</div>
<main class="container">
	{@render children()}
</main>
