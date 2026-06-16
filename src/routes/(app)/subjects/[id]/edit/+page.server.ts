import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const subject = await prisma.subject.findUnique({
		where: { id: params.id }
	});

	if (!subject) {
		throw error(404, 'Subject not found');
	}

	return { subject };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();

		if (!name) {
			return fail(400, { error: 'Name is required' });
		}

		const existing = await prisma.subject.findUnique({
			where: { name }
		});

		if (existing && existing.id !== params.id) {
			return fail(400, { error: 'Subject already exists' });
		}

		await prisma.subject.update({
			where: { id: params.id },
			data: {
				name,
				description
			}
		});

		throw redirect(303, '/subjects');
	}
};
