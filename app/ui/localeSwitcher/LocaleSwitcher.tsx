'use client'

import { i18n } from '@/i18n.config'
import { Link, List, ListItem, useColorMode } from '@chakra-ui/react'
import { usePathname, useSearchParams } from 'next/navigation'

export const LocaleSwitcher = () => {
	const pathName = usePathname()
	const { colorMode } = useColorMode()
	const searchParams = useSearchParams()

	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/'
		const segments = pathName.split('/')

		segments[1] = locale

		return segments.join('/')
	}

	const getLocaleDisplayName = (locale: string) => {
		return locale === 'de' ? 'DEU' : 'ENG'
	}

	const linksStyle = (locale: string) => {
		const isActive = pathName.includes(locale)
		if (isActive) {
			return {
				color: colorMode === 'light' ? '#0D1010' : '#FAFAFA',
				border: `1px solid ${colorMode === 'light' ? '#0D1010' : '#FAFAFA'}`,
				borderRadius: '2xl',
			}
		} else {
			return {
				color: colorMode === 'light' ? '#BDBDBD' : '#6c6e6e',
			}
		}
	}

	return (
		<List display="flex" alignSelf={'flex-start'}>
			{i18n.locales.map((locale) => (
				<ListItem position="relative" key={locale}>
					<Link
						href={`${redirectedPathName(locale)}?${searchParams}`}
						{...linksStyle(locale)}
						fontSize={'14px'}
						fontWeight={'400'}
						p={'8px 18px'}
						_hover={{ textDecoration: 'none' }}
					>
						{getLocaleDisplayName(locale)}
					</Link>
				</ListItem>
			))}
		</List>
	)
}
