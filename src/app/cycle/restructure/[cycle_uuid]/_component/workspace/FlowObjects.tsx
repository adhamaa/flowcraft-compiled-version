'use client';

import * as React from 'react'
import Circle from '../circle';
import Rectangle from '../rectangle';
import Diamond from '../diamond';
import ActionIcons from './ActionIcons';
import ActionButtons from './ActionButtons';

function FlowObjects() {
  return <div className='h-full space-y-6'>
    <h1 className='text-xl font-semibold'>The Flow Objects</h1>
    <div className='flex flex-col h-full space-y-6'>
      <div className='flex flex-col space-y-8 rounded-xl shadow-md p-8'>
        <div className='flex w-full space-x-8 items-center'>
          {/* shape circle */}
          <div className='relative'>
            <span className='absolute top-[1.35rem] left-[0.85rem] text-xs text-neutral-600'>Event</span>
            <Circle />
          </div>
          <p className='text-sm text-neutral-600'>Circle represent event that happens during course of business process.</p>
        </div>
        <div className='flex w-full space-x-8 items-center'>
          {/* shape rectangle */}
          <div className='relative'>
            <span className='absolute top-[1rem] left-2 text-xs text-neutral-600'>Activity</span>
            <Rectangle />
          </div>
          <p className='text-sm text-neutral-600'>Rounded-corner rectangle represent  a generic term for work that the company performs.</p>
        </div>
        <div className='flex w-full space-x-8 items-center'>
          {/* shape diamond */}
          <div className='relative'>
            <span className='absolute top-[1.125rem] left-[0.65rem] text-[0.6rem] text-neutral-600'>Gateway</span>
            <Diamond />
          </div>
          <p className='text-sm text-neutral-600'>Diamond shape represent the control of the  divergence and convergence of Sequence Flow.</p>
        </div>
      </div>
      {/* ----------- icon buttons ----------- */}
      <ActionIcons />

      {/* ---------- input section ----------- */}
      <>
        <div className='border border-black rounded-xl h-72'>4</div>
        <ActionButtons />
      </>
    </div>
  </div>;
};

export default FlowObjects