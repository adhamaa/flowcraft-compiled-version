import * as React from 'react'

import { ScrollAreaAutosize } from '@mantine/core';
import FlowObjects from './FlowObjects';
import Current from './Current';
import Wip from './Wip';
import Header from './Header';

function Workspace() {
  return (
    <ScrollAreaAutosize>
      <Header />
      <div className='grid grid-cols-3 gap-6 p-8 h-screen mb-10'>
        <Current />
        <Wip />
        <FlowObjects />
      </div>
    </ScrollAreaAutosize>
  )
}

export default Workspace









