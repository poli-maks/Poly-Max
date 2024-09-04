import { Box, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const ProductItemSkeleton = () => {
	return (
		<Box position={'relative'}>
			<Skeleton
				position="relative"
				z-index="2"
				width="100%"
				height="300px"
				overflow={'hidden'}
				_hover={{
					cursor: 'pointer',
				}}
				startColor="lightgray"
				endColor="grey"
			/>

			<SkeletonText
				mt={'10px'}
				skeletonHeight="3"
				noOfLines={1}
				w={'80%'}
				startColor="lightgray"
				endColor="grey"
			/>
		</Box>
	);
};

const ProductListSkeleton = () => {
	return (
		<Grid
			as={'ul'}
			maxW={'100%'}
			gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
			gridGap={'20px'}
			m={'0 auto'}
			padding={0}
		>
			{Array.from({ length: 8 }, (v, i) => (
				<ProductItemSkeleton key={i} />
			))}
		</Grid>
	);
};

export default ProductListSkeleton;
