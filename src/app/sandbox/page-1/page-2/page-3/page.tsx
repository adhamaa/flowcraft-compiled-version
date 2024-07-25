"use client";

import Breadcrumbs from '@/components/Breadcrumbs'
import { useSelectedLayoutSegments } from 'next/navigation'
import * as React from 'react'

const Page_3 = () => {
  const segments = useSelectedLayoutSegments()
  console.log('segments:', segments)
  
  return (
    <div>
      <Breadcrumbs />
      <h1>Page_3</h1>
    </div>
  )
}

export default Page_3