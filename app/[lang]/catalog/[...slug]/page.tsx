import { fetchProductBySlug } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IProductDictionary, IDictionaryModal } from '@/app/lib/interfaces'
import { notFound } from 'next/navigation'
import Product from '@/app/ui/ProductPage/Product'

export const generateMetadata = async ({ params: { slug, lang } }) => {
	// Your metadata generation logic (if any)
}

const ProductPage = async ({ params: { slug, lang } }) => {
	try {
		// Fetch the product by slug
		const product = await fetchProductBySlug(lang, slug)
		if (!product || product.length === 0) {
			return notFound()
		}

		// Fetch the dictionary for the given language
		const dictionary: IProductDictionary = await getDictionary(lang)
		// Fetch the modal dictionary (if needed)
		const dictionaryModal: IDictionaryModal = {/* Your dictionaryModal data */ }

		// Render the Product component
		return (
			<>
				<Suspense fallback={<div>Loading...</div>}>
					<Product
						lang={lang}
						id={product[0].id.toString()}
						dictionary={dictionary}
						slug={slug} // Pass the slug
						dictionaryModal={dictionaryModal} // Pass the dictionaryModal
					/>
				</Suspense>
			</>
		)
	} catch (error) {
		console.error("Error in ProductPage:", error)
		return notFound()
	}
}

export default ProductPage
