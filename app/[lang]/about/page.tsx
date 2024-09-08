import { getDictionary } from '@/app/lib/dictionary'
import { IParams } from '@/app/lib/interfaces'
import About from '@/app/ui/AboutPage/About'
import { Locale } from '@/i18n.config'

export const metadata = {
	title: 'About',
	alternates: {
		canonical: '/about',
		languages: {
			en: '/en/about',
			de: '/de/about',
		},
	},
}

const AboutPage: React.FC<IParams> = async ({ params: { lang } }) => {
	// Cast lang to the specific Locale type
	const locale = lang as Locale; // Ensure lang is of type 'de' | 'en'
	const dictionary = await getDictionary(locale)

	return <About dictionary={dictionary.aboutUsPage} />
}

export default AboutPage
