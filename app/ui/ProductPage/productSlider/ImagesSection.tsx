"use client";
import { ImageAttributes } from "@/app/lib/interfaces";
import { Box, List, ListItem } from "@chakra-ui/react";
import Image from "next/image";

import { ProductSlider } from "./ProductSlider";

const ImagesSection = ({
  productImages,
}: {
  productImages: ImageAttributes[];
}) => {
  return (
    <Box w="100%" overflow="hidden">
      <List
        display={{ base: "none", lg: "flex" }}
        flexDirection="column"
        gap="10px"
      >
        {productImages?.map((item) => (
          <ListItem key={item.id}>
            <Box
              display="flex"
              position="relative"
              z-index="2"
              w="100%"
              height={{
                xl: item.attributes.height,
                lg: item.attributes.height * 0.9,
              }}
              maxH="350px"
              minH={{ base: "255px", lg: "392px" }}
              bgRepeat={"no-repeat"}
              bgPos={"center"}
              bgSize={"cover"}
              paddingBottom="25px"
              backgroundImage={
                `url('${item.attributes.formats?.thumbnail.url}')` ||
                "/img/blurPlaceholder.png"
              }
            >
              <Image
                src={item.attributes?.url || "/img/productPlaceholder.jpg"}
                alt=""
                layout="fill"
                fill
                placeholder="blur"
                blurDataURL="/img/blurPlaceholder.png"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  display: "block",
                  height: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>

      <ProductSlider productImages={productImages} />
    </Box>
  );
};

export default ImagesSection;
