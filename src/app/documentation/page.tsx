import * as React from 'react'
import TitleSection from '../../components/TitleSection'
import clsx from 'clsx'

const DocumentationPage = () => {
  return (
    <div className={clsx('flex h-full'
    )}>
      <TitleSection title='Documentation' className='h-max w-full border-b-2 border-[var(--fc-border-gray)]' />
    </div>
  )
}

export default DocumentationPage