"use client";

import { Button, Flex, Stack } from '@mantine/core';
import clsx from 'clsx';
import { MantineReactTable, MRT_ColumnDef, MRT_RowSelectionState, MRT_TablePagination, useMantineReactTable } from 'mantine-react-table';
import * as React from 'react'

type AllClaimType = {
  actor_name: string;
  claim_id: number;
  current_stage_name: string;
  actor_id?: string;
  claim_uuid?: string;
  current_stage_uuid?: string;
}

function PendingClaim() {
  return (
    <div className='border border-dashed border-teal-400 w-full'>
      <h1>List of pending claims</h1>
      <TableStages data={[{
        claim_id: 1,
        actor_name: 'John Doe',
        current_stage_name: 'Stage 1',
      }, {
        claim_id: 2,
        actor_name: 'Jane Doe',
        current_stage_name: 'Stage 2',
      }]} />
    </div>
  )
}

export default PendingClaim

const TableStages = ({ data }: { data: AllClaimType[]; }) => {
  const [pagination, setPagination] = React.useState({
    pageSize: 5,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});
  console.log('rowSelection:', rowSelection)
  const [tableData, setTableData] = React.useState<AllClaimType[]>([]);

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

  const table = useMantineReactTable({
    columns: React.useMemo(() => columns, [columns]),
    data: React.useMemo(() => tableData, [tableData]),
    initialState: { density: 'xs' },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableSorting: false,
    enableRowSelection: true,
    state: {
      pagination,
      rowSelection
    },
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    mantineTableContainerProps: {
      mah: '150',
      px: '32',
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',

    mantinePaperProps: {
      classNames: {
        root: '!border-none !shadow-none w-full'
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

  const handleSendData = () => {
    // const selectedRowsData = Object.keys(rowSelection).map((key) => tableData[parseInt(key)]);
    const selectedRowsData = table.getSelectedRowModel().flatRows.map((row) => row.original);
    console.log('selectedRowsData:', selectedRowsData)
  }


  return (
    <Stack>
      <TextareaHeader
        {...{ table }}
        actionsButton={
          <div className='flex gap-2'>
            <Button
              color='#895CF3'
              onClick={handleSendData}
            >Action</Button>
          </div>
        } />
      <MantineReactTable table={table} />
    </Stack>
  )
};

const TextareaHeader = ({ table, actionsButton }: {
  table?: any;
  actionsButton?: React.ReactNode;
}) => {
  const isTable = !!table
  return (
    <div className={clsx(
      'relative flex bg-[#D9D9D9] rounded-t-lg mt-4 min-h-10',
      isTable && '-mb-4'
    )}>
      <Flex justify="space-between" align="center" classNames={{
        root: clsx('py-1 px-2 w-full', isTable && '!py-0'),
      }}>
        {isTable &&
          <MRT_TablePagination
            autoContrast
            table={table}
            color='#895CF3'
            classNames={{
              root: '',
              // control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[#895CF3] !hover:text-white/90 !hover:!border-[#895CF3] !transition-all !duration-300 !ease-in-out',
            }}
          />}
        {actionsButton}
      </Flex>
    </div >
  )
};

