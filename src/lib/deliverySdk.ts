import Contentstack from '@contentstack/delivery-sdk';
import {
	CS_API_KEY,
	CS_DELIVERY_TOKEN,
	CS_ENVIRONMENT,
	CS_PREVIEW_TOKEN,
	CS_PREVIEW_HOST
	// CS_APP_HOST,
} from '$env/static/private';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stackDefault = (Contentstack as any).default || Contentstack;

export const Stack = stackDefault.stack({
	apiKey: CS_API_KEY,
	deliveryToken: CS_DELIVERY_TOKEN,
	environment: CS_ENVIRONMENT,
	live_preview: {
		emable: true,
		preview_token: CS_PREVIEW_TOKEN,
		host: CS_PREVIEW_HOST
	},
	fetchOptions: {
		debug: true,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		logHandler: function (level: any, data: any) {
			console.log('stack.debug> level: ', level, ', data: ', data);
		}
	}
});

ContentstackLivePreview.init({ stackDetails: { apiKey: CS_API_KEY } });
