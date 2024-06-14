import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:loadouts');
	const { data: loadouts } = await supabase.from('loadouts').select().order('name');
	return { loadouts: loadouts ?? [] };
};
