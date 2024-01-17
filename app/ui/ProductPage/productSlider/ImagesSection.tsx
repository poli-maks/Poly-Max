'use client'
import { ImageAttributes } from '@/app/lib/interfaces'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'
import Image from 'next/image'

import { ProductSlider } from './ProductSlider'

const ImagesSection = ({ productImages }: { productImages: ImageAttributes[] }) => {
	return (
		<Flex w={{ base: '100%', xl: '530px', lg: '330px' }}>
			<Box overflow="hidden">
				<List display={{ base: 'none', lg: 'flex' }} flexDirection="column" gap="10px">
					{productImages.map((item) => (
						<ListItem key={item.id}>
							<Box
								position="relative"
								z-index="2"
								width={{ base: '100%', lg: item.attributes.width }}
								height={{ xl: item.attributes.height, lg: item.attributes.height * 0.9 }}
								bgRepeat={'no-repeat'}
								bgPos={'center'}
								bgSize={'cover'}
								paddingBottom="25px"
							>
								<Image
									src={item.attributes.url || '/img/productPlaceholder.jpg'}
									alt=""
									layout="fill"
									fill
									placeholder="blur"
									blurDataURL="/img/productPlaceholder.jpg"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									style={{
										display: 'block',
										height: '100%',
										maxWidth: '100%',
										objectFit: 'cover',
									}}
								/>
							</Box>
						</ListItem>
					))}
				</List>

				<ProductSlider productImages={productImages} />
			</Box>
		</Flex>
	)
}

export default ImagesSection
