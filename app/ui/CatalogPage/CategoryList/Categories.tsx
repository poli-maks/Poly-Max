import { fetchCategories } from '@/app/lib/api/services';
import { Locale } from '@/i18n.config';
import React from 'react';

import MobileFilterMenu from '../MobileFilterMenu/MobileFilterMenu';
import CategoryList from './CategoryList';

interface ICategoriesProps {
	lang: Locale;
	all_category: string;
	filter: string;
}

const Categories = async ({ all_category, filter, lang }: ICategoriesProps) => {
	const categories = await fetchCategories(lang);

	return (
		<>
			<CategoryList categories={categories} dictionary={all_category} />
			<MobileFilterMenu categories={categories} filter={filter} all_category={all_category} />
		</>
	);
};

export default Categories;
