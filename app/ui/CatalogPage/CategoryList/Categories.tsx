import { fetchCategories } from '@/app/lib/api/services'
import { Locale } from '@/i18n.config'
import React from 'react'

import CategoryList from './CategoryList'

interface ICategoriesProps {
	lang: Locale
	dictionary: string
}

const Categories = async ({ dictionary, lang }: ICategoriesProps) => {
	const categories = await fetchCategories(lang)

	return (
		<div>
			<CategoryList categories={categories} dictionary={dictionary} />
		</div>
	)
}

export default Categories
