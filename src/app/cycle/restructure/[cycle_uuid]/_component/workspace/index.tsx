import * as React from 'react'

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, ScrollAreaAutosize, Tooltip } from '@mantine/core';
import { CustomButtonProps } from '@/app/cycle/_components/Forms/HeaderForm';
import { useParams } from 'next/navigation';
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









