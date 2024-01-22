import { SEARCH_PARAMS } from '@/app/lib/interfaces'
import { getFiteredProducts } from '@/app/lib/utils/getFiteredProducts'
import { Locale } from '@/i18n.config'
import { Text } from '@chakra-ui/react'
import React from 'react'

import LoadMore from '../CatalogPage/LoadMore/LoadMore'
import ProductList from '../CatalogPage/ProductList/ProductList'

interface IProducts {
	searchParams: { [key in SEARCH_PARAMS]: string }
	lang: Locale
	btnText: string
	notFound: string
}

const Products = async ({ searchParams, btnText, lang, notFound }: IProducts) => {
	let products
	let totalProducts

	const response = await getFiteredProducts(lang, searchParams)

	if (response && typeof response === 'object') {
		const { data, count } = response

		products = data
		totalProducts = count
	} else if (response && typeof response === 'string') {
		products = response
	}

	return (
		<>
			{Array.isArray(products) && <ProductList products={products} lang={lang} />}

			{typeof products === 'string' && (
				<Text fontSize={'20px'} lineHeight={1} fontWeight={600}>
					{notFound}
				</Text>
			)}

			{totalProducts && (
				<LoadMore total={totalProducts.toString()} hasProducts={!!Array.isArray(products)}>
					{btnText}
				</LoadMore>
			)}
		</>
	)
}

export default Products
