import { getDictionary } from '@/app/lib/dictionary'
import { IParams, SEARCH_PARAMS } from '@/app/lib/interfaces'
import { getFiteredProducts } from '@/app/lib/utils/getFiteredProducts'
import Catalog from '@/app/ui/CatalogPage/Catalog'
import LoadMore from '@/app/ui/CatalogPage/LoadMore/LoadMore'
import Search from '@/app/ui/CatalogPage/Search/Search'
import React from 'react'

const CatalogPage: React.FC<
	IParams & {
		searchParams: {
			[key in SEARCH_PARAMS]: string
		}
	}
> = async ({ params: { lang }, searchParams }) => {
	const dictionary = await getDictionary(lang)

	const { query, search, total } = searchParams

	const products = await getFiteredProducts(lang, searchParams)

	return (
		<>
			<Search
				placeholder="Geben Sie ein, wonach Sie suchen..."
				isQuery={!!query}
				isSearch={!!search}
			/>
			<Catalog lang={lang} products={products} />
			<LoadMore total={total} hasProducts={!!products}>
				{dictionary.button.loadMore}
			</LoadMore>
		</>
	)
}

export default CatalogPage
