'use client'

import { ImageAttributes } from '@/app/lib/interfaces'
import { Box, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
import './SwiperProducts.css'

export const ProductSlider = ({ productImages }: { productImages: ImageAttributes[] }) => {
	const size = useBreakpointValue({ base: 'sm', lg: 'md' }, { ssr: false })

	return (
		<Box mb="41px" display={{ base: 'block', lg: 'none' }}>
			<Swiper
				direction="horizontal"
				slidesPerView={1}
				grabCursor={true}
				scrollbar={true}
				loop={true}
				modules={[Scrollbar]}
				observer={true}
				observeParents={true}
				hidden={size !== 'sm' ? true : false}
			>
				{productImages.map((item) => (
					<SwiperSlide key={item.id}>
						<Box
							position="relative"
							z-index="2"
							maxW="768px"
							minW="340px"
							h={{ base: '255px', md: '480px', sm: '380px' }}
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
									width: '100%',
									objectFit: 'cover',
								}}
							/>
						</Box>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	)
}
