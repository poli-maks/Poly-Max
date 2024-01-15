'use client'
import { ImageAttributes } from '@/app/lib/interfaces'
import { Box, Flex, List, ListItem, useMediaQuery } from '@chakra-ui/react'
import Image from 'next/image'

import { ProductSlider } from './ProductSlider'

const ImagesSection = ({ productImages }: { productImages: ImageAttributes[] }) => {
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

	return (
		<Flex>
			<Box overflow="hidden">
				{isLargerThan768 ? (
					<List display="flex" flexDirection="column" gap="10px">
						{productImages.map((item) => (
							<ListItem key={item.id}>
								<Box
									position="relative"
									z-index="2"
									width={item.attributes.width}
									height={item.attributes.height}
									bgRepeat={'no-repeat'}
									bgPos={'center'}
									bgSize={'cover'}
									paddingBottom="25px"
								>
									<Image
										src={item.attributes.url}
										alt=""
										fill
										//placeholder="blur"
										//blurDataURL="/blur-product.jpg"
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
				) : (
					<Box w="255px">
						<ProductSlider productImages={productImages} />
					</Box>
				)}
			</Box>
		</Flex>
	)
}

export default ImagesSection
