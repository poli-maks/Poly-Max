import { getProductBySlug } from '@/app/lib/api/services'; // Updated to use slug-based fetch
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// This function generates metadata for SEO based on the product's slug
export const generateMetadata = async ({ params: { slug, lang } }: IParams) => {
    let data;
    if (slug) data = await getProductBySlug(lang, slug); // Fetch by slug

    if (!data || data.length === 0) {
        return notFound(); // Handle case where product isn't found
    }

    const { attributes: product } = data[0];

    const imgUrl =
        product.img?.data !== null
            ? product.img.data[0].attributes.formats?.small?.url
            : '/img/productPlaceholder.jpg';

    return {
        title: product.title,
        alternates: {
            canonical: `/catalog/${slug}`, // Use slug for canonical URL
            languages: {
                en: `/en/catalog/${slug}`,
                de: `/de/catalog/${slug}`,
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

const ProductPage: React.FC<IParams> = async ({ params: { lang, slug } }) => {
    if (!slug) return notFound(); // Ensure slug is present

    const dictionary = await getDictionary(lang);

    let productData;
    try {
        productData = await getProductBySlug(lang, slug); // Fetch product data by slug
    } catch (error) {
        return notFound(); // Handle errors and not found cases
    }

    if (!productData || productData.length === 0) {
        return notFound(); // Handle no product found
    }

    const { attributes: product } = productData[0];

    return (
        <>
            <Suspense fallback={<SingleProductSkeleton />}>
                <Product
                    lang={lang}
                    product={product} // Pass the product data to the Product component
                    dictionary={dictionary.productPage}
                    dictionaryModal={dictionary.modalForm}
                />
            </Suspense>
        </>
    );
};

export default ProductPage;