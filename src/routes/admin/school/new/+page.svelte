<script lang="ts">
	import { create_school } from '../../schools.remote';
</script>

<div class="box-1">
	<h1>Add New School</h1>

	<form {...create_school}>
		<div class="row">
			<label>
				Name:
				<input {...create_school.fields.title.as('text')} />
			</label>
		</div>

		<button type="submit"> Add School </button>
	</form>
</div>
