'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Input, Modal, ScrollArea, Textarea } from '@mantine/core';
import { useDisclosure, useFullscreen } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import HeaderForm from './HeaderForm';
import { StageInfoData } from '../Content';


const EditForm = ({
  data
}: {
  data: StageInfoData
}) => {
  const cycle_id = useSearchParams().get('cycle_id');
  const [isEdit, setIsEdit] = React.useState(false);
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const toggleEdit = () => setIsEdit(!isEdit);

  return opened ? (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      withCloseButton={false}
    >
      <EditFormContent {...{ data, toggleEdit, isEdit, open, close, toggle }} />
    </Modal>
  ) : (
    <EditFormContent {...{ data, toggleEdit, isEdit, open, close, toggle }} />
  )
}

export default EditForm

const EditFormContent = ({
  data,
  toggleEdit,
  isEdit,
  toggle: toggleExpand
}: {
  data: StageInfoData;
  toggleEdit: () => void;
  isEdit: boolean;
  toggle: () => void;
}) => {
  const InputList = data ? [
    { name: 'Stage name', value: data?.process_stage_name, disabled: !isEdit }, // this is a string
    { name: 'Last edited date', value: data?.updated_datetime, disabled: true }, // this is a date string
    { name: 'List of previous stage', value: data?.list_previous, disabled: true }, // this is a list
    { name: 'List of next stage', value: data?.list_next_stage, disabled: true }, // this is a list
    { name: 'Users', value: data?.list_user, disabled: !isEdit }, // this is a list
    { name: 'PBT', value: data?.list_pbt, disabled: !isEdit }, // this is a list
    { name: 'Requirements', value: data?.list_requirement, disabled: !isEdit }, // this is a list
    { name: 'Action', value: data?.list_action, disabled: !isEdit }, // this is a list
    { name: 'Entry condition', value: data?.list_entry_condition, disabled: !isEdit },
    { name: 'Exit condition', value: data?.list_exit_condition, disabled: !isEdit }
  ] : [];
  return (
    <ScrollArea.Autosize mah={640}>
      <div className='space-y-4 py-4'>
        <HeaderForm type='edit' {...{ toggleEdit, isEdit, toggleExpand }} />
        {InputList.map(({ name, value, disabled }, index) => ['Stage name', 'Sub-stage name', 'Last edited date'].includes(name) ? (
          <Input.Wrapper key={index} label={name} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <Input
              disabled={disabled}
              value={value as string}
              classNames={{
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent mt-4',
              }} />
            {!disabled && <ActionButtons />}
          </Input.Wrapper>
        ) : (
          console.log('value:', value),
          <Input.Wrapper
            key={index}
            label={name}
            classNames={{
              root: 'px-14',
              label: '!text-sm !font-semibold',
            }}>
            <TextareaHeader />
            <Textarea
              disabled={disabled}
              value={value as string}
              classNames={{
                input: '!rounded-none !rounded-b-lg !h-32 p-4 w-full focus:outline-none focus:!ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }}
            />
            {!disabled && <ActionButtons />}
          </Input.Wrapper>
        ))}
      </div >
    </ScrollArea.Autosize>
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
    <Button color='#1C1454' radius='md' className="!font-normal" onClick={() => { }}>Verify syntax</Button>
    <Button color='#FF6347' radius='md' className="!font-normal" onClick={() => { }}>Evaluate semantics</Button>
  </div>

);