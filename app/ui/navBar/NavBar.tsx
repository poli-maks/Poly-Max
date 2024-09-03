'use client'

import { Locale } from '@/i18n.config'
import { Link } from '@chakra-ui/next-js'
import { Box, ResponsiveValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React from 'react'

import Breadcrumbs from '../Breadcrumbs'
import { theme } from '../theme'
import './NavBar.css'

export type NavItem = {
	title: string
	path: string
}

export interface NavBarProps {
	navItems: NavItem[]
	lang: Locale
	displayLogo: ResponsiveValue<'flex' | 'none'>
	flexDir?: ResponsiveValue<'row' | 'column'>
	color: string
	fontSize: string
	fontWeight: string
	gap: string
	onClose?: () => void
	display?: { base: string; md: string } | string
	width?: { base?: string; lg?: string } | string
}

export const NavBar: React.FC<NavBarProps> = ({
	navItems,
	lang,
	flexDir,
	color = theme.colors.hText,
	fontSize,
	fontWeight,
	gap,
	onClose,
	display,
	width,
}) => {
	const pathname = usePathname()

	return (
		<Box display={display} as="nav" gap={10}>
			{/* Breadcrumbs Component */}
			<Breadcrumbs />

			{/* Navigation items */}
			<Box as={'ul'} display={'flex'} flexDirection={flexDir} gap={gap} flexWrap={'wrap'}>
				{navItems.map((item, idx) => (
					<Box as={'li'} key={idx} onClick={onClose} width={width}>
						<Link
							position={'relative'}
							href={`/${lang}${item.path}${item.path === '/catalog' ? '?page=1' : ''}`}
							color={color}
							display={'inline'}
							textDecor={'none'}
							css={{
								'&::after': {
									transform: 'scaleX(0)',
									transformOrigin: 'right',
									content: "''",
									position: 'absolute',
									left: 0,
									bottom: 0,
									width: '100%',
									height: '1px',
									background: 'black',
									opacity: '.6',
									transition: 'transform .7s cubic-bezier(.19,1,.22,1) .2s',
								},
								'&:hover::after': {
									transform: 'scaleX(1)',
									transformOrigin: 'left',
								},
							}}
							className={
								pathname === '/' + lang + item.path ||
								(pathname === `/${lang}` && item.path === '/') ||
								pathname === '/' + lang + item.path.includes('page')
									? 'active'
									: ''
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
		</Box>
	)
}

export default NavBar
