// app/ui/Breadcrumbs.tsx
'use client' // Ensures this is a Client Component

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Breadcrumbs = () => {
  const pathname = usePathname()

  // Split pathname into parts for breadcrumb links
  const pathParts = pathname.split('/').filter(Boolean) // Filters out empty strings

  return (
    <Breadcrumb separator="/" mt={4} mb={4}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathParts.map((part, index) => {
        const href = '/' + pathParts.slice(0, index + 1).join('/')

        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink as={Link} href={href}>
              {decodeURIComponent(part)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
