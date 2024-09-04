import { getProductByName } from '@/app/lib/api/services';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { IParams } from '@/app/lib/interfaces';

export const generateMetadata = async ({ params: { productName, lang } }: IParams) => {
  const product = await getProductByName(lang, productName);

  if (!product) return notFound();

  return {
    title: product.title,
    description: product.descShort,
    alternates: {
      canonical: `/catalog/${productName}`,
      languages: {
        en: `/en/catalog/${productName}`,
        de: `/de/catalog/${productName}`,
      },
    },
  };
};

const ProductPage: React.FC<IParams> = ({ params: { lang, productName } }) => {
  if (!productName) return notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Your Product component here */}
    </Suspense>
  );
};

export default ProductPage;
