import { Suspense } from 'react'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams, IProductDictionary } from '@/app/lib/interfaces'
import { fetchProductBySlug } from '@/app/lib/api/services'
import Product from '@/app/ui/ProductPage/Product'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({ params: { slug, lang } }: IParams) => {
    let data
    if (slug) data = await fetchProductBySlug(lang, slug)

    const { attributes: product } = data[0]

    return {
        title: product.title,
        description: product.descShort,
    }
}

const ProductPage = async ({ params: { slug, lang } }: IParams) => {
    // Ensure slug is a string before using it
    if (!slug) return notFound()

    const product = await fetchProductBySlug(lang, slug)

    if (!product) return notFound()

    // Fetch and verify dictionary data
    const dictionaryData: any = await getDictionary(lang)

    // Construct the IProductDictionary object with all required fields
    const dictionary: IProductDictionary = {
        btnOrder: dictionaryData?.btnOrder || '',
        announcement: dictionaryData?.announcement || '',
        tableHeaders: dictionaryData?.tableHeaders || {
            article: '',
            diameter: '',
            length: '',
            weight: '',
            coating_thickness: '',
            cross_section: '',
            volume: '',
            wall_thickness: '',
        },
        delivery: dictionaryData?.delivery || {
            title: '',
            body: '',
        },
        company: dictionaryData?.company || {
            title: '',
            body: '',
        },
        contactUs: dictionaryData?.contactUs || {
            title: '',
            body: '',
        },
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Product lang={lang} id={product[0].id.toString()} dictionary={dictionary} />
            </Suspense>
        </>
    )
}

export default ProductPage
