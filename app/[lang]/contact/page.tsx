import { getDictionary } from '@/app/lib/dictionary'
import Contact from '@/app/ui/ContactPage/Contact'
import React from 'react'

import { IParams } from '../../lib/interfaces'

export const metadata = {
	title: 'Contacts',
	alternates: {
		canonical: '/contact',
		languages: {
			en: '/en/contact',
			de: '/de/contact',
		},
	},
}

const ContactPage: React.FC<IParams> = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang)

	return (
		<>
			<Contact dictionary={dictionary} lang={lang} />
		</>
	)
}

export default ContactPage
