import { getProductByName } from '@/app/lib/api/services';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { IParams, IProduct } from '@/app/lib/interfaces';

export const generateMetadata = async ({ params: { productName, lang } }: IParams) => {
  if (!productName) return notFound();

  const product: IProduct | null = await getProductByName(lang, productName);

  // Check if product is null
  if (!product) return notFound();

  // Extract the first two words from the product title, or just the one word if that's all there is
  const titleWordsArray = product.attributes.title.split(' ');
  const titleWords = titleWordsArray.slice(0, 2).join(' '); // Get up to two words

  // Create a URL-friendly slug
  const slug = titleWords
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  return {
    title: product.attributes.title,
    description: product.attributes.descShort,
    alternates: {
      canonical: `/catalog/${slug}`,
      languages: {
        en: `/en/catalog/${slug}`,
        de: `/de/catalog/${slug}`,
      },
    },
  };
};

const ProductPage: React.FC<IParams> = async ({ params: { lang, productName } }) => {
  if (!productName) return notFound();

  const product: IProduct | null = await getProductByName(lang, productName);

  if (!product) return notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Your Product component here */}
    </Suspense>
  );
};

export default ProductPage;
