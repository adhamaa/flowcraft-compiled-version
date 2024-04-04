
'use client';
import * as React from 'react';
import { useSideMenu } from '@/hooks/useSideMenu';
import Image from 'next/image';
import AppListConst from '@/appList.json';
import { ActionIcon, Box, Button, Collapse, Menu, MenuItem, ScrollArea, UnstyledButton } from '@mantine/core';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { format } from 'url';
import { useGlobalState } from '@/hooks/useGlobalState';
import { useData } from '@/hooks/useData';

export type ApplicationData = {
  apps_label: string;
  apps_name: string;
  cycle: CycleData[];
};

export type CycleData = {
  app_label: string;
  app_name: string;
  app_sys_code: string;
  app_uuid: string;
  cycle_active: number;
  cycle_created: string;
  cycle_description: string;
  cycle_id: number;
  cycle_name: string;
  cycle_updated: string;
  cycle_uuid: string;
  no_of_stages: number;
}

export type StageData = {
  stage_name: string;
  stage_uuid: string;

}

export type StageInfoData = {
  created_datetime: string;
  listNextStagesUuid: string[];
  listPrevStagesUuid: string[];
  list_action: {
    can_edit: string[];
    can_view: string[];
    can_view_exception: string[];
    can_view_exclusion: string[];
    checkrole_by: string[];
    checkuser_by: string[];
    insert_cop_date: string[];
    notify_role: string[];
    percentage: string[];
    revert: string[];
    revert_mode: string[];
    revert_stage: string[];
    select_role: string[];
  };
  list_entry_condition: {
    pbt_id: string[];
  };
  list_exit_condition: {
    checkrole_by: string[];
    checkuser_by: string[];
    chk_doc: string[];
  };
  list_next_stage: {
    created_datetime: string;
    process_stage_name: string;
  }[];
  list_pbt: {
    pbt_id: string[];
  };
  list_previous: {
    created_datetime: string;
    process_stage_name: string;
  }[];
  list_requirement: {
    upload_doc: string[];
  };
  list_role: {
    "*": string[];
    check_roles: string[];
  };
  list_user: {
    user_id: string[];
  };
  process_stage_name: string;
  updated_datetime: string;
  uuid: string;
}


export default function HomeContent({
  applicationData,
  cycleData
}: {
  applicationData: ApplicationData[];
  cycleData: CycleData[]
}) {
  const { layoutColSpan } = useSideMenu();
  const [opened, { toggle }] = useDisclosure(true);


  return (
    <div
      className={clsx('overflow-y-auto',
        'w-full'
      )}>
      <TitleSection title='Business Process Cycle' />
      <ApplicationSection {...{ opened, toggle, applicationData, cycleData }} />
      <TabularSection {...{ opened, cycleData }} />
    </div>
  );
}

export const TitleSection = ({ title }: { title: string }) => {
  return (
    <section className='px-20 py-10'>
      <h1 className='font-bold text-xl'>{title}</h1>
    </section>
  )
};

const ApplicationSection = ({
  opened,
  toggle,
  applicationData,
  cycleData,
}: {
  opened: boolean;
  toggle: () => void;
  applicationData: ApplicationData[];
  cycleData: CycleData[];
}) => {
  const { selectedApp, setSelectedApp } = useGlobalState();
  const searchParams = useSearchParams();
  const selected_app_param = searchParams.get('selected_app');
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (name !== '' && value !== '') {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const listApps = useData().get.applications();
  console.log('listApps:', listApps)

  return (
    <section className='px-20 py-1 bg-[#F1F5F9] shadow-[inset_4px_4px_10px_0_rgb(203_213_225_/_0.25)]'> {/* #CBD5E140 */}
      <div className="p-4">
        <div className={clsx("flex items-center")}>
          <h2 className='font-bold text-lg'>Appplications</h2>&nbsp;{selectedApp && <span>{`(${selectedApp})`}</span>}
          <UnstyledButton className='ml-auto text-sm' onClick={toggle} color='blue'>
            <span className='flex items-center gap-2 text-[#895CF3]'>
              {opened ? 'Hide' : 'Unhide'}
              <Icon icon="tabler:chevron-down" width="1rem" height="1rem" rotate={opened ? 90 : 0} />
            </span>
          </UnstyledButton>
        </div>
        <Collapse in={opened}>
          <div className="flex gap-7 pt-7">
            {applicationData.map(({ apps_label, apps_name }, index) => {
              const handleAppClick = () => {
                setSelectedApp(apps_name);
                router.push(pathname + "?" + createQueryString('selected_app', apps_label))
              };
              const logoImg = "/claims_logo.svg";

              return (
                <Button
                  key={index}
                  variant='default'
                  classNames={{
                    root: apps_label != selected_app_param ? '!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none' : '!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none shadow-[#895CF3]/30',
                    label: 'flex flex-col items-center justify-center gap-2',
                  }}
                  onClick={handleAppClick}
                >
                  {logoImg ? <Image src={logoImg} width={opened ? 400 : 600} height={opened ? 500 : 700} className={clsx('object-cover',
                  )} alt='process illustration' /> :
                    <div className='bg-[#895CF3] w-32 h-32 rounded-full flex justify-center items-center font-semibold text-white text-2xl text-center'>
                      <p className='w-20 whitespace-pre-wrap'>FREE DEMO</p>
                    </div>}
                  <p className='truncate text-sm text-[#4F4F4F]'>{apps_name}</p>
                </Button>
              )
            })}
          </div>
        </Collapse>
      </div>
    </section>
  )
};

const TabularSection = ({ opened,
  statusIndicator,
  isPagination,
  cycleData,
}: {
  opened: boolean;
  statusIndicator?: boolean;
  isPagination?: boolean;
  cycleData: CycleData[];
}) => {
  const [tableData, setTableData] = React.useState<CycleData[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (name !== '' && value !== '') {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const columns: MRT_ColumnDef<CycleData>[] = [
    {
      header: 'Cycle Name',
      accessorFn: (originalRow) => originalRow.cycle_name,
      Cell: ({ cell, row }) => {
        const handleClick = () => router.push(pathname + "/" + row.original.cycle_id + '?' + createQueryString('', ''));
        return (
          <div className='flex gap-2 items-center cursor-pointer' onClick={handleClick}>
            <span className='hover:underline'>{cell.getValue() as string}</span>
          </div>
        )
      },
    },
    {
      header: 'Cycle ID',
      accessorFn: (originalRow) => originalRow.cycle_id,
      Cell: ({ cell, row }) => {
        const handleClick = () => router.push(pathname + "/" + row.original.cycle_id + '?' + createQueryString('', ''));
        return (
          <div className='flex gap-2 items-center cursor-pointer' onClick={handleClick}>
            <p className='hover:underline'>{cell.getValue() as string}</p>
          </div>
        )
      },
    },
    {
      header: 'Applications',
      accessorFn: (originalRow) => originalRow.app_name,
    },
    {
      header: 'Date Created',
      accessorFn: (originalRow) => originalRow.cycle_created,
    },
    {
      header: 'No of Stages',
      accessorFn: (originalRow) => originalRow.no_of_stages,
    },
    {
      header: 'Status',
      accessorFn: (originalRow) => originalRow.cycle_active,
    }
  ];
  const table = useMantineReactTable({
    columns,
    data: React.useMemo(() => tableData, [tableData]),
    // enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '', //change header text
        size: 5, //make actions column wider

      },
    },
    renderRowActions: ({ row }) => (
      <Menu classNames={{
        item: 'hover:bg-[#FBFAFC] hover:text-[#895CF3] hover:!border-r-2 border-[#895CF3] ring-0',
        dropdown: '!p-0 ring-0',
      }}>
        <Menu.Target>
          <ActionIcon variant="transparent" color="black" size="lg" radius="md" aria-label="Settings">
            <Icon className='cursor-pointer rounded' icon="tabler:dots" width="1.25rem" height="1.25rem" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="border-r-[3px] hover:border-[#895CF3]">
            <Menu.Item onClick={() => console.info('reload')}>Add new cycle</Menu.Item>
          </div>
          <div className="border-r-[3px] hover:border-[#895CF3]">
            <Menu.Item onClick={() => console.info('Delete')}>Delete cycle</Menu.Item>          </div>
          <div className="border-r-[3px] hover:border-[#895CF3]">
            <Menu.Item onClick={() => console.info('Delete')}>Duplicate cycle</Menu.Item>
          </div>
          <Menu.Divider className='!m-0' />
          <div className="border-r-[3px] hover:border-[#895CF3]">
            <Menu.Item onClick={() => console.info('Delete')}>Reload Business Process</Menu.Item>
          </div>
        </Menu.Dropdown>
      </Menu>
    ),
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
    setTableData(cycleData);
  }, [cycleData]);

  return (
    <section className='flex flex-col items-center'>
      {tableData.length ? (
        <>
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

              <div className='flex ml-2 gap-4'>
                <ActionIcon variant="light" color="gray" size="lg" radius="md" aria-label="Settings">
                  <Icon icon="heroicons-outline:refresh" width="1rem" height="1rem" />
                </ActionIcon>
                <ActionIcon variant="light" color="gray" size="lg" radius="md" aria-label="Settings">
                  <Icon icon="heroicons-outline:adjustments" width="1rem" height="1rem" />
                </ActionIcon>
                <ActionIcon variant="light" color="gray" size="lg" radius="md" aria-label="Settings">
                  <Icon icon="heroicons-outline:switch-vertical" width="1rem" height="1rem" />
                </ActionIcon>
              </div>

            </Flex>
            <div className="overflow-auto w-screen">
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
            </div>
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
          </Stack>
        </>
      ) : (
        <div className={clsx('p-20 text-center', !opened && 'text-xl')}>
          <Image src='/process-pana.svg' width={opened ? 400 : 600} height={opened ? 500 : 700} className={clsx('object-cover',
            // 'transition-all duration-300 ease-in-out'
          )} alt='process illustration' />
          <span>Explore business process cycles by clicking on the application</span>
        </div>
      )}
    </section>
  )
}






