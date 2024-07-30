import * as React from 'react'
import TitleSection from '../cycle/_components/HomeContent/TitleSection'
import clsx from 'clsx'

async function ProfilePage() {

  return (
    <div className={clsx('flex h-full'
    )}>
      <TitleSection title='Profile' className='h-max w-full border-b-2 border-[#EBEAEA]'/>
    </div>
  )
}

export default ProfilePage