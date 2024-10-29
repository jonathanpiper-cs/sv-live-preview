// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getEntry } from '$lib/contentstack';
// import { onEntryChange } from '$lib/deliverySdk';
// import { Stack } from '$lib/deliverySdk.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ route, depends }) {
	depends('livepreview');

	const parameters = {
		contentType: 'landing_page',
		queryParams: [{ key: 'url', value: route.id }]
	};
    // console.log(Stack.config.live_preview)
	const entry = await getEntry(parameters);
	return {
		entry,
	};
}