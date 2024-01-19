'use client'

import { Heading, Text } from '@chakra-ui/react'

import ContactForm from '../contactForm/ContactForm'
import { theme } from '../theme'

const ModalForm = () => {
	return (
		<>
			<Heading
				as={'h2'}
				fontSize={{ base: '24px', lg: '36px' }}
				lineHeight={{ base: '24px', lg: '36px' }}
				color={theme.colors.hText}
				fontWeight="500"
				marginBottom={{ base: '16px', lg: '24px' }}
			>
				Do you want to contact us, need help or more information about a product?
			</Heading>
			<Text
				fontSize={{ base: '14px', lg: '18px' }}
				lineHeight={{ base: '16.8px', lg: '25.2px' }}
				color={theme.colors.bodyText}
				marginBottom={{ base: '16px', lg: '24px' }}
			>
				Please fill in the form below to contact us. We try our best to respond to an requests in
				less than 24 hours.
			</Text>
			<ContactForm />
		</>
	)
}

export default ModalForm
