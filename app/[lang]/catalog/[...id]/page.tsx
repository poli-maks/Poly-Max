import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

// Генеруємо slug з назви продукту
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Замінюємо всі символи, крім букв і цифр, на дефіси
    .replace(/(^-|-$)+/g, '') // Видаляємо дефіси на початку і в кінці
}

// Функція для генерації метаданих (канонічного URL)
export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  const productId = parseInt(id, 10)
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
  if (!product || !product.title) return notFound()

  const slug = generateSlugFromTitle(product.title)

  // Генеруємо канонічний URL для продукту з ID = 4
  const canonicalUrl = productId === 4 ? `/en/catalog/4-barrage-post` : `/catalog/${id}-${slug}`

  return {
    title: product.title,
    description: product.descShort,
    alternates: {
      canonical: canonicalUrl, // Задаємо канонічний URL
    },
    openGraph: {
      images: [
        {
          url: product.img?.data?.[0]?.attributes?.formats?.small?.url || '/img/productPlaceholder.jpg',
        },
      ],
    },
  }
}

const ProductPage: React.FC<IParams> = async ({ params: { lang, id } }) => {
  if (!id) return notFound()

  const productId = parseInt(id, 10)
  if (!productId) return notFound()

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
  if (!productDetails || !productDetails.title) return notFound()

  // Генеруємо slug
  const slug = generateSlugFromTitle(productDetails.title)

  // Виконуємо редірект тільки для товару з ID = 4
  if (productId === 4 && id !== '4-barrage-post') {
    return redirect(`/en/catalog/4-barrage-post`)
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