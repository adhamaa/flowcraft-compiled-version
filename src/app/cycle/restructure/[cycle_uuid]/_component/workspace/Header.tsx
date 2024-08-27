'use client';

import * as React from 'react'
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { useGlobalState } from '@/hooks/useGlobalState';
import useQueryString from '@/hooks/useQueryString';

function Header() {
  const { url } = useGlobalState();
  const prevUrl = url.prev;
  const currUrl = url.curr;
  const sameUrl = prevUrl === currUrl;
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_uuid = params.cycle_uuid;
  const cycle_id = searchParams.get('cycle_id');

  const { currentCycleInfo } = useWorkInProgressDiagram();

  const cycle_name = currentCycleInfo?.cycle_name;

  return <div className='row-span-1 col-span-3 flex items-center gap-4 p-8 border-b-2 h-24'>
    <Tooltip label="Back">
      <ActionIcon
        id="Back"
        component='button'
        type='submit'
        // disabled
        variant="transparent"
        color='var(--fc-brand-700)'
        size="2.5rem"
        radius="md"
        aria-label="Back"
        onClick={() => (sameUrl || !prevUrl) ? history.back() : router.push(prevUrl)}
      >
        <Icon
          icon='heroicons-solid:arrow-circle-left'
          width="1.5rem"
          className='hover:text-[#7d1aff]' />
      </ActionIcon>
    </Tooltip>
    <h1 className='text-xl font-bold'> {cycle_name as unknown as string}</h1>
  </div>;
};

export default Header