'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Input, ScrollArea, Textarea } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

const InputList = [
  'Stage name',
  'Users',
  'PBT',
  'Requirements',
  'Action',
  'Entry condition',
  'Exit condition'
];

const EditForm = () => {
  const cycle_id = useSearchParams().get('cycle_id');
  const [isEdit, setIsEdit] = React.useState(false);
  const { ref, toggle, fullscreen } = useFullscreen();

  const toggleEdit = () => setIsEdit(!isEdit);

  return (
    <ScrollArea.Autosize mah={768}>
      <div className='space-y-4'>
        <HeaderForm {...{ toggleEdit, isEdit }} />
        {InputList.map((label, index) => ['Stage name', 'Sub-stage name'].includes(label) ? (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <Input
              disabled={!isEdit}
              classNames={{
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent mt-4',
              }} />
            {isEdit && <ActionButtons />}
          </Input.Wrapper>
        ) : (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <TextareaHeader />
            <Textarea
              disabled={!isEdit}
              classNames={{
                input: '!rounded-none !rounded-b-lg !h-32 p-4 w-full focus:outline-none focus:!ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }}
            />
            {isEdit && <ActionButtons />}
          </Input.Wrapper>
        ))}
      </div >
    </ScrollArea.Autosize>
  )
}

export default EditForm

const HeaderForm = ({ toggleEdit, isEdit }: {
  toggleEdit: () => void;
  isEdit: boolean;
}) => {
  return (
    <div className='flex px-14 py-6 items-center'>
      <Button color='#895CF3' radius='md' classNames={{
        root: '!p-2 mr-auto'
      }}>
        <Icon icon="solar:maximize-outline" width="1rem" height="1rem" />
      </Button>
      <Button color={!isEdit ? '#007BFF' : '#DC3545'} radius='md' onClick={toggleEdit}>{!isEdit ? 'Edit' : 'Close'}</Button>
    </div>
  )
}

export const TextareaHeader = () => (
  <div className='flex bg-[#D9D9D9] mt-4 rounded-t-lg'>
    <div className="flex ml-auto p-1">
      <Icon icon="tabler:chevron-down" width="1rem" height="1rem" rotate={45} className='cursor-pointer hover:text-black/70' />
      <Icon icon="tabler:chevron-down" width="1rem" height="1rem" rotate={-45} className='cursor-pointer hover:text-black/70' />
    </div>
  </div>
)

const ActionButtons = () => (
  <div className="text-right ml-auto space-x-4 mt-4">
    <Button color='#DC3545' radius='md' className="!font-normal" onClick={() => { }}>Cancel</Button>
    <Button color='#28A745' radius='md' className="!font-normal" onClick={() => { }}>Save</Button>
    <Button color='#FF6347' radius='md' className="!font-normal" onClick={() => { }}>Test</Button>
  </div>

);