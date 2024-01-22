'use client'
import useCategorySearchString from '@/app/lib/hooks/useCategorySearchString'
import { IProduct } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Grid } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'

import ProductItem from '../ProductItem/ProductItem'

export const dynamic = 'force-dynamic'

interface IProductList {
	products: IProduct[]
	lang: Locale
}

const ProductList = ({ products, lang }: IProductList) => {
	const [productsInit, setProducts] = useState<IProduct[]>([])
	const { searchParams } = useCategorySearchString()
	const page = searchParams.get('page')

	useEffect(() => {
		if (page && parseInt(page) > 1) {
			setProducts((prev) => [...prev, ...products])
			localStorage.setItem('page', page as string)
		} else setProducts(products)
	}, [page, products])

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
				{Array.isArray(productsInit) &&
					productsInit.length > 0 &&
					productsInit.map((product) => (
						<ProductItem key={product.attributes.uid} product={product} lang={lang} />
					))}
			</Grid>
		</>
	)
}

export default ProductList
