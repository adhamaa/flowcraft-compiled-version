"use client";

import Breadcrumbs from '@/components/Breadcrumbs'
import { useSelectedLayoutSegments } from 'next/navigation';
import * as React from 'react'

const Page_1 = () => {
  const segments = useSelectedLayoutSegments()
  console.log('segments:', segments)

  return (
    <div>
      <Breadcrumbs />
      <h1>Page_1</h1>

      <ul>
        {segments.map((segment, index) => (
          <li key={index}>{segment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page_1