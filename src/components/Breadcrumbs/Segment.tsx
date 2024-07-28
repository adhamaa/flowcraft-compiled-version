'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function Segment() {
  const segment = useSelectedLayoutSegment()
  console.log('segment:', segment)

  return <p>Active segment: {segment}</p>
}