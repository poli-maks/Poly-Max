import { Locale } from "@/i18n.config";

import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductsBySubCategory,
  searchProductsByTitle,
} from "../api/services";
import { SEARCH_PARAMS } from "../interfaces";

export const getFiteredProducts = async (
  lang: Locale,
  params: { [key in SEARCH_PARAMS]: string },
) => {
  const { category, page, sub, search, query } = params;
  if (category) {
    const data = sub
      ? await fetchProductsBySubCategory(lang, parseInt(sub), parseInt(page))
      : await fetchProductsByCategory(lang, category, parseInt(page));

    return data;
  }
  if (search && query) {
    const data = await searchProductsByTitle(lang, query, parseInt(page));

    return data;
  }

  return await fetchAllProducts(lang, parseInt(page));
};
