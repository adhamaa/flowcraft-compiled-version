'use client';

import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Button, ScrollArea, Tabs, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditForm from '../Forms/EditForm';
import GeneralForm from '../Forms/GeneralForm';
import { CycleData, StageData, StageInfoData } from '../HomeContent';
import { Apps_label, Datasource_type, getCycleInfo, getStageInfo } from '@/lib/service/client';
import { useDisclosure } from '@mantine/hooks';
import FooterButton from './footer';

export default function ColapsableMenu({
  stageData,
}: {
  stageData: StageData[];
}) {
  const [isSideMenuCollapse, { toggle: toggleSideMenuCollapse }] = useDisclosure(false);
  const [stageInfo, setStageInfo] = React.useState<StageInfoData>();
  const [cycleInfo, setCycleInfo] = React.useState<CycleData>();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const selected_app = searchParams.get('selected_app');
  const stage_uuid = searchParams.get('stage_uuid');
  const datasource_type = searchParams.get('data_source');
  const cycle_id = params.cycle_id;

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

  const removeQueryString = (param: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(param)
    return params.toString()
  };

  React.useEffect(() => {
    async function getCycleInfoData() {
      const cycleInfoDataRes = await getCycleInfo({
        apps_label: selected_app as Apps_label,
        cycle_id: cycle_id as string,
        datasource_type: datasource_type as Datasource_type
      });
      setCycleInfo(cycleInfoDataRes)
    }

    if (cycle_id && selected_app && datasource_type) {
      getCycleInfoData()
    }
  }, [cycle_id, datasource_type, selected_app])

  React.useEffect(() => {
    async function getStageInfoData() {
      const stageInfoDataRes = await getStageInfo({
        stage_uuid: stage_uuid as string,
        cycle_id: cycle_id as string,
        apps_label: selected_app as Apps_label,
        datasource_type: datasource_type as Datasource_type
      });
      setStageInfo(stageInfoDataRes)
    }

    if (cycle_id && selected_app && datasource_type && stage_uuid) {
      getStageInfoData()
    }
  }, [cycle_id, datasource_type, selected_app, stage_uuid])


  const sideMenuList = [
    {
      name: 'Cycle', value: 'cycle', icon: 'heroicons-outline:refresh',
      children: [
        {
          name: 'General Information',
          value: 'general',
          onClick: () => router.replace(pathname + '?' + removeQueryString('stage_uuid')),
          content: <GeneralForm data={cycleInfo as CycleData} />
        },
        {
          name: 'Stages',
          value: 'stages',
          onClick: async () => {
            router.push(pathname + '?' + createQueryString('stage_uuid', stageData[0]?.stage_uuid as string));
          },
          children: stageData.map((stage) => ({
            name: stage.stage_name,
            value: stage.stage_uuid,
            content: <EditForm data={stageInfo as StageInfoData} />
          }))
        },
        {
          name: 'Deleted Stage',
          value: 'deleted_stage',
          onClick: () => router.push(`/cycle/${cycle_id}/deleted-stage`),
          content: null
        },
      ]
    },

  ];

  return (
    <aside
      className={clsx(
        'flex',
      )}
    >
      <Tabs component='div' defaultValue="cycle" orientation="vertical" classNames={{
        root: 'h-full w-screen',
        tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
        tabLabel: '~text-md/lg',
        panel: ''
      }}>
        <Tabs.List>
          <></>
          {sideMenuList.map((menu) => (
            <Tabs.Tab key={menu.value} value={menu.value} className=''>
              {menu.name}
            </Tabs.Tab>
          ))}

          <FooterButton {...{ isSideMenuCollapse }} isCollapse onClick={toggleSideMenuCollapse} />{/* ! main collapse button */}
        </Tabs.List>


        {sideMenuList.map((menu) => {
          return (
            <Tabs.Panel key={menu.value} value={menu.value}>
              <Tabs
                // keepMounted={false}
                defaultValue={menu.children[0].value}
                orientation="vertical"
                classNames={{
                  root: clsx(
                    'h-full',
                    // isSideMenuCollapse && 'justify-center'
                  ),
                  tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                  tabLabel: '~text-md/lg',
                  panel: ''
                }}
              >
                {!isSideMenuCollapse &&
                  <Tabs.List>
                    <></>
                    {menu.children.map((child) => (
                      <Tabs.Tab key={child.value} value={child.value} onClick={child.onClick}>
                        {child.name}
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>}

                {menu.children.map((child) => (
                  <Tabs.Panel key={child.value} value={child.value}
                    classNames={{
                      panel: clsx(
                        // isSideMenuCollapse && 'container'
                      )
                    }}>
                    {child.content
                      || child.children
                      && (
                        <Tabs
                          // keepMounted={false}
                          defaultValue={child.children[0]?.value ?? ''}
                          orientation="vertical"
                          classNames={{
                            root: 'h-full',
                            tab: 'w-40 !border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                            tabLabel: '~text-md/lg',
                          }}
                          onChange={async (value) => {
                            router.push(pathname + '?' + createQueryString('stage_uuid', value as string));
                          }}
                        >
                          {stageData.length === 0 && <div className='flex justify-start items-start p-7 h-full'>No stages found</div>}
                          {!isSideMenuCollapse
                            && (!!stageData.length
                              &&
                              <Tabs.List>
                                <></>
                                <ScrollArea.Autosize mah={768}>
                                  {child.children?.map((stage, i) => (
                                    <Tooltip key={i} label={stage.name} position='right'>
                                      <Tabs.Tab
                                        key={stage.value}
                                        value={stage.value}
                                        classNames={{
                                          tabLabel: 'truncate'
                                        }}
                                      >
                                        {stage.name}
                                      </Tabs.Tab>
                                    </Tooltip>
                                  ))}

                                </ScrollArea.Autosize>

                                <FooterButton {...{ isSideMenuCollapse }} isAdd onClick={() => { }} />
                              </Tabs.List>)}
                          {child.children?.map((stage) => (
                            <Tabs.Panel key={stage.value} value={stage.value}>
                              {stage.content}
                            </Tabs.Panel>
                          ))}
                        </Tabs>
                      )}
                  </Tabs.Panel>
                ))}
              </Tabs>
            </Tabs.Panel>
          )
        })}
      </Tabs >
    </aside >
  );
  // return (
  //   <aside
  //     className={clsx(
  //       'flex',
  //     )}
  //   >
  //     <Tabs component='div' defaultValue="cycle" orientation="vertical" classNames={{
  //       root: 'h-full w-screen',
  //       tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
  //       tabLabel: '~text-md/lg',
  //       panel: ''
  //     }}>
  //       <Tabs.List>
  //         <></>
  //         {sideMenuList.map((menu) => (
  //           <Tabs.Tab key={menu.value} value={menu.value} className=''>
  //             {menu.name}
  //           </Tabs.Tab>
  //         ))}

  //         <FooterButton {...{ isSideMenuCollapse }} isCollapse onClick={toggleSideMenuCollapse} />{/* ! main collapse button */}
  //       </Tabs.List>


  //       {sideMenuList.map((menu) => {
  //         return (
  //           <Tabs.Panel key={menu.value} value={menu.value}>
  //             <Tabs
  //               // keepMounted={false}
  //               defaultValue={menu.children[0].value}
  //               orientation="vertical"
  //               classNames={{
  //                 root: clsx(
  //                   'h-full',
  //                   // isSideMenuCollapse && 'justify-center'
  //                 ),
  //                 tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
  //                 tabLabel: '~text-md/lg',
  //                 panel: ''
  //               }}
  //             >
  //               {!isSideMenuCollapse &&
  //                 <Tabs.List>
  //                   <></>
  //                   {menu.children.map((child) => (
  //                     <Tabs.Tab key={child.value} value={child.value} onClick={child.onClick}>
  //                       {child.name}
  //                     </Tabs.Tab>
  //                   ))}
  //                 </Tabs.List>}

  //               {menu.children.map((child) => (
  //                 <Tabs.Panel key={child.value} value={child.value}
  //                   classNames={{
  //                     panel: clsx(
  //                       // isSideMenuCollapse && 'container'
  //                     )
  //                   }}>
  //                   {child.content
  //                     || child.children
  //                     && (
  //                       <Tabs
  //                         // keepMounted={false}
  //                         defaultValue={child.children[0]?.value ?? ''}
  //                         orientation="vertical"
  //                         classNames={{
  //                           root: 'h-full',
  //                           tab: 'w-40 !border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
  //                           tabLabel: '~text-md/lg',
  //                         }}
  //                         onChange={async (value) => {
  //                           router.push(pathname + '?' + createQueryString('stage_uuid', value as string));
  //                         }}
  //                       >
  //                         {stageData.length === 0 && <div className='flex justify-start items-start p-7 h-full'>No stages found</div>}
  //                         {!isSideMenuCollapse
  //                           && (!!stageData.length
  //                             &&
  //                             <Tabs.List>
  //                               <></>
  //                               <ScrollArea.Autosize mah={768}>
  //                                 {child.children?.map((stage, i) => (
  //                                   <Tooltip key={i} label={stage.name} position='right'>
  //                                     <Tabs.Tab
  //                                       key={stage.value}
  //                                       value={stage.value}
  //                                       classNames={{
  //                                         tabLabel: 'truncate'
  //                                       }}
  //                                     >
  //                                       {stage.name}
  //                                     </Tabs.Tab>
  //                                   </Tooltip>
  //                                 ))}

  //                               </ScrollArea.Autosize>

  //                               <FooterButton {...{ isSideMenuCollapse }} isAdd onClick={() => { }} />
  //                             </Tabs.List>)}
  //                         {child.children?.map((stage) => (
  //                           <Tabs.Panel key={stage.value} value={stage.value}>
  //                             {stage.content}
  //                           </Tabs.Panel>
  //                         ))}
  //                       </Tabs>
  //                     )}
  //                 </Tabs.Panel>
  //               ))}
  //             </Tabs>
  //           </Tabs.Panel>
  //         )
  //       })}
  //     </Tabs >
  //   </aside >
  // );
};





