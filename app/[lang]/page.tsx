// import { getDictionary } from '../lib/dictionary'
// import { IParams } from '../lib/interfaces'
import Benefits from '../ui/HomePage/benefits/Benefits'
import ForBuisness from '../ui/HomePage/forBuisness/ForBuisness'
import Hero from '../ui/HomePage/hero/Hero'
import Location from '../ui/HomePage/location/Location'
import Manufacture from '../ui/HomePage/manufacture/Manufacture'

// const HomePage: React.FC<IParams> = async ({ params: { lang } }) => {
// 	const dictionary = await getDictionary(lang)
const HomePage = async () => {
	return (
		<>
			<Hero />
			<Manufacture />
			<Benefits />
			<Location />
			<ForBuisness />
		</>
	)
}

export default HomePage
