import { getProductByUid } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';
import { notFound, redirect } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  let productId = extractIdFromSlug(id);

  let data;
  if (productId) data = await getProductByUid(lang, productId);

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
      images: [{ url: imgUrl }],
    },
  };
};

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
  const productId = extractIdFromSlug(id); // get the actual product id

  if (!productId) return notFound();

  const data = await getProductByUid(lang, productId);
  if (!data || data.length === 0) return notFound();

  const { attributes: product } = data[0];
  const productSlug = product.slug;

  // If the URL doesn't match the `id-slug` format, redirect to the correct URL
  if (id !== `${productId}-${productSlug}`) {
    redirect(`/catalog/${productId}-${productSlug}`);
  }

  const dictionary = await getDictionary(lang);

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={productId}
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  );
};

export default ProductPage;