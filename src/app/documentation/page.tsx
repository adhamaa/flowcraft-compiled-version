import * as React from 'react'
import TitleSection from '../cycle/_components/HomeContent/TitleSection'
import clsx from 'clsx'

const DocumentationPage = () => {
  return (
    <div className={clsx('flex h-full'
    )}>
      <TitleSection title='Documentation' className='h-max w-full border-b-2 border-[#EBEAEA]' />
    </div>
  )
}

export default DocumentationPage