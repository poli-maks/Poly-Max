import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper'
import { Button, Center, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

const SubmitSuccess = () => {
	return (
		<SectionWrapper>
			<Center flexDir={'column'} h={480}>
				<Heading
					as={'h2'}
					fontSize={'40px'}
					fontWeight={'500'}
					mb={'30px'}
					textAlign={'center'}
					maxW={'440px'}
				>
					Vielen Dank, dass Sie Poli-Maks gewählt haben!
				</Heading>
				<Text
					textAlign={'center'}
					fontSize={'18px'}
					fontWeight={400}
					line-height={1.4}
					maxW={'440px'}
					mb={'40px'}
				>
					Unsere Experten werden innerhalb von 24 Stunden Kontakt zu Ihnen aufnehmen.
				</Text>

				<Button as={Link} href="/" variant={'accentAlt'} maxW={'340px'}>
					Home
				</Button>
			</Center>
		</SectionWrapper>
	)
}

export default SubmitSuccess
