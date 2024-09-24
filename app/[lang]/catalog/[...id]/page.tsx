import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Extract numeric ID directly from slug (we assume it's always correct)
const extractIdFromSlug = (idSlug: string): number | undefined => {
  if (!idSlug) return undefined
  return parseInt(idSlug, 10) // Extracts the numeric part of the slug
}

// Function to generate a slug from the product title
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)+/g, '') // Trim hyphens from the start and end
}

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  if (!id) return notFound() // Ensure id is defined
  
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

  const productSlug = generateSlugFromTitle(product.title)

  const imgUrl = product.img?.data?.[0]?.attributes?.formats?.small?.url || '/img/productPlaceholder.jpg'

  return {
    title: product.title,
    alternates: {
      canonical: `/catalog/${productId}-${productSlug}`, // Update the URL to /id-title
      languages: {
        en: `/en/catalog/${productId}-${productSlug}`, // For English
        de: `/de/catalog/${productId}-${productSlug}`, // For German
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
  if (!id) return notFound() // Ensure id is defined
  
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

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={productId.toString()}
          product={productDetails} // Pass product details to the component
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  )
}

export default ProductPage