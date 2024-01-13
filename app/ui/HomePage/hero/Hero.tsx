import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper'
import { Button, Center, Heading } from '@chakra-ui/react'

const Hero = () => {
	return (
		<SectionWrapper>
			<Button variant={'accent'}>Mehr</Button>
			<Center h={'fit-content'}>
				<Heading
					as={'h1'}
					bg={'accent'}
					bgClip={'text'}
					color={'transparent'}
					fontSize={{ base: '100px', lg: '200px', xl: '280px' }}
					fontWeight={200}
				>
					Poly-Max
				</Heading>
			</Center>
		</SectionWrapper>
	)
}

export default Hero
