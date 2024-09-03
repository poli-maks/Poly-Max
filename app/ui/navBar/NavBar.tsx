'use client'

import { usePathname } from 'next/navigation'
import { Link } from '@chakra-ui/next-js'
import { Box, ResponsiveValue } from '@chakra-ui/react'

import { Locale } from '@/i18n.config'
import './NavBar.css'

export type NavItem = {
  title: string
  path: string
}

export interface NavBarProps {
  navItems: NavItem[]
  lang: Locale
  displayLogo: ResponsiveValue<'flex' | 'none'>
}

const NavBar: React.FC<NavBarProps> = ({ navItems, lang, displayLogo }) => {
  const pathname = usePathname()

  return (
    <Box as="nav" display={displayLogo}>
      {/* Render navigation items */}
    </Box>
  )
}

export default NavBar
