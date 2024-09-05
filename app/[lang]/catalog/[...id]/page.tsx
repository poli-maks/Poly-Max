import { getProductByUid } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Generate metadata for SEO and open graph
export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
	// Remove the 'poli-product-' prefix from the ID
	const productId = id.replace('poli-product-', '');

	// Fetch the product data using the updated ID
	const data = productId ? await getProductByUid(lang, parseInt(productId)) : null;

	// If no product data is found, return a 404
	if (!data || data.length === 0) return notFound();

	// Extract product attributes
	const { attributes: product } = data[0];

	// Determine the image URL
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

// Main product page component
const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
	// Return a 404 if the ID is not provided
	if (!id) return notFound();

	// Remove the 'poli-product-' prefix from the ID
	const productId = id.replace('poli-product-', '');

	// Fetch the product data
	const data = productId ? await getProductByUid(lang, parseInt(productId)) : null;

	// Return a 404 if no data is found
	if (!data || data.length === 0) return notFound();

	// Fetch the dictionary data for language support
	const dictionary = await getDictionary(lang);

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
