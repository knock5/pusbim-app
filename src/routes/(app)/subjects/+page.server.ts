import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../../login/$types';

export const load: PageServerLoad = async () => {
	const subjects = await prisma.subject.findMany({
		orderBy: {
			name: 'asc'
		}
	});

	return { subjects };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = String(formData.get('name'));
		const existing = await prisma.subject.findUnique({
			where: { name }
		});

		if (existing) {
			return fail(400, { error: 'Subject already exists' });
		}

		if (!name) {
			return fail(400, { error: 'Name is required' });
		}

		await prisma.subject.create({
			data: {
				name
			}
		});

		return { success: true };
	}
};
