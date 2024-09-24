import { getProductByUid } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Helper function to extract ID from the slug
const extractIdFromSlug = (idSlug: string | undefined): number | null => {
  if (!idSlug) return null;
  const [id] = idSlug.split('-')
  const parsedId = parseInt(id, 10)
  return isNaN(parsedId) ? null : parsedId
}

export const generateMetadata = async ({ params: { id, lang } }: IParams) => {
  const productId = extractIdFromSlug(id)

  if (!productId) return notFound()

  let data
  if (productId) data = await getProductByUid(lang, productId)

  if (!data || data.length === 0) return notFound()

  const { attributes: product } = data[0]

  const imgUrl =
    product.img?.data !== null
      ? product.img.data[0]?.attributes?.formats?.small?.url
      : '/img/productPlaceholder.jpg'

  return {
    title: product.title,
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

  const productId = extractIdFromSlug(id)

  if (!productId) return notFound()

  const dictionary = await getDictionary(lang)

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