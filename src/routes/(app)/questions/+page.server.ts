import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const questions = await prisma.question.findMany({
		include: {
			subject: true,
			chapter: true,
			createdBy: {
				select: {
					fullName: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { questions };
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '').trim();
		const usedInExam = await prisma.examPackageQuestion.count({
			where: {
				questionId: id
			}
		});

		if (usedInExam > 0) {
			return fail(400, { error: 'Question is used in an exam package and cannot be deleted' });
		}

		await prisma.question.delete({
			where: { id }
		});

		throw redirect(303, '/questions');
	}
};
