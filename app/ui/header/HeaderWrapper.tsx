'use client'

import { Locale } from '@/i18n.config'
import { Box, Flex, IconButton, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import Link from 'next/link'

import { LocaleSwitcher } from '../localeSwitcher/LocaleSwitcher'
import { NavBar, NavItem } from '../navBar/NavBar'
import BrandLogo from '../svg/BrandLogo'
import BurgerIcon from '../svg/BurgerIcon'
import SearchIcon from '../svg/SearchIcon'
import { theme } from '../theme'
import MobileMenu from './MobileMenu'

const HeaderWrapper = ({ lang, navItems }: { lang: Locale; navItems: NavItem[] }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLargerThan768] = useMediaQuery('(max-width: 767px)')

	return (
		<Flex justifyContent={'space-between'} align={{ base: 'flex-start', lg: 'center' }} py={'20px'}>
			<Flex
				w={{ lg: '100%' }}
				align={{ base: 'flex-start', lg: 'center' }}
				flexDir={{ base: 'column', lg: 'row' }}
				gap={{ base: '20px', lg: '0' }}
			>
				<Link href={`/${lang}`}>
					<BrandLogo />
				</Link>
				<Flex
					gap={{ base: '0', md: '113px' }}
					ml={{ lg: 'auto' }}
					mr={{ lg: '40px' }}
					align={'center'}
				>
					{!isLargerThan768 && (
						<NavBar
							lang={lang}
							navItems={navItems}
							color={theme.colors.hText}
							flexDir={'row'}
							displayLogo={'flex'}
							fontSize={'20px'}
							fontWeight={'600'}
							gap={'40px'}
						/>
					)}
					<LocaleSwitcher />
				</Flex>
			</Flex>
			<Box as={'div'} display={'flex'} gap={'10px'}>
				<IconButton
					as={Link}
					href={`/${lang}/catalog?search=true&page=1`}
					aria-label="search"
					variant={'gost'}
					h={'50px'}
					w={'50px'}
					isRound
					border={`1px solid ${theme.colors.hText}`}
					icon={<SearchIcon />}
				/>
				{isLargerThan768 && (
					<IconButton
						aria-label="search"
						variant={'gost'}
						h={'50px'}
						w={'50px'}
						isRound
						border={`1px solid ${theme.colors.hText}`}
						onClick={onOpen}
						icon={<BurgerIcon />}
					/>
				)}
			</Box>
			<MobileMenu lang={lang} navItems={navItems} isOpen={isOpen} onClose={onClose} />
		</Flex>
	)
}

export default HeaderWrapper
