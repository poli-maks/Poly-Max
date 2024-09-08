import { fetchProductBySlug } from '@/app/lib/api/services';
import { IDictionaryModal, IProductDictionary, IParams } from '@/app/lib/interfaces';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import { ProductContent } from '@/app/ui/ProductPage/productContent/ProductContent';

// Dynamically imported components for client-side rendering
const ImageSection = dynamic(() => import('@/app/ui/ProductPage/productSlider/ImagesSection'), {
  ssr: false,
});

// Correct type definition for Next.js page component props
interface PageProps {
  params: {
    lang: IParams['params']['lang']; // Ensuring the type matches your IParams interface
    slug: IParams['params']['slug'];
  };
  dictionary: IProductDictionary;
  dictionaryModal: IDictionaryModal;
}

const ProductPage = async ({ params, dictionary, dictionaryModal }: PageProps) => {
  const { lang, slug } = params;
  const product = await fetchProductBySlug(lang, slug);

  if (!product || product.length === 0) {
    // Handle the case where the product is not found
    return <div>Product not found</div>;
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
