import { error } from '@sveltejs/kit';

export function requireAdmin(user: App.Locals['user']) {
	if (!user || user.role !== 'ADMIN') {
		throw error(403, 'Forbidden');
	}
}
