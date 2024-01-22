import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import Image from 'next/image'

import forBuisnessImg from '../../../../public/img/forBuisnessImg.png'
import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import { theme } from '../../theme'

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
			<Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'}>
				<Heading
					as={'h3'}
					fontSize="20px"
					color={theme.colors.hText}
					marginBottom={{ base: '30px', lg: '0' }}
					flex={{ lg: 2 }}
					style={{ lineHeight: '20px', fontWeight: '600' }}
				>
					{dictionary.homePage.forBuisness.title}
				</Heading>
				<Box flex={{ lg: 2.15 }}>
					<Heading
						fontSize={{ base: '24px', lg: '40px' }}
						lineHeight={{ base: '24px', lg: '40px' }}
						color={theme.colors.hText}
						fontWeight="500"
						marginBottom={{ base: '20px', lg: '40px' }}
					>
						{dictionary.homePage.forBuisness.descriptionUp}
					</Heading>
					<Text
						fontSize={{ base: '12px', lg: '18px' }}
						lineHeight={{ base: '16.8px', lg: '25.2px' }}
						color={theme.colors.bodyText}
						marginBottom={{ base: '20px', lg: '30px' }}
					>
						{dictionary.homePage.forBuisness.descriptionUnder1}
					</Text>
					<Text
						fontSize={{ base: '12px', lg: '18px' }}
						lineHeight={{ base: '16.8px', lg: '25.2px' }}
						color={theme.colors.bodyText}
						marginBottom={{ base: '20px', lg: '60px' }}
					>
						{dictionary.homePage.forBuisness.descriptionUnder2}
					</Text>
				</Box>
			</Flex>
			<Image
				src={forBuisnessImg}
				alt={`For buisness section image`}
				placeholder="blur"
				blurDataURL="/img/blurPlaceholder.png"
				loading="lazy"
			/>
		</SectionWrapper>
	)
}

export default ForBuisness
