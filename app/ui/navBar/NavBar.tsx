'use client'

import { Locale } from '@/i18n.config'
import { Link } from '@chakra-ui/next-js'
import { Box, Flex, ResponsiveValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { theme } from '../theme'

export type NavItem = {
	title: string
	path: string
}

export interface NavBarProps {
	navItems: NavItem[]
	lang: Locale
	displayLogo: ResponsiveValue<'flex' | 'none'>
	flexDir: ResponsiveValue<'row' | 'column'>
	color: string
	fontSize: string
	fontWeight: string
	gap: string
}

export const NavBar: React.FC<NavBarProps> = ({
	navItems,
	lang,
	// displayLogo,
	flexDir,
	color = theme.colors.hText,
	fontSize,
	fontWeight,
	gap,
}) => {
	const pathname = usePathname()

	return (
		<Flex as="nav" gap={10}>
			<Box as={'ul'} display={'flex'} flexDirection={flexDir} gap={gap}>
				{navItems.map((item, idx) => (
					<Box as={'li'} key={idx}>
						<Link
							href={`/${lang}${item.path}`}
							color={color}
							display={'flex'}
							alignItems={'center'}
							textDecor={'none'}
							textDecoration={
								pathname === '/' + lang + item.path ||
								(pathname === `/${lang}` && item.path === '/')
									? 'underline'
									: 'none'
							}
							fontSize={fontSize}
							fontWeight={fontWeight}
							_hover={{ textDecoration: 'none' }}
						>
							{item.title}
						</Link>
					</Box>
				))}
			</Box>
		</Flex>
	)
}
