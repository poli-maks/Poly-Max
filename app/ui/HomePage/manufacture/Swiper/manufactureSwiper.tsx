'use client'

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
				slidesPerView={3}
				loop={true}
				grabCursor
				breakpoints={{
					270: {
						slidesPerView: 1,
						spaceBetween: 20,
						slidesPerGroup: 1,
					},
					420: {
						slidesPerView: 2,
						spaceBetween: 20,
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
						<Image src={image} alt={`Slide ${index + 1}`} width={530} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default manufactureSwiper
