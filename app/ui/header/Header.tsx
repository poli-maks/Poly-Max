import { getDictionary } from '@/app/lib/dictionary'
import { Locale } from '@/i18n.config'

import SectionWrapper from '../sectionWrapper/SectionWrapper'
import HeaderWrapper from './HeaderWrapper'

const Header = async ({ lang }: { lang: Locale }) => {
	const {
		navigation: { navItems },
	} = await getDictionary(lang)

	return (
		<SectionWrapper as={'header'} py={{ base: '0', lg: '0', xl: '0' }}>
			<HeaderWrapper lang={lang} navItems={navItems} />
		</SectionWrapper>
	)
}

export default Header
