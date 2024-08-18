import * as React from 'react'
import TitleSection from '../../components/TitleSection'
import clsx from 'clsx'
import AboutContent from './_components/aboutContent'
import { rem, ScrollAreaAutosize } from '@mantine/core'
import Footer from '@/components/Footer'

const AboutPage = () => {
  return (
    <ScrollAreaAutosize>
      <div className={clsx('flex flex-col h-[calc(100vh-146.5px)] '
      )}>
        <TitleSection title='About Flowcraft' className='h-max w-full border-b-2 border-[var(--fc-border-gray)]' />
        <div>
          <AboutContent />
          <Footer />
        </div>
      </div>
    </ScrollAreaAutosize>
  )
}

export default AboutPage