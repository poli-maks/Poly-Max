'use client'

import { Locale } from '@/i18n.config'
import { Link } from '@chakra-ui/next-js'
import { Flex } from '@chakra-ui/react'

import BrandLogo from '../svg/BrandLogo'

type NavItem = {
	title: string
	path: string
}

interface NavBarProps {
	navItems: NavItem[]
	lang: Locale
}

export const NavBar: React.FC<NavBarProps> = ({ navItems, lang }) => {
	return (
		<Flex as="nav" gap={10}>
			<Link href={`/${lang}`}>
				<BrandLogo />
			</Link>

			{navItems.map((item, idx) => (
				<Link
					key={idx}
					href={`/${lang}${item.path}`}
					display={'flex'}
					alignItems={'center'}
					gap={1}
					textDecor={'none'}
					fontSize={'md'}
					fontWeight={400}
					_hover={{ textDecoration: 'none' }}
				>
					{item.title}
				</Link>
			))}
		</Flex>
	)
}
