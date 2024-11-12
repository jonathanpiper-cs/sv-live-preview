import { getContent } from '$lib/contentstack.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ route }) => {

	const parameters = {
		contentType: 'landing_page',
		queryParams: [{ key: 'url', value: route.id }]
	};
    // console.log(Stack.config.live_preview)
	const entries = await getContent(parameters);
    const entry = entries[0]
	return {
		entry,
	};
}