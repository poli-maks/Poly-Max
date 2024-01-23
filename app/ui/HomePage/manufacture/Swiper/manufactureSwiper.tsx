'use client'

import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import './styles.css'
import ManufactureImg1 from '../../../../../public/img/manufactureImg1.png'
import ManufactureImg2 from '../../../../../public/img/manufactureImg2.png'
import ManufactureImg3 from '../../../../../public/img/manufactureImg3.png'
import ManufactureImg4 from '../../../../../public/img/manufactureImg4.png'
import ManufactureImg5 from '../../../../../public/img/manufactureImg5.png'
import ManufactureImg6 from '../../../../../public/img/manufactureImg6.png'

const SliderImages = [
	ManufactureImg1,
	ManufactureImg2,
	ManufactureImg3,
	ManufactureImg4,
	ManufactureImg5,
	ManufactureImg6,
]

const manufactureSwiper = () => {
	return (
		<>
			<Swiper
				className="manufactureSwiper"
				spaceBetween={20}
				slidesPerView={1}
				loop={true}
				grabCursor
				breakpoints={{
					270: {
						slidesPerView: 2,
						spaceBetween: 10,
						slidesPerGroup: 1,
					},
					360: {
						slidesPerView: 2,
						spaceBetween: 10,
						slidesPerGroup: 2,
					},
					1000: {
						slidesPerView: 3,
						spaceBetween: 20,
						slidesPerGroup: 1,
					},
				}}
			>
				{SliderImages.map((image, index) => (
					<SwiperSlide key={index}>
						<Box
							position="relative"
							bgRepeat={'no-repeat'}
							bgPos={'center'}
							bgSize={'cover'}
							backgroundImage={'/img/blurPlaceholder.png'}
							className="sliderBox"
						>
							<Image
								placeholder="blur"
								blurDataURL="/img/blurPlaceholder.png"
								loading="lazy"
								src={image || '/img/blurPlaceholder.png'}
								alt={`Manufacture slider image ${index + 1}`}
								fill
								style={{
									objectFit: 'cover',
								}}
							/>
						</Box>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default manufactureSwiper
