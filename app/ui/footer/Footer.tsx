import { Flex, Text } from '@chakra-ui/react'

import SectionWrapper from '../sectionWrapper/SectionWrapper'

const Footer = () => {
	return (
		<SectionWrapper as={'footer'} py={{ base: '5px', lg: '15px', xl: '30px' }}>
			<Flex align={'center'} justify={'space-between'}>
				<Text
					color={'gray'}
					fontSize={{
						base: '12px',
						md: '14px',
						lg: '18px',
					}}
				>
					© Poly-Max 2024
				</Text>
			</Flex>
		</SectionWrapper>
	)
}

export default Footer
