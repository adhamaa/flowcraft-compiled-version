'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { ScrollAreaAutosize, Tabs, TabsList, TabsPanel, TabsTab, Tooltip } from '@mantine/core';
import FooterButton from './footer';
import clsx from 'clsx';
import useQueryString from '@/hooks/useQueryString';

function SideMenus() {
  const [isSideMenuCollapse, { toggle: toggleSideMenuCollapse }] = useDisclosure(false);
  const { createQueryString, remainQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultValues = pathname.includes('/pending-claim') ? 'pending-claim' : pathname.includes('/completed-claim') ? "completed-claim" : pathname.includes('/stage') ? 'stage' : pathname.includes('/user') ? 'user' : '';

  const sideMenuList = [
    {
      name: 'Manage Claim',
      value: 'manage-claim',
      disabled: false,
      onChange: async (value: any) => router.push(`/manage-claim/${value}/` + '?' + remainQueryString()),
      children: {
        defaultValue: defaultValues,
        data: [
          {
            name: 'Pending Claims',
            value: 'pending-claim',
            disabled: false,
            onChange: async (value: any) => {
              router.push(`/manage-claim/${value}/` + '?' + remainQueryString());
            },
          },
          {
            name: 'Completed Claim',
            value: 'completed-claim',
            disabled: true,
            onChange: async (value: any) => {
              router.push(`/manage-claim/${value}/` + '?' + remainQueryString());
            },
          },
          {
            name: 'stage',
            value: 'stage',
            disabled: true,
            onChange: async (value: any) => {
              router.push(`/manage-claim/${value}/` + '?' + remainQueryString());
            },
          },
          {
            name: 'user',
            value: 'user',
            disabled: true,
            onChange: async (value: any) => {
              router.push(`/manage-claim/${value}/` + '?' + remainQueryString());
            },
          },
        ]
      }
    },
  ];

  return (
    <aside>
      <Tabs
        value={sideMenuList[0].value}
        component='div'
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
            <TabsTab
              key={menu.value}
              value={menu.value}
              disabled={menu.disabled}
              className=''>
              {menu.name}
            </TabsTab>
          ))}

          <FooterButton {...{ isSideMenuCollapse }} isCollapse onClick={toggleSideMenuCollapse} />
        </TabsList>


        {sideMenuList.map((menu) => {
          return (
            <TabsPanel
              key={menu.value}
              value={menu.value}>
              <Tabs
                value={menu.children.defaultValue}
                orientation="vertical"
                classNames={{
                  root: clsx(
                    'h-full',
                  ),
                  tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                  tabLabel: '~text-md/lg',
                  list: 'flex-nowrap w-40',
                }}
                onChange={menu?.onChange}
              >
                {!isSideMenuCollapse &&
                  <TabsList>
                    <></>
                    {menu.children.data.map((child) => (
                      <TabsTab
                        key={child.value}
                        value={child.value}
                        disabled={child.disabled}
                      >
                        {child.name}
                      </TabsTab>
                    ))}
                  </TabsList>}

                {/* {menu.children.data.map((child) => {
                  return (
                    <TabsPanel
                      key={child.value}
                      value={child.value} >
                      {child?.children
                        && (
                          <Tabs
                            value={child?.children?.defaultValue as string}
                            orientation="vertical"
                            classNames={{
                              root: 'h-full',
                              tab: 'w-40 !border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                              tabLabel: '~text-md/lg',
                              list: 'flex-nowrap',
                            }}
                            onChange={child?.onChange}
                          >
                            {renderStageData?.length === 0 && <div className='flex justify-start items-start p-7 h-full w-max italic'>No stages found</div>}
                            {!isSideMenuCollapse
                              && (!!renderStageData?.length
                                &&
                                <TabsList>
                                  <></>
                                  <ScrollAreaAutosize>
                                    {child?.children.data?.map((stage, i) => (
                                      <Tooltip key={i} label={stage.name} position='right'>
                                        <TabsTab
                                          key={stage.value}
                                          value={stage.value}
                                          disabled={stage.disabled}
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
                  )
                })} */}
              </Tabs>
            </TabsPanel>
          )
        })}
      </Tabs >
    </aside >
  );
}

export default SideMenus