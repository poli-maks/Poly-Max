import { fetchContacts } from '@/app/lib/api/services'
import { IDictionaryModal } from '@/app/lib/interfaces'
import { Locale } from '@/i18n.config'
import { Heading, Flex, Box } from '@chakra-ui/react'

import ContactForm from '../contactForm/ContactForm'
import GoogleMap from '../googleMap/GoogleMap'
import SectionWrapper from '../sectionWrapper/SectionWrapper'
import { theme } from '../theme'
import ContactInfo from './contactInfo/ContactInfo'

interface ContactProps {
	lang: Locale
	dictionary: {
		contactPage: {
			title: string
			mainTitle: string
			description: string
			position: string
		}
		modalForm: IDictionaryModal
	}
}

const Contact: React.FC<ContactProps> = async ({ lang, dictionary }) => {
	const contacts = await fetchContacts(lang)

	return (
		<>
			<SectionWrapper>
				<Heading
					as={'h2'}
					fontSize={{ base: '24px', lg: '40px' }}
					fontWeight={'500'}
					color={theme.colors.hText}
					textTransform={'uppercase'}
					marginBottom={{ base: '30px', lg: '60px' }}
				>
					{dictionary.contactPage.mainTitle}
				</Heading>
				<Flex flexDirection={{ base: 'column', lg: 'row' }}>
					<Heading
						as={'h3'}
						fontSize="20px"
						flex={{ lg: 2 }}
						color={theme.colors.hText}
						marginBottom={{ base: '30px', lg: '0' }}
						style={{ lineHeight: '20px', fontWeight: '600' }}
					>
						{dictionary.contactPage.title}
					</Heading>

					<Box flex={{ lg: 2 }}>
						<Heading
							as={'h2'}
							fontSize={{ base: '24px', lg: '40px' }}
							lineHeight={{ base: '24px', lg: '40px' }}
							color={theme.colors.hText}
							fontWeight="500"
							marginBottom={{ base: '40px', lg: '60px' }}
						>
							{dictionary.contactPage.description}
						</Heading>
						<ContactForm dictionaryModal={dictionary.modalForm} />
					</Box>
				</Flex>
			</SectionWrapper>
			<SectionWrapper style={{ paddingTop: '0' }}>
				<Flex
					flexDir={{ base: 'column', lg: 'row' }}
					justifyContent={'space-between'}
					alignItems={{ base: 'start', lg: 'center' }}
				>
					<ContactInfo contacts={contacts} position={dictionary.contactPage.position} />
					<GoogleMap />
				</Flex>
			</SectionWrapper>
		</>
	)
}

export default Contact
