import { fetchAllProducts } from './lib/api/services'
import { IProduct } from './lib/interfaces'

async function sitemap() {
	const data = await fetchAllProducts('de', 1)

	let products: IProduct[] = []

	if (typeof data === 'object') {
		const { count } = data

		const pageCount = Math.ceil(count / 25)

		for (let i = 1; i <= pageCount; i += 1) {
			const res = await fetchAllProducts('de', i, 25)

			{
				if (typeof res === 'object') {
					const { data } = res
					products = [...products, ...data]
				}
			}
		}
	}

	if (typeof data === 'object') {
		const { count } = data

		const pageCount = Math.ceil(count / 25)

		for (let i = 1; i <= pageCount; i += 1) {
			const res = await fetchAllProducts('en', i, 25)

			{
				if (typeof res === 'object') {
					const { data } = res
					products = [...products, ...data]
				}
			}
		}
	}

	const productEntriesDe = products.map(({ attributes }) => ({
		url: `${process.env.NEXT_PUBLIC_URL}/de/catalog/${attributes.uid}`,
		lastModified: new Date(attributes.updatedAt),
		changeFrequency: 'monthly',
		priority: 1,
	}))

	const productEntriesEn = products.map(({ attributes }) => ({
		url: `${process.env.NEXT_PUBLIC_URL}/en/catalog/${attributes.uid}`,
		lastModified: new Date(attributes.updatedAt),
		changeFrequency: 'monthly',
		priority: 1,
	}))

	return [
		{
			url: process.env.NEXT_PUBLIC_URL + '/favicon.ico',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/en',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/en' + '/about',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/en' + '/catalog',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.5,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/en' + '/contact',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/de',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/de' + '/about',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/de' + '/catalog',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.5,
		},
		{
			url: process.env.NEXT_PUBLIC_URL + '/de' + '/contact',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		...productEntriesDe,
		...productEntriesEn,
	]
}

export default sitemap
