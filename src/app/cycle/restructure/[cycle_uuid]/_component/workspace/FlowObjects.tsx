'use client';

import * as React from 'react'

import ActionIcons from './ActionIcons';
import ActionButtons from './ActionButtons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';

type Action = "Add" | "Move" | "Duplicate" | "Delete" | "Restore" | "Disjoint";


function FlowObjects() {
  const [action, setAction] = React.useState<Action | undefined>(undefined);

  return <div className='h-full space-y-6'>
    <h1 className='text-xl font-semibold'>The Flow Objects</h1>
    <div className='flex flex-col h-full space-y-6'>
      <ActionIcons />
      {/* ---------- input section ----------- */}
      <>
        {action && <h1 className='text-xl font-semibold'>{action} stage</h1>}
        <div className='border border-black rounded-xl h-72'>
          {/* Stage Name dropdown (list of stage uuid, but shows the user its name) */}
          {/* Position dropdown (refer to the list of Stage uuid) */}
        </div>
        <ActionButtons />
      </>
    </div>
  </div>;
};

export default FlowObjects