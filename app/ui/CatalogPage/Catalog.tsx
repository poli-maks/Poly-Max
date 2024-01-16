import { fetchCategories } from '@/app/lib/api/services'
import { Locale } from '@/i18n.config'
import { Heading } from '@chakra-ui/react'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import CategoryList from './CategoryList'

const Catalog = async ({ lang }: { lang: Locale }) => {
	const categories = await fetchCategories(lang)

	return (
		<SectionWrapper>
			<Heading as={'h1'} textTransform={'uppercase'} mb={'60px'}>
				producte
			</Heading>
			<CategoryList categories={categories} />
		</SectionWrapper>
	)
}

export default Catalog
