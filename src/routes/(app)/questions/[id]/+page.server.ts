import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const question = await prisma.question.findUnique({
		where: {
			id: params.id
		},
		include: {
			subject: true,
			chapter: true,
			options: true,
			createdBy: true
		}
	});

	if (!question) {
		throw error(404, 'Question not found');
	}

	return { question };
};
