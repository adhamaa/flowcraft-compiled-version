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

  const defaultValues = params.account_slug || 'profile';

  const sideMenuList = [
    {
      name: 'Manage Account',
      value: 'manage-account',
      disabled: false,
      onChange: async (value: any) => router.push(`/manage-account/${value}/` + '?' + remainQueryString()),
      children: {
        defaultValue: defaultValues,
        data: [
          {
            name: 'Profile',
            value: 'profile',
            disabled: false,
            onChange: async (value: any) => {
              router.push(`/manage-account/${value}/` + '?' + remainQueryString());
            },
          },
          {
            name: 'Security',
            value: 'security',
            disabled: false,
            onChange: async (value: any) => {
              router.push(`/manage-account/${value}/` + '?' + remainQueryString());
            },
          },
          {
            name: 'Activities',
            value: 'activities',
            disabled: false,
            onChange: async (value: any) => {
              router.push(`/manage-account/${value}/` + '?' + remainQueryString());
            },
          },
        ]
      }
    },
  ];

  return (
    <aside>
      {sideMenuList.map((menu) => {
        return (
          <Tabs
            value={menu.children.defaultValue as string}
            orientation="vertical"
            classNames={{
              root: 'h-full',
              tab: 'w-40 !border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[var(--fc-brand-700)] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
              tabLabel: '~text-md/lg',
              list: 'flex-nowrap',
            }}
            onChange={menu?.onChange}
          >
            <TabsList>
              <></>
              {menu.children.data.map((child, i) => {
                return (
                  <ScrollAreaAutosize>
                    <Tooltip key={i} label={child.name} position='right'>
                      <TabsTab
                        key={child.value}
                        value={child.value}
                        disabled={child.disabled}
                        classNames={{
                          tabLabel: 'truncate',
                        }}
                      >
                        {child.name}
                      </TabsTab>
                    </Tooltip>
                  </ScrollAreaAutosize>
                )
              })}
            </TabsList>
          </Tabs>
        )
      })}
    </aside >
  );
}

export default SideMenus