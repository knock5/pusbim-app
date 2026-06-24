import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const questions = await prisma.question.findMany({
		include: {
			subject: true,
			chapter: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { questions };
};
