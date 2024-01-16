// import { fetchProductsByCategory } from '@/app/lib/api/services'
import { IParams } from '@/app/lib/interfaces'
import Catalog from '@/app/ui/CatalogPage/Catalog'
import React from 'react'

const CatalogPage: React.FC<
	IParams & { searchParams: { query: string; page: string; search: string } }
> = async ({ params: { lang } }) => {
	// const query = searchParams?.query || ''
	// const page = searchParams?.page || '1'
	// const search = searchParams?.search || ''
	// const products = await fetchProductsByCategory(lang, searchParams.category, 1)

	return (
		<>
			<Catalog lang={lang} />
		</>
	)
}

export default CatalogPage
