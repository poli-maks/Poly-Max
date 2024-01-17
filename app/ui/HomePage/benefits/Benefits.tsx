'use client'

import { Grid, Text, GridItem, Box, Heading } from '@chakra-ui/react'

import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import BenefitIcon1 from '../../svg/BenefitIcon1'
import BenefitIcon2 from '../../svg/BenefitIcon2'
import BenefitIcon3 from '../../svg/BenefitIcon3'
import BenefitIcon4 from '../../svg/BenefitIcon4'
import BenefitIcon5 from '../../svg/BenefitIcon5'
import BenefitIcon6 from '../../svg/BenefitIcon6'

const icons = [BenefitIcon1, BenefitIcon2, BenefitIcon3, BenefitIcon4, BenefitIcon5, BenefitIcon6]

interface BenefitsProps {
	dictionary: {
		homePage: {
			benefits: {
				title: string
				descriptionUp: string
				descriptionUnder: string
				benefitsList: string[]
			}
		}
	}
}

const Benefits: React.FC<BenefitsProps> = ({ dictionary }) => {
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
					{dictionary.homePage.benefits.title}
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
						{dictionary.homePage.benefits.descriptionUp}
					</Text>
					<Text
						fontSize={{ base: '12px', sm: '18px' }}
						lineHeight={{ base: '16.8px', sm: '25.2px' }}
						color="#616161"
						w={{ base: '100%', md: '550px' }}
						marginBottom={{ base: '20px', sm: '60px' }}
					>
						{dictionary.homePage.benefits.descriptionUnder}
					</Text>
				</Box>
			</Box>
			<Grid
				as={'ul'}
				templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
				gap={{ base: '10px', lg: '68px' }}
				rowGap={{ base: '20px', lg: '40px' }}
			>
				{dictionary.homePage.benefits.benefitsList.map((item, idx) => {
					return (
						<GridItem key={idx} display={'flex'}>
							<Box as={'span'} width={'32px'}>
								{icons[idx]()}
							</Box>
							<Text
								marginLeft={{ base: '10px', md: '20px' }}
								fontSize={{ base: '12px', sm: '16px', md: '18px' }}
							>
								{item}
							</Text>
						</GridItem>
					)
				})}
			</Grid>
		</SectionWrapper>
	)
}

export default Benefits
