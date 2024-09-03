// app/ui/Breadcrumbs.tsx

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const breadcrumbs = pathname.split('/').filter((crumb) => crumb);

  return (
    <nav aria-label="breadcrumbs">
      <ol>
        {breadcrumbs.map((crumb, index) => {
          const href = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={href}>
              {isLast ? (
                <span>{crumb}</span>
              ) : (
                <Link href={href}>{crumb}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
