import { IContacts } from '@/app/lib/interfaces';
import { formatPhoneNumber } from '@/app/lib/utils/formatPhoneNumber';
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const FooterContacts = ({ contacts }: { contacts?: IContacts }) => {
	if (!contacts) {
		return null;
	}

	const { address, phone, email, officePhone, metartEmail } = contacts;

	const textStyle = {
		fontSize: '24px',
		fontWeight: '500',
	};

	const createLink = (href: string, children: React.ReactNode) => (
		<Box
			as={Link}
			href={href}
			position="relative"
			width="fit-content"
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
					transform: 'scaleX(1)',
					transformOrigin: 'left',
				},
			}}
		>
			{children}
		</Box>
	);

	return (
		<Flex
			flexDir="column"
			gap="15px"
			style={textStyle}
			maxW="383px"
			borderTop={{ base: 'solid 1px #E0E0E0', lg: 'none' }}
			pt={{ base: '30px', lg: '0' }}
		>
			{address && <Text>{address}</Text>}

			{phone && createLink(`tel:+${phone}`, formatPhoneNumber(phone))}
			{officePhone && createLink(`tel:+${officePhone}`, formatPhoneNumber(officePhone))}
			{email && createLink(`mailto:${email}`, email)}
			{metartEmail && createLink(`mailto:${metartEmail}`, metartEmail)}
		</Flex>
	);
};

export default FooterContacts;
