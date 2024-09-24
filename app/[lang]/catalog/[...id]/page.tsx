import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

// Extract numeric ID directly from slug (we assume it's always correct)
const extractIdFromSlug = (idSlug: string): number | undefined => {
  if (!idSlug) return undefined
  return parseInt(idSlug, 10) // Extracts the numeric part of the slug
}

// New function to generate a product slug from the product title
const generateProductSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  if (!id) return notFound() // Ensure id is defined and not undefined

  const productId = extractIdFromSlug(id)
  if (!productId) return notFound() // Ensure productId is valid

  let data
  try {
    data = await getProductByUid(lang, productId)
  } catch (error) {
    console.error("Error fetching product by UID:", error)
    return notFound()
  }

  if (!data || data.length === 0) return notFound()

  const { attributes: product } = data[0] || {}

  if (!product) return notFound()

  const imgUrl = product.img?.data?.[0]?.attributes?.formats?.small?.url || '/img/productPlaceholder.jpg'

  return {
    title: product.title,
    alternates: {
      canonical: `/catalog/${id}`, // Keeping the canonical as requested
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
  }
}

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
  if (!id) return notFound() // Ensure id is defined and not undefined

  const productId = extractIdFromSlug(id)
  if (!productId) return notFound() // Ensure productId is valid

  const dictionary = await getDictionary(lang)

  let product
  try {
    product = await getProductByUid(lang, productId)
  } catch (error) {
    console.error("Error fetching product data:", error)
    return notFound()
  }

  if (!product || product.length === 0) return notFound()

  const { attributes: productDetails } = product[0]
  const productSlug = generateProductSlug(productDetails.title)

  // Redirect if the slug is not present in the current URL
  if (!id.includes(productSlug)) {
    redirect(`/${lang}/catalog/${productId}-${productSlug}`)
  }

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={productId.toString()}
          product={productDetails} // Passing product details to Product component
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  )
}

export default ProductPage