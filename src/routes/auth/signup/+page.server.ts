import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirm') as string;

		if (!email)
			return fail(400, {
				email,
				password,
				passwordConfirm,
				error: { email: 'Email is required', password: '', passwordConfirm: '', signUp: '' }
			});
		if (!password)
			return fail(400, {
				email,
				password,
				passwordConfirm,
				error: { email: '', password: 'Password is required', passwordConfirm: '', signUp: '' }
			});
		if (!passwordConfirm)
			return fail(400, {
				email,
				password,
				passwordConfirm,
				error: {
					email: '',
					password: '',
					passwordConfirm: 'Password confirmation is required',
					signUp: ''
				}
			});
		if (password !== passwordConfirm)
			return fail(400, {
				email,
				password,
				passwordConfirm,
				error: { email: '', password: '', passwordConfirm: 'Passwords do not match', signUp: '' }
			});

		const { error } = await event.locals.supabase.auth.signUp({
			email: email,
			password: password
		});

		if (error) {
			return fail(400, {
				email,
				password,
				passwordConfirm,
				error: { email: '', password: '', passwordConfirm: '', signUp: error.message }
			});
		}

		return {
			email,
			password,
			passwordConfirm,
			error: { email: '', password: '', passwordConfirm: '', signUp: '' }
		};
	}
};
