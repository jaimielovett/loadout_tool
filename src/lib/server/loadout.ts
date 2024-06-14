import { supabase } from './supabase';

export async function createLoadout(userId: string) {
	const { error } = await supabase.from('loadout').insert({ user_id: userId });
	if (error) return error;

	return null;
}
