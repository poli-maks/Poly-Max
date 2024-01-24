'use client'
import { IAboutUsDictionary } from '@/app/lib/interfaces'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

import aboutImg1 from '../../../public/img/aboutPhoto1.jpg'
import aboutImg2 from '../../../public/img/aboutPhoto2.png'
import aboutUsImgFirstSection from '../../../public/img/aboutUs_first.jpg'
import aboutUsImgSecondSection from '../../../public/img/aboutUs_second.jpg'
import SectionWrapper from '../sectionWrapper/SectionWrapper'

const About = ({ dictionary }: { dictionary: IAboutUsDictionary }) => {
	return (
		<SectionWrapper>
			<Box maxW="860px" mb={{ base: '40px', lg: '120px' }}>
				<Heading fontSize={{ base: '24px', lg: '40px' }} as="h1" mb={{ base: '30px', lg: '40px' }}>
					{dictionary.title}
				</Heading>
				<Text fontSize={{ base: '24px', lg: '40px' }} lineHeight={1}>
					{dictionary.subTitle}
				</Text>
			</Box>
			<Flex
				flexDirection={{ base: 'column', lg: 'row' }}
				justifyContent={'space-between'}
				pb={{ base: '40px', lg: '60px' }}
				borderBottom={'solid 1px #E0E0E0'}
				mb={{ base: '40px', lg: '60px' }}
			>
				<Box flex={{ lg: 2 }}>
					<Heading as="h3" mb="40px" fontSize="20px" color="hText" maxW="200px">
						{dictionary.sections.first.title}
					</Heading>
					<Box
						position="relative"
						z-index="2"
						maxW={{ base: '100%', md: '640px', lg: '440px' }}
						h={{ base: '275px', md: '440px', lg: '420px' }}
						overflow={'hidden'}
						_hover={{
							cursor: 'pointer',
						}}
						mb="20px"
						backgroundImage={'/img/blurPlaceholder.png'}
						backgroundPosition={'center'}
						backgroundRepeat={'no-repeat'}
						backgroundSize={'cover'}
					>
						<Image
							className="product_card"
							src={aboutImg2}
							alt={''}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 33vw"
							style={{ objectFit: 'cover' }}
							placeholder="blur"
							blurDataURL="/img/blurPlaceholder.png"
							loading="lazy"
						/>
					</Box>
				</Box>
				<Box flex={{ lg: 2.15 }}>
					<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '20px', lg: '55px' }}>
						{dictionary.sections.first.text}
					</Text>
					<Image
						src={aboutUsImgFirstSection || '/img/blurPlaceholder.png'}
						alt={`For buisness section image`}
						placeholder="blur"
						blurDataURL="/img/blurPlaceholder.png"
						loading="lazy"
					/>
				</Box>
			</Flex>
			<Flex
				flexDirection={{ base: 'column', lg: 'row' }}
				justifyContent={'space-between'}
				pb={{ base: '40px', lg: '60px' }}
				borderBottom={'solid 1px #E0E0E0'}
				mb={{ base: '40px', lg: '60px' }}
			>
				<Box flex={{ lg: 2 }}>
					<Heading as="h3" mb="20px" fontSize="20px" color="hText" maxW="200px">
						{dictionary.sections.second.title}
					</Heading>
				</Box>

				<Box flex={{ lg: 2.15 }}>
					<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '20px', lg: '30px' }}>
						{dictionary.sections.second.text}
					</Text>
				</Box>
			</Flex>
			<Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'}>
				<Box flex={{ lg: 2 }}>
					<Heading as="h3" mb="20px" fontSize="20px" color="hText" maxW="200px">
						{dictionary.sections.third.title}
					</Heading>

					<Box
						position="relative"
						z-index="2"
						maxW={{ base: '100%', md: '640px', lg: '440px' }}
						h={{ base: '440px', lg: '93%' }}
						overflow={'hidden'}
						_hover={{
							cursor: 'pointer',
						}}
						mb="20px"
						backgroundImage={'/img/blurPlaceholder.png'}
						backgroundPosition={'center'}
						backgroundRepeat={'no-repeat'}
						backgroundSize={'cover'}
					>
						<Image
							className="product_card"
							src={aboutImg1}
							alt={''}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 33vw"
							style={{ objectFit: 'cover' }}
							placeholder="blur"
							blurDataURL="/img/blurPlaceholder.png"
							loading="lazy"
						/>
					</Box>
				</Box>

				<Box flex={{ lg: 2.15 }}>
					<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '20px', lg: '55px' }}>
						{dictionary.sections.third.text}
					</Text>
					<Image
						src={aboutUsImgSecondSection || '/img/blurPlaceholder.png'}
						alt={`For buisness section image`}
						placeholder="blur"
						blurDataURL="/img/blurPlaceholder.png"
						loading="lazy"
					/>
				</Box>
			</Flex>
		</SectionWrapper>
	)
}

export default About
