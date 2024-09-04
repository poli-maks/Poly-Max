import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import About from '@/app/ui/AboutPage/About';

export const metadata = {
	title: 'About',
	alternates: {
		canonical: '/about',
		languages: {
			en: '/en/about',
			de: '/de/about',
		},
	},
};

const AboutPage: React.FC<IParams> = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return <About dictionary={dictionary.aboutUsPage} />;
};

export default AboutPage;
