import { Locale } from '@/i18n.config'

import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsBySubCategory,
  searchProductsByTitle,
} from '../api/services'
import { SEARCH_PARAMS } from '../interfaces'

export const getFilteredProducts = async (
  lang: Locale,
  params: { [key in SEARCH_PARAMS]: string }
) => {
  const { category, page, sub, search, query } = params

  // If a category is provided, check for sub-category and fetch accordingly
  if (category) {
    const data = sub
      ? await fetchProductsBySubCategory(lang, parseInt(sub), parseInt(page))
      : await fetchProductsByCategory(lang, category, parseInt(page))

    return data
  }

  // If a search query is provided, fetch products by title
  if (search && query) {
    const data = await searchProductsByTitle(lang, query, parseInt(page))
    return data
  }

  // Default to fetching all products if no filters are applied
  return await fetchAllProducts(lang, parseInt(page))
}
