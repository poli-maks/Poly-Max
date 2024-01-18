'use client'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

import aboutUsImgFirstSection from '../../../public/img/aboutUs_first.jpg'
import aboutUsImgSecondSection from '../../../public/img/aboutUs_second.jpg'
import SectionWrapper from '../sectionWrapper/SectionWrapper'

const About = () => {
	return (
		<SectionWrapper>
			<Box maxW="860px" mb={{ base: '40px', lg: '120px' }}>
				<Heading fontSize={{ base: '24px', lg: '40px' }} as="h1" mb={{ base: '30px', lg: '40px' }}>
					ÜBER UNS
				</Heading>
				<Text fontSize={{ base: '24px', lg: '40px' }} lineHeight={1}>
					Die Unternehmensphilosophie besteht aus im preiswerten Anbieten hochqualitativer Waren
					unseren Kunden und langfristiger und gegenseitig vorteilhafter Beziehungen unseren
					Partnern.
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
					<Heading as="h3" mb="20px" fontSize="20px" color="hText" maxW="200px">
						Firmenprofil
					</Heading>
				</Box>
				<Box flex={{ lg: 2.15 }}>
					<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '20px', lg: '55px' }}>
						Poli-Maks GmbH ist Hersteller und gleichzeitig Großhändler von Metallerzeugnissen für
						Zivil-, Tief- und Straßenbau. Die Fertigung erfolgt in der Stadt Dnipro (Ukraine). Die
						neusten Anlagen in der Produktionshalle ermöglichen kurzfristige Produktion von
						Erzeugnissen in größeren Mengen. Jährliche Erweiterung des Vertriebsbereiches lässt
						Poli-Maks den Bedarf von ausländischen Kunden an qualitativen und preisgünstigen
						Produkten decken.
					</Text>
					<Image src={aboutUsImgFirstSection} alt={`For buisness section image`} />
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
						Unser strategischer Hauptziel
					</Heading>
				</Box>

				<Box flex={{ lg: 2.15 }}>
					<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '20px', lg: '30px' }}>
						Entwicklung zu einer dynamisch wachsenden internationalen Markenfirma, die ihre
						Erzeugnisse in europäische Länder liefert und würdiger Wettbewerber für führende
						Produzenten ähnlicher Produkte hinsichtlich Preis und Qualität ist.
					</Text>
				</Box>
			</Flex>
			<Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'}>
				<Box flex={{ lg: 2 }}>
					<Heading as="h3" mb="20px" fontSize="20px" color="hText" maxW="200px">
						Für Geschäfte
					</Heading>
				</Box>

				<Box flex={{ lg: 2.15 }}>
					<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '20px', lg: '55px' }}>
						Verkaufen gemeinsam mit uns. Poli-Maks bietet günstige Konditionen für Großhändler.
						Anwendungsbereich und Qualität unserer Produkte gewährleisten hohe Nachfrage und
						jeweiliges Verkaufsniveau im ganzen Europa. Für Sie bedeutet das - profitabler Verkauf
						Produkte vom Hersteller Poli-Maks bedankt sich bei den Stammkunden für ihr Vertrauen.
					</Text>
					<Image src={aboutUsImgSecondSection} alt={`For buisness section image`} />
				</Box>
			</Flex>
		</SectionWrapper>
	)
}

export default About
