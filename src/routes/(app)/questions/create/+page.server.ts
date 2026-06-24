import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [subjects, chapters] = await Promise.all([
		prisma.subject.findMany(),
		prisma.chapter.findMany()
	]);

	return { subjects, chapters };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const subjectId = String(formData.get('subjectId') ?? '').trim();
		const chapterId = String(formData.get('chapterId') ?? '').trim();
		const difficulty = String(formData.get('difficulty') ?? '').trim();
		const questionText = String(formData.get('questionText') ?? '').trim();
		const optionA = String(formData.get('optionA') ?? '').trim();
		const optionB = String(formData.get('optionB') ?? '').trim();
		const optionC = String(formData.get('optionC') ?? '').trim();
		const optionD = String(formData.get('optionD') ?? '').trim();
		const correctAnswer = String(formData.get('correctAnswer') ?? '').trim();
		const explanation = String(formData.get('explanation') ?? '').trim();

		if (!subjectId || !chapterId || !difficulty || !questionText) {
			return fail(400, { error: 'Subject, chapter, difficulty, and question are required' });
		}

		if (!optionA || !optionB || !optionC || !optionD || !correctAnswer) {
			return fail(400, { error: 'All answer options and the correct answer are required' });
		}

		if (!locals.user) {
			return fail(401, { error: 'You must be logged in to create a question' });
		}

		const chapter = await prisma.chapter.findFirst({
			where: {
				id: chapterId,
				subjectId
			}
		});

		if (!chapter) {
			return fail(400, { error: 'Chapter does not belong to the selected subject' });
		}

		await prisma.question.create({
			data: {
				subjectId,
				chapterId,
				createdById: locals.user.id,
				questionText,
				explanation: explanation || null,
				difficulty: difficulty as 'EASY' | 'MEDIUM' | 'HARD',
				options: {
					create: [
						{ label: 'A', text: optionA, isCorrect: correctAnswer === 'A' },
						{ label: 'B', text: optionB, isCorrect: correctAnswer === 'B' },
						{ label: 'C', text: optionC, isCorrect: correctAnswer === 'C' },
						{ label: 'D', text: optionD, isCorrect: correctAnswer === 'D' }
					]
				}
			}
		});

		throw redirect(303, '/questions');
	}
};
