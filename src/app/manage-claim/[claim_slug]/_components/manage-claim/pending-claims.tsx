"use client";

import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { Apps_label, getAllClaim, getStageList, getUsersPending, restructurePendings } from '@/lib/service';
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, Flex, Menu, MenuDropdown, MenuItem, MenuTarget, Stack } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import clsx from 'clsx';
import { MantineReactTable, MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_RowSelectionState, MRT_TablePagination, useMantineReactTable } from 'mantine-react-table';
import { useSearchParams } from 'next/navigation';
import * as React from 'react'
import { Control, Form, useForm } from 'react-hook-form';
import { MultiSelect, NumberInput, Select, Textarea, TextInput } from 'react-hook-form-mantine';

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

function PendingClaim() {
  return (
    <div className='relative w-full py-4 px-20'>
      <h1 className='font-semibold text-lg'>List of pending claims<LabelTooltip label='List of pending claims' /></h1>
      <TableClaims />
    </div>
  )
}

export default PendingClaim

const TableClaims = (props?: PendingClaimProps) => {
  const searchParams = useSearchParams();
  const selected_app = searchParams.get('selected_app');
  const cycle_id = searchParams.get('cycle_id');
  const methods = useForm({
    // defaultValues: { claim_id: '', user_id: '', stage_uuid: '', message: '', action: '', actor_name: '', current_stage_name: '' },
  });
  const { control, watch, handleSubmit, reset, setValue } = methods;

  const [debouncedClaimIdFilter] = useDebouncedValue(watch('claim_id'), 200, { leading: false });
  const [debouncedActorFilter] = useDebouncedValue(watch('actor_name'), 200, { leading: false });
  const [debouncedStageFilter] = useDebouncedValue(watch('current_stage_name'), 200, { leading: false });

  const [pagination, setPagination] = React.useState({
    pageSize: 10,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});
  const [tableData, setTableData] = React.useState<AllClaimType[]>([]);
  const [claimsData, setClaimsData] = React.useState<PendingClaimProps>();
  const [selectedRowsData, setSelectedRowsData] = React.useState<AllClaimType[]>([]);
  const [action, setAction] = React.useState<string>('');

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

  const { data, total_items } = claimsData || {};


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
    // selectAllMode: 'all',
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
              className="hover:text-[#895CF3] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-[--mantine-color-default-border] focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
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
              className="hover:text-[#895CF3] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
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
              className="hover:text-[#895CF3] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
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
                color='#895CF3'
                ml='auto'
                w={220}
                type='button'
                classNames={{
                  root: clsx('!bg-[#895CF3] !text-white/90 !hover:bg-[#895CF3] !hover:text-white/90 !transition-all !duration-300 !ease-in-out',
                    opened ? 'rounded-none rounded-t-md' : 'rounded-md'
                  ),
                }}
              >
                Action
              </Button>
            </MenuTarget>
          }

          <MenuDropdown onClick={() => reset()} >
            {listAction.map(({ label, description, value, input, btnCancel, btnSubmit }, i) => {
              return (
                <MenuItem
                  key={i}
                  classNames={{
                    itemLabel: 'font-light capitalize text-center'
                  }}
                  onClick={() => {
                    setAction(value);
                    modals.open({
                      title: label,
                      size: 'sm',
                      children: (
                        <div className='space-y-9'>
                          <p className='text-center'>{description}</p>

                          {input.map((input, i) => {
                            switch (input.type) {
                              case 'select':
                                return <CustomSelect key={i} data={input.data as { value: string; label: string; }[]} {...input} />
                              case 'multi-select':
                                return <CustomMultiSelect key={i} data={input.data as { value: string; label: string; }[]} {...input} />
                              case 'textarea':
                                return <CustomTextarea key={i} {...input} />
                              default:
                                return null;
                            }
                          })}

                          <Flex justify='center' align='center' gap={16}>
                            <Button
                              id={value}
                              color='#F1F5F9'
                              c='#0F172A'
                              radius='md'
                              type='button'
                              onClick={btnCancel.onClick}
                            >
                              {btnCancel.label}
                            </Button>
                            <Button
                              id={value}
                              color='#895CF3'
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
                        title: 'text-3xl font-semibold text-[#0F172A] capitalize text-center',
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
      h: max_h_768 ? '330' : '550',
      mih: '150',
      px: '48',
      className: 'overflow-auto',
    },
    mantinePaperProps: {
      classNames: {
        root: '!border-none !shadow-none w-full !bg-[#F1F5F9]',
      },
    },
    mantineTableBodyRowProps: () => ({
      classNames: { tr: '!border-none' },
    }),
  });

  const handleSendData = (data: any, e: any) => {
    console.log('e:', e)
    console.log('data:', data)
    const target_id = e.target.offsetParent.id;
    console.log('target_id:', target_id)
    const toSendData = {
      user_id: Array.isArray(data.user_id) ? data.user_id : [data.user_id],
      claim_id: Object.keys(table.getState().rowSelection),
      stage_uuid: data.stage_uuid,
      message: data.message,
      action: action,
    }
    console.log('toSendData:', toSendData)

    try {
      // restructurePendings(toSendData);
    } catch (error) {

    }


    table.resetRowSelection();
    modals.closeAll();
    // console.log('tableData:', tableData)
    // // const selectedRowsData = Object.keys(rowSelection).map((key) => tableData[parseInt(key)]);
    // console.log('getIsSomeRowsSelected:', table.getIsSomeRowsSelected())
    // console.log('getIsAllRowsSelected:', table.getIsAllRowsSelected())
    // console.log('getIsAllPageRowsSelected:', table.getIsAllPageRowsSelected())
    // console.log('selectedRowsData:', selectedRowsData)
  }

  const listAction = [
    {
      value: 'test',
      label: 'test',
      description: 'To test and send pending to the respective user.',
      input: [{
        type: 'select',
        name: 'user_id',
        label: 'Choose User Id',
        placeholder: 'Selected User ID',
        data: pendingUsersOptions,
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'test',
        onClick: handleSubmit(handleSendData),
      },
    },
    {
      value: 'recovery',
      label: 'Recovery',
      description: 'To test and send to specific user to get their respective pending.',
      input: [{
        type: 'multi-select',
        name: 'user_id',
        label: 'Choose User Id',
        placeholder: 'Selected User ID',
        data: pendingUsersOptions,
        control: control,
      }, {
        type: 'multi-select',
        name: 'stage_uuid',
        label: 'Choose Stage Name',
        placeholder: 'Selected Stage Name',
        data: stageListOptions,
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'Recover',
        onClick: handleSubmit(handleSendData),
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
        data: pendingUsersOptions,
        control: control,
      }, {
        type: 'textarea',
        name: 'message',
        label: 'Write message',
        placeholder: 'Write the message here',
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'Send',
        onClick: handleSubmit(handleSendData),
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
        data: [],
        control: control,
      }],
      btnCancel: {
        label: 'Cancel',
        onClick: () => modals.closeAll(),
      },
      btnSubmit: {
        label: 'Send',
        onClick: handleSubmit(handleSendData),
      },
    },
  ]

  React.useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  React.useEffect(() => {
    const fetchClaims = async () => await getAllClaim({
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      claim_id: debouncedClaimIdFilter,
      actor_name: debouncedActorFilter,
      stage_name: debouncedStageFilter,
    });
    fetchClaims().then(setClaimsData);
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    debouncedClaimIdFilter,
    debouncedActorFilter,
    debouncedStageFilter
  ]);

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

  return (
    <Stack>
      <TextareaHeader
        {...{ table }}
        actionsButton={
          <div className='flex gap-2'>
            <Button
              color='#E2E8F0'
              c='#0F172A'
              onClick={() => console.log('Recovery')}
              className='hover:!bg-[#E2E8F0] hover:!text-[#0F172A] transition-all duration-300 ease-in-out'
            >Recovery</Button>
          </div>
        }
      />
      <MantineReactTable table={table} />
    </Stack>
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
            color='#895CF3'
            classNames={{
              root: '',
              control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[#895CF3] !hover:text-white/90 !hover:!border-[#895CF3] !transition-all !duration-300 !ease-in-out data-[active=true]:!bg-[#895CF3] data-[active=true]:!text-white/90 data-[active=true]:!border-[#895CF3]',
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
  input: '!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-[21.5px] pr-[21.5px]',
  label: commonInputStyles.label,
};



const multiSelectInputStyles = {
  root: commonInputStyles.root,
  input: '!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-2.5 pr-2.5',
  label: commonInputStyles.label,
};

const textareaInputStyles = {
  root: commonInputStyles.root,
  input: '!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-2.5 pr-2.5 h-40',
  label: commonInputStyles.label,
};

const svgStyles = `
  .mantine-Select-option > svg {
    color: #895CF3;
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
    outline: 2px solid #895CF3;
    border-color: transparent;
    transition: all 0.1s ease;
  }
`;

const combinedStyles = `
  ${svgStyles}
  ${commonStyles}
`;


const CustomSelect = ({ name, label, placeholder, data, control }: { name: string, label: string, placeholder: string, data: { value: string; label: string; }[], control: Control }) => (
  <>
    <Select
      name={name}
      label={label}
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


const CustomMultiSelect = ({ name, label, placeholder, data, control }: { name: string, label: string, placeholder: string, data: { value: string; label: string; }[], control: Control }) => (
  <>
    <MultiSelect
      name={name}
      label={label}
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


const CustomTextarea = ({ name, label, placeholder, control }: { name: string, label: string, placeholder: string, control: Control }) => (
  <>
    <Textarea
      name={name}
      label={label}
      placeholder={placeholder}
      resize="vertical"
      classNames={textareaInputStyles}
      control={control}
    />
    <style jsx global>{commonStyles}</style>
  </>
);