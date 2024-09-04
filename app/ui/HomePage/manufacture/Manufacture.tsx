import { Locale } from '@/i18n.config';
import { Box, Heading, Button, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import Arrow from '../../svg/Arrow';
import { theme } from '../../theme';
import Swiper from './Swiper/manufactureSwiper';

interface ManufactureProps {
  lang: Locale;
  dictionary: {
    homePage: {
      manufacture: {
        title: string;
        descriptionUp: string;
        descriptionUnder: string;
        button: string;
        aboutPoliMaksTitle: string;
        aboutPoliMaks: string;
        deliveryTitle: string;
        delivery: string;
      };
    };
  };
}

const Manufacture: React.FC<ManufactureProps> = ({ lang, dictionary }) => {
  return (
    <SectionWrapper style={{ paddingBottom: '0' }}>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Heading
          as={'h3'}
          fontSize='20px'
          color={theme.colors.hText}
          marginBottom={{ base: '30px', lg: '0' }}
          flex={{ lg: 2 }}
          style={{ lineHeight: '20px', fontWeight: '600' }}
        >
          {dictionary.homePage.manufacture.title}
        </Heading>
        <Box flex={{ lg: 2.15 }}>
          <Heading
            as={'h2'}
            fontSize={{ base: '24px', lg: '40px' }}
            lineHeight={{ base: '24px', lg: '40px' }}
            color={theme.colors.hText}
            fontWeight='500'
            marginBottom={{ base: '20px', lg: '40px' }}
          >
            {dictionary.homePage.manufacture.descriptionUp}
          </Heading>
          <Text
            fontSize={{ base: '12px', lg: '18px' }}
            lineHeight={{ base: '16.8px', lg: '25.2px' }}
            color={theme.colors.bodyText}
            marginBottom={{ base: '20px', lg: '60px' }}
          >
            {dictionary.homePage.manufacture.descriptionUnder}
          </Text>
          <Button
            variant={'arrow'}
            fontSize={{ base: '18px', lg: '20px' }}
            lineHeight='25.2px'
            marginBottom={{ base: '30px', lg: '60px' }}
            w={{ base: '100%', lg: '340px' }}
            as={Link}
            href={`/${lang}/about`}
            rightIcon={<Arrow />}
          >
            {dictionary.homePage.manufacture.button}
          </Button>
        </Box>
      </Flex>
      <Swiper />
      <Flex
        display='flex'
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent={'space-between'}
        marginTop={{ base: '30px', lg: '60px' }}
      >
        <Box flex={{ lg: 2 }} as={'span'}></Box>
        <Box flex={{ lg: 2.15 }}>
          <Text
            fontSize={'20px'}
            fontWeight={600}
            marginBottom={{ base: '20px', lg: '30px' }}
          >
            {dictionary.homePage.manufacture.aboutPoliMaksTitle}
          </Text>
          <Text
            fontSize={{ base: '12px', lg: '18px' }}
            lineHeight={{ base: '16.8px', lg: '25.2px' }}
          >
            {dictionary.homePage.manufacture.aboutPoliMaks}
          </Text>
          <Text
            fontSize={'20px'}
            fontWeight={600}
            marginBottom={{ base: '20px', lg: '30px' }}
            marginTop={{ base: '30px', lg: '60px' }}
          >
            {dictionary.homePage.manufacture.deliveryTitle}
          </Text>
          <Text
            fontSize={{ base: '12px', lg: '18px' }}
            lineHeight={{ base: '16.8px', lg: '25.2px' }}
          >
            {dictionary.homePage.manufacture.delivery}
          </Text>
        </Box>
      </Flex>
    </SectionWrapper>
  );
};

export default Manufacture;
