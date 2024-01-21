import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import { notFound } from 'next/navigation'

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
	if (!id) return notFound()

	const dictionary = await getDictionary(lang)

	return (
		<>
			<Product
				lang={lang}
				id={id}
				//product={product}
				dictionary={dictionary.productPage}
				dictionaryModal={dictionary.modalForm}
			/>
		</>
	)
}

export default ProductPage
