import { fetchCategories } from '@/app/lib/api/services'
import { IProduct } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Grid, Heading } from '@chakra-ui/react'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import CategoryList from './CategoryList'
import ProductItem from './ProductItem/ProductItem'

const Catalog = async ({ lang, products }: { lang: Locale; products: IProduct[] }) => {
	const categories = await fetchCategories(lang)

	return (
		<SectionWrapper>
			<Heading as={'h1'} textTransform={'uppercase'} mb={'60px'}>
				producte
			</Heading>
			<CategoryList categories={categories} />
			{/* TEST PRODUCTS GRID */}

			<Grid
				as={'ul'}
				maxW={'100%'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={10}
				m={'0 auto'}
				padding={0}
			>
				{products?.length > 0 &&
					products.map((product) => {
						return <ProductItem key={product.attributes.uid} product={product} lang={lang} />
					})}
			</Grid>

			{/* TEST PRODUCTS GRID */}
		</SectionWrapper>
	)
}

export default Catalog
