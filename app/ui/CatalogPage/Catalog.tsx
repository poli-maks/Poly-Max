import { fetchCategories } from '@/app/lib/api/services'
import { getDictionary } from '@/app/lib/dictionary'
import { IProduct } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Heading, Text } from '@chakra-ui/react'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import CategoryList from './CategoryList/CategoryList'
import ProductList from './ProductList/ProductList'

const Catalog = async ({ lang, products }: { lang: Locale; products: IProduct[] | string }) => {
	const categories = await fetchCategories(lang)
	const {
		catalog: { title, all_category },
	} = await getDictionary(lang)

	return (
		<SectionWrapper
			py={{ base: '0', lg: '0', xl: '0' }}
			pt={{ base: '43px', lg: '94px', xl: '94px' }}
		>
			<Heading as={'h1'} textTransform={'uppercase'} mb={'60px'}>
				{title}
			</Heading>
			<CategoryList categories={categories} dictionary={all_category} />

			{Array.isArray(products) && <ProductList products={products} lang={lang} />}

			{typeof products === 'string' && <Text color={'error'}>{products}</Text>}
		</SectionWrapper>
	)
}

export default Catalog
