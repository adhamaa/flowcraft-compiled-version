import React from 'react'
import ColapsableMenu from './_components/ColapsableMenu'
import HomeContent from './_components/Content'

function HomePage() {
  return (
    <div className='flex gap-5'>
      <ColapsableMenu />
      <HomeContent />
    </div>
  )
}

export default HomePage