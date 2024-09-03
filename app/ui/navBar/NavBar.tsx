// Correct import order: local imports first, then React and Next.js
import { i18n } from '@/i18n.config';
import React from 'react';
import { usePathname } from 'next/navigation';

// Ensure all variables are used or remove them if they are not needed
const NavBar: React.FC = () => {
  const pathname = usePathname();

  return <nav>{/* Navigation items */}</nav>;
};

export default NavBar;
