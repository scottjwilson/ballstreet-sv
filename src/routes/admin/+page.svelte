<script lang="ts">
	import { get_all_athletes } from './athletes.remote';
	import { get_all_schools } from './schools.remote';

	const athletes = await get_all_athletes();
	const schools = await get_all_schools();
</script>

<ol>
	{#each athletes as athlete (athlete.id)}
		<li>{athlete.name}</li>
	{/each}
</ol>

<ol>
	{#each schools as school (school.id)}
		<li>{school.title}</li>
	{/each}
</ol>
