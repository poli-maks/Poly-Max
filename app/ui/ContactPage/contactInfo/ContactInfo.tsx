"use client";

import { IContacts } from "@/app/lib/interfaces";
import { formatPhoneNumber } from "@/app/lib/utils/formatPhoneNumber";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import Image from "next/image";

import Director from "../../../../public/img/Director.png";
import { theme } from "../../theme";

interface ContactInfoProps {
  contacts: IContacts | undefined;
  position: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contacts, position }) => {
  const textStyle = {
    fontSize: "24px",
    fontWeight: "500",
  };

  return (
    <Box marginBottom={{ base: "30px", lg: "0" }}>
      <Flex
        gap={{ base: "10px", lg: "40px" }}
        borderBottom={"1px solid #E0E0E0"}
        pb={"30px"}
      >
        <Box
          position="relative"
          h={{ base: "146px", lg: "185px" }}
          w={{ base: "25%", sm: "111px", lg: "140px" }}
          bgRepeat={"no-repeat"}
          bgPos={"center"}
          bgSize={"cover"}
          backgroundImage={"/img/blurPlaceholder.png"}
        >
          <Image
            blurDataURL="/img/blurPlaceholder.png"
            loading="lazy"
            src={Director || "/img/blurPlaceholder.png"}
            alt={"location photo"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        <Flex
          flexDir={"column"}
          style={textStyle}
          pt={{ base: "0", lg: "30px" }}
        >
          <Text fontSize={"20px"} fontWeight={"600"}>
            Sergey Shchebetyuk
          </Text>
          <Text
            fontSize={"18px"}
            lineHeight={"25.2px"}
            color={theme.colors.unfocus}
            marginBottom={"30px"}
          >
            {position}
          </Text>
          <Box
            as={Link}
            href={`tel:+${contacts?.phone || ""}`}
            fontSize={"18px"}
            marginBottom={"5px"}
            position={"relative"}
            fontWeight={400}
            _hover={{ textDecoration: "none" }}
            css={{
              "&::after": {
                transform: "scaleX(0)",
                transformOrigin: "right",
                content: "''",
                position: "absolute",
                left: 0,
                maxWidth: "fit-text-content",
                bottom: 0,
                width: "100%",
                height: "1px",
                background: "black",
                opacity: ".6",
                transition: " transform .7s cubic-bezier(.19,1,.22,1) .2s",
              },
              "&:hover::after": {
                transform: " scaleX(1)",
                transformOrigin: "left",
              },
            }}
          >
            {contacts?.phone && formatPhoneNumber(contacts.phone)}
          </Box>

          <Box
            as={Link}
            href={`mailto:${contacts?.email || ""}`}
            fontSize={"18px"}
            textDecoration={"underline"}
            fontWeight={400}
          >
            {contacts?.email || ""}
          </Box>
        </Flex>
      </Flex>
      <Heading
        as={"h3"}
        fontSize={"20px"}
        fontWeight={"600"}
        marginTop={"30px"}
        marginBottom={"20px"}
      >
        Office
      </Heading>
      <Flex flexDir={"column"} gap={"10px"}>
        <Text>{contacts?.address || ""}</Text>
        <Box
          as={Link}
          href={`tel:+${contacts?.officePhone || ""}`}
          fontSize={"18px"}
          position={"relative"}
          fontWeight={400}
          _hover={{ textDecoration: "none" }}
          css={{
            "&::after": {
              transform: "scaleX(0)",
              transformOrigin: "right",
              content: "''",
              position: "absolute",
              left: 0,
              maxWidth: "fit-text-content",
              bottom: 0,
              width: "45%",
              height: "1px",
              background: "black",
              opacity: ".6",
              transition: " transform .7s cubic-bezier(.19,1,.22,1) .2s",
            },
            "&:hover::after": {
              transform: " scaleX(1)",
              transformOrigin: "left",
            },
          }}
        >
          {contacts?.officePhone && formatPhoneNumber(contacts.officePhone)}
        </Box>
        <Box
          as={Link}
          href={`mailto:${contacts?.officeEmail || ""}`}
          fontSize={"18px"}
          textDecoration={"underline"}
          fontWeight={400}
        >
          {contacts?.officeEmail || ""}
        </Box>

        <Box
          as={Link}
          href={`mailto:${contacts?.metartEmail || ""}`}
          fontSize={"18px"}
          textDecoration={"underline"}
          fontWeight={400}
        >
          {contacts?.metartEmail || ""}
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactInfo;
