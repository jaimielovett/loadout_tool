import { supabase } from './supabase';

export async function getAllChassis() {
	const { data, error } = await supabase.from('chassis').select().order('name');

	if (error) throw error;
	return data;
}
