// /app/[lang]/catalog/[...slug]/page.tsx

import { fetchProductBySlug } from '@/app/lib/api/services'; // Ensure this function is properly exported in services.ts
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';

export const generateMetadata = async ({ params: { slug, lang } }: IParams) => {
    let data;
    if (slug) {
        data = await fetchProductBySlug(lang, slug); // Use slug for fetching data
    }

    if (!data || data.length === 0) return notFound();

    const { attributes: product } = data[0];

    return {
        title: product.title,
        description: product.descShort,
        alternates: {
            canonical: `/catalog/${slug}`,
            languages: {
                en: `/en/catalog/${slug}`,
                de: `/de/catalog/${slug}`,
            },
        },
        openGraph: {
            images: [
                {
                    url: product.img?.data[0]?.attributes.formats?.small?.url || '/img/productPlaceholder.jpg',
                },
            ],
        },
    };
};

const ProductPage = async ({ params: { slug, lang } }: IParams) => {
    const product = await fetchProductBySlug(lang, slug);
    if (!product) return notFound();

    const dictionary = await getDictionary(lang);

    return (
        <>
            <Suspense fallback={<SingleProductSkeleton />}>
                <Product
                    lang={lang}
                    id={product[0].id}
                    product={product[0]} // Pass the product data to the component
                    dictionary={dictionary.productPage}
                    dictionaryModal={dictionary.modalForm}
                />
            </Suspense>
        </>
    );
};

export default ProductPage;
