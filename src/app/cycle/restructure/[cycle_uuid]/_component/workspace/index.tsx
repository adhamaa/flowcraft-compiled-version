import * as React from 'react'

import { ScrollAreaAutosize, rem } from '@mantine/core';
import FlowObjects from './FlowObjects';
import Current from './Current';
import Wip from './Wip';
import Header from './Header';

function Workspace() {
  return (
    <ScrollAreaAutosize pb={rem(32)}>
      <Header />
      <div className='grid grid-cols-3 gap-6 p-8 h-screen'>
        <Current />
        <Wip />
        <FlowObjects />
      </div>
    </ScrollAreaAutosize>
  )
}

export default Workspace









