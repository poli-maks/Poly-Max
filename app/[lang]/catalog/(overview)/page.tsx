import { getDictionary } from '@/app/lib/dictionary'
import { IParams, SEARCH_PARAMS } from '@/app/lib/interfaces'
import { getFiteredProducts } from '@/app/lib/utils/getFiteredProducts'
import Catalog from '@/app/ui/CatalogPage/Catalog'
import Search from '@/app/ui/CatalogPage/Search/Search'
import React, { Suspense } from 'react'

import LoadingCatalog from './loading'

const CatalogPage: React.FC<
	IParams & {
		searchParams: {
			[key in SEARCH_PARAMS]: string
		}
	}
> = async ({ params: { lang }, searchParams }) => {
	const dictionary = await getDictionary(lang)

	const { query, search, total } = searchParams

	const response = await getFiteredProducts(lang, searchParams)

	let products
	let totalProducts
	let totalSearchProducts

	if (response && typeof response === 'object') {
		const { data, count, type = 'CATEGORY' } = response
		products = data
		if (type === 'SEARCH') totalSearchProducts = count
		else {
			totalProducts = count
		}
	} else if (response && typeof response === 'string') {
		products = response
	}

	return (
		<>
			<Search
				placeholder="Geben Sie ein, wonach Sie suchen..."
				isQuery={!!query}
				isSearch={!!search}
				totalSearchProducts={totalSearchProducts}
			/>
			<Suspense fallback={<LoadingCatalog />}>
				<Catalog
					totalProducts={totalProducts}
					lang={lang}
					products={products}
					total={total}
					btnText={dictionary.button.loadMore}
					title={dictionary.catalog.title}
					all_category={dictionary.catalog.all_category}
				/>
			</Suspense>
		</>
	)
}

export default CatalogPage
