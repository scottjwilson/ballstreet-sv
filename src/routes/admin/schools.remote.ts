import { form, getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';
import { db } from '$lib/server/db';
import { school } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import * as v from 'valibot';

export const get_all_schools = query(async () => db.query.school.findMany());

export const create_school = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty('title is required'))
	}),
	async ({ title }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user.id) {
			error(401, 'Unauthroized');
		}

		await db.insert(school).values({
			id: randomUUID(),
			title
		});
		redirect(303, '/admin');
	}
);
