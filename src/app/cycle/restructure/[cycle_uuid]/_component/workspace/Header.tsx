'use client';

import * as React from 'react'
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  const params = useParams();
  const cycle_uuid = params.cycle_uuid;
  return <div className='flex items-center gap-4 p-8 border-b-2'>
    <Tooltip label="Back">
      <ActionIcon
        id="Back"
        component='button'
        type='submit'
        // disabled
        variant="transparent"
        color='#895CF3'
        size="2.5rem"
        radius="md"
        aria-label="Back"
        onClick={() => router.back()}
      >
        <Icon
          icon='heroicons-solid:arrow-circle-left'
          width="1.5rem"
          className='hover:text-[#7d1aff]' />
      </ActionIcon>
    </Tooltip>
    <h1 className='text-xl font-bold'>Cycle Name - Cycle uuid: {cycle_uuid}</h1>
  </div>;
};

export default Header