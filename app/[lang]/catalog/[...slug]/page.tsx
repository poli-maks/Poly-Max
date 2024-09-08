import { fetchProductBySlug, fetchProductByUid } from '@/app/lib/api/services';
import { IDictionaryModal, IProductDictionary } from '@/app/lib/interfaces';
import { Locale } from '@/i18n.config';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import SectionWrapper from '../sectionWrapper/SectionWrapper';
import { ProductContent } from './productContent/ProductContent';

const ImageSection = dynamic(() => import('./productSlider/ImagesSection'), { ssr: false });

interface IProps {
	params: { slug: string; lang: Locale };
	dictionary: IProductDictionary;
	dictionaryModal: IDictionaryModal;
}

const ProductPage = async ({ params, dictionary, dictionaryModal }: IProps) => {
	const { lang, slug } = params;

	// Check if the slug is actually an ID
	const isNumericId = /^\d+$/.test(slug);
	const product = isNumericId
		? await fetchProductByUid(lang, parseInt(slug))
		: await fetchProductBySlug(lang, slug);

	if (!product || product.length === 0) {
		return <div>Error: No product found.</div>;
	}

	const productImages = product[0]?.attributes?.img?.data || [];

	if (!productImages.length) {
		return <div>Error: No product images found.</div>;
	}

	return (
		<SectionWrapper>
			<Flex flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
					<ImageSection productImages={productImages} />
				</Flex>

				<ProductContent product={product} dictionary={dictionary} dictionaryModal={dictionaryModal} />
			</Flex>
		</SectionWrapper>
	);
};

export default ProductPage;
