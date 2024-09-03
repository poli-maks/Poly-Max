'use client'

import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export const Breadcrumbs = () => {
  const [isClient, setIsClient] = useState(false)
  const pathname = isClient ? usePathname() : ''

  useEffect(() => {
    setIsClient(true)
  }, [])

  const breadcrumbs = pathname ? pathname.split('/').filter((x) => x) : []

  return (
    <nav aria-label="breadcrumb">
      <ol>
        {breadcrumbs.map((crumb, index) => {
          const href = `/${breadcrumbs.slice(0, index + 1).join('/')}`
          const isLast = index === breadcrumbs.length - 1
          
          return (
            <li key={href}>
              {isLast ? <span>{crumb}</span> : <Link href={href}>{crumb}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
