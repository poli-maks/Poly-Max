import { fetchProductByUid } from '@/app/lib/api/services'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import { notFound } from 'next/navigation'

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
	if (!id) return notFound()

	const product = await fetchProductByUid(lang, parseInt(id))

	return (
		<>
			<Product product={product} />
		</>
	)
}

export default ProductPage
