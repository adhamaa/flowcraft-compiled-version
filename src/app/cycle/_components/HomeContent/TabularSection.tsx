'use client';

import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import * as React from "react";
import { CycleData } from ".";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MRT_Cell, MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_Row, MRT_TableBodyCellValue, MRT_TablePagination, MRT_ToolbarAlertBanner, MantineReactTable, flexRender, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Button, Flex, Menu, Stack, Table, Tabs, Text, Tooltip } from "@mantine/core";
import { Icon } from "@iconify-icon/react";
import { duplicateCycle, reloadBizProcess } from '@/lib/service/client';
import { modals } from '@mantine/modals';
import toast from '@/components/toast';

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
  const selected_app = searchParams.get('selected_app');
  const data_source = searchParams.get('data_source');

  const [activeTab, setActiveTab] = React.useState<string | null>(data_source || 'database')

  const tripleDotMenu = [
    {
      group: 'crud',
      menu: [
        { label: 'Add new cycle', onClick: () => console.log('reload'), disabled: true },
        { label: 'Delete cycle', onClick: () => console.log('Delete'), disabled: true },
        {
          label: 'Duplicate cycle', onClick: async ({
            original: {
              cycle_id,
              app_label,
              app_name
            } }: {
              original: CycleData;
            }) => {
            console.log('row-cycle_id: ', cycle_id)
            console.log('row-app_label: ', app_label)
            modals.open({
              title: 'Duplicate Cycle',
              children: (
                <>
                  <Text size="sm">Are you sure you want to duplicate <strong>{app_name} - cycle id: {cycle_id}</strong>?</Text>
                  <Flex gap={16} justify={'end'} mt="md">
                    <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
                      Cancel
                    </Button>
                    <Button onClick={async () => {
                      await duplicateCycle({
                        cycle_id: cycle_id.toString(),
                        apps_label: app_label
                      })
                        .then((response) => {
                          if (response) {
                            toast.success(response.message)
                          }
                        }).catch((err) => {
                          toast.error(err.message)
                        }).finally(() => {
                          modals.closeAll()
                        });
                    }} color='#895CF3' radius='md'>
                      Yes
                    </Button>
                  </Flex>
                </>
              ),
              overlayProps: {
                backgroundOpacity: 0.55,
                blur: 10,
              },
              radius: 'md',
            });
          }, disabled: false
        },

      ],
    }, {
      group: 'reset',
      menu: [
        { label: 'Reload Business Process', onClick: () => console.log('Reload'), disabled: true },
        { label: 'Optimize business process ', onClick: () => console.log('Optimize'), disabled: true },
      ],
    }
  ]

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
    },
    {
      header: 'Cycle ID',
      accessorFn: (originalRow) => originalRow.cycle_id,
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
      Cell: ({ cell }) => {
        return (
          <div className='flex gap-2 items-center'>
            <span className={clsx('capitalize rounded-full px-2 py-1 text-sm font-semibold', statusIndicator && 'bg-green-500 text-white')}>{cell.getValue() as string}</span>
          </div>
        )
      },
    }
  ];

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, //customize the default page size
  });

  const handleCellClick = (cell: MRT_Cell<CycleData>, row: MRT_Row<CycleData>) => cell.column.id !== 'mrt-row-actions' && router.push(pathname + "/" + row.original.cycle_id + '?' + createQueryString('', ''))

  const table = useMantineReactTable({
    columns,
    data: React.useMemo(() => tableData, [tableData]),
    // enableRowSelection: true,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: { pagination }, //pass the pagination state to the table
    initialState: {
      // pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },
    enableRowActions: true,
    enableSorting: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
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
          {tripleDotMenu.map((menuLayer) => (
            <div key={menuLayer.group}>
              {menuLayer.menu.map((menu) => (
                <Menu.Item key={menu.label} onClick={() => menu.onClick(row)} disabled={menu.disabled}>
                  {menu.label}
                </Menu.Item>
              ))}
              <Menu.Divider className='!m-0' />
            </div>
          ))}


        </Menu.Dropdown>
      </Menu>
    ),
    //customize the MRT components
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',

    mantinePaperProps: {
      classNames: {
        root: '!border-none !shadow-none w-full px-16'
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      classNames: { tr: '' },
    }),
    mantineTableBodyCellProps: ({ cell, row }) => ({
      onClick: () => handleCellClick(cell, row),
      classNames: { td: cell.column.id !== 'mrt-row-actions' && 'cursor-pointer' } as never,
    }),
  });

  const datasourceList = [
    { name: 'memory', disabled: false },
    { name: 'cache', disabled: false },
    { name: 'database', disabled: false }
  ];

  React.useEffect(() => {
    setTableData(cycleData);
  }, [cycleData]);

  React.useEffect(() => {
    if (selected_app && !data_source) {
      router.push(pathname + '?' + createQueryString('data_source', activeTab as string))
    }
  }, [activeTab, createQueryString, data_source, pathname, router, selected_app])


  return (
    <section className='flex flex-col items-center'>
      {tableData.length ? (
        <>
          <Stack className='w-full py-20'>
            <Flex justify="end" align="center" classNames={{
              root: 'px-20',
            }}>
              <Button
                disabled
                variant='filled'
                color='#F1F5F9'
                c='#0F172A'
                radius='md'
                size="sm"
                fz={14}
                mr='auto'
                leftSection={< Icon className='cursor-pointer rounded' icon="heroicons-outline:plus-circle" width="1rem" height="1rem" />}
                // onClick={onClick}
                classNames={{
                  root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
                }}

              >
                Add Cycle
              </Button>

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
                  input: '!rounded-lg border border-gray-300 w-96 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#F1F4F5] focus:!bg-white placeholder:ml-8',
                }} />
              {isPagination && <MRT_TablePagination table={table} color='#895CF3' />}

              <div className='flex ml-2 gap-4'>
                <Tooltip label="Reload Business Process (All)">
                  <ActionIcon
                    // disabled
                    onClick={async () => {
                      modals.open({
                        title: 'Confirm update',
                        children: (
                          <>
                            <Text size="sm">Are you sure you want to Reload <strong>The Business Process</strong>?</Text>
                            <Flex gap={16} justify={'end'} mt="md">
                              <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
                                Cancel
                              </Button>
                              <Button onClick={
                                async () => {
                                  await reloadBizProcess()
                                    .then((res) => {
                                      if (res) {
                                        toast.success(res.message)
                                      }
                                    }).catch((err) => {
                                      toast.error(err.message)
                                    }).finally(() => {
                                      modals.closeAll()
                                    });
                                }} color='#895CF3' radius='md'>
                                Yes
                              </Button>
                            </Flex>
                          </>
                        ),
                        overlayProps: {
                          backgroundOpacity: 0.55,
                          blur: 10,
                        },
                        radius: 'md',
                      });

                    }}
                    variant="transparent"
                    bg="#F1F5F9"
                    color='black'
                    size="lg"
                    radius="md"
                    aria-label="Settings">
                    <Icon icon="heroicons-outline:refresh" width="1rem" height="1rem" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Filter">
                  <ActionIcon
                    disabled
                    variant="transparent"
                    bg="#F1F5F9"
                    color='black'
                    size="lg"
                    radius="md"
                    aria-label="Settings">
                    <Icon icon="heroicons-outline:adjustments" width="1rem" height="1rem" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Sort">
                  <ActionIcon
                    disabled
                    variant="transparent"
                    bg="#F1F5F9"
                    color='black'
                    size="lg"
                    radius="md"
                    aria-label="Settings">
                    <Icon icon="heroicons-outline:switch-vertical" width="1rem" height="1rem" />
                  </ActionIcon>
                </Tooltip>
              </div>
            </Flex>

            <Tabs
              color='#895CF3'
              variant='default'
              // defaultValue="database"
              value={activeTab as string}
              onChange={(value) => {
                router.push(pathname + '?' + createQueryString('data_source', value as string))
                setActiveTab(value)
              }}
              classNames={{
                root: "m-auto",
                tab: "!py-[1.6rem] !border-white data-[active=true]:text-[#895CF3] data-[active=true]:!border-[#895CF3] hover:bg-transparent",
                list: 'before:!content-none',
              }}

            >
              <Tabs.List>
                {datasourceList
                  .map((tab) => (
                    <Tabs.Tab
                      key={tab.name}
                      disabled={tab.disabled}
                      value={tab.name}
                      fz={20}
                      fw={600}>
                      <span className="capitalize ~text-base/lg">{tab.name}</span>
                    </Tabs.Tab>
                  ))}

              </Tabs.List>

              {/* {datasourceList.map((tab) => (
                <Tabs.Panel key={tab.name} value={tab.name}>
                  <></>
                </Tabs.Panel>
              ))} */}
            </Tabs>

            <div className="relative overflow-auto w-screen">
              <div className='absolute top-12 border w-full border-black/5 z-50' />
              <MantineReactTable table={table} />
              {/* <Table
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
                        <td key={cell.id}>
                          <MRT_TableBodyCellValue cell={cell} table={table} />
                        </td>
                      ))}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table> */}
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
      )
      }
    </section >
  )
}

export default TabularSection;