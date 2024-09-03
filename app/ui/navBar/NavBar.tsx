import React from 'react'; // Ensure React is imported
import { Box } from '@chakra-ui/react'; // Import components from Chakra UI
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config'; // Import localization configuration

const NavBar = () => {
    const pathname = usePathname(); // Correctly use the pathname

    return <nav>{/* Navigation items */}</nav>; // Return valid JSX
};

export default NavBar; // Correctly export the NavBar component
