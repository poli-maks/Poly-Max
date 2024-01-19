'use client'

import { Locale } from '@/i18n.config'
import closeIcon from '@/public/img/closeIcon.svg'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Spacer } from '@chakra-ui/react'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'

import { NavBar, NavItem } from '../../navBar/NavBar'
import { theme } from '../../theme'

interface IMobileMenu {
	onClose: () => void
	isOpen: boolean
	lang: Locale
	navItems: NavItem[]
}

const MobileMenu = ({ onClose, isOpen, lang, navItems }: IMobileMenu) => {
	const swipeHandlers = useSwipeable({ onSwipedUp: () => onClose() })

	return (
		<Drawer placement={'top'} onClose={onClose} isOpen={isOpen} blockScrollOnMount>
			<DrawerOverlay />
			<DrawerContent bg={'#212121'} {...swipeHandlers} h={'100dvh'}>
				<DrawerBody display={'flex'} flexDir={'column'} p={'20px'}>
					<Button
						bg={'transparent'}
						alignSelf={'flex-end'}
						_hover={{ bg: 'transparent' }}
						onClick={() => onClose()}
					>
						<Image
							src={closeIcon}
							alt="logo"
							width="40"
							height="40"
							style={{
								objectFit: 'cover',
								width: 40,
								height: 40,
								display: 'block',
							}}
						/>
					</Button>
					<Spacer />
					<NavBar
						lang={lang}
						navItems={navItems}
						color={theme.colors.base}
						flexDir={'column'}
						displayLogo={'none'}
						fontSize={'40px'}
						fontWeight={'500'}
						gap={'30px'}
						onClose={() => onClose()}
					/>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default MobileMenu
