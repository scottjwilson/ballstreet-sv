<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';

	console.log('page load');
	let error = $state('');

	async function signup(e: Event) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const username = form.username.value;
		const email = form.email.value;
		const password = form.password.value;
		const password_confirm = form.password_confirm.value;

		if (password !== password_confirm) {
			error = 'That aint it, chief.';
			return;
		}

		if (!username || !email || !password || !password_confirm) {
			error = 'All fields are required.';
			return;
		}

		await authClient.signUp.email(
			{
				email,
				password,
				name: username
			},
			{
				onSuccess: async () => {
					goto(resolve('/'));
				}
			}
		);
	}
</script>

<div class="box-1">
	<h1>Signup</h1>
	<form onsubmit={signup}>
		<div class="row">
			<label>
				Username:
				<input required type="text" id="username" />
			</label>
		</div>
		<div class="row">
			<label>
				Email:
				<input required type="email" id="email" />
			</label>
		</div>
		<div class="row">
			<label>
				Password:
				<input required type="password" id="password" />
			</label>
		</div>
		<div class="row">
			<label>
				Confirm Password:
				<input required type="password" id="password_confirm" />
			</label>
		</div>
		{#if error}
			<p>{error}</p>
		{/if}
		<button>Sign Up</button>
	</form>
</div>
