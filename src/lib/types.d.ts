/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Stack } from '@contentstack/delivery-sdk/dist/types/stack';

export interface ILandingPage extends BaseEntry {
	uid: string;
	title: string;
	url: string;
	heading: string;
	body: string;
	banner: IAsset;
}

export interface IAsset {
	uid: string;
	filename: string;
	url: string;
	title: string;
	dimension: {
		height: number;
		width: number;
	};
	_metadata: any;
}

export interface IQueryParams {
    locale?: string
    contentType: string
	queryParams?: KeyValuePair[]
	previewQuery?: LivePreviewQuery & ReleasePreviewQuery
	includes?: string[]
	jsonRteFields?: string[]
}
export interface LivePreviewQuery {
	live_preview: string
	content_type_uid: string
	entry_uid: string
}

export interface KeyValuePair {
	key: string
	value: string | number | boolean
}