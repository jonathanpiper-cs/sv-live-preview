import { getContent } from '$lib/contentstack.js';
import type { PageServerLoad } from './$types';
import type { IQueryParams } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
	const parameters: IQueryParams = {
		contentType: 'genre',
		queryParams: [{ key: 'url', value: url.pathname }],
	    jsonRteFields: ['description'],
	};
	url.searchParams.forEach((value, key) => {
	    parameters[key] = value;
	});
	const entries = await getContent(parameters);
	const entry = entries[0]
	return {
		entry
	};
};
