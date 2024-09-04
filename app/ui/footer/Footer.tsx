import { fetchContacts } from '@/app/lib/api/services';
import { getDictionary } from '@/app/lib/dictionary';
import { Locale } from '@/i18n.config';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import { LocaleSwitcher } from '../localeSwitcher/LocaleSwitcher';
import { NavBar } from '../navBar/NavBar';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import BrandLogo from '../svg/BrandLogo';
import { theme } from '../theme';
import FooterContacts from './footerContacts/FooterContacts';
import UnderFooter from './underFooter/UnderFooter';

const Footer = async ({ lang }: { lang: Locale }) => {
	const contacts = await fetchContacts(lang);

	const {
		navigation: { navItems },
	} = await getDictionary(lang);

	return (
		<>
			<SectionWrapper as={'footer'} py={{ base: '0', lg: '0', xl: '0' }}>
				<Flex
					justifyContent={'space-between'}
					gap={{ base: '50px' }}
					pt={{ base: '40px', lg: '100px' }}
					pb={{ base: '40px', lg: '250px' }}
					borderTop={'solid 1px #E0E0E0'}
					flexDir={{ base: 'column', lg: 'row' }}
				>
					<Flex flexDir={'column'} gap={'30px'}>
						<Box
							as={Link}
							href={`/${lang}`}
							display={'flex'}
							width={{ base: '160px', md: '310px' }}
							height={{ base: '60px', md: '118px' }}
						>
							<BrandLogo />
						</Box>
						<LocaleSwitcher />
					</Flex>
					<NavBar
						display={'flex'}
						lang={lang}
						navItems={navItems}
						color={theme.colors.hText}
						flexDir={{ base: 'row', lg: 'column' }}
						displayLogo={'flex'}
						fontSize={'24px'}
						fontWeight={'500'}
						gap={'20px'}
						width={{ base: 'calc(100vw/3)', lg: 'inherit' }}
					/>
					<FooterContacts contacts={contacts} />
				</Flex>
			</SectionWrapper>
			<UnderFooter />
		</>
	);
};

export default Footer;
