import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from '../auth/login/$typeslogin/$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const redirectTo = event.url.searchParams.get('redirectTo');
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) return fail(400, { email, password, emailError: 'Email is required' });
		if (!password) return fail(400, { email, password, passwordError: 'Password is required' });

		const { error: authError } = await event.locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (authError) {
			if (authError instanceof AuthApiError && authError.status === 400) {
				return fail(400, {
					email,
					password,
					emailError: 'Invalid credentials',
					passwordError: 'Invalid credentials'
				});
			}
		}

		if (redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`);
		}

		throw redirect(302, '/');
	}
};
