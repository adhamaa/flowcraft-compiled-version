'use client';

import * as React from 'react'

import ActionIcons from './ActionIcons';
import ActionButtons from './ActionButtons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { Button, ComboboxItem, InputWrapper } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { MultiSelect, Select } from 'react-hook-form-mantine';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';

type Action = "Add" | "Move" | "Duplicate" | "Delete" | "Restore" | "Disjoint";


function FlowObjects() {
  const [action, setAction] = React.useState<Action | undefined>(undefined);
  const { ref, height } = useElementSize();
  // const [value, setValue] = React.useState<ComboboxItem | null>(null);

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSaveSubmit = (data: any) => {
    console.log(data);
  };

  return <div className='h-full space-y-6'>
    <h1 className='text-xl font-semibold'>The Flow Objects</h1>
    <div className='flex flex-col h-full space-y-6'>
      <ActionIcons />
      {/* ---------- input section ----------- */}
      <>
        {action && <h1 className='text-xl font-semibold'>{action} stage</h1>}
        <div className='border border-black rounded-xl h-72'>

          <FormProvider {...methods}>
            <form
              className={clsx('space-y-4 pb-4')}
              onSubmit={handleSubmit(onSaveSubmit)}
            >

              {/* Stage Name dropdown (list of stage uuid, but shows the user its name) */}
              <InputWrapper
                ref={ref}
                label={`Stage Name`}
                classNames={{
                  root: 'relative mx-14 space-y-4',
                  label: '!text-sm !font-semibold',
                }}
              >
                <LabelTooltip label={`Stage Name`} />
                <Select
                  name='stage_name'
                  placeholder="Pick value"
                  checkIconPosition='right'
                  data={[
                    { value: 'react', label: 'React library' },
                    { value: 'vue', label: 'Vue library' },
                    { value: 'angular', label: 'Angular library' },
                  ]}
                />
              </InputWrapper>
              {/* Position dropdown (refer to the list of Stage uuid) */}
              <InputWrapper
                ref={ref}
                label={`Position`}
                classNames={{
                  root: 'relative mx-14 space-y-4',
                  label: '!text-sm !font-semibold',
                }}
              >
                <LabelTooltip label={`Position`} />
                <MultiSelect
                  name='position'
                  placeholder="Pick value"
                  checkIconPosition='right'
                  data={['RGO-01', 'RGO-02', 'RGO-03', 'RGO-04']}
                  searchable
                  nothingFoundMessage="Nothing found..."
                />
              </InputWrapper>

              <Button type='submit'>SEND</Button>
            </form>
          </FormProvider>
        </div>
        <ActionButtons />
      </>
    </div>
  </div>;
};

export default FlowObjects