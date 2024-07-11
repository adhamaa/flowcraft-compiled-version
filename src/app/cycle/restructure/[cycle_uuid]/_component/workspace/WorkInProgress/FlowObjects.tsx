'use client';

import * as React from 'react'

import ActionIcons from '../ActionIcons';
import ActionButtons from '../ActionButtons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { Button, InputWrapper } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { MultiSelect, Select, TextInput } from 'react-hook-form-mantine';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Icon } from '@iconify-icon/react';
import { ActionType, useActionIcons } from './hooks/useActionIcons';

function FlowObjects() {
  const { toggleSelectedByNodeId, getSelectedNodeId, getInputOptions, deselectAllNodes } = useWorkInProgressDiagram();
  const { isEditable: isEditData, getAction, getIsEditable, getIsAnyEditable } = useActionIcons();
  const action = getAction(isEditData as { [key in ActionType]: boolean });
  const isAdd = getIsEditable(isEditData as { [key in ActionType]: boolean }, 'add');
  const isMove = getIsEditable(isEditData as { [key in ActionType]: boolean }, 'move');
  const isDuplicate = getIsEditable(isEditData as { [key in ActionType]: boolean }, 'duplicate');
  const isDelete = getIsEditable(isEditData as { [key in ActionType]: boolean }, 'delete');
  const isRestore = getIsEditable(isEditData as { [key in ActionType]: boolean }, 'restore');
  const isDisjoint = getIsEditable(isEditData as { [key in ActionType]: boolean }, 'disjoint');
  const isEditable = getIsAnyEditable(isEditData as { [key in ActionType]: boolean });
  const selectedNodeId = getSelectedNodeId();
  const { ref, height } = useElementSize();

  const [countDummy, setCountDummy] = React.useState(0);

  const methods = useForm({
    // defaultValues: {
    //   curr_stage_uuid: '',
    //   curr_stage_name: '',
    //   previous_stage: '',
    //   next_stage: ''
    // }
  });
  
  const { control, watch, reset } = methods;
  const watchCurrentStageUuid = watch('curr_stage_uuid');
  const watchCurrentStageName = watch('curr_stage_name');

  const onSaveSubmit = (data: any) => {
    console.log(data);
  };

  const InputList = [
    {
      type: 'text', name: 'curr_stage_uuid', label: 'Stage Name', placeholder: 'Choose Stage', data: getInputOptions(), value: selectedNodeId, onChange: toggleSelectedByNodeId, canShow: !isAdd, control: control, disabled: !isEditable
    },
    {
      type: 'text', name: 'curr_stage_name', label: 'Stage Name', placeholder: 'Name your stage', data: getInputOptions(), value: selectedNodeId, onChange: toggleSelectedByNodeId, canShow: isAdd, control: control, disabled: !isEditable
    },
    {
      group: 'Position',
      canShow: watchCurrentStageUuid || watchCurrentStageName,
      inputs: [
        { type: 'text', name: 'previous_stage', label: 'Choose previous stage', placeholder: 'Choose Stage', data: getInputOptions(), onChange: () => { console.log("baby") }, canShow: watchCurrentStageUuid || watchCurrentStageName, control: control, disabled: !isEditable },
        { type: 'text', name: 'next_stage', label: 'Choose next stage', placeholder: 'Choose Stage', data: getInputOptions(), onChange: () => { console.log("baby") }, canShow: watchCurrentStageUuid || watchCurrentStageName, control: control, disabled: !isEditable },
      ]
    }
  ];

  return (
    <FormProvider {...methods}>
      <div className='h-full space-y-6'>
        <h1 className='text-xl font-semibold'>The Flow Objects</h1>
        <div className='flex flex-col h-full space-y-6'>
          <Button onClick={() => {
            deselectAllNodes()
            reset()
            setCountDummy(countDummy + 1)
          }}>deselect nodes</Button>
          <ActionIcons />
          {/* ---------- input section ----------- */}
          <>
            {action && <h1 className='text-xl font-semibold'><span className="capitalize">{action}</span> stage</h1>}
            <div className='border border-black rounded-xl pb-2'>
              {<form
                className={clsx('space-y-4 p-4')}
              // onSubmit={handleSubmit(onSaveSubmit)}
              >

                {InputList.map((input, index) => {
                  return (
                    <div key={index}>
                      {isAdd && !input.group && input.canShow && (
                        <InputWrapper
                          key={index}
                          ref={ref}
                          label={input.label}
                          classNames={{
                            root: 'relative space-y-4 -mt-4',
                            label: '!text-sm !font-semibold',
                          }}
                        >
                          <LabelTooltip label={input.label} />
                          <TextInput
                            control={input.control}
                            name={input.name as string}
                            placeholder={input.placeholder}
                            disabled={input.disabled}
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                          // @ts-ignore
                          // value={input.value}
                          // onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}
                      {isMove && !input.group && input.canShow && (
                        <InputWrapper
                          key={index}
                          ref={ref}
                          label={input.label}
                          classNames={{
                            root: 'relative space-y-4',
                            label: '!text-sm !font-semibold',
                          }}
                        >
                          <LabelTooltip label={input.label} />
                          <Select
                            control={input.control}
                            name={input.name as string}
                            placeholder={input.placeholder}
                            checkIconPosition='right'
                            rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                            data={input.data}
                            disabled={input.disabled}
                            allowDeselect
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                          // @ts-ignore
                          // value={input.value}
                          // onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}
                      {isDuplicate && !input.group && input.canShow && (
                        <InputWrapper
                          key={index}
                          ref={ref}
                          label={input.label}
                          classNames={{
                            root: 'relative space-y-4',
                            label: '!text-sm !font-semibold',
                          }}
                        >
                          <LabelTooltip label={input.label} />
                          <Select
                            control={input.control}
                            name={input.name as string}
                            placeholder={input.placeholder}
                            checkIconPosition='right'
                            rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                            data={input.data}
                            disabled={input.disabled}
                            allowDeselect
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                          // @ts-ignore
                          // value={input.value}
                          // onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}
                      {isDelete && !input.group && input.canShow && (
                        <InputWrapper
                          key={index}
                          ref={ref}
                          label={input.label}
                          classNames={{
                            root: 'relative space-y-4',
                            label: '!text-sm !font-semibold',
                          }}
                        >
                          <LabelTooltip label={input.label} />
                          <Select
                            control={input.control}
                            name={input.name as string}
                            placeholder={input.placeholder}
                            checkIconPosition='right'
                            rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                            data={input.data}
                            disabled={input.disabled}
                            allowDeselect
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                          // @ts-ignore
                          // value={input.value}
                          // onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}
                      {isRestore && !input.group && input.canShow && (
                        <InputWrapper
                          key={index}
                          ref={ref}
                          label={input.label}
                          classNames={{
                            root: 'relative space-y-4',
                            label: '!text-sm !font-semibold',
                          }}
                        >
                          <LabelTooltip label={input.label} />
                          <Select
                            control={input.control}
                            name={input.name as string}
                            placeholder={input.placeholder}
                            checkIconPosition='right'
                            rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                            data={input.data}
                            disabled={input.disabled}
                            allowDeselect
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                          // @ts-ignore
                          // value={input.value}
                          // onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}
                      {isDisjoint && !input.group && input.canShow && (
                        <InputWrapper
                          key={index}
                          ref={ref}
                          label={input.label}
                          classNames={{
                            root: 'relative space-y-4',
                            label: '!text-sm !font-semibold',
                          }}
                        >
                          <LabelTooltip label={input.label} />
                          <Select
                            control={input.control}
                            name={input.name as string}
                            placeholder={input.placeholder}
                            checkIconPosition='right'
                            rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                            data={input.data}
                            disabled={input.disabled}
                            allowDeselect
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                          // @ts-ignore
                          // value={input.value}
                          // onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}




                      {input.group && input.canShow && (
                        <h2 className='text-sm font-semibold'>{input.group}</h2>
                      )}
                      <div className='pl-4'>
                        {input.group && input.inputs.map((input, index) => input.canShow && (
                          <InputWrapper
                            key={index}
                            ref={ref}
                            label={input.label}
                            classNames={{
                              root: 'relative space-y-4',
                              label: '!text-sm !font-semibold',
                            }}
                          >
                            <LabelTooltip label={input.label} />
                            <MultiSelect
                              control={input.control}
                              name={input.name}
                              placeholder={input.placeholder}
                              data={input.data}
                              disabled={input.disabled}
                              rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                              checkIconPosition='right'
                              classNames={{
                                input: '!rounded-lg py-3 pr-3 w-full !focus:outline-none !focus:ring-2 !focus:ring-[#895CF3] !focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] !disabled:border-transparent !disabled:text-black',
                              }}
                            // @ts-ignore
                            // value={input.value}
                            // onChange={input.onChange as never}

                            />
                            <style jsx global>{`
                            .mantine-MultiSelect-input:focus {
                              outline: 2px solid #895CF3;
                              border-color: transparent;
                              transition: all 0.1s ease;
                              }
                            .mantine-MultiSelect-input:focus-visible {
                              outline: 2px solid #895CF3;
                              border-color: transparent;
                              transition: all 0.1s ease;
                              }
                            .mantine-MultiSelect-input:focus-within {
                              outline: 2px solid #895CF3;
                              border-color: transparent;
                              transition: all 0.1s ease;
                              }
                            `}</style>
                          </InputWrapper>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </form>}
            </div>
            <ActionButtons />
          </>
        </div>
      </div >
    </FormProvider>
  );
};

export default FlowObjects