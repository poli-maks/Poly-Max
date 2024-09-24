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

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  if (!id) return notFound()

  const productId = parseInt(id, 10)
  if (isNaN(productId)) return notFound()

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
    metadataBase: new URL('https://www.poli-maks.com'),
    alternates: {
      canonical: `/catalog/${id}`, 
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
  if (!id) return notFound()

  const productId = parseInt(id, 10)
  if (isNaN(productId)) return notFound()

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

  // Спеціальний випадок для ID = 4 та мови = "en"
  const specificSlug = generateSlugFromTitle(productDetails.title)
  const expectedUrl = `/en/catalog/${productId}-${specificSlug}`

  // Перевірка на цикл: якщо вже на правильній сторінці — не редіректимо
  if (id === `${productId}-${specificSlug}`) {
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

  // Якщо URL — це тільки ID без слагу, редіректимо на правильний URL
  if (id === `${productId}`) {
    return redirect(expectedUrl)
  }

  // Якщо ніякі умови не підходять — показуємо помилку
  return notFound()
}

export default ProductPage