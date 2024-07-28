'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function Segments() {
  const segments = useSelectedLayoutSegments()
  console.log('segments:', segments)

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  )
}