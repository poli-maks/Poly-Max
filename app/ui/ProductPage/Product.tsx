import { fetchProductByUid } from '@/app/lib/api/services'
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
	//product: IProductProps[]
	id: string
	lang: Locale
	dictionary: IProductDictionary
	dictionaryModal: IDictionaryModal
}

const Product = async ({ dictionary, dictionaryModal, lang, id }: IProps) => {
	const product = await fetchProductByUid(lang, parseInt(id))
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
}

export default Product
