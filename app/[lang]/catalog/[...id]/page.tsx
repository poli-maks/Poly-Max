import { fetchProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import { notFound } from 'next/navigation'

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
	if (!id) return notFound()

	const dictionary = await getDictionary(lang)
	const product = await fetchProductByUid(lang, parseInt(id))

	return (
		<>
			<Product product={product} dictionary={dictionary.productPage} />
		</>
	)
}

export default ProductPage
