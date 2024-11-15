import { getContent } from '$lib/contentstack.js';
import type { PageServerLoad } from './$types';
import type { IQueryParams } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
	const parameters: IQueryParams = {
		contentType: 'landing_page',
		queryParams: [{ key: 'url', value: url.pathname }]
	};
    url.searchParams.forEach((value, key) => {
	    parameters[key] = value;
	});
    // console.log(Stack.config.live_preview)
	const entries = await getContent(parameters);
    const entry = entries[0]
	return {
		entry,
	};
}