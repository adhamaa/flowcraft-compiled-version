'use client';
import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Accordion, Button, ScrollArea, Tabs, Transition, rem } from '@mantine/core';
import { MenuItem, useSideMenu } from '@/hooks/useSideMenu';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import EditForm from './EditForm';
import GeneralForm from './GeneralForm';
import { CycleData } from './Content';


export default function ColapsableMenu({ data }: { data: CycleData }) {
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
      {/* <motion.nav
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
      </motion.nav > */}

      <Tabs component='div' defaultValue="cycle" orientation="vertical" classNames={{
        root: 'h-full w-screen',
        tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
        tabLabel: 'text-lg',
        panel: ''
      }}>
        <Tabs.List>
          <Tabs.Tab value="cycle" className=''>Cycle</Tabs.Tab>

          <CollapseButton onClick={() => { }} />

        </Tabs.List>
        <Tabs.Panel value="cycle">
          <Tabs defaultValue="general" orientation="vertical" classNames={{
            root: 'h-full',
            tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
            tabLabel: 'text-lg',
            panel: ''
          }}>
            <Tabs.List>
              <Tabs.Tab value="general">General Information</Tabs.Tab>
              <Tabs.Tab value="stages">Stages</Tabs.Tab>

              <CollapseButton onClick={() => { }} />

            </Tabs.List>
            <Tabs.Panel value="general">
              <GeneralForm data={data} />
            </Tabs.Panel>
            <Tabs.Panel value="stages">
              <Tabs defaultValue="stage_1" orientation="vertical" classNames={{
                root: 'h-full',
                tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                tabLabel: 'text-lg',
                panel: ''

              }}>
                <Tabs.List>
                  <ScrollArea.Autosize mah={640}>
                    <Tabs.Tab value="stage_1">Stage 1</Tabs.Tab>
                    <Tabs.Tab value="stage_2">Stage 2</Tabs.Tab>
                    <Tabs.Tab value="stage_3">Stage 3</Tabs.Tab>
                    <Tabs.Tab value="stage_4">Stage 4</Tabs.Tab>
                    <Tabs.Tab value="stage_5">Stage 5</Tabs.Tab>
                    <Tabs.Tab value="stage_6">Stage 6</Tabs.Tab>
                    <Tabs.Tab value="stage_7">Stage 7</Tabs.Tab>
                    <Tabs.Tab value="stage_8">Stage 8</Tabs.Tab>
                  </ScrollArea.Autosize>

                  <CollapseButton onClick={() => { }} />
                </Tabs.List>
                <Tabs.Panel value="stage_1">
                  <Tabs defaultValue="next_stage" orientation="vertical" classNames={{
                    root: 'h-full',
                    tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                    tabLabel: 'text-lg',
                    panel: ''
                  }}>
                    <Tabs.List>
                      <Tabs.Tab value="next_stage">Next Stage</Tabs.Tab>
                      <Tabs.Tab value="prev_stage">Previous Stage</Tabs.Tab>

                      <CollapseButton onClick={() => { }} />

                    </Tabs.List>

                    <Tabs.Panel value="next_stage">
                      <EditForm />
                    </Tabs.Panel>
                    <Tabs.Panel value="prev_stage">Previous Stage</Tabs.Panel>
                  </Tabs>
                </Tabs.Panel>
                <Tabs.Panel value="stage_2">
                  <EditForm />
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
      </Tabs>
    </aside >
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

const CollapseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex items-end justify-end mt-auto p-2 border-t">
      <Button
        variant='default'
        classNames={{
          root: '!border-0 !bg-transparent cursor-pointer !px-0',
        }}
        onClick={onClick}
      >
        <Icon
          icon="tabler:chevron-down"
          width="3rem"
          rotate={45}
          className='text-[#895CF3]' />
      </Button>
    </div>
  );
}