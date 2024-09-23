import { getProductBySlug, getProductByUid } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  let data;
  
  // Try fetching by slug first
  data = await getProductBySlug(lang, id);
  
  // If not found by slug, fallback to UID
  if (!data || data.length === 0) {
    data = await getProductByUid(lang, parseInt(id));
  }

  if (!data || data.length === 0) {
    return notFound();
  }

  const { attributes: product } = data[0];

  const imgUrl =
    product.img?.data?.[0]?.attributes?.formats?.small?.url || '/img/productPlaceholder.jpg';

  return {
    title: product.title,
    alternates: {
      canonical: `/catalog/${id}`,
      languages: {
        en: `/en/catalog/${id}`,
        de: `/de/catalog/${id}`,
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

  const dictionary = await getDictionary(lang);
  
  // Try fetching the product by slug first
  let productData = await getProductBySlug(lang, id);

  // Fallback to fetching by UID if no slug match
  if (!productData || productData.length === 0) {
    productData = await getProductByUid(lang, parseInt(id));
  }

  if (!productData) return notFound();

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={id}
          // Pass product data if required
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  );
};

export default ProductPage;