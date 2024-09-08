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
	slug: string // Changed id to slug
	lang: Locale
	dictionary: IProductDictionary
	dictionaryModal: IDictionaryModal
}

const Product = async ({ dictionary, dictionaryModal, lang, slug }: IProps) => {
	try {
		const product = await fetchProductBySlug(lang, slug) // Fetch product by slug
		if (!product) {
			return <div>Error: No product found.</div>
		}

		const productImages = product[0]?.attributes?.img?.data || []
		if (!productImages.length) {
			return <div>Error: No product images found.</div>
		}

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
		return <div>Application error: Please check logs for more details.</div>
	}
}

export default Product
