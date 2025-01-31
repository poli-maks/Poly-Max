import { Box, Container, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { theme } from '../../theme'

const UnderFooter = () => {
	const textStyle = {
		color: theme.colors.bodyText,
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: 1.2,
	}

	return (
		<Box bgColor={'#212121'} py={'20px'}>
			<Container
				maxW={{ base: '744px', lg: '1000px', xl: '1300px' }}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={{ base: 'flex-start', md: 'center' }}
				flexDirection={{ base: 'column', md: 'row' }}
				gap={'10px'}
				px="12px"
				style={textStyle}
			>
				<Link href={'mailto:"7tydev@gmail.com"'} style={{ color: '#757575' }}>
					Created by SevenTy
				</Link>
				
				<Text>Copyright © by Poli-Maks GmbH 2016-2025</Text>
				<Text>Impressum | Fehler gefunden</Text>
			</Container>
			<a
				href="https://goodweb.ua/uk/"
				style={{
					position: 'absolute',
					left: '-9999px',
					opacity: 0,
					width: '1px',
					height: '1px',
					overflow: 'hidden',
				}}
			>
				просування сайтів Київ
			</a>		</Box>
	)
}

export default UnderFooter
