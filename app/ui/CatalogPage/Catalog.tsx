import { fetchCategories } from '@/app/lib/api/services'
import { IProduct } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Heading, Text } from '@chakra-ui/react'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import CategoryList from './CategoryList/CategoryList'
import LoadMore from './LoadMore/LoadMore'
import ProductList from './ProductList/ProductList'

const Catalog = async ({
	lang,
	products,
	total,
	btnText,
	title,
	all_category,
	totalProducts,
}: {
	lang: Locale
	products: IProduct[] | string | undefined
	total: string
	btnText: string
	title: string
	all_category: string
	totalProducts?: number
}) => {
	const categories = await fetchCategories(lang)

	return (
		<SectionWrapper
			py={{ base: '0', lg: '0', xl: '0' }}
			pt={{ base: '40px', lg: '60px', xl: '60px' }}
			pb={{ base: '40px', lg: '120px', xl: '120px' }}
		>
			<Heading as={'h1'} textTransform={'uppercase'} mb={'60px'}>
				{title}
			</Heading>
			<CategoryList categories={categories} dictionary={all_category} />

			{Array.isArray(products) && (
				<ProductList totalProducts={totalProducts} products={products} lang={lang} />
			)}

			{typeof products === 'string' && <Text color={'error'}>{products}</Text>}

			<LoadMore total={total} hasProducts={!!Array.isArray(products)}>
				{btnText}
			</LoadMore>
		</SectionWrapper>
	)
}

export default Catalog
