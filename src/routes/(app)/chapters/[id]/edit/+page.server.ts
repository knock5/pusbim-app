import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [chapter, subjects] = await Promise.all([
		prisma.chapter.findUnique({
			where: { id: params.id }
		}),

		prisma.subject.findMany({
			orderBy: {
				name: 'asc'
			}
		})
	]);

	if (!chapter) {
		throw error(404, 'Chapter not found');
	}

	return { chapter, subjects };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const subjectId = String(formData.get('subjectId') ?? '').trim();

		if (!name) {
			return { error: 'Name is required' };
		}

		if (!subjectId) {
			return { error: 'Subject is required' };
		}

		const existing = await prisma.chapter.findFirst({
			where: {
				id: params.id
			}
		});

		if (!existing) {
			return { error: 'Chapter not found' };
		}

		await prisma.chapter.update({
			where: { id: params.id },
			data: {
				name,
				description,
				subjectId
			}
		});

		throw redirect(303, '/chapters');
	}
};
