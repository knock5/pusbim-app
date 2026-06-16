import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [subjects, chapters] = await Promise.all([
		prisma.subject.findMany({
			orderBy: {
				name: 'asc'
			}
		}),

		prisma.chapter.findMany({
			include: {
				subject: true
			},
			orderBy: [
				{
					subject: {
						name: 'asc'
					}
				},
				{
					name: 'asc'
				}
			]
		})
	]);

	return { subjects, chapters };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const subjectId = String(formData.get('subjectId') ?? '').trim();

		if (!name) {
			return fail(400, { error: 'Name is required' });
		}

		const existing = await prisma.chapter.findFirst({
			where: {
				name,
				subjectId
			}
		});

		if (existing) {
			return fail(400, { error: 'Chapter already exists' });
		}

		if (!subjectId) {
			return fail(400, { error: 'Subject is required' });
		}

		await prisma.chapter.create({
			data: {
				name,
				description: String(formData.get('description') ?? '').trim(),
				subjectId
			}
		});

		return { success: true };
	}
};
