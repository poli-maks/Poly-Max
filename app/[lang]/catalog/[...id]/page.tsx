import { getProductByName } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import Product from '@/app/ui/ProductPage/Product'
import SingleProductSkeleton from '@/app/ui/Skeletons/SingleProductSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const generateMetadata = async ({ params: { productName, lang } }: IParams['params']) => {
  const product = await getProductByName(lang, productName) // Fetch product by name

  if (!product) return notFound()

  const imgUrl =
    product.attributes.img.data !== null
      ? product.attributes.img.data[0].attributes.formats?.small?.url
      : '/img/productPlaceholder.jpg'

  return {
    title: product.attributes.title,
    alternates: {
      canonical: `/catalog/${productName}`,
      languages: {
        en: `/en/catalog/${productName}`,
        de: `/de/catalog/${productName}`,
      },
    },
    description: product.attributes.descShort,
    openGraph: {
      images: [
        {
          url: imgUrl,
        },
      ],
    },
  }
}

const ProductPage: React.FC<IParams['params']> = async ({ params: { lang, productName } }) => {
  if (!productName) return notFound()

  const product = await getProductByName(lang, productName) // Fetch product by name

  if (!product) return notFound()

  const dictionary = await getDictionary(lang)

  return (
    <>
      <Suspense fallback={<SingleProductSkeleton />}>
        <Product
          lang={lang}
          id={product.id}
          product={product}
          dictionary={dictionary.productPage}
          dictionaryModal={dictionary.modalForm}
        />
      </Suspense>
    </>
  )
}

export default ProductPage
