<script lang="ts">
	import { create_athlete } from '../../athletes.remote';
</script>

<div class="box-1">
	<h1>Add New Athlete</h1>
	<form {...create_athlete}>
		<div class="row">
			<label>
				Name:
				<input {...create_athlete.fields.name.as('text')} />
			</label>

			{#each create_athlete.fields.name.issues() as issue (issue.message)}
				<p>{issue.message}</p>
			{/each}

			<div class="row">
				<label>
					Evaluation:
					<input {...create_athlete.fields.evaluation.as('text')} />
				</label>
			</div>
			<div class="row">
				<label>
					Height:
					<input {...create_athlete.fields.height.as('text')} />
				</label>
			</div>
			<div class="row">
				<label>
					Weight:
					<input {...create_athlete.fields.weight.as('text')} />
				</label>
			</div>
			<div class="row">
				<label>
					Rank:
					<input {...create_athlete.fields.rank.as('text')} />
				</label>
			</div>

			<button type="submit">Add Athlete</button>
		</div>
	</form>
</div>
