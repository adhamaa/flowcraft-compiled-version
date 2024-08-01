import * as React from 'react'

import WorkInProgress from './WorkInProgress';
import Header from './Header';
import CurrentProgress from './CurrentProgress';

function Workspace() {
  return (
    <div className='flex flex-col w-full'>
      <Header />
      <div className='grid grid-cols-3 gap-6 p-8 pb-20 h-screen w-full mx-auto'>
        <CurrentProgress />
        <WorkInProgress />
      </div>
    </div>
  )
}

export default Workspace









