'use client';

import { ILocation } from '@/app/lib/interfaces';
import { Flex, Heading } from '@chakra-ui/react';

import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import LocationsSlider from './locationsSlider/LocationsSlider';

const Location = ({
	title,
	subTitle,
	locations,
}: {
	title: string;
	subTitle: string;
	locations: ILocation[];
}) => {
	return (
		<SectionWrapper bg={'accent'}>
			<Flex mb={'60px'} flexDir={{ base: 'column', lg: 'row' }} gap={{ base: '30px', lg: '0px' }}>
				<Heading flex={2} fontSize={'20px'} fontWeight={600} lineHeight={1} as={'h3'}>
					{title}
				</Heading>
				<Heading
					flex={2.15}
					as={'h2'}
					fontSize={{ base: '24px', lg: '40px' }}
					fontWeight={500}
					lineHeight={1}
				>
					{subTitle}
				</Heading>
			</Flex>
			<LocationsSlider locations={locations} />
		</SectionWrapper>
	);
};

export default Location;
