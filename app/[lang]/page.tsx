import { getDictionary } from '../lib/dictionary'
import { IParams } from '../lib/interfaces'
import Benefits from '../ui/HomePage/benefits/Benefits'
import ForBuisness from '../ui/HomePage/forBuisness/ForBuisness'
import Hero from '../ui/HomePage/hero/Hero'
import Location from '../ui/HomePage/location/Location'
import Manufacture from '../ui/HomePage/manufacture/Manufacture'

export const generateMetadata = async () => {
	return {
		alternates: {
			canonical: '/',
			languages: {
				de: '/de',
				en: '/en',
			},
		},
	}
}

const HomePage: React.FC<IParams> = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang)

	return (
		<>
			<Hero
				dictionary={{ hero: dictionary.homePage.hero, button: dictionary.button.seeMore }}
				lang={lang}
			/>
			<Manufacture dictionary={dictionary} lang={lang} />
			<Benefits dictionary={dictionary} />
			<Location
				locations={dictionary.homePage.location.locations}
				title={dictionary.homePage.location.title}
				subTitle={dictionary.homePage.location.subTitle}
			/>
			<ForBuisness dictionary={dictionary} />
		</>
	)
}

export default HomePage
