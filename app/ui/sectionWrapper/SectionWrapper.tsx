import { Box, Container, Heading, ResponsiveValue } from '@chakra-ui/react'
import React from 'react'

interface ISectionWrapper {
	id?: string
	position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
	children: React.ReactNode
	bg?: string
	as?: 'header' | 'section' | 'footer'
	heading?: string
	py?:
		| ResponsiveValue<
				| number
				| (string & object)
				| '-moz-initial'
				| 'inherit'
				| 'initial'
				| 'revert'
				| 'revert-layer'
				| 'unset'
		  >
		| {
				base: number | string
				lg: number | string
				xl: number | string
		  }
		| undefined
	pt?:
		| ResponsiveValue<
				| number
				| (string & object)
				| '-moz-initial'
				| 'inherit'
				| 'initial'
				| 'revert'
				| 'revert-layer'
				| 'unset'
		  >
		| {
				base: number | string
				lg: number | string
				xl: number | string
		  }
		| undefined
	pb?:
		| ResponsiveValue<
				| number
				| (string & object)
				| '-moz-initial'
				| 'inherit'
				| 'initial'
				| 'revert'
				| 'revert-layer'
				| 'unset'
		  >
		| {
				base: number | string
				lg: number | string
				xl: number | string
		  }
		| undefined
	headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	borderTopRadius?: '0px' | '50px'
	w?: string
	zIndex?: string
	style?: React.CSSProperties
}

const SectionWrapper: React.FC<ISectionWrapper> = ({
	id,
	position = 'static',
	children,
	bg = 'transparent',
	as = 'section',
	heading = '',
	py = { base: '40px', lg: '60px', xl: '120px' },
	headingAs = 'h2',
	borderTopRadius = '0px',
	w = '',
	zIndex = '',
	style = {},
	pt = {},
	pb = {},
}) => {
	return (
		<Box
			id={id}
			style={style}
			position={position}
			as={as}
			bg={bg}
			py={py}
			bgRepeat={'no-repeat'}
			bgPos={'center'}
			bgSize={'cover'}
			w={w}
			zIndex={zIndex}
			borderTopRadius={borderTopRadius}
			pt={pt}
			pb={pb}
		>
			<Container maxW={{ base: '744px', lg: '1000px', xl: '1300px' }} px="12px" height={'100%'}>
				{heading && (
					<Heading
						as={headingAs}
						mb={{ base: 6, lg: 8 }}
						fontSize={{ base: '2xl', lg: '4xl' }}
						fontWeight={900}
					>
						{heading}
					</Heading>
				)}
				{children}
			</Container>
		</Box>
	)
}

export default SectionWrapper
