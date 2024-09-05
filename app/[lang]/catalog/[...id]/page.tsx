import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Helper function to extract ID from prefixed URL
const extractIdFromPrefixedUrl = (prefixedId: string): number | null => {
  const idMatch = prefixedId.match(/^poli-product-(\d+)$/);
  return idMatch ? parseInt(idMatch[1], 10) : null;
};

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  // Extract numeric ID from the prefixed ID
  const numericId = extractIdFromPrefixedUrl(id || '');
  if (!numericId) return notFound();

  let data = await getProductByUid(lang, numericId);
  if (!data || data.length === 0) return notFound();

  const { attributes: product } = data[0];

  const imgUrl =
    product.img.data !== null
      ? product.img.data[0].attributes.formats?.small?.url
      : '/img/productPlaceholder.jpg';

  return {
    title: product.title,
    alternates: {
      canonical: `/catalog/poli-product-${numericId}`,
      languages: {
        en: `/en/catalog/poli-product-${numericId}`,
        de: `/de/catalog/poli-product-${numericId}`,
      },
    },
    description: product.descShort,
    openGraph: {
      images: [
        {
          url: imgUrl,
        },
      ],
    },
  };
};

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
  if (!id) return notFound();

  // Extract numeric ID from the prefixed ID
  const numericId = extractIdFromPrefixedUrl(id);
  if (!numericId) return notFound();

  const dictionary = await getDictionary(lang);

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={numericId.toString()} // Pass the numeric ID as a string
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  );
};

export default ProductPage;
