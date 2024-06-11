import { supabase } from './supabase';

export async function getAllChassis() {
	const { data, error } = await supabase.from('chassis').select();

	if (error) throw error;
	return data;
}
