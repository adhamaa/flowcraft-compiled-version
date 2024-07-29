import * as React from 'react'
import TitleSection from '../cycle/_components/HomeContent/TitleSection'
import clsx from 'clsx'

const AboutPage = () => {
  return (
    <div className={clsx('flex h-[calc(100vh-66px)]'
    )}>
      <TitleSection title='About Flowcraft' className='h-max w-full border-b-2 border-[#EBEAEA]'/>
    </div>
  )
}

export default AboutPage