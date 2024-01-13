import { getDictionary } from '@/app/lib/dictionary'
import { Locale } from '@/i18n.config'
import { Flex } from '@chakra-ui/react'

import { LocaleSwitcher } from '../localeSwitcher/LocaleSwitcher'
import { NavBar } from '../navBar/NavBar'
import SectionWrapper from '../sectionWrapper/SectionWrapper'

const Header = async ({ lang }: { lang: Locale }) => {
	const {
		navigation: { navItems },
	} = await getDictionary(lang)

	return (
		<SectionWrapper as={'header'} py={{ base: '0', lg: '0', xl: '0' }}>
			<Flex justifyContent="space-between">
				<NavBar lang={lang} navItems={navItems} />
				<LocaleSwitcher />
			</Flex>
		</SectionWrapper>
	)
}

export default Header
