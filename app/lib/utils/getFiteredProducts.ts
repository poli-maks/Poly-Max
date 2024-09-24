import { Locale } from '@/i18n.config'

import {
  getAllProducts, // Change this from 'fetchAllProducts' to 'getAllProducts'
  getProductsByCategory, // Change from 'fetchProductsByCategory'
  getProductsBySubCategory, // Change from 'fetchProductsBySubCategory'
  searchProductsByTitle // Ensure this is correctly exported in services.ts
} from '../api/services'
import { SEARCH_PARAMS } from '../interfaces'

export const getFilteredProducts = async (
  lang: Locale,
  params: { [key in SEARCH_PARAMS]: string }
) => {
  const { category, page, sub, search, query } = params

  if (category) {
    const data = sub
      ? await getProductsBySubCategory(lang, parseInt(sub), parseInt(page)) // Updated function name
      : await getProductsByCategory(lang, category, parseInt(page)) // Updated function name

    return data
  }

  if (search && query) {
    const data = await searchProductsByTitle(lang, query, parseInt(page))
    return data
  }

  return await getAllProducts(lang, parseInt(page)) // Updated function name
}