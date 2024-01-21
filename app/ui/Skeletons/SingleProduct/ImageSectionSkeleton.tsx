import { Box, Flex, List, ListItem, Skeleton } from '@chakra-ui/react'
import React from 'react'

export default function ImageSectionSkeleton() {
	return (
		<Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
			<Box w="100%" overflow="hidden">
				<List display={{ base: 'none', lg: 'flex' }} flexDirection="column" gap="10px">
					{Array.from({ length: 3 }).map((el, index) => (
						<ListItem key={index}>
							<Skeleton
								w="100%"
								height={{ xl: '530px', lg: '392px' }}
								startColor="lightgray"
								endColor="grey"
							/>
						</ListItem>
					))}
				</List>
				<Box mb="41px" display={{ base: 'block', lg: 'none' }}>
					<Skeleton
						h={{ base: '255px', md: '480px', sm: '380px' }}
						startColor="lightgray"
						endColor="grey"
					/>
				</Box>
			</Box>
		</Flex>
	)
}
