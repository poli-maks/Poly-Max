'use client'

import { ILocation } from '@/app/lib/interfaces'
import Arrow from '@/app/ui/svg/Arrow'
import ArrowLeftIcon from '@/app/ui/svg/ArrowLeftIcon'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'
import './location.css'

const LocationsSlider = ({ locations }: { locations: ILocation[] }) => {
	return (
		<Swiper
			className="locationSlider"
			direction="horizontal"
			navigation={false}
			slidesPerView={1}
			modules={[Scrollbar]}
			grabCursor
			spaceBetween={20}
			scrollbar={{
				enabled: true,
				hide: false,
			}}
		>
			{locations.length > 0 &&
				locations.map((location, idx) => {
					const { text, img } = location

					return (
						<SwiperSlide key={idx}>
							<Flex gap={'20px'} flexDir={{ base: 'column', lg: 'row' }}>
								<Box
									flex={{ lg: 2.15 }}
									position="relative"
									maxW={{ base: '1000px', lg: '640px' }}
									minW={'280'}
									h={'400px'}
									bgRepeat={'no-repeat'}
									bgPos={'center'}
									bgSize={'cover'}
									backgroundImage={'/img/blurPlaceholder.png'}
								>
									<Image
										placeholder="blur"
										blurDataURL="/img/blurPlaceholder.png"
										loading="lazy"
										src={img || '/img/blurPlaceholder.png'}
										alt={'location photo'}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 33vw"
										style={{
											objectFit: 'cover',
										}}
									/>
								</Box>
								<Flex flex={{ lg: 2 }} flexDir={'column'} justify={'space-between'}>
									<Text fontSize={{ base: '14px', lg: '18px' }} fontWeight={400} lineHeight={1.4}>
										{text}
									</Text>
									<Flex display={{ base: 'none', lg: 'flex' }}>
										<SwiperNavigation
											order={(idx + 1).toString()}
											length={locations.length.toString()}
											isLastSlide={idx === locations.length - 1}
											isFirstSlide={idx === 0}
										/>
									</Flex>
								</Flex>
							</Flex>
						</SwiperSlide>
					)
				})}
		</Swiper>
	)
}

export default LocationsSlider

const SwiperNavigation = ({
	order,
	length,
	isLastSlide,
	isFirstSlide,
}: {
	order: string
	length: string
	isLastSlide: boolean
	isFirstSlide: boolean
}) => {
	const swiper = useSwiper()

	return (
		<Flex align={'center'}>
			<IconButton
				color={isFirstSlide ? 'unfocus' : 'currentColor'}
				aria-label="previous slide"
				variant={'ghost'}
				_hover={{ bg: 'transparent' }}
				isDisabled={isFirstSlide}
				icon={<ArrowLeftIcon />}
				onClick={() => swiper.slidePrev()}
			/>
			<Text
				fontSize={'20px'}
				fontStyle={'normal'}
				fontWeight={600}
				lineHeight={1}
				letterSpacing={'-1.8px'}
			>
				{`${order} / ${length}`}
			</Text>
			<IconButton
				color={isLastSlide ? 'unfocus' : 'currentColor'}
				isDisabled={isLastSlide}
				aria-label="previous slide"
				variant={'ghost'}
				_hover={{ bg: 'transparent' }}
				onClick={() => swiper.slideNext()}
				icon={<Arrow />}
			/>
		</Flex>
	)
}
