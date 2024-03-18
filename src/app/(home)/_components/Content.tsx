
'use client';
import * as React from 'react';
import { useSideMenu } from '@/hooks/useSideMenu';
import Image from 'next/image';
import AppListConst from '@/appList.json';
import { Button, Collapse, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Icon } from '@iconify-icon/react';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import {
  flexRender,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  type MRT_ColumnDef,
  useMantineReactTable,
  MRT_TableBodyCellValue,
} from 'mantine-react-table';
import { Flex, Stack, Table } from '@mantine/core';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const { layoutColSpan } = useSideMenu();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div
      className={clsx('overflow-y-auto',
        'w-full'
      )}>
      <TitleSection title='Business Process Cycle' />
      <ApplicationSection {...{ opened, toggle }} />
      <TabularSection {...{ opened }} />
    </div>
  );
}

export const TitleSection = ({ title }: { title: string }) => {
  return (
    <section className='px-20 py-10 border'>
      <h1 className='font-bold text-xl'>{title}</h1>
    </section>
  )
};

const ApplicationSection = ({ opened, toggle }: { opened: boolean, toggle: () => void }) => {
  const listApps = AppListConst[
    'qa' as keyof typeof AppListConst
  ];

  return (
    <section className='px-20 py-1 border bg-[#EBEAEA]'>

      <div className="p-4">
        <div className={clsx("flex items-center")}>
          <h2 className='font-bold text-lg'>Appplications</h2>
          <UnstyledButton className='ml-auto text-sm' onClick={toggle} color='blue'>
            <span className='flex items-center gap-2'>
              Hide
              <Icon icon="tabler:chevron-down" width="1rem" height="1rem" rotate={opened ? 90 : 0} />
            </span>
          </UnstyledButton>
        </div>
        <Collapse in={opened}>
          <div className="flex gap-7 pt-7">
            {listApps.map((app, index) => (
              <Button
                key={app.uuid}
                variant='default'
                classNames={{
                  root: '!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none',
                  label: 'flex flex-col items-center justify-center gap-2',
                }}
              >
                <div className='bg-[#895CF3] w-32 h-32 rounded-full flex justify-center items-center font-semibold text-white text-2xl text-center'>
                  <p className='w-20 whitespace-pre-wrap'>FREE DEMO</p>
                </div>
                <p className='truncate text-sm text-[#895CF3]'>{app.name}</p>
              </Button>
            ))}
          </div>
        </Collapse>
      </div>
    </section>
  )
};

const ListOfCycle = [
  {
    cycle_name: 'Cycle 1',
    cycle_id: '00010',
    applications: 'E-claims',
    date_created: '2021-10-10',
    no_of_stages: 5,
    status: 'Active'
  },
  {
    cycle_name: 'Cycle 2',
    cycle_id: '00011',
    applications: 'E-claims',
    date_created: '2021-10-10',
    no_of_stages: 5,
    status: 'Active'
  },
  {
    cycle_name: 'Cycle 3',
    cycle_id: '00012',
    applications: 'E-claims',
    date_created: '2021-10-10',
    no_of_stages: 5,
    status: 'Active'
  },
  {
    cycle_name: 'Cycle 4',
    cycle_id: '00013',
    applications: 'E-claims',
    date_created: '2021-10-10',
    no_of_stages: 5,
    status: 'Active'
  },
]
const TabularSection = ({ opened, isPagination }: { opened: boolean; isPagination?: boolean }) => {
  const router = useRouter();
  const columns: MRT_ColumnDef<typeof ListOfCycle[0]>[] = [
    {
      header: 'Cycle Name',
      accessorFn: (originalRow) => originalRow.cycle_name,
      Cell: ({ cell, row }) => {
        return (
          <div className='flex gap-2 items-center cursor-pointer' onClick={() => router.push(`/?cycle_id=${row.original.cycle_id}`)}>
            <span className='hover:underline'>{cell.getValue() as string}</span>
          </div>
        )
      },
    },
    {
      header: 'Cycle ID',
      accessorFn: (originalRow) => originalRow.cycle_id,
    },
    {
      header: 'Applications',
      accessorFn: (originalRow) => originalRow.applications,
    },
    {
      header: 'Date Created',
      accessorFn: (originalRow) => originalRow.date_created,
    },
    {
      header: 'No of Stages',
      accessorFn: (originalRow) => originalRow.no_of_stages,
    },
    {
      header: 'Status',
      accessorFn: (originalRow) => originalRow.status,
    },
  ];
  const [tableData, setTableData] = React.useState<typeof ListOfCycle[0][]>([]);
  const table = useMantineReactTable({
    columns,
    data: React.useMemo(() => ListOfCycle, []),
    // enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    //customize the MRT components
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
    },
    paginationDisplayMode: 'pages',
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(event, row.id);
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  React.useEffect(() => {
    setTableData(ListOfCycle);
  }, []);

  return (
    <section className='flex flex-col items-center'>
      {tableData.length ? <>
        <Stack className='w-full py-20'>
          <Flex justify="end" align="center" classNames={{
            root: 'px-20',
          }}>
            <MRT_GlobalFilterTextInput
              table={table}
              placeholder='Search Cycle'
              leftSection={
                <Icon
                  icon="mingcute:search-line"
                  width={20}
                  onClick={() => console.log("clicked search")}
                  className="hover:text-[#895CF3] cursor-pointer" />
              }
              classNames={{
                input: '!rounded-lg border border-gray-300 p-2 w-96 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#F1F4F5] focus:!bg-white',
              }} />
            {isPagination && <MRT_TablePagination table={table} />}

            <div className='flex ml-4 gap-4'>
              <Button
                leftSection={
                  <Icon
                    icon="mi:filter"
                    width="1.125rem"
                    height="1.125rem"
                    className=''
                  />
                }
                variant="default"
                radius="md"
                classNames={{
                  root: '!border-2 !border-[#895CF3]',
                  label: 'font-normal'
                }}
              >
                Filter
              </Button>
              <Button
                leftSection={
                  <Icon
                    icon="mi:sort"
                    width="1.125rem"
                    height="1.125rem"
                    className=''
                  />
                }
                variant="default"
                radius="md"
                classNames={{
                  root: '!border-2 !border-[#895CF3]',
                  label: 'font-normal'
                }}
              >
                Sort
              </Button>
            </div>
          </Flex>
          <Table
            captionSide="top"
            fz="md"
            highlightOnHover
            horizontalSpacing={85}
            // striped
            verticalSpacing="xs"
            // withTableBorder
            // withColumnBorders
            withRowBorders={false}
            m="0"
          >
            <Table.Thead classNames={{
              thead: 'border-b'
            }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id} >
                  {headerGroup.headers.map((header) => (
                    <Table.Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.Header ??
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>
            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      <MRT_TableBodyCellValue cell={cell} table={table} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Stack>
      </> : <div className={clsx('p-20 text-center', !opened && 'text-xl')}>
        <Image src='/process-pana.svg' width={opened ? 400 : 600} height={opened ? 500 : 700} className={clsx('object-cover',
          // 'transition-all duration-300 ease-in-out'
        )} alt='process illustration' />
        <span>Explore business process cycles by clicking on the application</span>
      </div>}
    </section>
  )
}






