import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:loadouts');
	const { data: loadouts } = await supabase.from('loadouts').select().order('name');
	return { loadouts: loadouts ?? [] };
};

export const actions: Actions = {
	createLoadout: async ({ locals: { user, supabase } }) => {
		if (!user) redirect(302, '/login');
		const { error, data } = await supabase
			.from('loadouts')
			.insert({ user_id: user.id, name: 'New Loadout' })
			.select()
			.single();

		if (error) console.log('error');
		if (data) redirect(302, `/loadouts/${data.id}`);
	}
};
