'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Input, Modal, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import HeaderForm from './HeaderForm';
import { StageInfoData } from '../Content';
import { useForm } from 'react-hook-form';
import { updateStage } from '@/lib/services';
import { JsonInput, TextInput } from 'react-hook-form-mantine';


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
  const searchParams = useSearchParams();
  const stage_uuid = searchParams.get('stage_uuid');

  const InputList = [
    { name: 'process_stage_name', label: 'Stage name', value: data?.process_stage_name, disabled: !isEdit }, // this is a string
    { name: 'updated_datetime', label: 'Last edited date', value: data?.updated_datetime, disabled: true }, // this is a date string
    { name: 'list_previous', label: 'List of previous stage', value: data?.list_previous, disabled: true }, // this is a list
    { name: 'list_next_stage', label: 'List of next stage', value: data?.list_next_stage, disabled: true }, // this is a list
    { name: 'list_user', label: 'Users', value: data?.list_user, disabled: !isEdit }, // this is a list
    { name: 'list_pbt', label: 'PBT', value: data?.list_pbt, disabled: !isEdit }, // this is a list
    { name: 'list_requirement', label: 'Requirements', value: data?.list_requirement, disabled: !isEdit }, // this is a list
    { name: 'list_action', label: 'Action', value: data?.list_action, disabled: !isEdit }, // this is a list
    { name: 'list_entry_condition', label: 'Entry condition', value: data?.list_entry_condition, disabled: !isEdit },
    { name: 'list_exit_condition', label: 'Exit condition', value: data?.list_exit_condition, disabled: !isEdit }
  ];

  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = async (data: any, e: any) => {
    const target_id = e.nativeEvent.submitter.id

    await updateStage({
      stage_uuid: stage_uuid as string,
      field_name: target_id,
      body: { value: JSON.parse(data[target_id]) }
    })
  }

  React.useEffect(() => {
    if (data) {
      console.log('data.list_entry_condition:', data.list_entry_condition)
      setValue('process_stage_name', data.process_stage_name);
      setValue('updated_datetime', data.updated_datetime);
      setValue('list_previous', JSON.stringify(data.list_previous, null, 2));
      setValue('list_next_stage', JSON.stringify(data.list_next_stage, null, 2));
      setValue('list_user', JSON.stringify(data.list_user, null, 2));
      setValue('list_pbt', JSON.stringify(data.list_pbt, null, 2));
      setValue('list_requirement', JSON.stringify(data.list_requirement, null, 2));
      setValue('list_action', JSON.stringify(data.list_action, null, 2));
      setValue('list_entry_condition', JSON.stringify(data.list_entry_condition, null, 2));
      setValue('list_exit_condition', JSON.stringify(data.list_exit_condition, null, 2));
    }
  }, [data, setValue])


  return (
    <ScrollArea.Autosize mah={768}>
      <form
        className='space-y-4 py-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeaderForm type='edit' {...{ toggleEdit, isEdit, toggleExpand }} />
        {InputList.map(({ name, label, value, disabled }, index) => ['Stage name', 'Sub-stage name', 'Last edited date'].includes(label) ? (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <TextInput
              name={name}
              defaultValue={value}
              control={control}
              disabled={disabled}
              classNames={{
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }} />
            {!disabled && <ActionButtons {...{ name, value, toggleEdit }} />}
          </Input.Wrapper>
        ) : (
          <Input.Wrapper
            key={index}
            label={label}
            classNames={{
              root: 'px-14',
              label: '!text-sm !font-semibold',
            }}>
            <TextareaHeader />
            <JsonInput
              name={name}
              defaultValue={JSON.stringify(value, null, 2)}
              control={control}
              disabled={disabled}
              formatOnBlur
              autosize
              minRows={4}
              classNames={{

                input: '!rounded-none !rounded-b-lg !h-32 p-4 w-full focus:outline-none focus:!ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }}
            />
            {!disabled && <ActionButtons  {...{ name, value, toggleEdit }} />}
          </Input.Wrapper>
        ))}
      </form >
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

const ActionButtons = ({
  name,
  value,
  toggleEdit
}: {
  name?: string;
  value?: string | string[] | number | boolean | undefined | null | any[] | Record<string, any> | Record<string, any>[];
  toggleEdit: () => void;
}) => (
  <div className="text-right ml-auto space-x-4 mt-4" >
    <Button color='#DC3545' radius='md' className="!font-normal" onClick={toggleEdit}>Cancel</Button>
    <Button key={name} id={name} type='submit' color='#28A745' radius='md' className="!font-normal"
    // onClick={async (e) => {
    //   e.preventDefault();
    //   console.log('value:', value)
    //   // await updateStage({
    //   //   stage_uuid: '328f3d0e-1005-11ee-99e0-02467045bd9a', // draft
    //   //   field_name: "list_user",
    //   //   body: { value: value as string }
    //   // })
    // }}
    >Save</Button>
    <Button color='#1C1454' radius='md' className="!font-normal" onClick={() => { }}>Verify syntax</Button>
    <Button color='#FF6347' radius='md' className="!font-normal" onClick={() => { }}>Evaluate semantics</Button>
  </div >

);