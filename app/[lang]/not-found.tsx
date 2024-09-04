import { Button, Center, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import SectionWrapper from '../ui/sectionWrapper/SectionWrapper';

const NotFound = () => {
	return (
		<SectionWrapper>
			<Center flexDir={'column'} h={480}>
				<Text fontSize={'100px'} fontWeight={600} mb={'50px'}>
					404
				</Text>
				<Heading as={'h2'} fontSize={'40px'} fontWeight={'500'} mb={'30px'} textAlign={'center'}>
					Diese Seite fehlt
				</Heading>
				<Text
					textAlign={'center'}
					fontSize={'18px'}
					fontWeight={400}
					line-height={1.4}
					maxW={'510px'}
					mb={'40px'}
				>
					Keine Sorge, es passiert jedem, lass uns sehen, ob wir Sie in die richtige Richtung lenken
					können.
				</Text>

				<Button as={Link} href="/" variant={'accentAlt'} maxW={'340px'}>
					Home
				</Button>
			</Center>
		</SectionWrapper>
	);
};

export default NotFound;
