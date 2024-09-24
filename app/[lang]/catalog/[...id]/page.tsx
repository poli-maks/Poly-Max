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
  // Продовжуємо як було раніше, все працює
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

  // Спеціальний випадок для конкретного продукту
  if (productId === 4 && lang === 'en') {
    const slug = 'barrage-post'
    const expectedUrl = `/en/catalog/4-${slug}`

    // Якщо URL вже правильний, не робимо редірект
    if (id !== `4-${slug}`) {
      return redirect(expectedUrl)
    }
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