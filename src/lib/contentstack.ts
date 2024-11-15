import { Stack, addEditableTags } from '$lib/deliverySdk.js';
import Personalize from '@contentstack/personalize-edge-sdk';
import type { IQueryParams, IGenre } from './types.js';
import { jsonToHtml } from '@contentstack/json-rte-serializer';

export const getContent = async (params: IQueryParams) => {
	console.log('params', params);
	Stack.livePreviewQuery(Stack._client.stackConfig.live_preview);
	const variantParam = params[Personalize.VARIANT_QUERY_PARAM] as string;
	console.log(Personalize.VARIANT_QUERY_PARAM, 'variantParam: %s', variantParam);
	let entryQuery = await Stack.contentType(params.contentType).entry();

	if (variantParam) {
		const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(',');
		console.log(variantAlias);
		entryQuery = entryQuery.variants(variantAlias);
		console.log('_variants after .variants(): %s', entryQuery._variants);
	}
	// console.log('query after variants()', entryQuery);
	// if (params.contentType === 'genre') console.log(entryQuery._variants);
	entryQuery = entryQuery.query();
	// if (params.queryParams) {
	// 	params.queryParams.forEach((param) => {
	// 		entryQuery.equalTo(param.key, param.value);
	// 	});
	// }
	console.log('_variants after .query(): %s', entryQuery._variants);

	if (variantParam)
		entryQuery._variants = Personalize.variantParamToVariantAliases(variantParam).join(',');
	// console.log('postQuery', entryQuery);
	// if (params.contentType === 'genre') console.log(entryQuery._variants, entryQuery);
	const data = await entryQuery.addParams({ include_applied_variants: 'true' }).find();
	addEditableTags(data.entries[0], params.contentType);
	const entries = data.entries;
	if (entries && entries.length > 0) {
		entries.forEach((entry: IGenre) => {
			if (params.jsonRteFields) {
				params.jsonRteFields.forEach((field) => {
					if (entry[field]) {
						entry[field] = jsonToHtml(entry[field]);
					}
				});
			}
			if (entry.$) {
				Object.keys(entry.$).forEach((key) => {
					if (entry.$[key].includes('data-cslp=')) {
						entry.$[key] = entry.$[key].replace('data-cslp=', '');
					}
				});
			}
		});
	}
	return params.singleton ? entries[0] : entries;
};
