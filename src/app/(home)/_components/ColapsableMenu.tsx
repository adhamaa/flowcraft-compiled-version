'use client';
import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Tabs, rem } from '@mantine/core';
import { MenuItem, useSideMenu } from '@/hooks/useSideMenu';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';


export default function ColapsableMenu() {
  const searchParams = useSearchParams();
  const cycle_id = searchParams.get('cycle_id');
  const { layoutColSpan, setLayoutColSpan, sideMenuColSpan, setSideMenuColSpan } = useSideMenu();

  return cycle_id && (
    <aside
      className={clsx(
        'flex',
        // 'border border-dashed border-red-500'
      )}
    // style={{ gridTemplateColumns: `repeat(${sideMenuColSpan}, 10rem)` }}
    >
      {/* <SideMenuComponent menuItems={menuItems} /> */}
      <motion.nav
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut"
        }}
        exit={{ opacity: 0, x: -100 }}

        className='border-r flex flex-col'>
        <ul className='p-6 space-y-4'>
          {menuItems.map((item, index) => (
            <li key={item.id}><button className='p-4 hover:border rounded-lg' onClick={() => { }}>{item.label}</button></li>
          ))}
        </ul>
      </motion.nav >


    </aside>
  );
}

const menuItems = [
  {
    id: '1',
    label: 'Menu 1',
    children: [
      {
        id: '1-1',
        label: 'Submenu 1-1',
        children: [
          {
            id: '1-1-1',
            label: 'Submenu 1-1-1'
          },
          {
            id: '1-1-2',
            label: 'Submenu 1-1-2'
          }
        ]
      },
      {
        id: '1-2',
        label: 'Submenu 1-2'
      }
    ]
  },
  {
    id: '2',
    label: 'Menu 2'
  },
  {
    id: '3',
    label: 'Menu 3',
    children: [
      {
        id: '3-1',
        label: 'Submenu 3-1'
      }
    ]
  },
];

export const SideMenuComponent = ({ menuItems, menuItem }: { menuItems?: MenuItem[]; menuItem?: MenuItem }) => {
  const [activeTab, setActiveTab] = React.useState<string | null>();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={activeTab ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{
        duration: 0.5,
        x: { type: "spring", stiffness: 300, damping: 30 },
        ease: "easeInOut"
      }}
      exit={{ opacity: 0, x: -100 }}
    >
      <Tabs
        orientation='vertical'
        value={activeTab}
        onChange={setActiveTab}
        classNames={{

        }}
      >
        <Tabs.List>
          {menuItems?.map((item, index) => (
            <Tabs.Tab key={item.id} value={item.id}>{item.label}</Tabs.Tab>
          ))}
        </Tabs.List>
        {menuItems?.map((item, index) => (
          <Tabs.Panel key={item.id} value={item.id}>
            {item.children && <SideMenuComponent menuItems={item.children} />}
          </Tabs.Panel>
        ))}
      </Tabs>
    </motion.div>
  );
};

