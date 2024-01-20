import { SEARCH_PARAMS } from '@/app/lib/interfaces'
import { getFiteredProducts } from '@/app/lib/utils/getFiteredProducts'
import { Locale } from '@/i18n.config'
import { Grid, Text } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import React from 'react'

import LoadMore from '../LoadMore/LoadMore'
import ProductItem from '../ProductItem/ProductItem'

export const dynamic = 'force-dynamic'

interface IProductList {
	searchParams: { [key in SEARCH_PARAMS]: string }
	lang: Locale
	btnText: string
	notFound: string
}

const ProductList = async ({ searchParams, lang, btnText, notFound }: IProductList) => {
	const response = await getFiteredProducts(lang, searchParams)

	let products
	let totalProducts

	if (response && typeof response === 'object') {
		const { data, count } = response
		products = data
		totalProducts = count
	} else if (response && typeof response === 'string') {
		products = response
	}

	return (
		<>
			<Grid
				key={nanoid()}
				as={'ul'}
				// maxW={'100%'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={'20px'}
				m={'0 auto'}
				padding={0}
			>
				{Array.isArray(products) &&
					products.length > 0 &&
					products.map((product) => (
						<ProductItem key={product.attributes.uid} product={product} lang={lang} />
					))}
			</Grid>

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

export default ProductList
