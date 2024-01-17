'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import './styles.css'
import Image1 from '../../../../../public/img/Image.png'

const SliderImages = [Image1, Image1, Image1, Image1, Image1]

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
