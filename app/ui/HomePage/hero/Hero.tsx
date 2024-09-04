import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper'
import { Locale } from '@/i18n.config'
import { Box, Button, Grid, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import hero_bg from '../../../../public/img/hero_bg.jpg'
interface IHero {
	dictionary: {
		hero: { title: string }
		button: string
	}
	lang: Locale
}

const Hero = ({ dictionary, lang }: IHero) => {
	const { hero, button } = dictionary

	return (
		<>
			<SectionWrapper style={{ paddingBottom: '30px' }}>
				<Grid gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}>
					<Heading as={'h1'} flex={2} fontSize={{ base: '24px', sm: '36px', lg: '50px' }}>
						{hero.title.split('/n').map((line, index) => (
							<React.Fragment key={index}>
								{line}
								<br />
							</React.Fragment>
						))}
					</Heading>
					<Button
						justifySelf={'end'}
						alignSelf={'end'}
						w={'100%'}
						pos={'relative'}
						maxW={{ base: '100%', lg: '360px' }}
						variant={'accent'}
						mt={{ base: '20px', lg: 0 }}
					>
						<Link
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							href={`/${lang}/catalog?page=1`}
						>
							{button}
						</Link>
					</Button>
				</Grid>
			</SectionWrapper>
			<Box as={'section'}>
				<Box
					position={'relative'}
					h={{ base: '420px', lg: '650px' }}
					bgRepeat={'no-repeat'}
					bgPos={'center'}
					bgSize={'cover'}
					backgroundImage={'/img/blurPlaceholder.png'}
				>
					<Image
						style={{ position: 'absolute', objectFit: 'cover' }}
						src={hero_bg}
						alt="hero_bg"
						fill
					/>
				</Box>
			</Box>
		</>
	)
}

export default Hero
