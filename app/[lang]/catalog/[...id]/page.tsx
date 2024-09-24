import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

// Extract numeric ID directly from slug
const extractIdFromSlug = (idSlug: string | undefined): number | undefined => {
  if (!idSlug || isNaN(Number(idSlug))) return undefined
  const numericPart = parseInt(idSlug, 10)
  return numericPart <= 100 ? numericPart : undefined
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
    console.error("Error fetching product by UID:", error)
    return notFound()
  }

  if (!data || data.length === 0) return notFound()

  const { attributes: product } = data[0] || {}
  if (!product) return notFound()

  const imgUrl = product.img?.data?.[0]?.attributes?.formats?.small?.url || '/img/productPlaceholder.jpg'

  return {
    title: product.title,
    metadataBase: new URL('https://www.poli-maks.com'),  // Add metadataBase
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
  if (!id) return notFound() // Ensure id is defined

  const productId = extractIdFromSlug(id)
  if (!productId) return notFound()

  const dictionary = await getDictionary(lang)

  let product
  try {
    product = await getProductByUid(lang, productId)
    console.log("Fetched product:", product)
  } catch (error) {
    console.error("Error fetching product data:", error)
    return notFound()
  }

  if (!product || product.length === 0) return notFound()

  const { attributes: productDetails } = product[0]
  if (!productDetails || !productDetails.title) return notFound()

  // Generate slug from product title
  const slug = generateSlugFromTitle(productDetails.title)

  // Check if the current URL is only `/id` (id is a number and does not contain a hyphen)
  if (id && !id.includes('-')) {
    const expectedUrl = `/${lang}/catalog/${productId}-${slug}`
    // Redirect only if it's just the numeric ID
    return redirect(expectedUrl)
  }

  // If the URL is already `/id-title`, no redirect needed, render the page
  if (id === `${productId}-${slug}`) {
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
  } else {
    // Handle other cases to avoid a 404 error
    return notFound()
  }
}

export default ProductPage