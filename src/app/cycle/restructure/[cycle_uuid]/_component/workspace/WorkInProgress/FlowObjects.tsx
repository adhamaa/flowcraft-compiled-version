'use client';

import * as React from 'react'

import ActionIcons from '../ActionIcons';
import ActionButtons from '../ActionButtons';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { Anchor, Button, Flex, FloatingIndicator, InputWrapper, LoadingOverlay, ScrollAreaAutosize, Text, Timeline, TimelineItem, UnstyledButton } from '@mantine/core';
import { useClickOutside, useDisclosure, useElementSize } from '@mantine/hooks';
import { MultiSelect, Select, TextInput } from 'react-hook-form-mantine';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Icon } from '@iconify-icon/react';
import { ActionType, EditableType, useActionIcons } from './hooks/useActionIcons';
import { useParams, useSearchParams } from 'next/navigation';
import { Apps_label, getRestructureLog } from '@/lib/service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTimeAgo } from '@/lib/helper';
import { getRandomColor } from '@/app/manage-account/_components/Activities';

type InputType = {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  data?: any;
  value?: any;
  onChange?: any;
  canShow?: boolean;
  control?: any;
  disabled?: boolean;
  group?: string;
  inputs?: InputType[];
}

export type FormValues = {
  curr_stage_uuid: null | string;
  curr_stage_name: string;
  previous_stage: string[];
  next_stage: string[];
};

function FlowObjects() {
  const searchParams = useSearchParams();
  const params = useParams();
  const cycle_uuid = params.cycle_uuid;
  const cycle_id = searchParams.get('cycle_id');
  const selected_app = searchParams.get('selected_app');

  const { getSelectedNodeId, getInputOptions, getPreviousInputOptions, getNextInputOptions, toggleSelectedByNodeId, fetchDeletedNodes } = useWorkInProgressDiagram();
  const { isEditable: isEditData, getAction, getIsEditable, getIsAnyEditable } = useActionIcons();
  const action = getAction(isEditData as EditableType);
  const isAdd = getIsEditable(isEditData as EditableType, 'add');
  const isMove = getIsEditable(isEditData as EditableType, 'move');
  const isDuplicate = getIsEditable(isEditData as EditableType, 'duplicate');
  const isDelete = getIsEditable(isEditData as EditableType, 'delete');
  const isRestore = getIsEditable(isEditData as EditableType, 'restore');
  const isDisjoint = getIsEditable(isEditData as EditableType, 'disjoint');
  const isEditable = getIsAnyEditable(isEditData as EditableType);
  const selectedNodeId = getSelectedNodeId();

  const inputOptions = getInputOptions();
  const previousInputOptions = getPreviousInputOptions();
  const nextInputOptions = getNextInputOptions();
  const [deletedInputOptions, setDeletedInputOptions] = React.useState<any[]>([]);
  const DeletedLabel = deletedInputOptions[0]?.label;

  const { ref, height } = useElementSize();

  const methods = useForm<FormValues>({
    defaultValues: {
      curr_stage_uuid: null,
      curr_stage_name: "",
      previous_stage: [],
      next_stage: []
    }
  });

  const { control, watch, setValue } = methods;
  const watchCurrentStageUuid = watch('curr_stage_uuid');
  const watchCurrentStageName = watch('curr_stage_name');

  const InputList = [
    {
      type: 'text',
      name: 'curr_stage_uuid',
      label: 'Stage Name',
      placeholder: 'Choose Stage',
      data: isRestore ? deletedInputOptions : inputOptions,
      // data: [],
      value: selectedNodeId,
      onChange:
        isRestore
          ? () => {
            setValue("curr_stage_name", DeletedLabel)
          }
          : toggleSelectedByNodeId,
      canShow: !isAdd,
      control: control,
      disabled: !isEditable
    },
    {
      type: 'text',
      name: 'curr_stage_name',
      label: 'Stage Name',
      placeholder: 'Name your stage',
      data: inputOptions,
      // data: [],
      value: selectedNodeId,
      onChange: toggleSelectedByNodeId,
      canShow: isAdd,
      control: control,
      disabled: !isEditable
    },
    {
      group: 'Position',
      canShow: !isDelete && (watchCurrentStageUuid || watchCurrentStageName || false),
      inputs: [
        {
          type: 'text',
          name: 'previous_stage',
          label: 'Choose previous stage',
          placeholder: 'Choose Stage',
          data: isDisjoint ? previousInputOptions : inputOptions,
          // data: [],
          onChange: () => { },
          canShow: !isDelete && (watchCurrentStageUuid || watchCurrentStageName || false),
          control: control,
          disabled: !isEditable
        },
        {
          type: 'text',
          name: 'next_stage',
          label: 'Choose next stage',
          placeholder: 'Choose Stage',
          data: isDisjoint ? nextInputOptions : inputOptions,
          // data: [],
          onChange: () => { },
          canShow: !isDelete && (watchCurrentStageUuid || watchCurrentStageName || false),
          control: control,
          disabled: !isEditable
        },
      ]
    }
  ];

  React.useEffect(() => {
    if (isRestore) {
      fetchDeletedNodes({
        apps_label: selected_app as Apps_label,
        cycle_id: cycle_id as string
      }).then(setDeletedInputOptions)
    }
  }, [isRestore])


  const infiniteRestructureLogsQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['restructureLog', cycle_uuid],
    queryFn: ({ pageParam }) => getRestructureLog({
      cycle_uuid: cycle_uuid as string,
      per_page: 5,
      page: pageParam
    }),
    enabled: !!cycle_uuid,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page === lastPage.total_pages) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, _, firstPageParam) => {
      if (firstPage.page <= 0) {
        return undefined
      }
      return firstPageParam - 1
    },
  });
  const { data: restructureLogsData, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = infiniteRestructureLogsQuery || {};

  return (
    <FormProvider {...methods}>
      <div className='h-full space-y-6'>
        {/* ----------------- flow objects ------------------ */}
        <h1 className='text-xl font-semibold'>The Flow Objects</h1>
        <div className='flex flex-col h-full space-y-6'>
          <ActionIcons type='action' />
          <>
            {action && <h1 className='text-xl font-semibold'><span className="capitalize">{action}</span> stage</h1>}
            <div className='border border-black rounded-xl pb-2'>
              {<form
                className={clsx('space-y-4 p-4')}
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
                            name={input.name as "curr_stage_name"}
                            placeholder={input.placeholder}
                            disabled={input.disabled}
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                            control={input.control}
                          />
                        </InputWrapper>
                      )}
                      {!isAdd && !input.group && input.canShow && (
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
                            name={input.name as "curr_stage_uuid"}
                            placeholder={input.placeholder}
                            checkIconPosition='right'
                            rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                            data={input.data}
                            disabled={input.disabled}
                            allowDeselect
                            searchable
                            nothingFoundMessage="No stage found"
                            classNames={{
                              input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                            }}
                            control={input.control}
                            // value={input.value}
                            onChange={input.onChange as never}
                          />
                        </InputWrapper>
                      )}

                      {input.group && input.canShow && (
                        <h2 className='text-sm font-semibold'>{input.group}</h2>
                      )}
                      <div className='pl-4'>
                        {input.group && input?.inputs.map((input, index) => input.canShow && (
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
                              name={input.name as "curr_stage_uuid" | "curr_stage_name" | "previous_stage" | "next_stage"}
                              placeholder={input.placeholder}
                              data={input.data}
                              disabled={input.disabled}
                              rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                              checkIconPosition='right'
                              searchable
                              classNames={{
                                input: '!rounded-lg py-3 pr-3 w-full !focus:outline-none !focus:ring-2 !focus:ring-[var(--fc-brand-700)] !focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] !disabled:border-transparent !disabled:text-black',
                              }}
                              nothingFoundMessage="No stage found"
                              control={input.control}
                            // onChange={input.onChange as never}

                            />
                            <style jsx global>{`
                            .mantine-MultiSelect-input:focus {
                              outline: 2px solid var(--fc-brand-700);
                              border-color: transparent;
                              transition: all 0.1s ease;
                              }
                            .mantine-MultiSelect-input:focus-visible {
                              outline: 2px solid var(--fc-brand-700);
                              border-color: transparent;
                              transition: all 0.1s ease;
                              }
                            .mantine-MultiSelect-input:focus-within {
                              outline: 2px solid var(--fc-brand-700);
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

            {/* ---------------- restructure history --------------- */}
            <h1 className='text-xl font-semibold'>Restructure History</h1>
            <div className='h-96 relative flex flex-col border border-black rounded-xl pb-2 overflow-hidden'>
              <ScrollAreaAutosize>
                <ActionIcons type='history' className='p-4 ml-auto sticky top-0 w-full justify-end bg-gradient-to-b from-white from-70% z-10' />
                <div className='flex flex-col p-4 space-y-3'>
                  {restructureLogsData?.pages.map((page) => {
                    return (
                      <div
                        key={page.page}
                        className='relative space-y-4'
                      >
                        {page.data.map((item: {
                          action: string;
                          notes: string;
                          updated_datetime: string;
                          user_name: string;
                          stage_name: string;
                        }, index: React.Key) => (
                          <Flex
                            key={index}
                            justify="center"
                            direction="column"
                          >
                            <Flex align="start" justify="space-between" w="100%">
                              <Text><span className='capitalize'>{item.action}</span> by "{item.user_name}"</Text>
                              <Text size="xs" mt={4} ml="auto">{getTimeAgo(item.updated_datetime)}</Text>
                            </Flex>
                            <Text c="dimmed" size="sm">{item.stage_name}</Text>
                          </Flex>
                        ))}
                      </div>
                    )
                  })}
                  {!(!hasNextPage) && <Anchor
                    onClick={() => fetchNextPage()}
                    className='font-light'
                  >
                    {(isFetchingNextPage || (isFetching && !isFetchingNextPage)) && <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'var(--fc-brand-700)', type: 'oval' }} />}
                    Load more
                  </Anchor>}
                </div>
              </ScrollAreaAutosize >
            </div>
          </>
        </div>
      </div >
    </FormProvider >
  );
};

export default FlowObjects;

