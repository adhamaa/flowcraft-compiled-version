import * as React from 'react'
import TitleSection from '../cycle/_components/HomeContent/TitleSection'
import clsx from 'clsx'

const MaintenancePage = () => {
  return (
    <div className={clsx('flex h-full'
    )}>
      <TitleSection title='Maintenance' className='h-max w-full border-b-2 border-[#EBEAEA]' />
    </div>
  )
}

export default MaintenancePage