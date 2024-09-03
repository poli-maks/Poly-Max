import React, { useEffect, useState } from 'react'; // React should be the first import
import Link from 'next/link'; // Next imports should come after React imports
import { usePathname } from 'next/navigation';

const Breadcrumbs: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname(); // Hook should be at the top

  useEffect(() => {
    setIsClient(true);
  }, []);

  const breadcrumbs = pathname ? pathname.split('/').filter((x) => x) : [];

  return (
    <nav aria-label="Breadcrumb">
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
