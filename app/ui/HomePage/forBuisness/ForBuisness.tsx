import { Box, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

import forBuisnessImg from '../../../../public/img/forBuisnessImg.png'
import SectionWrapper from '../../sectionWrapper/SectionWrapper'

interface ForBuisnessProps {
	dictionary: {
		homePage: {
			forBuisness: {
				title: string
				descriptionUp: string
				descriptionUnder1: string
				descriptionUnder2: string
			}
		}
	}
}

const ForBuisness: React.FC<ForBuisnessProps> = ({ dictionary }) => {
	return (
		<SectionWrapper>
			<Box
				display="flex"
				flexDirection={{ base: 'column', lg: 'row' }}
				justifyContent={'space-between'}
			>
				<Heading
					as={'h3'}
					fontSize="20px"
					color="#212121"
					marginBottom={{ base: '30px', lg: '0' }}
					style={{ lineHeight: '20px', fontWeight: '600', maxWidth: '189px' }}
				>
					{dictionary.homePage.forBuisness.title}
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
						{dictionary.homePage.forBuisness.descriptionUp}
					</Text>
					<Text
						fontSize={{ base: '12px', sm: '18px' }}
						lineHeight={{ base: '16.8px', sm: '25.2px' }}
						color="#616161"
						w={{ base: '100%', md: '550px' }}
						marginBottom={{ base: '25px', sm: '30px' }}
					>
						{dictionary.homePage.forBuisness.descriptionUnder1}
					</Text>
					<Text
						fontSize={{ base: '12px', sm: '18px' }}
						lineHeight={{ base: '16.8px', sm: '25.2px' }}
						color="#616161"
						w={{ base: '100%', md: '550px' }}
						marginBottom={{ base: '20px', sm: '60px' }}
					>
						{dictionary.homePage.forBuisness.descriptionUnder2}
					</Text>
				</Box>
			</Box>
			<Image src={forBuisnessImg} alt={`For buisness section image`} />
		</SectionWrapper>
	)
}

export default ForBuisness
