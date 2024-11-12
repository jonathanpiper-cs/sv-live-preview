import { Stack } from '$lib/deliverySdk';
import type { LivePreviewQuery } from '@contentstack/delivery-sdk';
import Personalize from '@contentstack/personalize-edge-sdk';
import { PUBLIC_CS_PERSONALIZE_PROJECT_UID, PUBLIC_CS_PERSONALIZE_EDGE_API_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // console.log(event)
	const projectUid = PUBLIC_CS_PERSONALIZE_PROJECT_UID as string;
	if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
		Personalize.setEdgeApiUrl(PUBLIC_CS_PERSONALIZE_EDGE_API_URL);
	}
	await Personalize.init(projectUid);
	const variantParam = Personalize.getVariantParam();
	const searchParams = event.url.searchParams;
	const parsedUrl = new URL(event.url);

    // console.log('pre', event.url)
	parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);
	event.url = parsedUrl;
	const livePreviewQuery: LivePreviewQuery = {
		live_preview: searchParams.get('live_preview') || '',
		contentTypeUid: searchParams.get('content_type_uid') || '',
		entryUid: searchParams.get('entry_uid') || ''
	};
    // console.log('post', event.url)
	const response = await resolve(event);
	const modifiedResponse = new Response(response.body, response);
	await Personalize.addStateToResponse(modifiedResponse);
    modifiedResponse.headers.set('cache-control', 'no-store');
	if (livePreviewQuery && livePreviewQuery.live_preview) {
		Stack.livePreviewQuery(livePreviewQuery);
	}
	return modifiedResponse;
};
