'use client'

import { IContacts } from '@/app/lib/interfaces'
import { formatPhoneNumber } from '@/app/lib/utils/formatPhoneNumber'
import { Link } from '@chakra-ui/next-js'
import { Box, Flex, Text } from '@chakra-ui/react'

const FooterContacts = ({ contacts }: { contacts: IContacts }) => {
	const { address, phone, email } = contacts

	const textStyle = {
		fontSize: '24px',
		fontWeight: '500',
	}

	return (
		<Flex
			flexDir={'column'}
			gap={'30px'}
			style={textStyle}
			maxW={'383px'}
			borderTop={{ base: 'solid 1px #E0E0E0', lg: 'none' }}
			pt={{ base: '30px', lg: '0' }}
		>
			<Text>{address || ''}</Text>
			<Box
				as={Link}
				href={`tel:+${phone}` || ''}
				position={'relative'}
				width={'fit-content'}
				_hover={{ textDecoration: 'none' }}
				css={{
					'&::after': {
						transform: 'scaleX(0)',
						transformOrigin: 'right',
						content: "''",
						position: 'absolute',
						left: 0,
						maxWidth: 'fit-text-content',
						bottom: 0,
						width: '100%',
						height: '1px',
						background: 'black',
						opacity: '.6',
						transition: ' transform .7s cubic-bezier(.19,1,.22,1) .2s',
					},
					'&:hover::after': {
						transform: ' scaleX(1)',
						transformOrigin: 'left',
					},
				}}
			>
				{formatPhoneNumber(phone) || ''}
			</Box>
			<Box
				as={Link}
				href={`mailto:${email}` || ''}
				position={'relative'}
				width={'fit-content'}
				_hover={{ textDecoration: 'none' }}
				css={{
					'&::after': {
						transform: 'scaleX(0)',
						transformOrigin: 'right',
						content: "''",
						position: 'absolute',
						left: 0,
						maxWidth: 'fit-text-content',
						bottom: 0,
						width: '100%',
						height: '1px',
						background: 'black',
						opacity: '.6',
						transition: ' transform .7s cubic-bezier(.19,1,.22,1) .2s',
					},
					'&:hover::after': {
						transform: ' scaleX(1)',
						transformOrigin: 'left',
					},
				}}
			>
				{email || ''}
			</Box>
		</Flex>
	)
}

export default FooterContacts
