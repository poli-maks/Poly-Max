// app/ui/Breadcrumbs.tsx
'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumbs = () => {
  const pathname = usePathname()

  // Split pathname into parts for breadcrumb links
  const pathParts = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb className="breadcrumb" separator="">
      <BreadcrumbItem className="breadcrumb-item">
        <BreadcrumbLink as={Link} href="/" className="breadcrumb-link">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathParts.map((part, index) => {
        const href = '/' + pathParts.slice(0, index + 1).join('/')

        return (
          <BreadcrumbItem key={index} className="breadcrumb-item">
            <BreadcrumbLink as={Link} href={href} className="breadcrumb-link">
              {decodeURIComponent(part)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
