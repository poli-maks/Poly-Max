import Footer from '@/app/ui/footer/Footer'
import Header from '@/app/ui/header/Header'
import { Locale, i18n } from '@/i18n.config'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import '@/app/ui/globals.css'

import { Providers } from '../providers'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Poly-Max',
	description: 'Best metalic production. German quality',
}

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
	children,
	params: { lang },
}: {
	children: React.ReactNode
	params: { lang: Locale }
}) {
	return (
		<html lang={lang}>
			<body className={manrope.className}>
				<Providers>
					<Header lang={lang} />
					<main>{children}</main>
					<Footer lang={lang} />
				</Providers>
			</body>
		</html>
	)
}
