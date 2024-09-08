import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Ensure IParams interface matches expected types
export const generateMetadata = async ({ params }: IParams) => {
	const { slug, lang } = params
	if (!slug) return {}

	let data
	if (slug) data = await getProductByUid(lang, parseInt(slug))

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

// Define the props explicitly
interface ProductPageProps extends IParams {}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	const { lang, slug } = params
	if (!slug) return notFound()

	const dictionary = await getDictionary(lang)

	return (
		<>
			<Suspense fallback={<SingleProductSkeleton />}>
				<Product
					lang={lang}
					id={slug} // use slug here
					dictionary={dictionary.productPage}
					dictionaryModal={dictionary.modalForm}
				/>
			</Suspense>
		</>
	)
}

export default ProductPage
