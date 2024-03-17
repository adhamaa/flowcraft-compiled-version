import React from 'react'
import HomeContent from './_components/Content'
import FormEdit from './_components/FormEdit'

function HomePage({ searchParams: { cycle_id } }: { searchParams: { cycle_id: string } }) {
  return cycle_id ? (
    null
  ) : (
    <HomeContent />
  )
}

export default HomePage