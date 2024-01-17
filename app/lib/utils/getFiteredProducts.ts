import { Locale } from '@/i18n.config'

import {
	fetchAllProducts,
	fetchProductsByCategory,
	fetchProductsBySubCategory,
	searchProductByTitle,
} from '../api/services'
import { SEARCH_PARAMS } from '../interfaces'

export const getFiteredProducts = async (
	lang: Locale,
	params: { [key in SEARCH_PARAMS]: string }
) => {
	const { category, page, sub, search, query } = params
	if (category) {
		if (sub) {
			const data = await fetchProductsBySubCategory(lang, parseInt(sub), parseInt(page))

			return data[0].attributes.products.data
		}
		const data = await fetchProductsByCategory(lang, category, parseInt(page))

		return data[0].attributes.products.data
	}
	if (search && query) {
		const data = await searchProductByTitle(lang, query, parseInt(page))

		return data
	}

	return await fetchAllProducts(lang, parseInt(page))
}
