import { Stack } from '$lib/deliverySdk';
import type { LivePreviewQuery } from '@contentstack/delivery-sdk';
import Personalize from '@contentstack/personalize-edge-sdk';
import { PUBLIC_CS_PERSONALIZE_PROJECT_UID, PUBLIC_CS_PERSONALIZE_EDGE_API_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

	if (PUBLIC_CS_PERSONALIZE_EDGE_API_URL) {
		Personalize.setEdgeApiUrl(PUBLIC_CS_PERSONALIZE_EDGE_API_URL);
	}	
    await Personalize.init(PUBLIC_CS_PERSONALIZE_PROJECT_UID as string, {request: event.request});

    console.dir(Personalize, 4)
    console.log(Personalize.getVariants())

	const variantParam = Personalize.getVariantParam();
    console.log(event.request.url)
    console.log(variantParam)
	const searchParams = event.url.searchParams;
	const parsedUrl = new URL(event.url);

    // console.log('pre', event.url)
	parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);
    console.log(parsedUrl.href)
	event.url = parsedUrl;
	const livePreviewQuery: LivePreviewQuery = {
		live_preview: searchParams.get('live_preview') || '',
		contentTypeUid: searchParams.get('content_type_uid') || '',
		entryUid: searchParams.get('entry_uid') || ''
	};
    // console.log('post', event.url)
	const response = await resolve(event);
	// const modifiedResponse = new Response(response.body, response);
	await Personalize.addStateToResponse(response);
    response.headers.set('cache-control', 'no-store');
	if (livePreviewQuery && livePreviewQuery.live_preview) {
		Stack.livePreviewQuery(livePreviewQuery);
	}
	return response;
};
