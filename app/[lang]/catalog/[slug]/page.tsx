import { getProductBySlug } from '@/app/lib/api/services'; // Import the correct slug-based fetching function
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Metadata generation function
export const generateMetadata = async ({ params: { slug, lang } }: IParams) => {
    let data;
    if (slug) {
        data = await getProductBySlug(lang, slug); // Fetch by slug
    }

    if (!data || data.length === 0) {
        return notFound(); // Handle product not found case
    }

    const { attributes: product } = data[0];

    const imgUrl = product.img?.data !== null
        ? product.img.data[0].attributes.formats?.small?.url
        : '/img/productPlaceholder.jpg';

    return {
        title: product.title,
        alternates: {
            canonical: `/catalog/${slug}`,
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

// Product page component
const ProductPage: React.FC<IParams> = async ({ params: { lang, slug } }) => {
    if (!slug) return notFound(); // Ensure slug is present

    const dictionary = await getDictionary(lang);

    let productData;
    try {
        productData = await getProductBySlug(lang, slug); // Fetch product by slug
    } catch (error) {
        return notFound(); // Handle errors gracefully
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
                    product={product} // Pass the fetched product data
                    dictionary={dictionary.productPage}
                    dictionaryModal={dictionary.modalForm}
                />
            </Suspense>
        </>
    );
};

export default ProductPage;