"use client";

import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import { getAllClaim } from '@/lib/service';
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
  const [pagination, setPagination] = React.useState({
    pageSize: 20,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});
  const [tableData, setTableData] = React.useState<AllClaimType[]>([]);
  const [claimsData, setClaimsData] = React.useState<PendingClaimProps>();

  const { data, total_items } = claimsData || {};

  React.useEffect(() => {
    const fetchClaims = async () => await getAllClaim({
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    });
    fetchClaims().then(setClaimsData);
  }, [pagination.pageIndex, pagination.pageSize]);

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
    manualPagination: true,
    rowCount: total_items,
    state: {
      pagination,
      rowSelection
    },
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',
    mantineTableContainerProps: {
      mah: '500',
      mih: '150',
      px: '48',
    },
    mantinePaperProps: {
      classNames: {
        root: '!border-none !shadow-none w-full bg-[#F1F5F9] overflow-auto',
      },
    },
    mantineTableBodyRowProps: () => ({
      classNames: { tr: '!border-none' },
    }),
  });

  const handleSendData = () => {
    // const selectedRowsData = Object.keys(rowSelection).map((key) => tableData[parseInt(key)]);
    const selectedRowsData = table.getSelectedRowModel().flatRows.map((row) => row.original);
    console.log('selectedRowsData:', selectedRowsData)
  }

  React.useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <Stack>
      <TextareaHeader
        {...{ table }}
      // actionsButton={
      //   <div className='flex gap-2'>
      //     <Button
      //       color='#895CF3'
      //       onClick={handleSendData}
      //     >Action</Button>
      //   </div>
      // }
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
      'relative flex bg-[#CBD5E1] rounded-t-lg mt-4 min-h-10',
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
              control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[#895CF3] !hover:text-white/90 !hover:!border-[#895CF3] !transition-all !duration-300 !ease-in-out data-[active=true]:!bg-[#895CF3] data-[active=true]:!text-white/90 data-[active=true]:!border-[#895CF3]',
            }}
          />}
        {actionsButton}
      </Flex>
    </div >
  )
};

