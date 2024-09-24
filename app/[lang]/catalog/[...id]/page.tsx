import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

// Extract numeric ID directly from slug (we assume it's always correct)
const extractIdFromSlug = (idSlug: string | undefined): number | undefined => {
  if (!idSlug) return undefined
  const numericPart = parseInt(idSlug, 10)
  return isNaN(numericPart) ? undefined : numericPart
}

// Generate a slug from the product title
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)+/g, '') // Remove leading/trailing hyphens
}

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  if (!id) return notFound()

  const productId = extractIdFromSlug(id)
  if (!productId) return notFound()

  let data
  try {
    data = await getProductByUid(lang, productId)
    console.log("Product data fetched:", data)
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
  if (!id) return notFound()

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
  console.log("Generated slug:", slug)

  // Construct the expected URL with the slug
  const expectedUrl = `/${lang}/catalog/${productId}-${slug}`

  // If only `/id` is provided, redirect to `/id-title`
  if (id === `${productId}`) {
    return redirect(expectedUrl)
  }

  // If `/id-title` is correct, proceed to show the product
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
  }

  // If none of the above conditions match, show a 404 page
  return notFound()
}

export default ProductPage