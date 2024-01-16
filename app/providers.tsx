'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { theme } from './ui/theme'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ColorModeScript initialColorMode="light" />
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</>
	)
}
