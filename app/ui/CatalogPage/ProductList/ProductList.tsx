import { IProduct } from '@/app/lib/interfaces';
import { Locale } from '@/i18n.config';
import { Grid } from '@chakra-ui/react';
import React from 'react';

import ProductItem from '../ProductItem/ProductItem';

interface IProductList {
	products: IProduct[];
	lang: Locale;
	page: number;
}

const ProductList = ({ products, lang }: IProductList) => {
	return (
		<>
			<Grid
				key={products.length}
				as={'ul'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={'20px'}
				m={'0 auto'}
				padding={0}
			>
				{Array.isArray(products) &&
					products.length > 0 &&
					products.map((product) => (
						<ProductItem key={product.attributes.uid} product={product} lang={lang} />
					))}
			</Grid>
		</>
	);
};

export default ProductList;
