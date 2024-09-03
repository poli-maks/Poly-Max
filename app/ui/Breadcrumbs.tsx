import { usePathname } from 'next/navigation'; // Correct order: Next.js imports first
import React, { useEffect, useState } from 'react'; // React imports second
import Link from 'next/link'; // Other Next.js imports after React

const Breadcrumbs: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // Correctly define state hooks
  const pathname = usePathname(); // Correctly use the hook

  useEffect(() => {
    setIsClient(true); // Fix the effect to properly set the state
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

export default Breadcrumbs; // Proper export
