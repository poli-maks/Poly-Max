import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const pathnames = router.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb">
        <li>
          <Link href="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const href = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          return (
            <li key={href}>
              {isLast ? <span>{value}</span> : <Link href={href}>{value}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
