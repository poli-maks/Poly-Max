import { fetchCategories } from '@/app/lib/api/services'
import { Locale } from '@/i18n.config'
import React from 'react'

import MobileFilterMenu from '../MobileFilterMenu/MobileFilterMenu'
import CategoryList from './CategoryList'

interface ICategoriesProps {
	lang: Locale
	dictionary: {
		all_category: string
		filter: string
	}
}

const Categories = async ({ dictionary, lang }: ICategoriesProps) => {
	const categories = await fetchCategories(lang)

	return (
		<>
			<CategoryList categories={categories} dictionary={dictionary.all_category} />
			<MobileFilterMenu categories={categories} dictionary={dictionary} />
		</>
	)
}

export default Categories
