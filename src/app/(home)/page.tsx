import React from 'react'
import ColapsableMenu from './_components/ColapsableMenu'
import HomeContent from './_components/Content'

function HomePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className='flex gap-5'>
    //   <ColapsableMenu />
    //   <HomeContent />
    // </div>
    // <div className=''>
    //   <ColapsableMenu />
    //   <HomeContent />
    // </div>
    <>{children}</>
  )
}

export default HomePage