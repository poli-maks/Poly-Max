'use client'

import { IDictionaryModal, IProductDictionary, IProductProps } from '@/app/lib/interfaces'
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
	product: IProductProps[]
	dictionary: IProductDictionary
	dictionaryModal: IDictionaryModal
}

const Product = ({ product, dictionary, dictionaryModal }: IProps) => {
	const productImages = product[0].attributes.img.data

	return (
		<SectionWrapper>
			<Flex flexDirection={{ base: 'column', lg: 'row' }}>
				{productImages && <ImageSection productImages={productImages} />}
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
