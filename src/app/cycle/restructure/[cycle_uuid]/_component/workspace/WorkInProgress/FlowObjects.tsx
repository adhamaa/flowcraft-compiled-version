'use client';

import * as React from 'react'

import ActionIcons from '../ActionIcons';
import ActionButtons from '../ActionButtons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { Button, InputWrapper } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { MultiSelect, Select } from 'react-hook-form-mantine';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Icon } from '@iconify-icon/react';
import { ActionType, useActionIcons } from './hooks/useActionIcons';




function FlowObjects() {
  const { toggleSelectedByNodeId, getSelectedNodeId, getInputOptions } = useWorkInProgressDiagram();
  const { isEditable: isEditData, getAction, getIsAnyEditable } = useActionIcons();
  const action = getAction(isEditData as { [key in ActionType]: boolean });
  const isEditable = getIsAnyEditable(isEditData as { [key in ActionType]: boolean });
  const selectedNodeId = getSelectedNodeId();
  const { ref, height } = useElementSize();


  const methods = useForm();
  const { handleSubmit } = methods;

  const onSaveSubmit = (data: any) => {
    console.log(data);
  };

  const InputList = [
    {
      type: 'text', name: 'curr_stage_uuid', label: 'Stage Name', placeholder: 'Pick value', data: getInputOptions(), value: selectedNodeId, onChange: toggleSelectedByNodeId, canShow: true,
    },
    {
      group: 'Position',
      inputs: [
        { type: 'text', name: 'previous_stage', label: 'Choose previous stage', placeholder: 'Pick value', data: getInputOptions(), onChange: () => { console.log("baby") }, canShow: true, },
        { type: 'text', name: 'next_stage', label: 'Choose next stage', placeholder: 'Pick value', data: getInputOptions(), onChange: () => { console.log("baby") }, canShow: true, },
      ]
    }
  ];

  return (
    <div className='h-full space-y-6'>
      <h1 className='text-xl font-semibold'>The Flow Objects</h1>
      <div className='flex flex-col h-full space-y-6'>
        <ActionIcons />
        {/* ---------- input section ----------- */}
        <>
          {action && <h1 className='text-xl font-semibold'>{action} stage</h1>}
          <FormProvider {...methods}>
            <div className='border border-black rounded-xl pb-2'>
              <form
                className={clsx('space-y-4 p-4')}
              // onSubmit={handleSubmit(onSaveSubmit)}
              >
                {InputList.map((input, index) => {
                  return (
                    <div key={index}>
                      {!input.group && input.canShow && <InputWrapper
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
                          name={input.name as string}
                          placeholder={input.placeholder}
                          checkIconPosition='right'
                          rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                          data={input.data}
                        // @ts-ignore
                        // value={input.value}
                        // onChange={input.onChange as never}
                        />
                      </InputWrapper>
                      }
                      {input.group && <h2 className='text-sm font-semibold'>{input.group}</h2>}
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
                              name={input.name}
                              placeholder={input.placeholder}
                              checkIconPosition='right'
                              rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                              data={input.data}
                              searchable
                              nothingFoundMessage="Nothing found..."
                            // @ts-ignore
                            // value={input.value}
                            // onChange={input.onChange as never}
                            />
                          </InputWrapper>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </form>
            </div>
            <ActionButtons />
          </FormProvider>
        </>
      </div>
    </div >
  );
};

export default FlowObjects