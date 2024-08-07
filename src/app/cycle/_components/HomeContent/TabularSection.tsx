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
import { Apps_label, duplicateCycle, getCycleList, reloadBizProcess } from '@/lib/service';
import { modals } from '@mantine/modals';
import toast from '@/components/toast';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import useQueryString from '@/hooks/useQueryString';
import { Select } from 'react-hook-form-mantine';
import { useForm } from 'react-hook-form';
import { datasource_type, DatasourceType } from '@/constant/datasource';

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
  const { resetDiagramLocalStorage } = useWorkInProgressDiagram();
  const [tableData, setTableData] = React.useState<CycleData[]>([]);
  const { createQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const isManageClaim = pathname === '/manage-claim';
  const isCycle = pathname === '/cycle';

  const searchParams = useSearchParams();
  const selected_app = searchParams.get('selected_app');
  const data_source = searchParams.get('data_source');
  const status = searchParams.get('status');

  const [activeTab, setActiveTab] = React.useState<string | null>(data_source || (isCycle ? 'database' : 'WIP'));

  const methods = useForm();

  const tripleDotMenu = [
    {
      group: 'crud',
      menu: [
        { label: 'Add new cycle', onClick: () => console.log('reload'), disabled: true },
        { label: 'Delete cycle', onClick: () => console.log('Delete'), disabled: true },
        {
          label: 'Duplicate cycle',
          onClick: async ({
            original: {
              cycle_id,
              app_label,
              app_name
            } }: {
              original: CycleData;
            }) => {
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
                        apps_label: app_label as Apps_label,
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
          },
          disabled: false
        },

      ],
    }, {
      group: 'reset',
      menu: [
        {
          label: 'Reload Business Process',
          onClick: async ({
            original: { cycle_id, app_label, app_name } }: { original: CycleData; }) => {
            modals.open({
              title: 'Confirm update',
              children: (
                <>
                  <Text size="sm">Are you sure you want to Reload <strong>{app_name} - cycle id: {cycle_id}</strong>?</Text>
                  <Flex gap={16} justify={'end'} mt="md">
                    <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
                      Cancel
                    </Button>
                    <Button onClick={async () => {
                      try {
                        const res = await reloadBizProcess({
                          cycle_id: cycle_id.toString(),
                          apps_label: app_label as Apps_label,
                        });
                        toast.success(res.message);
                      } catch (err: any) {
                        toast.error('Failed to reload business process' + '\n' +
                          'Incorect cycle id or application label provided');
                      } finally {
                        modals.closeAll();
                      }
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
          },
          disabled: false
        },
        { label: 'Optimize business process ', onClick: () => console.log('Optimize'), disabled: true },
      ],
    }
  ]

  const columns: MRT_ColumnDef<CycleData>[] = [
    {
      header: 'Cycle name',
      accessorFn: (originalRow) => originalRow.cycle_name,
    },
    {
      header: 'Cycle id',
      accessorFn: (originalRow) => originalRow.cycle_id,
    },
    {
      header: 'Applications',
      accessorFn: (originalRow) => originalRow.app_name,
    },
    {
      header: 'Date created',
      accessorFn: (originalRow) => originalRow.cycle_created,
    },
    {
      header: 'Last edited date',
      accessorFn: (originalRow) => originalRow.cycle_updated,
    },
    {
      header: 'No of stages',
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

  const handleCellClick = (cell: MRT_Cell<CycleData>, row: MRT_Row<CycleData>) => {
    cell.column.id !== 'mrt-row-actions' && router.push(pathname + "/" + row.original.cycle_id + '?' + createQueryString('', ''))

    resetDiagramLocalStorage();
  }

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
          {tripleDotMenu.map((menuLayer, i) => (
            <div key={menuLayer.group + i}>
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
      classNames: { tr: '!border-none' },
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

  const statusList = [
    { name: 'WIP', disabled: false },
    { name: 'Success', disabled: false },
    { name: 'Failed', disabled: false }
  ];

  React.useEffect(() => {
    setTableData(cycleData);
  }, [cycleData]);

  React.useEffect(() => {
    if (selected_app && isCycle && !data_source) {
      router.push(pathname + '?' + createQueryString('data_source', activeTab as string))
    }
  }, [activeTab, createQueryString, data_source, pathname, router, selected_app])

  React.useEffect(() => {
    if (selected_app && isManageClaim && !status) {
      router.push(pathname + '?' + createQueryString('status', activeTab as string))
    }
  }, [activeTab, createQueryString, data_source, pathname, router, selected_app])

  const actionIcons = [
    {
      tooltip: "Reload Business Process (All)",
      icon: "heroicons-outline:refresh",
      disabled: isCycle ? false : true,
      onClick: async () => {
        modals.open({
          title: 'Confirm update',
          children: (
            <>
              <Text size="sm">Are you sure you want to Reload <strong>The Business Process</strong>?</Text>
              <Flex gap={16} justify={'end'} mt="md">
                <Button
                  onClick={() => modals.closeAll()}
                  color='#F1F5F9'
                  c='#0F172A'
                  radius='md'>
                  Cancel
                </Button>
                <Button onClick={
                  async () => {
                    try {
                      const res = await reloadBizProcess();
                      toast.success(res.message)
                    } catch (err: any) {
                      toast.error(err.message);
                    } finally {
                      modals.closeAll();
                    }
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
      },
    },
    ...(isManageClaim ? [] : [{
      tooltip: "Filter",
      icon: "heroicons-outline:adjustments",
      disabled: true,
    },
    {
      tooltip: "Sort",
      icon: "heroicons-outline:switch-vertical",
      disabled: true,
    }])
  ];

  const [manageClaimOptions, setManageClaimOptions] = React.useReducer((state: { value: string; label: string; }[], action: { cycle_id: string; cycle_name: string; }[]) => {
    state = action.reduce((acc: { value: string; label: string; }[], { cycle_id, cycle_name }: { cycle_id: string; cycle_name: string; }) => {
      acc.push({ value: cycle_id, label: cycle_name })
      return acc;
    }, []);
    return state;
  }, []);

  const buttons = [
    // {
    //   label: 'Manage Claim',
    //   type: 'button' as React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    //   disabled: false,
    //   canShow: isManageClaim,
    //   onClick: () => router.push('/manage-claim/pending-claim'),
    //   variant: "filled",
    //   color: "#F1F5F9",
    //   c: "#0F172A",
    //   radius: "md",
    //   size: "sm",
    //   fz: 14,
    //   mr: "auto",
    //   classNames: {
    //     root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
    //   },
    //   icon: "",
    // },
    {
      label: 'Add Cycle',
      type: 'button' as React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
      disabled: true,
      canShow: isCycle,
      onClick: () => router.push('#'),
      variant: "filled",
      color: "#F1F5F9",
      c: "#0F172A",
      radius: "md",
      size: "sm",
      fz: 14,
      mr: "auto",
      classNames: {
        root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
      },
      icon: < Icon className='cursor-pointer rounded' icon="heroicons-outline:plus-circle" width="1rem" height="1rem" />,
    },
  ]

  return (
    <section className='flex flex-col items-center'>
      {tableData.length ? (
        <>
          <Stack className='w-full py-20'>
            <Flex justify="start" align="center" classNames={{
              root: 'px-20',
            }}>

              {buttons.map(({ label, canShow, icon, ...button }, i) => canShow && (
                <Button key={label + i} leftSection={icon} {...button} >{label}</Button>
              ))}

              {isManageClaim && <>
                <Select
                  name='cycle_id'
                  // label='Choose Cycle Name'
                  placeholder='Cycle Name'
                  checkIconPosition='left'
                  rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                  data={manageClaimOptions}
                  disabled={false}
                  allowDeselect
                  nothingFoundMessage="No stage found"
                  classNames={{
                    root: 'space-y-2 w-96 mr-auto',
                    input: '!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                    label: 'text-sm font-semibold text-[#475569] capitalize mb',
                  }}
                  onClick={() => getCycleList({
                    apps_label: selected_app as Apps_label,
                    datasource_type: datasource_type.memory as DatasourceType,
                  }).then(setManageClaimOptions)}
                  onChange={(value) => router.push(pathname + '/pending-claim' + '?' + createQueryString('cycle_id', value as string))}
                  control={methods.control}
                />
                <style jsx global>{`
                  .mantine-Select-option > svg {
                       color: #895CF3;
                       opacity: 1;
                         }
                  `}</style>
              </>}
              {<>
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
                    input: '!rounded-lg border !border-[--mantine-color-default-border] w-96 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8',
                  }} />
                {isPagination && <MRT_TablePagination table={table} color='#895CF3' />}
                <div className='flex ml-2 gap-4'>
                  {
                    actionIcons.map((icon, i) => (
                      <Tooltip key={icon.tooltip + i} label={icon.tooltip}>
                        <ActionIcon
                          disabled={icon?.disabled}
                          onClick={icon.onClick}
                          variant="transparent"
                          bg="#F1F5F9"
                          color='black'
                          size="lg"
                          radius="md"
                          aria-label="Settings">
                          <Icon icon={icon.icon} width="1rem" height="1rem" />
                        </ActionIcon>
                      </Tooltip>
                    ))
                  }
                </div>
              </>}
            </Flex>

            {isCycle && <>
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
              </Tabs>
              <div className="relative w-screen">
                <div className='absolute top-12 border w-full border-black/5 z-50' />
                <MantineReactTable table={table} />
              </div>
              <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
            </>}
            {isManageClaim && <>
              <Tabs
                color='#895CF3'
                variant='default'
                // defaultValue="database"
                value={activeTab as string}
                onChange={(value) => {
                  router.push(pathname + '?' + createQueryString('status', value as string))
                  setActiveTab(value)
                }}
                classNames={{
                  root: "m-auto",
                  tab: "!py-[1.6rem] !border-white data-[active=true]:text-[#895CF3] data-[active=true]:!border-[#895CF3] hover:bg-transparent",
                  list: 'before:!content-none',
                }}
              >
                <Tabs.List>
                  {statusList
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
              </Tabs>
              <div className="relative w-screen">
                <div className='absolute top-12 border w-full border-black/5 z-50' />
                <MantineReactTable table={table} />
              </div>
              <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
            </>}
          </Stack>
        </>
      ) : (
        <div className={clsx('p-20 text-center', !opened && 'text-xl')}>
          <Image src='/process-pana.svg' width={opened ? 400 : 600} height={opened ? 500 : 700} className={clsx('object-cover',
            // 'transition-all duration-300 ease-in-out'
          )} alt='process illustration' />
          {isCycle && <span>Explore business process cycles by clicking on the application</span>}
          {isManageClaim && <span>Manage your claims by clicking on the application </span>}
        </div>
      )}
    </section >
  )
}

export default TabularSection;



