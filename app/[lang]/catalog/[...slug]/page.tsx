import { fetchProductBySlug } from '@/app/lib/api/services';
import { IDictionaryModal, IProductDictionary, IParams } from '@/app/lib/interfaces';
import { Locale } from '@/i18n.config';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import { ProductContent } from '@/app/ui/ProductPage/productContent/ProductContent';

const ImageSection = dynamic(
  () => import('@/app/ui/ProductPage/productSlider/ImagesSection'),
  { ssr: false }
);

interface ProductPageProps {
  params: IParams['params']; // Type for dynamic route params
  dictionary: IProductDictionary;
  dictionaryModal: IDictionaryModal;
}

const ProductPage = async ({ params, dictionary, dictionaryModal }: ProductPageProps) => {
  const { lang, slug } = params;

  const product = await fetchProductBySlug(lang, slug);
  if (!product || product.length === 0) {
    return null; // Return null or use notFound() for a 404 page
  }

  const productImages = product[0].attributes.img.data;

  return (
    <SectionWrapper>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
          <ImageSection productImages={productImages} />
        </Flex>

        <ProductContent
          product={product[0]} // Ensure we're passing the correct product data
          dictionary={dictionary}
          dictionaryModal={dictionaryModal}
        />
      </Flex>
    </SectionWrapper>
  );
};

export default ProductPage;
