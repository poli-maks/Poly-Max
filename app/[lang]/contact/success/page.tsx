import { getDictionary } from '@/app/lib/dictionary';
import { IParams } from '@/app/lib/interfaces';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import { Button, Center, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

const SubmitSuccess: React.FC<IParams> = async ({ params: { lang } }) => {
	const disctionary = await getDictionary(lang);

	return (
		<SectionWrapper>
			<Center flexDir={'column'} h={480}>
				<Heading
					as={'h2'}
					fontSize={'40px'}
					fontWeight={'500'}
					mb={'30px'}
					textAlign={'center'}
					maxW={'440px'}
				>
					{disctionary.submitSuccess.title}
				</Heading>
				<Text
					textAlign={'center'}
					fontSize={'18px'}
					fontWeight={400}
					line-height={1.4}
					maxW={'440px'}
					mb={'40px'}
				>
					{disctionary.submitSuccess.text}
				</Text>

				<Button as={Link} href="/" variant={'accentAlt'} maxW={'340px'}>
					Home
				</Button>
			</Center>
		</SectionWrapper>
	);
};

export default SubmitSuccess;
