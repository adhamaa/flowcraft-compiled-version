"use client";

import * as React from 'react'
import { ReactFlowProvider } from 'reactflow';
import Wip from './Wip';
import FlowObjects from './FlowObjects';

const WorkInProgress = () => {
  return (
    <ReactFlowProvider>
      <Wip />
      <FlowObjects />
    </ReactFlowProvider>
  )
}

export default WorkInProgress