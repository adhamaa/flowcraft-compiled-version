"use client";

import * as React from 'react'
import { ReactFlowProvider } from 'reactflow';
import Current from './Current';

const CurrentProgress = () => {
  return (
    <ReactFlowProvider>
      <Current />
    </ReactFlowProvider>
  )
}

export default CurrentProgress