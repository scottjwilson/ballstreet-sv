import { form, getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';
import { db } from '$lib/server/db';
import { athlete } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import * as v from 'valibot';

export const get_all_athletes = query(async () => db.query.athlete.findMany());

export const create_athlete = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		evaluation: v.pipe(v.string(), v.nonEmpty()),
		height: v.pipe(v.string(), v.nonEmpty()),
		weight: v.pipe(v.string(), v.nonEmpty()),
		rank: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ name, evaluation, height, weight, rank }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user.id) {
			error(401, 'Unauthroized');
		}

		await db.insert(athlete).values({
			id: randomUUID(),
			name,
			evaluation,
			height,
			weight,
			rank
		});
		redirect(303, '/admin');
	}
);
