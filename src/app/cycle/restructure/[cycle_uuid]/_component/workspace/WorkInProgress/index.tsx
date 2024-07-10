"use client";

import * as React from 'react'
import { ReactFlowProvider } from 'reactflow';
import Wip from './Wip';
import FlowObjects from './FlowObjects';
import { ActionIconsProvider } from './hooks/useActionIcons';

const WorkInProgress = () => {
  return (
    <ReactFlowProvider>
      <ActionIconsProvider>
        <Wip />
        <FlowObjects />
      </ActionIconsProvider>
    </ReactFlowProvider>
  )
}

export default WorkInProgress