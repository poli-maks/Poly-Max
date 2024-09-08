import React, { Suspense } from 'react'; // Added React and Suspense import
import { fetchProductBySlug } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { IProductDictionary, IDictionaryModal, IParams } from '@/app/lib/interfaces';
import { notFound } from 'next/navigation';
import Product from '@/app/ui/ProductPage/Product';

export const generateMetadata = async ({ params }: { params: IParams['params'] }) => {
  const { slug, lang } = params;
  // Your metadata generation logic (if any)
};

const ProductPage = async ({ params }: { params: IParams['params'] }) => {
  const { slug, lang } = params;

  try {
    const product = await fetchProductBySlug(lang, slug);
    if (!product || product.length === 0) {
      return notFound();
    }

    const dictionary: IProductDictionary = await getDictionary(lang);
    const dictionaryModal: IDictionaryModal = {/* Your dictionaryModal data */};

    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <Product
            lang={lang}
            slug={slug}
            dictionary={dictionary}
            dictionaryModal={dictionaryModal}
          />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error in ProductPage:", error);
    return notFound();
  }
};

export default ProductPage;
