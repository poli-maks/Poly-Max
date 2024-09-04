import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper'
import {
	Box,
	Flex,
	List,
	ListItem,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import React from 'react'

const SingleProductSkeleton = () => {
	return (
		<SectionWrapper>
			<Flex flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
					<Box w="100%" overflow="hidden">
						<List display={{ base: 'none', lg: 'flex' }} flexDirection="column" gap="10px">
							{Array.from({ length: 3 }, (v, i) => (
								<ListItem key={i}>
									<Skeleton
										key={i}
										height="300px"
										maxH="350px"
										minH={{ base: '255px', lg: '392px' }}
										w={{ base: '100%', xl: '530px', lg: '330px' }}
										startColor="lightgray"
										endColor="grey"
									/>
								</ListItem>
							))}
						</List>

						<Box mb="41px" display={{ base: 'block', lg: 'none' }}>
							<Skeleton
								height="300px"
								maxH="350px"
								minH={{ base: '255px', lg: '392px' }}
								w={{ base: '100%', xl: '530px', lg: '330px' }}
								startColor="lightgray"
								endColor="grey"
							/>
						</Box>
					</Box>
				</Flex>
				<Flex flex="1" flexDirection="column" pl={{ base: 0, lg: '20px' }}>
					<Box mb="40px">
						<SkeletonText
							noOfLines={1}
							skeletonHeight="5"
							w="60%"
							startColor="lightgray"
							endColor="grey"
							marginBottom={{ base: '20px', lg: '40px' }}
						/>

						<SkeletonText
							noOfLines={10}
							skeletonHeight="1"
							startColor="lightgray"
							endColor="grey"
						/>
					</Box>
					<Box mb={{ base: '48px', lg: '120px' }}>
						<Skeleton
							height="45px"
							w="100%"
							marginBottom="20px"
							startColor="lightgray"
							endColor="grey"
						/>
						<Flex display="flex" alignItems="center" gap="10px">
							<SkeletonCircle w="24px" h="24px" startColor="lightgray" endColor="grey" />
							<SkeletonText
								w="50%"
								noOfLines={2}
								skeletonHeight="1"
								startColor="lightgray"
								endColor="grey"
							/>
						</Flex>
					</Box>
					<TableContainer mb={{ base: '41px', lg: '121px' }}>
						<Table>
							<Thead bg="tableRow">
								<Tr>
									{Array.from({ length: 4 }, (v, i) => {
										return (
											<Th key={i}>
												<Skeleton
													height="20px"
													w="100%"
													marginBottom="20px"
													startColor="lightgray"
													endColor="grey"
												/>
											</Th>
										)
									})}
								</Tr>
							</Thead>
							<Tbody>
								{Array.from({ length: 4 }, (v, i) => (
									<Tr key={i}>
										{Array.from({ length: 4 }, (v, j) => (
											<Td key={j}>
												<Skeleton
													height="20px"
													w="100%"
													marginBottom="20px"
													startColor="lightgray"
													endColor="grey"
												/>
											</Td>
										))}
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
			</Flex>
		</SectionWrapper>
	)
}

export default SingleProductSkeleton
