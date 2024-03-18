// import { fetchAllProducts } from './lib/api/instance'

// export default async function sitemap() {
// 	const { count } = await fetchAllProducts('de', 1)

// 	const pageCount = Math.ceil(count / 25)

// 	let products = []

// 	for (let i = 1; i <= pageCount; i += 1) {
// 		const { data } = await fetchAllProducts('he', i, 25)

// 		products = [...products, ...data]
// 	}

// 	// console.log(products)

// 	const productEntriesDe = products.map(({ attributes }) => ({
// 		url: `${process.env.NEXT_PUBLIC_URL}/de/catalog/${attributes.uid}`,
// 		lastModified: new Date(attributes.updatedAt),
// 		changeFrequency: 'monthly',
// 		priority: 1,
// 	}))

// 	// const productEntriesEn = products.map(({ attributes }) => ({
// 	//  url: ${process.env.NEXT_PUBLIC_URL}/en/catalog/${attributes.uid},
// 	//  lastModified: new Date(attributes.updatedAt),
// 	//  changeFrequency: 'monthly',
// 	//  priority: 1,
// 	// }));

// 	return [
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/favicon.ico',
// 			lastModified: new Date(),
// 			changeFrequency: 'yearly',
// 			priority: 0.3,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/en',
// 			lastModified: new Date(),
// 			changeFrequency: 'yearly',
// 			priority: 1,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/en' + '/about',
// 			lastModified: new Date(),
// 			changeFrequency: 'monthly',
// 			priority: 0.8,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/en' + '/catalog',
// 			lastModified: new Date(),
// 			changeFrequency: 'weekly',
// 			priority: 0.5,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/en' + '/contact',
// 			lastModified: new Date(),
// 			changeFrequency: 'monthly',
// 			priority: 0.8,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/de',
// 			lastModified: new Date(),
// 			changeFrequency: 'yearly',
// 			priority: 1,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/de' + '/about',
// 			lastModified: new Date(),
// 			changeFrequency: 'monthly',
// 			priority: 0.8,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/de' + '/catalog',
// 			lastModified: new Date(),
// 			changeFrequency: 'weekly',
// 			priority: 0.5,
// 		},
// 		{
// 			url: process.env.NEXT_PUBLIC_URL + '/de' + '/contact',
// 			lastModified: new Date(),
// 			changeFrequency: 'monthly',
// 			priority: 0.8,
// 		},
// 		// ...postEntriesEn,
// 		...productEntriesDe,
// 	]
// }
