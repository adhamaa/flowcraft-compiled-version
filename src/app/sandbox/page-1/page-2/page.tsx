"use client";

import { useSelectedLayoutSegments } from 'next/navigation';
import * as React from 'react'

const Page_2 = () => {
  const segments = useSelectedLayoutSegments()
  console.log('segments:', segments)
  
  return (
    <div>
      <h1>Page_2</h1>
    </div>
  )
}

export default Page_2