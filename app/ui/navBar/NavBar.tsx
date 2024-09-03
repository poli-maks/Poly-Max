import React from 'react';
import { usePathname } from 'next/navigation'; // Correct import order

export const NavBar = () => {
  const pathname = usePathname(); // Remove this line if `pathname` is not used

  return <nav>{/* Navigation items */}</nav>;
};
