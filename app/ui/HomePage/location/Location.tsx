'use client'

import { ILocation } from '@/app/lib/interfaces'
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import Arrow from '../../svg/Arrow'
import ArrowLeftIcon from '../../svg/ArrowLeftIcon'

const SwiperNavigation = ({
	order,
	length,
	isLastSlide,
}: {
	order: string
	length: string
	isLastSlide: boolean
}) => {
	const swiper = useSwiper()

	return (
		<Flex align={'center'}>
			<IconButton
				color={parseInt(order) === 1 ? 'unfocus' : 'currentColor'}
				aria-label="previous slide"
				variant={'ghost'}
				_hover={{ bg: 'transparent' }}
				icon={<ArrowLeftIcon />}
				onClick={() => swiper.slidePrev()}
			/>
			<Text fontSize={'20px'} fontStyle={'normal'} fontWeight={600} lineHeight={1}>
				{`${order} / ${length}`}
			</Text>
			<IconButton
				color={isLastSlide ? 'unfocus' : 'currentColor'}
				aria-label="previous slide"
				variant={'ghost'}
				_hover={{ bg: 'transparent' }}
				onClick={() => swiper.slideNext()}
				icon={<Arrow />}
			/>
		</Flex>
	)
}

const Location = ({
	locations,
	title,
	subTitle,
}: {
	locations: ILocation[]
	title: string
	subTitle: string
}) => {
	return (
		<SectionWrapper bg={'accent'}>
			<Flex>
				<Heading as={'h3'}>{title}</Heading>
				<Heading as={'h2'}>{subTitle}</Heading>
			</Flex>
			<Swiper
				className="locationSlider"
				navigation={false}
				slidesPerView={1}
				breakpoints={{
					320: {
						slidesPerView: 1,
						slidesPerGroup: 1,
					},
				}}
			>
				{locations.length > 0 &&
					locations.map((location, idx) => {
						const { text, img } = location

						return (
							<SwiperSlide key={idx}>
								<Box
									display="flex"
									gap="40px"
									borderBottom="2px solid #0e0d0d"
									w="100%"
									flexDirection={{ base: 'column', md: 'row' }}
									alignItems="center"
								>
									<Box position="relative" w={200} height={200} flex={2}>
										<Image
											src={img || '/img/productPlaceholder.jpg'}
											alt={'location photo'}
											fill
											style={{
												objectFit: 'cover',
											}}
										/>
									</Box>
									<Flex flex={2} flexDir={'column'} justify={'center'}>
										<Text>{text}</Text>
										<Flex gap="8px" mt="8px">
											<SwiperNavigation
												order={(idx + 1).toString()}
												length={locations.length.toString()}
												isLastSlide={idx === locations.length - 1}
											/>
										</Flex>
									</Flex>
								</Box>
							</SwiperSlide>
						)
					})}
			</Swiper>
		</SectionWrapper>
	)
}

export default Location
