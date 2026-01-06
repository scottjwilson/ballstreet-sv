import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { sequence } from '@sveltejs/kit/hooks';

// export const handle: Handle = async ({ event, resolve }) => {
// 	console.log('Before page hit');
// 	const response = await resolve(event);
// 	console.log('After page hit');
// 	return response;
// };

const authHandle: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(authHandle);
