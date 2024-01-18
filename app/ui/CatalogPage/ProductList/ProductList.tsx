'use client'

import useCategorySearchString from '@/app/lib/hooks/useCategorySearchString'
import { IProduct } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Grid, Text } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import ProductItem from '../ProductItem/ProductItem'

interface IProductList {
	products: IProduct[]
	lang: Locale
	totalProducts?: number
}

const ProductList = ({ products, lang, totalProducts }: IProductList) => {
	const { createString } = useCategorySearchString()

	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	const search = params.get('search') || ''

	useEffect(() => {
		if (!search && totalProducts)
			createString({
				total: totalProducts,
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalProducts])

	return (
		<Grid
			as={'ul'}
			maxW={'100%'}
			gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
			gridGap={10}
			m={'0 auto'}
			padding={0}
		>
			{products.length > 0 ? (
				products.map((product) => (
					<ProductItem key={product.attributes.uid} product={product} lang={lang} />
				))
			) : (
				<Text fontSize={'20px'} fontWeight={600}>
					0 products
				</Text>
			)}
		</Grid>
	)
}

export default ProductList
