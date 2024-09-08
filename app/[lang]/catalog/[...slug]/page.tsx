// File: /app/[lang]/catalog/[...slug]/page.tsx

import { fetchProductByUid } from '@/app/lib/api/services'; // Corrected import
import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import Product from '@/app/ui/ProductPage/Product';
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'; // Import SingleProductSkeleton
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
	let data;
	if (id) data = await fetchProductByUid(lang, parseInt(id));

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
