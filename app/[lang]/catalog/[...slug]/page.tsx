import { fetchProductBySlug } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IProductDictionary, IDictionaryModal, IParams } from '@/app/lib/interfaces'
import { notFound } from 'next/navigation'
import Product from '@/app/ui/ProductPage/Product'

export const generateMetadata = async ({ params }: { params: IParams }) => {
    const { slug, lang } = params
    // Your metadata generation logic (if any)
}

const ProductPage = async ({ params }: { params: IParams }) => {
    const { slug, lang } = params
    try {
        // Fetch the product by slug
        const product = await fetchProductBySlug(lang, slug)
        if (!product || product.length === 0) {
            return notFound()
        }

        // Fetch the dictionary for the given language
        const dictionary: IProductDictionary = await getDictionary(lang)
        // Fetch the modal dictionary (if needed)
        const dictionaryModal: IDictionaryModal = {/* Your dictionaryModal data */}

        // Render the Product component
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Product
                        lang={lang}
                        slug={slug}
                        dictionary={dictionary}
                        dictionaryModal={dictionaryModal}
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
