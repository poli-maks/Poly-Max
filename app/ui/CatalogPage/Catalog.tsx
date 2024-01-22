import { SEARCH_PARAMS } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Heading } from '@chakra-ui/react'
import { Suspense } from 'react'

import Products from '../Products/Products'
import SectionWrapper from '../sectionWrapper/SectionWrapper'
import CategoriesSkeleton from '../Skeletons/CategoriesSkeleton'
import ProductListSkeleton from '../Skeletons/ProductListSkeleton'
import Categories from './CategoryList/Categories'

const Catalog = ({
	lang,
	searchParams,
	btnText,
	title,
	all_category,
	filter,
	notFound,
}: {
	lang: Locale
	searchParams: { [key in SEARCH_PARAMS]: string }
	btnText: string
	title: string
	all_category: string
	filter: string
	total?: number
	notFound: string
}) => {
	return (
		<SectionWrapper
			py={{ base: '0', lg: '0', xl: '0' }}
			pt={{ base: '40px', lg: '60px', xl: '60px' }}
			pb={{ base: '40px', lg: '120px', xl: '120px' }}
		>
			<Heading as={'h1'} textTransform={'uppercase'} mb={'60px'}>
				{title}
			</Heading>
			<Suspense fallback={<CategoriesSkeleton />}>
				<Categories all_category={all_category} filter={filter} lang={lang} />
			</Suspense>
			<Suspense fallback={<ProductListSkeleton />}>
				<Products lang={lang} btnText={btnText} searchParams={searchParams} notFound={notFound} />
			</Suspense>
		</SectionWrapper>
	)
}

export default Catalog
