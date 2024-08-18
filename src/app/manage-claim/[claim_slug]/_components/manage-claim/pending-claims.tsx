"use client";

import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import toast from '@/components/toast';
import { Apps_label, getAllClaim, getCycleInfo, getStageList, getUsersPending, restructurePendings, sendMessagePending, testPending } from '@/lib/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, Flex, Menu, MenuDropdown, MenuItem, MenuTarget, Stack } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { MantineReactTable, MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_RowSelectionState, MRT_TablePagination, useMantineReactTable } from 'mantine-react-table';
import { useSearchParams } from 'next/navigation';
import * as React from 'react'
import { Control, Form, useForm } from 'react-hook-form';
import { MultiSelect, MultiSelectProps, NumberInput, Select, SelectProps, Textarea, TextareaProps, TextInput } from 'react-hook-form-mantine';
import { z } from "zod";

type AllClaimType = {
  actor_name: string;
  claim_id: number;
  current_stage_name: string;
  actor_id?: string;
  claim_uuid?: string;
  current_stage_uuid?: string;
}

type PendingClaimProps = {
  data?: AllClaimType[];
  page?: number;
  total_items?: number;
  total_pages?: number;
  message?: string;
  error?: boolean & 0 | 1;
  error_message?: string | null;
}

const actionTuple = ['recovery_all', 'recovery_stage', 'send_pending', 'send_message', 'test_pending'] as const;

const actionEnum = z.enum(actionTuple);

export type ActionType = z.infer<typeof actionEnum>;

const schema = z.object({
  claim_id: z.array(z.string().min(1)).optional(),
  stage_uuid: z.custom((value) => {
    if ((Array.isArray(value) && value.length === 0) || !value || value === '') {
      return false;
    }
    return true;
  }, { message: 'Stage UUID is required' }).optional(),
  user_id: z.custom((value) => {
    if ((Array.isArray(value) && value.length === 0) || !value || value === '') {
      return false;
    }
    return true;
  }, { message: 'User ID is required' }),
  message: z.string().optional(),
});

const test_pending_schema = z.object({
  user_id: z.string({ message: 'User ID is required' }),
  // claim_id: z.array(z.string().min(1)),
  action: z.literal('test_pending'),
});

const send_pending_schema = z.object({
  user_id: z.array(z.string().min(1), { message: 'User ID is required' }),
  action: z.literal('send_pending'),
});

const recovery_stage_schema = z.object({
  user_id: z.array(z.string().min(1), { message: 'User ID is required' }),
  // claim_id: z.array(z.string().min(1)),
  stage_uuid: z.array(z.string().min(1), { message: 'Stage UUID is required' }),
  action: z.literal('recovery_stage'),
});

const recovery_all_schema = z.object({
  user_id: z.array(z.string().min(1), { message: 'User ID is required' }),
  action: z.literal('recovery_all'),
});

const send_message_schema = z.object({
  user_id: z.array(z.string().min(1), { message: 'User ID is required' }),
  // claim_id: z.array(z.string().min(1)),
  message: z.string(),
  action: z.literal('send_message'),
});

function PendingClaim() {
  const [cycleInfo, setCycleInfo] = React.useState<any>();
  const searchParams = useSearchParams();
  const cycle_id = searchParams.get('cycle_id');
  const apps_label = searchParams.get('selected_app');

  React.useEffect(() => {
    const fetchCycleInfo = () => getCycleInfo({
      apps_label: apps_label as Apps_label,
      cycle_id: cycle_id as string,
    });
    fetchCycleInfo().then(setCycleInfo);
  }, [])

  return (
    <div className='flex flex-col w-full overflow-auto'>
      <span className='flex w-full px-14 py-6 items-center border-b text-2xl font-semibold'>{cycleInfo?.cycle_name}</span>
      <div className='w-full py-6 px-20'>
        <h1 className='font-semibold text-lg'>List of pending claims<LabelTooltip label='List of pending claims' /></h1>
        <TableClaims />
      </div >
    </div>
  )
}

export default PendingClaim

const TableClaims = (props?: PendingClaimProps) => {
  const searchParams = useSearchParams();
  const selected_app = searchParams.get('selected_app');
  const cycle_id = searchParams.get('cycle_id');
  const [action, setAction] = React.useState<ActionType>();

  const { control, watch, handleSubmit, reset } = useForm<{
    actor_name: string | undefined;
    current_stage_name: string | undefined;
    claim_id: number | string | string[] | undefined;
    user_id: string | string[] | undefined;
    stage_uuid: string | string[] | undefined;
    message: string | undefined;
    action: ActionType | undefined
  }>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(action === 'test_pending' ? test_pending_schema : action === 'send_pending' ? send_pending_schema : action === 'recovery_stage' ? recovery_stage_schema : action === 'recovery_all' ? recovery_all_schema : action === 'send_message' ? send_message_schema : schema),
    defaultValues: {
      actor_name: undefined,
      current_stage_name: undefined,
      claim_id: undefined,
      user_id: undefined,
      stage_uuid: undefined,
      message: undefined,
      action: undefined,
    },
  });


  const [debouncedClaimIdFilter] = useDebouncedValue(watch('claim_id'), 200, { leading: false });
  const [debouncedActorFilter] = useDebouncedValue(watch('actor_name'), 200, { leading: false });
  const [debouncedStageFilter] = useDebouncedValue(watch('current_stage_name'), 200, { leading: false });

  const [pagination, setPagination] = React.useState({
    pageSize: 25,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});

  const [tableData, setTableData] = React.useState<AllClaimType[]>([]);

  const [opened, setOpened] = React.useState(false); // for action modal
  const [pendingUsersOptions, setPendingUsersOptions] = React.useReducer(
    (state: { value: string; label: string; }[], action: { data: { user_id: string; user_name: string; }[] }) => {
      state = action.data.reduce((acc: { value: string; label: string; }[], { user_id, user_name }) => {
        return [...acc, { value: user_id, label: user_name }];
      }, []);
      return state;
    },
    []
  ); // for action modal
  const [stageListOptions, setStageListOptions] = React.useReducer(
    (state: { value: string; label: string; }[], action: { stage_uuid: string; stage_name: string; }[]) => {
      state = action.reduce((acc: { value: string; label: string; }[], { stage_uuid, stage_name }) => {
        return [...acc, { value: stage_uuid, label: stage_name }];
      }, []);
      return state;
    },
    []
  ); // for action modal

  const allClaimOptions = {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    claim_id: debouncedClaimIdFilter as number,
    actor_name: debouncedActorFilter,
    stage_name: debouncedStageFilter
  };
  const listAllClaim = useQuery({
    queryKey: ["allclaim", allClaimOptions],
    queryFn: () => getAllClaim(allClaimOptions),
    placeholderData: keepPreviousData // keep previous data while loading new data
  });

  // const { data, total_items } = claimsData || {};
  const { data, total_items } = listAllClaim.data || {};


  const columns: MRT_ColumnDef<AllClaimType>[] = [
    {
      header: 'Claim ID',
      accessorFn: (originalRow) => originalRow.claim_id,
    },
    {
      header: 'Actor',
      accessorFn: (originalRow) => originalRow.actor_name,
    },
    {
      header: 'Stage',
      accessorFn: (originalRow) => originalRow.current_stage_name,
    },
  ];

  const handleAction = async (data: any) => {
    const convertData = (data: any) => {
      return {
        user_id: Array.isArray(data.user_id) ? data.user_id : [data.user_id],
        claim_id: Object.keys(table.getState().rowSelection),
        stage_uuid: data.stage_uuid,
        message: data.message,
        action: data.action,
      };
    };
    const { user_id, claim_id, stage_uuid, message, action } = convertData(data);

    const getRequestData = (action: ActionType) => {
      switch (action) {
        case 'test_pending':
        case 'send_pending':
          return { user_id, claim_id, action };
        case 'recovery_stage':
          return { user_id, claim_id, stage_uuid, action };
        case 'recovery_all':
          return { user_id, action };
        case 'send_message':
          return { user_id, claim_id, message, action };
        default:
          console.error('Action not found');
          return null;
      }
    };

    const sendData = getRequestData(action as ActionType);

    if (!sendData) return;

    try {
      const res = await restructurePendings({ body: sendData });
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }

    // reset(); // reset form doesn't work don't know why
    table.resetRowSelection();
    modals.closeAll();
  };

  const listAction = [
    {
      value: 'test_pending',
      label: 'test',
      description: 'To test and send pending to the respective user.',
      input: [{
        type: 'select',
        name: 'user_id',
        label: 'Choose User Id',
        placeholder: 'Selected User ID',
        data: pendingUsersOptions,
        control: control,
      }, {
        type: 'text',
        name: 'action',
        label: 'Action',
        value: 'test_pending',
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'test',
        onClick: handleSubmit(handleAction),
      },
    },
    {
      value: 'recovery_stage',
      label: 'Recovery',
      description: 'To test and send to specific user to get their respective pending.',
      input: [{
        type: 'multi-select',
        name: 'user_id',
        label: 'Choose User Id',
        placeholder: 'Selected User ID',
        required: true,
        data: pendingUsersOptions,
        control: control,
      }, {
        type: 'multi-select',
        name: 'stage_uuid',
        label: 'Choose Stage Name',
        placeholder: 'Selected Stage Name',
        data: stageListOptions,
        control: control,
      }, {
        type: 'text',
        name: 'action',
        label: 'Action',
        value: 'recovery_stage',
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'Recover',
        onClick: handleSubmit(handleAction),
      },
    },
    {
      value: 'send_message',
      label: 'Send Message',
      description: 'Send message to all pending claim user of selected stage.',
      input: [{
        type: 'multi-select',
        name: 'user_id',
        label: 'Choose User Id',
        placeholder: 'Selected User ID',
        required: true,
        data: pendingUsersOptions,
        control: control,
      }, {
        type: 'textarea',
        name: 'message',
        label: 'Write message',
        placeholder: 'Write the message here',
        control: control,
      }, {
        type: 'text',
        name: 'action',
        label: 'Action',
        value: 'send_message',
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'Send',
        onClick: handleSubmit(handleAction),
      },
    },
    {
      value: 'send_pending',
      label: 'Send Pending',
      description: 'Are you sure you want to send the selected pendings?',
      input: [{
        type: 'multi-select',
        name: 'user_id',
        label: 'Choose User Id',
        placeholder: 'Selected User ID',
        required: true,
        data: pendingUsersOptions,
        control: control,
      }, {
        type: 'text',
        name: 'action',
        label: 'Action',
        value: 'send_pending',
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'Send',
        onClick: handleSubmit(handleAction),
      },
    },
  ];

  const max_h_768 = useMediaQuery('(max-height: 768px)');

  const table = useMantineReactTable({
    columns: React.useMemo(() => columns, [columns]),
    data: React.useMemo(() => tableData, [tableData]),
    initialState: { density: 'xs' },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableSorting: false,
    enableRowSelection: true,
    getRowId: (row) => row.claim_id.toString(),
    selectAllMode: 'all',
    manualPagination: true,
    rowCount: total_items,
    state: {
      pagination,
      rowSelection
    },
    enableTopToolbar: true,
    renderTopToolbar: ({ table }) => (
      <Form
        control={control}
        className='flex gap-4 p-4 px-6'
      >
        <NumberInput
          name='claim_id'
          placeholder='Claim ID'
          disabled={false}
          hideControls
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")}
              className="hover:text-[var(--fc-brand-700)] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-[--mantine-color-default-border] focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
          }}
          control={control}
        />
        <TextInput
          name='actor_name'
          placeholder='Actor'
          disabled={false}
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")}
              className="hover:text-[var(--fc-brand-700)] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
          }}
          control={control}
        />
        <TextInput
          name='current_stage_name'
          placeholder='Stage'
          disabled={false}
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")}
              className="hover:text-[var(--fc-brand-700)] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
          }}
          control={control}
        />

        <Menu
          opened={opened}
          onChange={setOpened}
          shadow="md"
          width="target"
          offset={0}
          classNames={{
            dropdown: 'rounded-none rounded-b-md border-none'
          }}
        >
          {
            <MenuTarget>
              <Button
                disabled={Object.keys(rowSelection).length === 0}
                color='var(--fc-brand-700)'
                ml='auto'
                w={220}
                type='button'
                variant='filled'
                classNames={{
                  root: clsx('disabled:!bg-fc-neutral-200 disabled:border-transparent disabled:cursor-not-allowed',
                    opened ? 'rounded-none rounded-t-md' : 'rounded-md'
                  ),
                }}
              >
                Action
              </Button>
            </MenuTarget>
          }

          <MenuDropdown onClick={() => reset()}>
            {listAction.map(({ label, description, value, input, btnCancel, btnSubmit }, i) => {
              return (
                <MenuItem
                  key={i}
                  classNames={{
                    itemLabel: 'font-light capitalize text-center'
                  }}
                  onClick={() => {
                    setAction(value as ActionType);
                    modals.open({
                      title: label,
                      size: 'sm',
                      children: (
                        <div className='space-y-9'>
                          <p className='text-center'>{description}</p>

                          {input.map((item, i) => {
                            switch (item.type) {
                              case 'select':
                                return <CustomSelect key={i}{...item} />
                              case 'multi-select':
                                return <CustomMultiSelect key={i} {...item} />
                              case 'textarea':
                                return <CustomTextarea key={i} {...item} />
                              case 'text':
                                return <TextInput key={i} {...item} name={item.name as 'action'} defaultValue={item.value} display='none' />
                              default:
                                return null;
                            }
                          })}

                          <Flex justify='center' align='center' gap={16}>
                            <Button
                              id={value}
                              color='var(--fc-neutral-100)'
                              c='var(--fc-neutral-900)'
                              radius='md'
                              type='button'
                              onClick={btnCancel.onClick}
                            >
                              {btnCancel.label}
                            </Button>
                            <Button
                              id={value}
                              color='var(--fc-brand-700)'
                              radius='md'
                              type='button'
                              onClick={btnSubmit.onClick}
                            >{btnSubmit.label}</Button>
                          </Flex>
                        </div>
                      ),
                      withCloseButton: false,
                      classNames: {
                        content: 'p-6 space-y-6 rounded-lg',
                        title: 'text-3xl font-semibold text-[var(--fc-neutral-900)] capitalize text-center',
                        header: 'flex items-center justify-center',
                      },
                    });
                  }}
                >
                  {label}
                </MenuItem>
              )
            })}
          </MenuDropdown>
        </Menu>
      </Form >
    ),
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',
    mantineTableContainerProps: {
      h: max_h_768 ? '300' : '450',
      mih: '150',
      px: '48',
      className: 'overflow-auto',
    },
    mantinePaperProps: {
      classNames: {
        root: '!border-none !shadow-none w-full !bg-[var(--fc-neutral-100)]',
      },
    },
    mantineTableBodyRowProps: () => ({
      classNames: { tr: '!border-none' },
    }),
  });

  React.useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  React.useEffect(() => {
    const fetchPendingUsers = async () => await getUsersPending({
      apps_label: selected_app as Apps_label,
      cycle_id: cycle_id as string,
    });
    fetchPendingUsers().then(setPendingUsersOptions);
  }, [selected_app, cycle_id]);

  React.useEffect(() => {
    const fetchStageList = async () => await getStageList({
      apps_label: selected_app as Apps_label,
      cycle_id: cycle_id as string
    });
    fetchStageList().then(setStageListOptions);
  }, [selected_app, cycle_id]);

  React

  return (
    <Stack>
      <TextareaHeader
        {...{ table }}
        actionsButton={
          <div className='flex gap-2'>
            <Button
              color='#E2E8F0'
              c='var(--fc-neutral-900)'
              onClick={() => {
                setAction('recovery_all');
                reset();
                [{
                  value: 'recovery_all',
                  label: 'Recovery',
                  description: 'To test and send to specific user to get their respective pending by business prosess',
                  input: [{
                    type: 'multi-select',
                    name: 'user_id',
                    label: 'Choose User Id',
                    placeholder: 'Selected User ID',
                    required: true,
                    data: pendingUsersOptions,
                    control: control,
                  }, {
                    type: 'text',
                    name: 'action',
                    label: 'Action',
                    value: 'recovery_all',
                    control: control,
                  }],
                  btnCancel: {
                    label: 'Cancel',
                    onClick: () => {
                      setAction(undefined);
                      modals.closeAll();
                    },
                  },
                  btnSubmit: {
                    label: 'Recover',
                    onClick: handleSubmit(handleAction),
                  },
                }].map(({ label, description, value, input, btnCancel, btnSubmit }, i) => {
                  modals.open({
                    title: label,
                    size: 'sm',
                    children: (
                      <div className='space-y-9'>
                        <p className='text-center'>{description}</p>

                        {input.map((item, i) => {
                          switch (item.type) {
                            case 'select':
                              return <CustomSelect key={i} {...item} />
                            case 'multi-select':
                              return <CustomMultiSelect key={i} {...item} />
                            case 'textarea':
                              return <CustomTextarea key={i} {...item} />
                            case 'text':
                              return <TextInput key={i} {...item} name={item.name as 'action'} defaultValue={item.value} display='none' />
                            default:
                              return null;
                          }
                        })}

                        <Flex justify='center' align='center' gap={16}>
                          <Button
                            id={value}
                            color='var(--fc-neutral-100)'
                            c='var(--fc-neutral-900)'
                            radius='md'
                            type='button'
                            onClick={btnCancel.onClick}
                          >
                            {btnCancel.label}
                          </Button>
                          <Button
                            id={value}
                            color='var(--fc-brand-700)'
                            radius='md'
                            type='button'
                            onClick={btnSubmit.onClick}
                          >{btnSubmit.label}</Button>
                        </Flex>
                      </div>
                    ),
                    withCloseButton: false,
                    classNames: {
                      content: 'p-6 space-y-6 rounded-lg',
                      title: 'text-3xl font-semibold text-[var(--fc-neutral-900)] capitalize text-center',
                      header: 'flex items-center justify-center',
                    },
                  })
                })
              }}
              className='hover:!bg-[#E2E8F0] hover:!text-[var(--fc-neutral-900)] transition-all duration-300 ease-in-out'
            >Recovery</Button>
          </div>
        }
      />
      < MantineReactTable table={table} />
    </Stack >
  )
};

const TextareaHeader = ({ table, actionsButton, className }: {
  table?: any;
  actionsButton?: React.ReactNode;
  className?: string;
}) => {
  const isTable = !!table
  return (
    <div className={clsx(
      'relative flex !bg-[#CBD5E1] rounded-t-lg mt-4 min-h-10',
      isTable && '-mb-4'
    )}>
      <Flex justify="space-between" align="center" classNames={{
        root: clsx('!py-3 !px-4 w-full'),
      }}>
        {isTable &&
          <MRT_TablePagination
            autoContrast
            withEdges={false}
            table={table}
            color='var(--fc-brand-700)'
            classNames={{
              root: '',
              control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[var(--fc-brand-700)] !hover:text-white/90 !hover:!border-[var(--fc-brand-700)] !transition-all !duration-300 !ease-in-out data-[active=true]:!bg-[var(--fc-brand-700)] data-[active=true]:!text-white/90 data-[active=true]:!border-[var(--fc-brand-700)]',
            }}
          />}
        {actionsButton}
      </Flex>
    </div >
  )
};

const commonInputStyles = {
  root: 'space-y-2',
  label: 'text-sm font-semibold text-[#475569] capitalize mb',
};

const selectInputStyles = {
  root: commonInputStyles.root,
  input: '!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-[21.5px] pr-[21.5px]',
  label: commonInputStyles.label,
};



const multiSelectInputStyles = {
  root: commonInputStyles.root,
  input: '!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-2.5 pr-2.5',
  label: commonInputStyles.label,
};

const textareaInputStyles = {
  root: commonInputStyles.root,
  input: '!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-2.5 pr-2.5 h-40',
  label: commonInputStyles.label,
};

const svgStyles = `
  .mantine-Select-option > svg {
    color: var(--fc-brand-700);
    opacity: 1;
  }
`;

const commonStyles = `
  .mantine-MultiSelect-input:focus,
  .mantine-MultiSelect-input:focus-visible,
  .mantine-MultiSelect-input:focus-within,
  .mantine-Textarea-input:focus,
  .mantine-Textarea-input:focus-visible,
  .mantine-Textarea-input:focus-within {
    outline: 2px solid var(--fc-brand-700);
    border-color: transparent;
    transition: all 0.1s ease;
  }
`;

const combinedStyles = `
  ${svgStyles}
  ${commonStyles}
`;


const CustomSelect = ({ name, label, placeholder, data, control, required }: SelectProps<any>) => (
  <>
    <Select
      name={name}
      label={label}
      required={required}
      placeholder={placeholder}
      checkIconPosition='left'
      rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
      data={data}
      disabled={false}
      allowDeselect
      nothingFoundMessage="No data found"
      classNames={selectInputStyles}
      control={control}
    />
    <style jsx global>{commonStyles}</style>
  </>
);


const CustomMultiSelect = ({ name, label, placeholder, data, control, required }: MultiSelectProps<any>) => (
  <>
    <MultiSelect
      name={name}
      label={label}
      required={required}
      placeholder={placeholder}
      checkIconPosition='left'
      rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
      data={data}
      disabled={false}
      nothingFoundMessage="No data found"
      classNames={multiSelectInputStyles}
      control={control}
    />
    <style jsx global>{commonStyles}</style>
  </>
);


const CustomTextarea = ({ name, label, placeholder, control, required }: TextareaProps<any>) => (
  <>
    <Textarea
      name={name}
      label={label}
      required={required}
      placeholder={placeholder}
      resize="vertical"
      classNames={textareaInputStyles}
      control={control}
    />
    <style jsx global>{commonStyles}</style>
  </>
);