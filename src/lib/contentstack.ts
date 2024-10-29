import { Stack } from '$lib/deliverySdk';
import type { IQueryParams } from './types';

export const getEntry = async (params: IQueryParams) => {
    Stack.livePreviewQuery(Stack._client.stackConfig.live_preview)
	const query = await Stack.contentType(params.contentType).entry().query();
	// console.log(Stack._client.stackConfig.live_preview);
	if (params.queryParams) {
		params.queryParams.forEach((param) => {
			query.equalTo(param.key, param.value);
		});
	}

	const date: Date = new Date;
	const data = await query.find();
	console.log('title', data.entries[0].title, date);
	return data.entries[0];
};
