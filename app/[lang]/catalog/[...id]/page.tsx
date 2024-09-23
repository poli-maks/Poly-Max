import { getProductBySlug, getProductByUid } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  let data;
  if (id) {
    data = await getProductBySlug(lang, id); // Attempt to fetch by slug
    if (!data) {
      data = await getProductByUid(lang, parseInt(id)); // Fallback to UID fetch if slug is not found
    }
  }

  if (!data || data.length === 0) {
    return notFound();
  }

  const { attributes: product } = data[0];

  const imgUrl =
    product.img.data !== null
      ? product.img.data[0].attributes.formats?.small?.url
      : '/img/productPlaceholder.jpg';

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
  let productData = await getProductBySlug(lang, id); // Fetch by slug

  if (!productData) {
    productData = await getProductByUid(lang, parseInt(id)); // Fallback to UID fetch
  }

  if (!productData) return notFound();

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={id}
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  );
};

export default ProductPage;