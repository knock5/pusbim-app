import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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
		const name = String(formData.get('name') ?? '').trim();

		if (!name) {
			return fail(400, { error: 'Name is required' });
		}

		const existing = await prisma.subject.findUnique({
			where: { name }
		});

		if (existing) {
			return fail(400, { error: 'Subject already exists' });
		}

		const description = String(formData.get('description') ?? '').trim();

		await prisma.subject.create({
			data: {
				name,
				description
			}
		});

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '').trim();

		const chapterCount = await prisma.chapter.count({
			where: { subjectId: id }
		});

		if (chapterCount > 0) {
			return fail(400, { error: 'Cannot delete subject with chapters' });
		}

		await prisma.subject.delete({
			where: { id }
		});

		return { success: true };
	}
};
