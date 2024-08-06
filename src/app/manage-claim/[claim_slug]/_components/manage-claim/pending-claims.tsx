"use client";

import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { getAllClaim } from '@/lib/service';
import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, Flex, Menu, MenuDropdown, MenuItem, MenuTarget, Stack } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import clsx from 'clsx';
import { MantineReactTable, MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_RowSelectionState, MRT_TablePagination, useMantineReactTable } from 'mantine-react-table';
import * as React from 'react'
import { Form, useForm } from 'react-hook-form';
import { NumberInput, TextInput } from 'react-hook-form-mantine';

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
  const methods = useForm();
  const { control, watch } = methods;

  const [debouncedClaimIdFilter] = useDebouncedValue(watch('claim_id'), 200, { leading: false });
  const [debouncedActorFilter] = useDebouncedValue(watch('actor_name'), 200, { leading: false });
  const [debouncedStageFilter] = useDebouncedValue(watch('current_stage_name'), 200, { leading: false });

  const [pagination, setPagination] = React.useState({
    pageSize: 10,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});
  console.log('rowSelection:', rowSelection)
  const [tableData, setTableData] = React.useState<AllClaimType[]>([]);
  const [claimsData, setClaimsData] = React.useState<PendingClaimProps>();
  const [selectedRowsData, setSelectedRowsData] = React.useState<AllClaimType[]>([]);
  console.log('selectedRowsData:', selectedRowsData)

  const [opened, setOpened] = React.useState(false);


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

  const listAction = [
    {
      value: 'test',
      label: 'test',
    },
    {
      value: 'recovery',
      label: 'Recovery',
    },
    {
      value: 'send_message',
      label: 'Send Message',
    },
    {
      value: 'send_pending',
      label: 'Send Pending',
    },
  ]

  const handleSendData = () => {
    console.log('tableData:', tableData)
    // const selectedRowsData = Object.keys(rowSelection).map((key) => tableData[parseInt(key)]);
    console.log('getIsSomeRowsSelected:', table.getIsSomeRowsSelected())
    console.log('getIsAllRowsSelected:', table.getIsAllRowsSelected())
    console.log('getIsAllPageRowsSelected:', table.getIsAllPageRowsSelected())
    const selectedRowsData = table.getSelectedRowModel().flatRows.map((row) => row.original);
    console.log('selectedRowsData:', selectedRowsData)
  }

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
      <Form control={control}
        className='flex gap-4 p-4 px-6'
        onSubmit={(e) => console.log(e.data)}
        onError={(e) => console.log(e)}
      >
        <NumberInput
          name='claim_id'
          placeholder='Claim ID'
          hideControls
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")}
              className="hover:text-[#895CF3] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#F1F4F5] focus:!bg-white placeholder:ml-8',
          }}
          control={control}
        />
        <TextInput
          name='actor_name'
          placeholder='Actor'
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")}
              className="hover:text-[#895CF3] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#F1F4F5] focus:!bg-white placeholder:ml-8',
          }}
          control={control}
        />
        <TextInput
          name='current_stage_name'
          placeholder='Stage'
          leftSection={
            <Icon
              icon="mingcute:search-line"
              width={20}
              onClick={() => console.log("clicked search")}
              className="hover:text-[#895CF3] cursor-pointer" />
          }
          classNames={{
            input: '!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#F1F4F5] focus:!bg-white placeholder:ml-8',
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

          <MenuDropdown onClick={(ctx) => { console.log({ ctx }) }}>
            {listAction.map(({ label, value }, i) => (
              <MenuItem
                key={i}
                classNames={{
                  itemLabel: 'font-light capitalize text-center'
                }}
                onClick={() => {
                  modals.open({
                    title: label,
                    children: (
                      <>
                        <p>Send message to all pending claim user of selected stage.</p>
                        <Flex justify='center' align='center' gap={16}>
                          <Button
                            color='#F1F5F9'
                            c='#0F172A'
                            radius='md'
                            type='button'
                            onClick={() => modals.closeAll()}
                          >
                            Cancel
                          </Button>
                          <Button
                            color='#895CF3'
                            radius='md'
                            type='button'
                            onClick={() => {
                              modals.closeAll()
                            }}
                          >Send</Button>
                        </Flex>
                      </>
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
            ))}
          </MenuDropdown>
        </Menu>
      </Form>
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

