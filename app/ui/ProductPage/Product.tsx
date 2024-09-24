import { getProductByUid } from '@/app/lib/api/services';
import { IDictionaryModal, IProductDictionary } from '@/app/lib/interfaces';
import { Locale } from '@/i18n.config';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import { ProductContent } from './productContent/ProductContent';
import { notFound } from 'next/navigation';

const ImageSection = dynamic(() => import('./productSlider/ImagesSection'), { ssr: false });

interface IProps {
  id: string;
  lang: Locale;
  dictionary: IProductDictionary;
  dictionaryModal: IDictionaryModal;
}

const Product = async ({ dictionary, dictionaryModal, lang, id }: IProps) => {
  // Fetch the product data by UID
  const product = await getProductByUid(lang, parseInt(id));

  // Handle case if product is not found
  if (!product || product.length === 0) {
    return notFound();
  }

  const productAttributes = product[0]?.attributes;
  const productImages = productAttributes?.img?.data;

  return (
    <SectionWrapper>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
          {productImages ? (
            <ImageSection productImages={productImages} />
          ) : (
            <p>No images available for this product.</p>
          )}
        </Flex>

        <ProductContent
          product={productAttributes}
          dictionary={dictionary}
          dictionaryModal={dictionaryModal}
        />
      </Flex>
    </SectionWrapper>
  );
};

export default Product;