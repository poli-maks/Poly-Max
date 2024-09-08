import { fetchProductBySlug } from '@/app/lib/api/services';
import { IDictionaryModal, IProductDictionary, IParams } from '@/app/lib/interfaces';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import { ProductContent } from '@/app/ui/ProductPage/productContent/ProductContent';

// Dynamic import for client-side rendering
const ImageSection = dynamic(() => import('@/app/ui/ProductPage/productSlider/ImagesSection'), {
  ssr: false,
});

interface Props {
  params: IParams['params'];
  dictionary: IProductDictionary;
  dictionaryModal: IDictionaryModal;
}

const ProductPage = async ({ params, dictionary, dictionaryModal }: Props) => {
  const { lang, slug } = params;
  const product = await fetchProductBySlug(lang, slug);

  if (!product || product.length === 0) {
    return null; // Returning null in case of no product found
  }

  const productImages = product[0].attributes.img.data;

  return (
    <SectionWrapper>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
          <ImageSection productImages={productImages} />
        </Flex>

        <ProductContent
          product={product[0]}
          dictionary={dictionary}
          dictionaryModal={dictionaryModal}
        />
      </Flex>
    </SectionWrapper>
  );
};

export default ProductPage;
