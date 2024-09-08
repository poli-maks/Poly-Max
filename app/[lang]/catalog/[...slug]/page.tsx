import { notFound } from 'next/navigation';
import { fetchProductBySlug } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import { Suspense } from 'react';

export const generateMetadata = async ({ params: { slug, lang } }: IParams) => {
    let data;
    if (slug) {
        data = await fetchProductBySlug(lang, slug);
    }
    if (!data) return {};

    const { attributes: product } = data[0];
    return {
        title: product.title,
        description: product.descShort,
    };
};

const ProductPage = async ({ params: { slug, lang } }: IParams) => {
    // Ensure slug is defined and of type string
    if (!slug) {
        return notFound();
    }

    const product = await fetchProductBySlug(lang, slug as string); // Use type assertion
    if (!product) return notFound();

    const dictionary = await getDictionary(lang);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Product lang={lang} id={product[0].id.toString()} dictionary={dictionary} />
            </Suspense>
        </>
    );
};

export default ProductPage;
