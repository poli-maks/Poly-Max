'use client'

import { IContacts } from '@/app/lib/interfaces'
import { formatPhoneNumber } from '@/app/lib/utils/formatPhoneNumber'
import { Link } from '@chakra-ui/next-js'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import Image from 'next/image'

import Director from '../../../../public/img/Director.png'
// import SmallDirector from '../../../../public/img/smallDirector.png'
import { theme } from '../../theme'

interface ContactInfoProps {
	contacts: IContacts
	position: string
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contacts, position }) => {
	const { address, phone, email } = contacts

	const textStyle = {
		fontSize: '24px',
		fontWeight: '500',
	}

	return (
		<Box marginBottom={{ base: '30px', lg: '0' }}>
			<Flex gap={{ base: '10px', lg: '40px' }} borderBottom={'1px solid #E0E0E0'} pb={'30px'}>
				<Image src={Director} alt="Director" style={{ objectFit: 'cover' }} />

				<Flex flexDir={'column'} style={textStyle} pt={{ base: '30px', lg: '50px' }}>
					<Text fontSize={'20px'} fontWeight={'600'}>
						Sergey Shchebetyuk
					</Text>
					<Text
						fontSize={'18px'}
						lineHeight={'25.2px'}
						color={theme.colors.unfocus}
						marginBottom={'30px'}
					>
						{position}
					</Text>
					<Box
						as={Link}
						href={`tel:+${phone}` || ''}
						fontSize={'18px'}
						marginBottom={'5px'}
						position={'relative'}
						// width={'fit-content'}
						fontWeight={400}
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
						fontSize={'18px'}
						// position={'relative'}
						// width={'fit-content'}
						textDecoration={'underline'}
						fontWeight={400}
						// _hover={{ textDecoration: 'none' }}
						// css={{
						// 	'&::after': {
						// 		transform: 'scaleX(0)',
						// 		transformOrigin: 'right',
						// 		content: "''",
						// 		position: 'absolute',
						// 		left: 0,
						// 		maxWidth: 'fit-text-content',
						// 		bottom: 0,
						// 		width: '100%',
						// 		height: '1px',
						// 		background: 'black',
						// 		opacity: '.6',
						// 		transition: ' transform .7s cubic-bezier(.19,1,.22,1) .2s',
						// 	},
						// 	'&:hover::after': {
						// 		transform: ' scaleX(1)',
						// 		transformOrigin: 'left',
						// 	},
						// }}
					>
						{email || ''}
					</Box>
				</Flex>
			</Flex>
			<Heading
				as={'h3'}
				fontSize={'20px'}
				fontWeight={'600'}
				marginTop={'30px'}
				marginBottom={'20px'}
			>
				Office
			</Heading>
			<Text marginBottom={'10px'}>{address || ''}</Text>
			<Box
				as={Link}
				href={`mailto:polimaks.de@gmail.com` || ''}
				fontSize={'18px'}
				// position={'relative'}
				textDecoration={'underline'}
				// width={'fit-content'}

				// _hover={{ textDecoration: 'none' }}
				// css={{
				// 	'&::after': {
				// 		transform: 'scaleX(0)',
				// 		transformOrigin: 'right',
				// 		content: "''",
				// 		position: 'absolute',
				// 		left: 0,
				// 		maxWidth: 'fit-text-content',
				// 		bottom: 0,
				// 		width: '100%',
				// 		height: '1px',
				// 		background: 'black',
				// 		opacity: '.6',
				// 		transition: ' transform .7s cubic-bezier(.19,1,.22,1) .2s',
				// 	},
				// 	'&:hover::after': {
				// 		transform: ' scaleX(1)',
				// 		transformOrigin: 'left',
				// 	},
				// }}
			>
				polimaks.de@gmail.com
			</Box>
		</Box>
	)
}

export default ContactInfo
