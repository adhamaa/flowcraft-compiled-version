import * as React from 'react'
import TitleSection from '../cycle/_components/HomeContent/TitleSection'
import clsx from 'clsx'
import AboutContent from './_components/aboutContent'

const AboutPage = () => {
  return (
    <div className={clsx('flex flex-col h-full'
    )}>
      <TitleSection title='About Flowcraft' className='h-max w-full border-b-2 border-[#EBEAEA]' />
      <AboutContent />
    </div>
  )
}

export default AboutPage