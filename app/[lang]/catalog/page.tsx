import { getDictionary } from '@/app/lib/dictionary'
import { IParams, SEARCH_PARAMS } from '@/app/lib/interfaces'
import Catalog from '@/app/ui/CatalogPage/Catalog'
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

	let totalSearchProducts

	if (search === 'true' && total) {
		totalSearchProducts = total
	}

	return (
		<>
			<Search
				placeholder="Geben Sie ein, wonach Sie suchen..."
				isQuery={!!query}
				isSearch={!!search}
				totalSearchProducts={totalSearchProducts}
			/>
			<Catalog
				lang={lang}
				searchParams={searchParams}
				btnText={dictionary.button.loadMore}
				notFound={dictionary.catalog.notFound}
				title={dictionary.catalog.title}
				all_category={dictionary.catalog.all_category}
				filter={dictionary.catalog.filter}
			/>
		</>
	)
}

export default CatalogPage
