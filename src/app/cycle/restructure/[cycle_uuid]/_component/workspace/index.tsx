import * as React from 'react'

import { ScrollAreaAutosize, rem } from '@mantine/core';
import FlowObjects from './WorkInProgress/FlowObjects';
import Current from './Current';
import Wip from './WorkInProgress/Wip';
import Header from './Header';
import { ReactFlowProvider } from 'reactflow';
import WorkInProgress from './WorkInProgress';

function Workspace() {
  return (
    <ScrollAreaAutosize pb={rem(32)}>
      <Header />
      <div className='grid grid-cols-3 gap-6 p-8 h-screen'>
        <Current />
        <WorkInProgress />
      </div>
    </ScrollAreaAutosize>
  )
}

export default Workspace









