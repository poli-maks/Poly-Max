import { fetchProductBySlug } from '@/app/lib/api/services' // Corrected import name
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const generateMetadata = async ({ params: { id: slug, lang } }: IParams) => { // Use fetchProductBySlug
	let data
	if (slug) data = await fetchProductBySlug(lang, slug) // Corrected to use fetchProductBySlug

	const { attributes: product } = data[0]

	const imgUrl =
		product.img.data !== null
			? product.img.data[0].attributes.formats?.small?.url
			: '/img/productPlaceholder.jpg'

	return {
		title: product.title,
		alternates: {
			canonical: `/catalog/${slug}`,
			languages: {
				en: `/en/catalog/${slug}`,
				de: `/de/catalog/${slug}`,
			},
		},
		description: product.descShort,
		openGraph: {
			images: [
				{
					url: imgUrl,
				},
			],
		},
	}
}

const ProductPage: React.FC<IParams> = async ({ params: { lang, id: slug } }) => { // Use fetchProductBySlug
	if (!slug) return notFound()

	const dictionary = await getDictionary(lang)

	return (
		<>
			<Suspense fallback={<SingleProductSkeleton />}>
				<Product
					lang={lang}
					slug={slug} // Pass slug
					dictionary={dictionary.productPage}
					dictionaryModal={dictionary.modalForm}
				/>
			</Suspense>
		</>
	)
}

export default ProductPage
