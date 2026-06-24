import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [subjects, chapters] = await Promise.all([
		prisma.subject.findMany(),
		prisma.chapter.findMany()
	]);

	return { subjects, chapters };
};
