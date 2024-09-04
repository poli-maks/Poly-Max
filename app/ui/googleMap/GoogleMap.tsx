"use client";

import { AspectRatio, Box } from "@chakra-ui/react";

const GoogleMap = () => {
  return (
    <Box w={{ base: "100%", lg: "50%" }} h={{ base: "100%", lg: "50%" }}>
      <AspectRatio ratio={16 / 11.3}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.8684433515705!2d35.062278476435296!3d48.42066993141054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbfcbde2c64731%3A0xd96f780bafc34086!2z0LLRg9C70LjRhtGPINCd0LDQsdC10YDQtdC20L3QsCDQn9C10YDQtdC80L7Qs9C4LCAxMTIsINCU0L3RltC_0YDQviwg0JTQvdGW0L_RgNC-0L_QtdGC0YDQvtCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0ZfQvdCwLCA0OTAwMA!5e0!3m2!1suk!2spl!4v1705669080887!5m2!1suk!2spl"
          width="640"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </AspectRatio>
    </Box>
  );
};
export default GoogleMap;
