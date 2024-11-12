import { getContent } from '$lib/contentstack.js';
import type { PageServerLoad } from './$types';
import type { IGenre } from '$lib/types';

export const load: PageServerLoad = async () => {

	const parameters = {
		contentType: 'genre',
		queryParams: [],
	};
    // console.log(Stack.config.live_preview)
	const entries: IGenre[] = await getContent(parameters);
	return {
		entries
	};
}