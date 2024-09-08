import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import About from '@/app/ui/AboutPage/About';
import { Locale } from '@/i18n.config'; // Import the Locale type

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

const AboutPage: React.FC<{ params: IParams['params'] }> = async ({ params: { lang } }) => {
  const locale = lang as Locale; // Explicitly cast `lang` to `Locale`
  const dictionary = await getDictionary(locale);

  return <About dictionary={dictionary.aboutUsPage} />;
};

export default AboutPage;
