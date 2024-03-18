import React from 'react'
import HomeContent from './_components/Content'
import EditForm from './_components/EditForm'

function HomePage({ searchParams: { cycle_id } }: { searchParams: { cycle_id: string } }) {
  return (
    <HomeContent />
  )
}

export default HomePage