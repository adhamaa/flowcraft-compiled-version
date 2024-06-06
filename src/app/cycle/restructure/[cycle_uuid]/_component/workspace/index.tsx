import * as React from 'react'

import { ScrollAreaAutosize } from '@mantine/core';
import FlowObjects from './FlowObjects';
import Current from './Current';
import Wip from './Wip';
import Header from './Header';

function Workspace() {
  return (
    <ScrollAreaAutosize mah={820}>
      <Header />
      <div className='grid grid-cols-3 gap-6 p-8 h-[2000px]'>
        <Current />
        <Wip />
        <FlowObjects />
      </div>
    </ScrollAreaAutosize>
  )
}

export default Workspace









