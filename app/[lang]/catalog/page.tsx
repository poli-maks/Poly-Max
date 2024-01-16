import { fetchProductsByCategory } from '@/app/lib/api/services'
import { searchProductByTitle } from '@/app/lib/api/services'
import { IParams } from '@/app/lib/interfaces'
import Catalog from '@/app/ui/CatalogPage/Catalog'
import Search from '@/app/ui/CatalogPage/Search/Search'
import React from 'react'

const CatalogPage: React.FC<
	IParams & { searchParams: { query?: string; page: string; search?: string; category?: string } }
> = async ({ params: { lang }, searchParams }) => {
	const query = searchParams?.query || ''
	const page = searchParams?.page || '1'
	const search = searchParams?.search || ''
	const category = searchParams?.category || ''

	let products
	if (lang && category && page) {
		const data = await fetchProductsByCategory(lang, category, parseInt(page))
		products = data[0].attributes.products.data
	}

	if (lang && query && search) products = await searchProductByTitle(lang, query, parseInt(page))

	return (
		<>
			<Search
				placeholder="Enter what u wanna search for..."
				isQuery={!!query}
				isSearch={!!search}
			/>
			<Catalog lang={lang} products={products} />
		</>
	)
}

export default CatalogPage
