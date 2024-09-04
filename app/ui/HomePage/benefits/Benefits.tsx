'use client'

import { Grid, Text, GridItem, Box, Heading, Flex } from '@chakra-ui/react'

import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import BenefitIcon1 from '../../svg/BenefitIcon1'
import BenefitIcon2 from '../../svg/BenefitIcon2'
import BenefitIcon3 from '../../svg/BenefitIcon3'
import BenefitIcon4 from '../../svg/BenefitIcon4'
import BenefitIcon5 from '../../svg/BenefitIcon5'
import BenefitIcon6 from '../../svg/BenefitIcon6'
import { theme } from '../../theme'

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
			<Flex flexDirection={{ base: 'column', lg: 'row' }}>
				<Heading
					as={'h3'}
					fontSize="20px"
					color={theme.colors.hText}
					marginBottom={{ base: '30px', lg: '0' }}
					flex={{ lg: 2 }}
					style={{ lineHeight: '20px', fontWeight: '600' }}
				>
					{dictionary.homePage.benefits.title}
				</Heading>
				<Box flex={{ lg: 2.15 }}>
					<Heading
						as={'h2'}
						fontSize={{ base: '24px', lg: '40px' }}
						lineHeight={{ base: '24px', lg: '40px' }}
						color={theme.colors.hText}
						fontWeight="500"
						marginBottom={{ base: '20px', lg: '40px' }}
					>
						{dictionary.homePage.benefits.descriptionUp}
					</Heading>
					<Text
						fontSize={{ base: '12px', lg: '18px' }}
						lineHeight={{ base: '16.8px', lg: '25.2px' }}
						color={theme.colors.bodyText}
						marginBottom={{ base: '20px', lg: '60px' }}
					>
						{dictionary.homePage.benefits.descriptionUnder}
					</Text>
				</Box>
			</Flex>
			<Grid
				as={'ul'}
				templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
				gap={{ base: '10px', lg: '68px' }}
				rowGap={{ base: '20px', lg: '40px' }}
			>
				{dictionary.homePage.benefits.benefitsList.map((item, idx) => {
					return (
						<GridItem as={'li'} key={idx} display={'flex'}>
							<Box as={'span'} width={'32px'}>
								{icons[idx]()}
							</Box>
							<Text
								marginLeft={{ base: '10px', lg: '20px' }}
								fontSize={{ base: '12px', lg: '18px' }}
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
