"use client";

import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

import SectionWrapper from "../../sectionWrapper/SectionWrapper";
import CloseIcon from "../../svg/CloseIcon";

const searchAnimation = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const Search = ({
  placeholder,
  isQuery,
  isSearch,
  totalSearchProducts,
}: {
  placeholder: string;
  isQuery: boolean;
  isSearch: boolean;
  totalSearchProducts?: string;
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    totalSearchProducts && params.set("total", totalSearchProducts);
    replace(`${pathname}?${params}`);
  }, [pathname, replace, searchParams, totalSearchProducts]);

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    totalSearchProducts && params.set("total", totalSearchProducts);

    params.set("page", "1");
    if (e.target.value) {
      params.delete("total");
      e.target.value.length > 0 && params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  const clearSearch = () => {
    ref?.current?.reset();
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params}`);
  };

  if (isSearch)
    return (
      <AnimatePresence>
        <Box
          as={motion.div}
          initial={"hidden"}
          variants={searchAnimation}
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }}
          overflow={"hidden"}
          p={0}
          pos={"absolute"}
          top={{ base: "140px", lg: "110px" }}
          w={"100%"}
        >
          <SectionWrapper
            bg="base"
            py={{ base: "35px", lg: "40px", xl: "40px" }}
          >
            <InputGroup
              as={"form"}
              ref={ref}
              size="md"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                autoFocus
                p={0}
                pl={0}
                fontSize={"20px"}
                fontWeight={600}
                lineHeight={1}
                type="text"
                placeholder={placeholder}
                border={"none"}
                bgColor={"base"}
                onChange={handleSearch}
                color={"hText"}
                _placeholder={{ color: "hText" }}
                _active={{ outlineColor: "transparent" }}
                _focus={{
                  outlineColor: "transparent",
                }}
                _focusVisible={{
                  borderColor: "transparent",
                  boxShadow: "none",
                }}
              />
              {isQuery && (
                <InputRightElement width="4.5rem">
                  <IconButton
                    isRound={true}
                    variant="solid"
                    colorScheme="ghost"
                    aria-label="clear search"
                    icon={<CloseIcon />}
                    _hover={{ color: "accent" }}
                    onClick={clearSearch}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </SectionWrapper>
        </Box>
      </AnimatePresence>
    );
};

export default Search;
