import { fetchProductBySlug } from '@/app/lib/api/services'
import { IDictionaryModal, IProductDictionary } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import { ProductContent } from './productContent/ProductContent'

const ImageSection = dynamic(
	() => import('./productSlider/ImagesSection'),
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
		// Fetch product by slug
		const product = await fetchProductBySlug(lang, slug)

		// Check if the product is found
		if (!product || product.length === 0) {
			return notFound() // Handle not found case
		}

		const productImages = product[0].attributes.img.data

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
		console.error("Error fetching product:", error)
		return notFound()
	}
}

export default Product
