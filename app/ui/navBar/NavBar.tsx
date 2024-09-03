import { usePathname } from 'next/navigation'; // Next.js imports should come first
import React from 'react'; // React imports should follow
import { i18n } from '@/i18n.config'; // Local imports come last

const NavBar: React.FC = () => {
  const pathname = usePathname(); // Correctly use the hook and ensure it's used if necessary

  return <nav>{/* Navigation items */}</nav>; // Ensure proper formatting of return statement
};

export default NavBar; // Proper export
