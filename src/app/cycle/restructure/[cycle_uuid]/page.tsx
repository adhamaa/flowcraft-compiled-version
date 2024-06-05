import * as React from 'react'
import { Icon } from '@iconify-icon/react';
import { ScrollAreaAutosize } from '@mantine/core';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Restructure Cycle",
  description: "Cycle Restructure Page",
};

async function RestructureCyclePage({ params: { cycle_uuid } }: {
  params: { cycle_uuid: string; };
}) {
  return (
    <ScrollAreaAutosize mah={820}>
      <div className='flex items-center gap-4 p-8 border-b-2'>
        <Icon
          icon='heroicons-solid:arrow-circle-left'
          width="1.5rem"
          className='text-[#895CF3]'
        />
        <h1 className='text-xl font-bold'>Cycle Name - Cycle uuid: {cycle_uuid}</h1>
      </div>
      <div className='grid grid-cols-3 gap-6 p-8 h-screen'>
        <div className='h-full space-y-6'>
          <h1 className='text-xl font-semibold'>Current Cycle Name</h1>
          <div className='border border-black rounded-xl h-full'>1</div>
        </div>
        <div className='h-full space-y-6'>
          <h1 className='text-xl font-semibold'>Work In Progress</h1>
          <div className='border border-black rounded-xl h-full'>2</div>
        </div>
        <div className='h-full space-y-6'>
          <h1 className='text-xl font-semibold'>The Flow Objects</h1>
          <div className='h-full'>
            <div className='border border-black rounded-xl h-1/2'>3</div>
            <div className='border border-black rounded-xl h-1/2'>4</div>
          </div>
        </div>
      </div>
    </ScrollAreaAutosize>
  )
}

export default RestructureCyclePage