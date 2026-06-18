import prisma from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import type { Actions } from '@sveltejs/kit';

import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return fail(400, { error: 'Email not found' });
		}

		const validPassword = await bcrypt.compare(password, user.passwordHash);

		if (!validPassword) {
			return fail(400, { error: 'Incorrect password' });
		}

		// set cookie for auth
		cookies.set('session', user.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // set to true in production
			maxAge: 2 * 60 * 60 // 2 hours
		});

		throw redirect(302, '/dashboard');
	}
};
