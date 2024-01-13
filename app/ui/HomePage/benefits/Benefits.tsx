'use client'

import { Button, Flex } from '@chakra-ui/react'

import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import SubmitButton from '../../submitButton/SubmitButton'
import Arrow from '../../svg/Arrow'

const Benefits = () => {
	return (
		<SectionWrapper>
			BENEFITS_SECTION
			<Flex flexDir={'column'} gap={2}>
				<Button variant={'accent'}>Accent</Button>
				<Button variant={'accentAlt'}>Accent alt</Button>
				<SubmitButton variant={'accent'}>Submit</SubmitButton>
				<SubmitButton variant={'accent'} isSubmitting>
					submiting...
				</SubmitButton>
				<SubmitButton variant={'accentAlt'}>Sumbit Alt</SubmitButton>
				<SubmitButton variant={'accentAlt'} isSubmitting>
					submiting...
				</SubmitButton>
				<Button variant={'arrow'} rightIcon={<Arrow />}>
					Arrow
				</Button>
				<SubmitButton variant={'arrow'}>Load more</SubmitButton>
				<SubmitButton variant={'arrow'} isSubmitting>
					Loading more...
				</SubmitButton>
			</Flex>
		</SectionWrapper>
	)
}

export default Benefits
