import { fetchProductsByCategory } from '@/app/lib/api/services'
import { searchProductByTitle } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Catalog from '@/app/ui/CatalogPage/Catalog'
import LoadMore from '@/app/ui/CatalogPage/LoadMore/LoadMore'
import Search from '@/app/ui/CatalogPage/Search/Search'
import React from 'react'

const CatalogPage: React.FC<
	IParams & {
		searchParams: {
			query?: string
			page: string
			search?: string
			category?: string
			total?: string
		}
	}
> = async ({ params: { lang }, searchParams }) => {
	const dictionary = await getDictionary(lang)

	const query = searchParams?.query || ''
	const page = searchParams?.page || '1'
	const search = searchParams?.search || ''
	const category = searchParams?.category || ''
	const total = searchParams?.total || ''

	let products
	if (lang && category && page) {
		const data = await fetchProductsByCategory(lang, category, parseInt(page))
		products = data[0].attributes.products.data
	}

	if (lang && query && search) products = await searchProductByTitle(lang, query, parseInt(page))

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
