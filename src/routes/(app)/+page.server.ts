import { getAllChassis } from '$lib/server/chassis';

export async function load() {
	const chassis = await getAllChassis();

	return { chassis };
}
