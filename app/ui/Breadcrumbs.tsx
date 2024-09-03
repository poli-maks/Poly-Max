// File: ./app/ui/Breadcrumbs.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const [isClient, setIsClient] = useState(false); // To check if rendering is on client side
  const pathname = isClient ? usePathname() : '';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const breadcrumbs = pathname ? pathname.split('/').filter((x) => x) : [];

  return (
    <nav>
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
