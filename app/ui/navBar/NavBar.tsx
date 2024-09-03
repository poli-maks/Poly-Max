import React from 'react'; // Ensure React is imported first
import { usePathname } from 'next/navigation'; // Next imports should follow React
import { i18n } from '@/i18n.config'; // Local imports should come after external imports

const NavBar: React.FC = () => {
  const pathname = usePathname(); // Correctly use the pathname hook

  return <nav>{/* Navigation items */}</nav>; // Properly format the return
};

export default NavBar; // Correctly export the NavBar component
