import { fetchProductBySlug } from '@/app/lib/api/services';
import { IDictionaryModal, IProductDictionary } from '@/app/lib/interfaces';
import { Locale } from '@/i18n.config';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// Corrected imports with absolute paths
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import { ProductContent } from '@/app/ui/ProductPage/productContent/ProductContent';

const ImageSection = dynamic(
  () => import('@/app/ui/ProductPage/productSlider/ImagesSection'),
  { ssr: false }
);

// Define the IProps interface to match the component's expected props
interface IProps {
  slug: string;
  lang: Locale;
  dictionary: IProductDictionary;
  dictionaryModal: IDictionaryModal;
}

const Product = async ({ dictionary, dictionaryModal, lang, slug }: IProps) => {
  const product = await fetchProductBySlug(lang, slug);
  if (!product || !product[0]) {
    // Handle cases where the product is not found
    return null; // or return a 404 component/page
  }
  const productImages = product[0].attributes.img.data;

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
  );
}

export default Product;
