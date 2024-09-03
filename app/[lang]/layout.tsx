import Footer from '@/app/ui/footer/Footer'
import Header from '@/app/ui/header/Header'
import { Locale, i18n } from '@/i18n.config'
// import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import '@/app/ui/globals.css'

import { IParams } from '../lib/interfaces'
import { Providers } from '../providers'

const manrope = Manrope({ subsets: ['latin'] })

export const generateMetadata = async ({ params: { lang } }: IParams) => {
	return {
		keywords: process.env?.NEXT_PUBLIC_KEYWORDS?.replaceAll(' ', '').split(','),
		title: {
			default:
				lang === 'en'
					? process.env.NEXT_PUBLIC_MAIN_TITLE_EN || 'Poli-Maks'
					: process.env.NEXT_PUBLIC_MAIN_TITLE_DE || 'Poli-Maks',
			template: `%s - ${
				lang === 'en'
					? process.env.NEXT_PUBLIC_MAIN_TITLE_EN || 'Best metalic production. German quality'
					: process.env.NEXT_PUBLIC_MAIN_TITLE_DE || 'Best metalic production. German quality'
			}`,
		},
		description:
			lang === 'en' ? process.env.NEXT_PUBLIC_MAIN_DESC_EN : process.env.NEXT_PUBLIC_MAIN_DESC_DE,
		twitter: {
			card: 'summary_large_image',
		},

		metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
		openGraph: {
			images: '/opengraph-image.png',
		},
	}
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