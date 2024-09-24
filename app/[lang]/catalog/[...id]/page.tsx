import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

// Extract numeric ID directly from slug
const extractIdFromSlug = (idSlug: string): number | undefined => {
  if (!idSlug) return undefined
  return parseInt(idSlug, 10)
}

// Generate a slug from the product title
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)+/g, '') // Remove leading/trailing hyphens
}

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  const productId = extractIdFromSlug(id)

  if (!productId) return notFound()

  let data
  try {
    data = await getProductByUid(lang, productId)
  } catch (error) {
    console.error(`Error fetching product by UID for lang: ${lang}:`, error)
    return notFound()
  }

  if (!data || data.length === 0) return notFound()

  const { attributes: product } = data[0] || {}

  if (!product) return notFound()

  const imgUrl = product.img?.data?.[0]?.attributes?.formats?.small?.url || '/img/productPlaceholder.jpg'

  return {
    title: product.title,
    alternates: {
      canonical: `/catalog/${id}`, // Preserve the original structure for the canonical URL
      languages: {
        en: `/en/catalog/${id}`, // English alternate
        de: `/de/catalog/${id}`, // German alternate
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
  const productId = extractIdFromSlug(id)

  if (!productId) return notFound() // Ensure productId is valid

  const dictionary = await getDictionary(lang)

  let product
  try {
    product = await getProductByUid(lang, productId)
  } catch (error) {
    console.error(`Error fetching product data for lang: ${lang}:`, error)
    return notFound()
  }

  if (!product || product.length === 0) return notFound()

  const { attributes: productDetails } = product[0]

  if (!productDetails || !productDetails.title) {
    return notFound()
  }

  // Generate slug from product title
  const slug = generateSlugFromTitle(productDetails.title)

  // Construct the expected URL with the slug
  const expectedUrl = `/${lang}/catalog/${productId}-${slug}`

  // Check if the current URL does not match the expected URL, and redirect if needed
  if (id !== `${productId}-${slug}`) {
    console.log(`Redirecting to the correct URL: ${expectedUrl}`)
    return redirect(expectedUrl)
  }

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={productId.toString()}
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  )
}

export default ProductPage