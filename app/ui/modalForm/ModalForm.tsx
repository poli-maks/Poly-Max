import { IDictionaryModal } from '@/app/lib/interfaces'
import { Heading, Text } from '@chakra-ui/react'

import ContactForm from '../contactForm/ContactForm'
import { theme } from '../theme'

interface ModalFormProps {
	nameProduct?: string
	dictionaryModal: IDictionaryModal
}

const ModalForm: React.FC<ModalFormProps> = ({ nameProduct, dictionaryModal }) => {
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
				{dictionaryModal.title}
			</Heading>
			<Text
				fontSize={{ base: '14px', lg: '18px' }}
				lineHeight={{ base: '16.8px', lg: '25.2px' }}
				color={theme.colors.bodyText}
				marginBottom={{ base: '16px', lg: '24px' }}
			>
				{dictionaryModal.text}
			</Text>
			<ContactForm nameProduct={nameProduct} dictionaryModal={dictionaryModal} />
		</>
	)
}

export default ModalForm
