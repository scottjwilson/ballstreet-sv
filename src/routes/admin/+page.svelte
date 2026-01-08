<script lang="ts">
	import { get_all_athletes } from './athletes.remote';
	import { get_all_schools } from './schools.remote';

	const athletes = await get_all_athletes();
	const schools = await get_all_schools();

	type SortField = 'rank' | 'evaluation' | null;
	type SortDirection = 'asc' | 'desc';

	let sortField: SortField = $state(null);
	let sortDirection: SortDirection = $state('asc');

	function sortBy(field: 'rank' | 'evaluation') {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDirection = 'asc';
		}
	}

	function parseValue(value: string): number | string {
		const num = Number(value);
		return isNaN(num) ? value : num;
	}

	const sortedAthletes = $derived([...athletes].sort((a, b) => {
		if (!sortField) return 0;

		const aValue = parseValue(a[sortField]);
		const bValue = parseValue(b[sortField]);

		let comparison = 0;
		if (typeof aValue === 'number' && typeof bValue === 'number') {
			comparison = aValue - bValue;
		} else {
			comparison = String(aValue).localeCompare(String(bValue));
		}

		return sortDirection === 'asc' ? comparison : -comparison;
	}));
</script>

<div class="box-1 overflow-x-auto">
	<table class="w-full">
		<thead>
			<tr class="border-b border-subtle">
				<th class="text-left p-4 text-sm font-semibold text-secondary">Name</th>
				<th 
					class="text-left p-4 text-sm font-semibold text-secondary cursor-pointer hover:text-primary transition"
					onclick={() => sortBy('rank')}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && sortBy('rank')}
				>
					<div class="flex items-center gap-2">
						<span>Rank</span>
						{#if sortField === 'rank'}
							<span class="text-xs">
								{sortDirection === 'asc' ? '↑' : '↓'}
							</span>
						{/if}
					</div>
				</th>
				<th 
					class="text-left p-4 text-sm font-semibold text-secondary cursor-pointer hover:text-primary transition"
					onclick={() => sortBy('evaluation')}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && sortBy('evaluation')}
				>
					<div class="flex items-center gap-2">
						<span>Evaluation</span>
						{#if sortField === 'evaluation'}
							<span class="text-xs">
								{sortDirection === 'asc' ? '↑' : '↓'}
							</span>
						{/if}
					</div>
				</th>
				<th class="text-left p-4 text-sm font-semibold text-secondary">Height</th>
				<th class="text-left p-4 text-sm font-semibold text-secondary">Weight</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedAthletes as athlete (athlete.id)}
				<tr class="border-b border-subtle hover:bg-surface-1 transition">
					<td class="p-4 text-primary font-medium">{athlete.name}</td>
					<td class="p-4 text-secondary">
						<span class="badge badge-accent">{athlete.rank}</span>
					</td>
					<td class="p-4 text-secondary">{athlete.evaluation}</td>
					<td class="p-4 text-secondary">{athlete.height}</td>
					<td class="p-4 text-secondary">{athlete.weight}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<ol>
	{#each schools as school (school.id)}
		<li>{school.title}</li>
	{/each}
</ol>

<style>
	table {
		border-collapse: collapse;
	}
	
	tbody tr:last-child {
		border-bottom: none;
	}
</style>