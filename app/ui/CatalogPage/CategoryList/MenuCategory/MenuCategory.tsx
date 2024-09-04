import { ICategory, ISubCategory, SEARCH_PARAMS } from "@/app/lib/interfaces";
import MenuArrowClosed from "@/app/ui/svg/MenuArrowClosed";
import MenuArrowOpen from "@/app/ui/svg/MenuArrowOpen";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface IMenuCategory {
  category: ICategory["attributes"];
  subs: ISubCategory[];
  onClick: (queries: { [key: string]: string | number }) => void;
  choosedCategory?: string | null;
  variant: "menu" | "accordion";
}

const MenuCategory: React.FC<IMenuCategory> = ({
  category,
  subs,
  onClick,
  choosedCategory,
  variant,
}: IMenuCategory) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {variant === "menu" && (
        <>
          <Menu
            key={category.uid}
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
          >
            <MenuButton
              position={"relative"}
              as={Button}
              variant={"ghost"}
              _hover={{ backgroundColor: "transparent", opacity: 0.9 }}
              _active={{ backgroundColor: "transparent", opacity: 0.9 }}
              alignItems={"center"}
              rightIcon={!isMenuOpen ? <MenuArrowClosed /> : <MenuArrowOpen />}
            >
              {category.title}
            </MenuButton>

            <MenuList bgColor={"#FAFAFA"}>
              {subs.map(({ attributes: sub }) => (
                <MenuItem
                  bgColor={"transparent"}
                  _hover={{ backgroundColor: "transparent", opacity: 0.9 }}
                  onClick={() => {
                    onClick({
                      [SEARCH_PARAMS.CATEGORY]: category.uid,
                      [SEARCH_PARAMS.SUB_CATEGORY]: sub.uid,
                    });
                  }}
                  key={sub.uid}
                >
                  {sub.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {choosedCategory && choosedCategory === category.uid.toString() && (
            <Box
              position={"absolute"}
              top={"100%"}
              left={0}
              w={"100%"}
              h={"3px"}
              bgColor={"#000"}
            ></Box>
          )}
        </>
      )}
      {variant === "accordion" && (
        <Accordion
          allowToggle
          key={category.uid}
          onChange={() => setIsMenuOpen((prev) => !prev)}
          border={"1px transparent solid"}
        >
          <AccordionItem>
            <AccordionButton
              position={"relative"}
              as={Button}
              variant={"ghost"}
              alignItems={"center"}
              justifyContent={"start"}
              _hover={{ bgColor: "transparent" }}
              rightIcon={!isMenuOpen ? <MenuArrowClosed /> : <MenuArrowOpen />}
            >
              {category.title}
            </AccordionButton>
            <AccordionPanel
              py={0}
              _hover={{ bgColor: "transparent" }}
              bgColor={"transparent"}
            >
              {subs.map(({ attributes: sub }) => (
                <MenuItem
                  _hover={{ bgColor: "transparent" }}
                  bgColor={"transparent"}
                  onClick={() => {
                    onClick({
                      [SEARCH_PARAMS.CATEGORY]: category.uid,
                      [SEARCH_PARAMS.SUB_CATEGORY]: sub.uid,
                    });
                  }}
                  key={sub.uid}
                >
                  {sub.title}
                </MenuItem>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default MenuCategory;
