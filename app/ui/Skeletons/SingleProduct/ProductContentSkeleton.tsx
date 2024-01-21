import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

import TableSkeleton from './TableSkeleton'

function ProductContentSkeleton() {
	return (
		<>
			<Flex flex="1" flexDirection="column" pl={{ base: 0, lg: '20px' }}>
				<Box>
					<SkeletonText
						marginBottom={{ base: '20px', lg: '40px' }}
						noOfLines={4}
						spacing="4"
						skeletonHeight="2"
					/>

					<SkeletonText
						mb={{ base: '30px', lg: '40px' }}
						noOfLines={4}
						spacing="4"
						skeletonHeight="2"
					/>
				</Box>
				<Box mb={{ base: '48px', lg: '120px' }}>
					<Skeleton mb="20px" w="100%" px="30px" />

					<Flex display="flex" alignItems="center" gap="10px">
						<Skeleton width="24" height="24" />
						<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
					</Flex>
				</Box>

				<TableSkeleton />
			</Flex>
		</>
	)
}

export default ProductContentSkeleton
