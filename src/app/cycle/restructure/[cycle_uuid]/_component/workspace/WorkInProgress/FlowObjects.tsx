'use client';

import * as React from 'react'

import ActionIcons from '../ActionIcons';
import ActionButtons from '../ActionButtons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { Button, ComboboxItem, InputWrapper } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { MultiSelect, Select } from 'react-hook-form-mantine';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Icon } from '@iconify-icon/react';
import { useNodes, useStoreApi } from 'reactflow';

type Action = "Add" | "Move" | "Duplicate" | "Delete" | "Restore" | "Disjoint";


function FlowObjects() {
  const { nodes, toggleSelectedByNodeId, getSelectedNodeId, getInputOptions } = useWorkInProgressDiagram();
  const selectedNodeId = getSelectedNodeId();
  const [action, setAction] = React.useState<Action | undefined>(undefined);
  const { ref, height } = useElementSize();


  const methods = useForm();
  const { handleSubmit } = methods;

  const onSaveSubmit = (data: any) => {
    console.log(data);
  };

  const InputList = [
    {
      type: 'text', name: 'stage_name', label: 'Stage Name', placeholder: 'Pick value', data: getInputOptions()
    },
    {
      group: 'Position',
      inputs: [
        { type: 'text', name: 'previous_stage', label: 'Choose previous stage', placeholder: 'Pick value', data: getInputOptions() },
        { type: 'text', name: 'next_stage', label: 'Choose next stage', placeholder: 'Pick value', data: getInputOptions() },
      ]
    }
  ];

  return <div className='h-full space-y-6'>
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
              onSubmit={handleSubmit(onSaveSubmit)}
            >
              {InputList.map((input, index) => {
                return (
                  <div key={index}>
                    {!input.group && <InputWrapper
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
                        value={selectedNodeId as string}
                        onChange={(value, option) => toggleSelectedByNodeId(value as string)}
                      />
                    </InputWrapper>
                    }

                    {input.group && <h2 className='text-sm font-semibold'>{input.group}</h2>}
                    <div className='pl-4'>
                      {input.group && input.inputs.map((input, index) => (
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
  </div >;
};

export default FlowObjects