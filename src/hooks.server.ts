import { Stack } from '$lib/deliverySdk';
import type { LivePreviewQuery } from '@contentstack/delivery-sdk'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const searchParams = event.url.searchParams;
	const livePreviewQuery: LivePreviewQuery = {
		live_preview: searchParams.get('live_preview') || '',
		contentTypeUid: searchParams.get('content_type_uid') || '',
		entryUid: searchParams.get('entry_uid') || ''
	};
    // console.log(event.url.searchParams)
	// console.log(livePreviewQuery);
	if (livePreviewQuery && livePreviewQuery.live_preview) {
		console.log('Live Preview detected');
		Stack.livePreviewQuery(livePreviewQuery);
	}
	const response = await resolve(event);
	return response;
}
