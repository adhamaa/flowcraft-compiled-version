'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Apps_label, Datasource_type, getCycleInfo, getDeletedStageList, getStageList } from '@/lib/service/client';
import { useDisclosure } from '@mantine/hooks';
import { ScrollAreaAutosize, Tabs, TabsList, TabsPanel, TabsTab, Tooltip } from '@mantine/core';
import FooterButton from './footer';
import clsx from 'clsx';
import useQueryString from '@/hooks/useQueryString';

function SideMenus() {
  const [isSideMenuCollapse, { toggle: toggleSideMenuCollapse }] = useDisclosure(false);
  const [stageData, setStageData] = React.useState<any[]>();
  const [cycleUuid, setCycleUuid] = React.useState<string>();
  const [deletedStageData, setDeletedStageData] = React.useState<any[]>();
  const { createQueryString, remainQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const deleted_stage_route = pathname.includes('/stage/deleted/');
  const selected_app = searchParams.get('selected_app');
  const datasource_type = searchParams.get('data_source');
  const cycle_id = params.cycle_id;
  const stage_uuid = params.stage_uuid;

  const renderStageData = deleted_stage_route ? deletedStageData : stageData;


  /**
   * Fetch stage list data
   */
  React.useEffect(() => {
    async function getStageListData() {
      const stageListDeletedDataRes = await getDeletedStageList({
        cycle_id: cycle_id as string,
        apps_label: selected_app as Apps_label,
        datasource_type: datasource_type as Datasource_type
      });
      const stageListDataRes = await getStageList({
        cycle_id: cycle_id as string,
        apps_label: selected_app as Apps_label,
        datasource_type: datasource_type as Datasource_type
      });

      setStageData(stageListDataRes)
      setDeletedStageData(stageListDeletedDataRes)
    }

    if (cycle_id && selected_app && datasource_type) {
      getStageListData()
    }
  }, [cycle_id, datasource_type, selected_app])

  /**
   * Fetch cycle info data
   */
  React.useEffect(() => {
    async function getCycleInfoData() {
      const cycleInfoDataRes = await getCycleInfo({
        apps_label: selected_app as Apps_label,
        cycle_id: cycle_id as string,
        datasource_type: datasource_type as Datasource_type
      });
      setCycleUuid(cycleInfoDataRes.cycle_uuid)
    }

    if (cycle_id && selected_app && datasource_type) {
      getCycleInfoData()
    }
  }, [cycle_id, datasource_type, selected_app])


  const sideMenuList = [
    {
      name: 'Cycle', value: 'cycle', icon: 'heroicons-outline:refresh',
      children: [
        {
          name: 'General Information',
          value: 'general',
          onClick: () => router.push(`/cycle/${cycle_id}/` + '?' + remainQueryString()),
        },
        {
          name: 'Stages',
          value: 'stages',
          onClick: async () => {
            router.push(`/cycle/${cycle_id}/stage/${stageData?.[0]?.stage_uuid}/` + '?' + remainQueryString());
          },
          onChange: async (value: any) => {
            router.push(`/cycle/${cycle_id}/stage/${value}/` + '?' + remainQueryString());
          },
          children: stageData?.map((stage) => ({
            name: stage.stage_name,
            value: stage.stage_uuid,
          }))
        },
        {
          name: 'Deleted Stage',
          value: 'deleted_stage',
          onClick: () => router.push(`/cycle/${cycle_id}/stage/deleted/${deletedStageData?.[0]?.stage_uuid}/` + '?' + remainQueryString()),
          onChange: async (value: any) => {
            router.push(`/cycle/${cycle_id}/stage/deleted/${value}/` + '?' + remainQueryString());
          },
          children: deletedStageData?.map((stage) => ({
            name: stage.stage_name,
            value: stage.stage_uuid,
          }))
        },
      ]
    },
  ];

  return (
    <aside>
      <Tabs
        component='div'
        defaultValue="cycle"
        orientation="vertical"
        classNames={{
          root: 'h-full',
          tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
          tabLabel: '~text-md/lg',
          list: 'flex-nowrap',
        }}>
        <TabsList>
          <></>
          {sideMenuList.map((menu) => (
            <Tabs.Tab
              key={menu.value}
              value={menu.value}
              className=''>
              {menu.name}
            </Tabs.Tab>
          ))}

          <FooterButton {...{ isSideMenuCollapse }} isCollapse onClick={toggleSideMenuCollapse} />{/* ! main collapse button */}
        </TabsList>


        {sideMenuList.map((menu) => {
          return (
            <TabsPanel
              key={menu.value}
              value={menu.value}>
              <Tabs
                value={
                  pathname.includes('/stage/deleted/') ? 'deleted_stage' :
                    pathname.includes('/stage/') ? 'stages' :
                      pathname.includes('/cycle/') ? 'general' :
                        ''
                }
                orientation="vertical"
                classNames={{
                  root: clsx(
                    'h-full',
                  ),
                  tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                  tabLabel: '~text-md/lg',
                  list: 'flex-nowrap',
                }}
              >
                {!isSideMenuCollapse &&
                  <TabsList>
                    <></>
                    {menu.children.map((child) => (
                      <TabsTab key={child.value} value={child.value} onClick={child.onClick}>
                        {child.name}
                      </TabsTab>
                    ))}
                  </TabsList>}

                {menu.children.map((child) => (
                  <TabsPanel key={child.value} value={child.value} >
                    {child.children
                      && (
                        <Tabs
                          value={stage_uuid as string}
                          orientation="vertical"
                          classNames={{
                            root: 'h-full',
                            tab: 'w-40 !border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                            tabLabel: '~text-md/lg',
                            list: 'flex-nowrap',
                          }}
                          onChange={child.onChange}
                        >
                          {renderStageData?.length === 0 && <div className='flex justify-start items-start p-7 h-full w-max italic'>No stages found</div>}
                          {!isSideMenuCollapse
                            && (!!renderStageData?.length
                              &&
                              <TabsList>
                                <></>
                                <ScrollAreaAutosize>
                                  {child.children?.map((stage, i) => (
                                    <Tooltip key={i} label={stage.name} position='right'>
                                      <TabsTab
                                        key={stage.value}
                                        value={stage.value}
                                        classNames={{
                                          tabLabel: 'truncate',
                                        }}
                                      >
                                        {stage.name}
                                      </TabsTab>
                                    </Tooltip>
                                  ))}

                                </ScrollAreaAutosize>

                                {<FooterButton
                                  {...{ isSideMenuCollapse }}
                                  isRestructure
                                  onClick={() => router.push(`/cycle/restructure/${cycleUuid}?` + createQueryString('cycle_id', cycle_id as string))}
                                />}
                              </TabsList>)}
                        </Tabs>
                      )}
                  </TabsPanel>
                ))}
              </Tabs>
            </TabsPanel>
          )
        })}
      </Tabs >
    </aside >
  );
}

export default SideMenus