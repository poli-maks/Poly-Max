import { fetchProductBySlug } from '@/app/lib/api/services'
import { IDictionaryModal, IProductDictionary } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import { ProductContent } from './productContent/ProductContent'

const ImageSection = dynamic(
	() => {
		return import('./productSlider/ImagesSection')
	},
	{ ssr: false }
)

interface IProps {
	slug: string
	lang: Locale
	dictionary: IProductDictionary
	dictionaryModal: IDictionaryModal
}

const Product = async ({ dictionary, dictionaryModal, lang, slug }: IProps) => {
	try {
		// Fetch product data by slug
		console.log(`Fetching product data for slug: ${slug}, lang: ${lang}`) // Log the request details
		const product = await fetchProductBySlug(lang, slug)

		// Log the product response data to check its structure
		console.log('Product data fetched:', product)

		// Check if product data exists
		if (!product || product.length === 0) {
			console.error(`No product found for slug: ${slug}`)
			return <div>Error: No product found.</div>
		}

		const productImages = product[0]?.attributes?.img?.data || []

		// Log the product images to verify they exist
		console.log('Product images:', productImages)

		// Check if images exist
		if (!productImages.length) {
			console.error(`No product images found for slug: ${slug}`)
			return <div>Error: No product images found.</div>
		}

		// Render product information
		return (
			<SectionWrapper>
				<Flex flexDirection={{ base: 'column', lg: 'row' }}>
					<Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
						<ImageSection productImages={productImages} />
					</Flex>

					<ProductContent
						product={product}
						dictionary={dictionary}
						dictionaryModal={dictionaryModal}
					/>
				</Flex>
			</SectionWrapper>
		)
	} catch (error) {
		// Log detailed error message
		console.error('Error fetching product data:', error)
		return <div>Application error: Please check logs for more details.</div>
	}
}

export default Product
