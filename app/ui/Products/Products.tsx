'use client'

import { IProduct, SEARCH_PARAMS } from '@/app/lib/interfaces'
import { getFiteredProducts } from '@/app/lib/utils/getFiteredProducts'
import { Locale } from '@/i18n.config'
import { Text } from '@chakra-ui/react'
import { parseAsInteger, useQueryState } from 'nuqs'
import React, { useEffect, useState } from 'react'

import LoadMore from '../CatalogPage/LoadMore/LoadMore'
import ProductList from '../CatalogPage/ProductList/ProductList'
import ProductListSkeleton from '../Skeletons/ProductListSkeleton'

interface IProducts {
	searchParams: { [key in SEARCH_PARAMS]: string }
	lang: Locale
	btnText: string
	notFound: string
}

const Products = ({ searchParams, btnText, lang, notFound }: IProducts) => {
	const [products, setProducts] = useState<string | IProduct[]>()
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [total, setTotal] = useQueryState('total', parseAsInteger)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				if (page.toString() === localStorage.getItem('page')) {
					localStorage.removeItem('page')

					return setPage(1)
				}
				if (searchParams.query && searchParams.search === 'true') {
					const response = await getFiteredProducts(lang, {
						[SEARCH_PARAMS.PAGE]: page.toString(),
						[SEARCH_PARAMS.QUERY]: searchParams.query,
						[SEARCH_PARAMS.SEARCH]: searchParams.search,
						[SEARCH_PARAMS.CATEGORY]: '',
						[SEARCH_PARAMS.SUB_CATEGORY]: '',
						[SEARCH_PARAMS.TOTAL]: '',
					})

					if (response && typeof response === 'object') {
						const { data, count } = response

						setProducts(data)
						setTotal(count)
					} else if (response && typeof response === 'string') {
						setProducts(response)
					}

					return
				} else if (!searchParams.query) {
					const response = await getFiteredProducts(lang, {
						...searchParams,
						page: page.toString(),
					})
					if (response && typeof response === 'object') {
						const { data, count } = response
						if (Array.isArray(data) && page > 1) {
							setProducts((prev) => {
								if (Array.isArray(prev)) {
									localStorage.setItem('page', page.toString())

									return [...(prev as IProduct[]), ...data]
								} else {
									return data
								}
							})
						} else setProducts(data)
						setTotal(count)
					} else if (response && typeof response === 'string') {
						setProducts(response)
					}
				}
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lang, page, setTotal, searchParams])

	return (
		<>
			{isLoading && page === 1 && <ProductListSkeleton />}
			{(!isLoading || page > 1) && Array.isArray(products) && (
				<ProductList page={page} products={products} lang={lang} />
			)}
			{isLoading && page > 1 && <ProductListSkeleton />}

			{typeof products === 'string' && (
				<Text fontSize={'20px'} lineHeight={1} fontWeight={600}>
					{notFound}
				</Text>
			)}
			{total && (
				<LoadMore
					hasProducts={!!Array.isArray(products)}
					page={page}
					total={total}
					setPage={setPage}
					setTotal={setTotal}
				>
					{btnText}
				</LoadMore>
			)}
		</>
	)
}

export default Products
