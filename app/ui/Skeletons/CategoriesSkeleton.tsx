import { Flex, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const CategoriesSkeleton = () => {
	return (
		<Flex
			as={'ul'}
			display={{ base: 'none', lg: 'flex' }}
			gap={'75px'}
			borderBottom={'1px #E0E0E0 solid'}
			mb={'20px'}
			pt={'20px'}
			pb={'16px'}
			ml="18px"
		>
			<SkeletonText
				pb={'20px'}
				skeletonHeight="4"
				noOfLines={1}
				startColor="lightgray"
				endColor="grey"
				w={'35px'}
				display={{ base: 'none', lg: 'block' }}
			/>
			<SkeletonText
				pb={'20px'}
				skeletonHeight="4"
				noOfLines={1}
				startColor="lightgray"
				endColor="grey"
				w={'150px'}
			/>
			<SkeletonText
				pb={'20px'}
				skeletonHeight="4"
				noOfLines={1}
				startColor="lightgray"
				endColor="grey"
				w={'100px'}
				display={{ base: 'none', lg: 'block' }}
			/>
			<SkeletonText
				pb={'20px'}
				skeletonHeight="4"
				noOfLines={1}
				startColor="lightgray"
				endColor="grey"
				w={'150px'}
				display={{ base: 'none', lg: 'block' }}
			/>
			<SkeletonText
				pb={'20px'}
				skeletonHeight="4"
				noOfLines={1}
				startColor="lightgray"
				endColor="grey"
				w={'186px'}
				display={{ base: 'none', lg: 'block' }}
			/>
		</Flex>
	)
}

export default CategoriesSkeleton
