'use client';

import * as React from 'react'
import type { SVGProps } from 'react';

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, ScrollAreaAutosize, Tooltip } from '@mantine/core';
import { Metadata } from 'next';
import Diamond from './_component/diamond';
import Rectangle from './_component/rectangle';
import Circle from './_component/circle';
import { CustomButtonProps } from '../../_components/Forms/HeaderForm';

// export const metadata: Metadata = {
//   title: "Restructure Cycle",
//   description: "Cycle Restructure Page",
// };

const buttons = [
  {
    label: 'Reset',
    type: 'button',
    disabled: false,
    canShow: true,
    onClick: () => { },
    variant: "filled",
    color: "#F1F5F9",
    c: "#0F172A",
    radius: "md",
    size: "sm",
    fz: '0.9rem',
    classNames: {
      root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    },
    icon: <Icon width='1.5rem' icon="heroicons-outline:x-circle" />,
  },
  {
    label: 'Apply',
    type: 'button',
    disabled: false,
    canShow: true,
    onClick: () => { },
    variant: "filled",
    color: "#F1F5F9",
    c: "#0F172A",
    radius: "md",
    size: "sm",
    fz: '0.9rem',
    classNames: {
      root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    },
    icon: <Icon width='1.5rem' icon="heroicons-outline:check-circle" />,
  },
  {
    label: 'Save',
    type: 'button',
    disabled: false,
    canShow: true,
    onClick: () => { },
    variant: "filled",
    color: "#F1F5F9",
    c: "#0F172A",
    radius: "md",
    size: "sm",
    fz: '0.9rem',
    classNames: {
      root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    },
    icon: <Icon width='1.5rem' icon="heroicons:arrow-right-end-on-rectangle-20-solid" rotate='45' />,
  },
] satisfies CustomButtonProps[];

function RestructureCyclePage({ params: { cycle_uuid } }: {
  params: { cycle_uuid: string; };
}) {
  return (
    <ScrollAreaAutosize mah={820}>
      {/* ----------- header and title ------------ */}
      <div className='flex items-center gap-4 p-8 border-b-2'>
        <Icon
          icon='heroicons-solid:arrow-circle-left'
          width="1.5rem"
          className='text-[#895CF3]'
        />
        <h1 className='text-xl font-bold'>Cycle Name - Cycle uuid: {cycle_uuid}</h1>
      </div>
      <div className='grid grid-cols-3 gap-6 p-8 h-[2000px]'>
        {/* ------------- #1 col -------------- */}
        <div className='h-full space-y-6'>
          <h1 className='text-xl font-semibold'>Current Cycle Name</h1>
          <div className='border border-black rounded-xl h-full'>1</div>
        </div>
        {/* ------------- #2 col -------------- */}
        <div className='h-full space-y-6'>
          <h1 className='text-xl font-semibold'>Work In Progress</h1>
          <div className='border border-black rounded-xl h-full'>2</div>
        </div>
        {/* ------------- #3 col -------------- */}
        <div className='h-full space-y-6'>
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
            <div className='flex gap-3'>
              <Tooltip label="Add">
                <ActionIcon
                  // id={name}
                  component='button'
                  type='submit'
                  // disabled
                  variant="transparent"
                  bg="#F1F5F9"
                  color='black'
                  size="2.5rem"
                  radius="md"
                  aria-label="Settings">
                  <Icon
                    icon="heroicons:plus-circle"
                    width="1.75rem"
                    className='text-black/70 hover:text-black'
                  />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Move">
                <ActionIcon
                  // id={name}
                  component='button'
                  type='submit'
                  // disabled
                  variant="transparent"
                  bg="#F1F5F9"
                  color='black'
                  size="2.5rem"
                  radius="md"
                  aria-label="Settings">
                  <Icon
                    icon="heroicons:arrows-pointing-in"
                    width="1.75rem"
                    className='text-black/70 hover:text-black'
                  />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Duplicate">
                <ActionIcon
                  // id={name}
                  component='button'
                  type='submit'
                  // disabled
                  variant="transparent"
                  bg="#F1F5F9"
                  color='black'
                  size="2.5rem"
                  radius="md"
                  aria-label="Settings">
                  <Icon
                    icon="heroicons-outline:document-duplicate"
                    width="1.5rem"
                    className='text-black/70 hover:text-black'
                  />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  // id={name}
                  component='button'
                  type='submit'
                  // disabled
                  variant="transparent"
                  bg="#F1F5F9"
                  color='black'
                  size="2.5rem"
                  radius="md"
                  aria-label="Settings">
                  <Icon
                    icon="heroicons-outline:trash"
                    width="1.5rem"
                    className='text-black/70 hover:text-black'
                  />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Restore">
                <ActionIcon
                  // id={name}
                  component='button'
                  type='submit'
                  // disabled
                  variant="transparent"
                  bg="#F1F5F9"
                  color='black'
                  size="2.5rem"
                  radius="md"
                  aria-label="Settings">
                  <Icon
                    icon="heroicons-outline:refresh"
                    width="1.5rem"
                    className='text-black/70 hover:text-black'
                  />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Disjoint">
                <ActionIcon
                  // id={name}
                  component='button'
                  type='submit'
                  // disabled
                  variant="transparent"
                  bg="#F1F5F9"
                  color='black'
                  size="2.5rem"
                  radius="md"
                  aria-label="Settings">
                  <Icon
                    icon="heroicons-outline:scissors"
                    width="1.5rem"
                    className='text-black/70 hover:text-black'
                  />
                </ActionIcon>
              </Tooltip>
            </div>
            <div className='border border-black rounded-xl h-72'>4</div>
            <div className="flex justify-end gap-3">
              {buttons.map(({ label, canShow, icon, ...btn }, index) => canShow && (
                <Button
                  key={index}
                  {...btn}
                  leftSection={icon}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollAreaAutosize>
  )
}

export default RestructureCyclePage