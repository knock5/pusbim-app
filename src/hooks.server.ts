import prisma from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const protectedRoutes = ['/dashboard', '/admin', '/questions', '/subjects', '/exams'];

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (session) {
		const user = await prisma.user.findUnique({
			where: { id: session }
		});

		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	const isProtected = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	if (isProtected && !event.locals.user) {
		throw redirect(302, '/login');
	}

	return resolve(event);
};
