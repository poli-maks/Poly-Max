// Correct import order: Next.js imports first, then React
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Breadcrumbs: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

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
              {isLast ? <span>{crumb}</span> : <Link href={href}>{crumb}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
