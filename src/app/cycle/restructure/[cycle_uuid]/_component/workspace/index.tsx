import * as React from 'react'

import Current from './Current';
import WorkInProgress from './WorkInProgress';
import Header from './Header';

function Workspace() {
  return (
    <div className='flex flex-col w-full'>
      <Header />
      <div className='grid grid-cols-3 gap-6 p-8 h-screen w-full mx-auto'>
        <Current />
        <WorkInProgress />
      </div>
    </div>
  )
}

export default Workspace









