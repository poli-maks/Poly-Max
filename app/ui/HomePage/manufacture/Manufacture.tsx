import { Locale } from '@/i18n.config'
import { Box, Heading, Button, Text, Flex } from '@chakra-ui/react'
import Link from 'next/link'

import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import Arrow from '../../svg/Arrow'
import Swiper from './Swiper/manufactureSwiper'

interface ManufactureProps {
	lang: Locale
	dictionary: {
		homePage: {
			manufacture: {
				title: string
				descriptionUp: string
				descriptionUnder: string
				button: string
			}
		}
	}
}

const Manufacture: React.FC<ManufactureProps> = ({ lang, dictionary }) => {
	return (
		<SectionWrapper>
			<Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'}>
				<Heading
					as={'h3'}
					fontSize="20px"
					color="#212121"
					marginBottom={{ base: '30px', lg: '0' }}
					style={{ lineHeight: '20px', fontWeight: '600', maxWidth: '189px' }}
				>
					{dictionary.homePage.manufacture.title}
				</Heading>
				<Box>
					<Text
						fontSize={{ base: '24px', sm: '40px' }}
						lineHeight={{ base: '24px', sm: '40px' }}
						color="#212121"
						fontWeight="500"
						w={{ base: '100%', md: '640px' }}
						marginBottom={{ base: '20px', sm: '40px' }}
					>
						{dictionary.homePage.manufacture.descriptionUp}
					</Text>
					<Text
						fontSize={{ base: '12px', sm: '18px' }}
						lineHeight={{ base: '16.8px', sm: '25.2px' }}
						color="#616161"
						w={{ base: '100%', md: '550px' }}
						marginBottom={{ base: '20px', sm: '60px' }}
					>
						{dictionary.homePage.manufacture.descriptionUnder}
					</Text>
					<Button
						variant={'arrow'}
						fontSize={{ base: '18px', sm: '20px' }}
						lineHeight="25.2px"
						marginBottom={{ base: '30px', md: '40px', lg: '60px' }}
						w={{ base: '100%', sm: '340px' }}
						as={Link}
						href={`/${lang}/about`}
						rightIcon={<Arrow />}
					>
						{dictionary.homePage.manufacture.button}
					</Button>
				</Box>
			</Flex>
			<Swiper />
			<Box
				display="flex"
				flexDirection={{ base: 'column', lg: 'row' }}
				justifyContent={'space-between'}
				marginTop={{ base: '30px', md: '40px', lg: '60px' }}
			>
				<Box as={'span'}></Box>
				<Box>
					<Text fontSize={'20px'} fontWeight={600} marginBottom={{ base: '20px', lg: '30px' }}>
						Poli-Maks
					</Text>
					<Text
						fontSize={{ base: '12px', md: '16px', lg: '18px' }}
						lineHeight={{ base: '16.8px', sm: '25.2px' }}
						w={{ base: '100%', md: '640px' }}
					>
						Poli-Maks ist ein Unternehmen mit sowohl lokaler als auch globaler Präsenz, ein
						Hersteller von hochwertigen Baubeschlägen mit Schwerpunkt auf der Metallverarbeitung.
						Als unabhängiger und zuverlässiger Partner garantieren wir einen exzellenten Service.
						Unser Team ist immer bereit, unsere Kunden kompetent zu beraten, Kundenzeichnungen zu
						prüfen und zu besprechen, um ein neues Produkt herzustellen.
					</Text>
					<Text
						fontSize={'20px'}
						fontWeight={600}
						marginBottom={{ base: '20px', lg: '30px' }}
						marginTop={{ base: '30px', md: '40px', lg: '60px' }}
					>
						Lieferung
					</Text>
					<Text
						fontSize={{ base: '12px', md: '16px', lg: '18px' }}
						lineHeight={{ base: '16.8px', sm: '25.2px' }}
						w={{ base: '100%', md: '640px' }}
					>
						Um für unsere Kunden bequemer zu machen, liefern wir zu DDP-Lieferbedingungen. Die Firma
						arbeitet mit Speditionen und Vermittlungsgesellschaften und wirkt dadurch in Logistik
						direkt mit. Die Auftragserfüllung und Liefertermine für Stammkunden sind maximal schnell
						und favorabel.
					</Text>
				</Box>
			</Box>
		</SectionWrapper>
	)
}

export default Manufacture
