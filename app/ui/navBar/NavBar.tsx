import React from 'react'; // Ensure you have React imported
import { Box } from '@chakra-ui/react'; // Import the required components
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

const NavBar = () => {
    const pathname = usePathname(); // Correct usage of pathname

    return <nav>{/* Navigation items */}</nav>; // Ensure the component returns valid JSX
};

export default NavBar; // Proper export of NavBar component
