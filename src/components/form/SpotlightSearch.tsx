'use client';

import * as React from 'react'
import { Icon } from "@iconify-icon/react";
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from "@mantine/spotlight";
import { Text, UnstyledButton } from '@mantine/core';
import '@mantine/spotlight/styles.css';
import { CycleData } from '@/app/cycle/_components/HomeContent';
import { getCycleList } from '@/lib/service';
import { useRouter } from 'next/navigation';

function SpotlightSearch() {
  const router = useRouter();
  const [cycleListSP, setCycleListSP] = React.useState<CycleData[]>([])
  const [cycleListClient, setCycleListClient] = React.useState<CycleData[]>([])

  const spotlightActions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    {
      group: 'E-Claims for Service Provider',

      actions: cycleListSP.map((cycle) => {
        const path = `/cycle/${cycle.cycle_id}?selected_app=SP&data_source=database`;
        return {
          id: cycle.cycle_id.toString(),
          label: 'Cycle Id: ' + cycle.cycle_id,
          description: `${path}`,
          onClick: () => router.push(path),
        };
      })
    },
    {
      group: 'E-Claims to Government',
      actions: cycleListClient.map((cycle) => {
        const path = `/cycle/${cycle.cycle_id}?selected_app=Client&data_source=database`;
        return {
          id: cycle.cycle_id.toString(),
          label: 'Cycle Id: ' + cycle.cycle_id,
          description: `${path}`,
          onClick: () => router.push(path),
        };
      })
    },

  ];

  return (
    <>
      <Spotlight
        actions={spotlightActions}
        nothingFound="Nothing found..."
        color='#895CF3'
        highlightQuery
        scrollable
        maxHeight={340}
        searchProps={{
          leftSection: <Icon
            icon="heroicons-outline:search"
            width={20}
            className="hover:text-[#895CF3] cursor-pointer"
          />,
          placeholder: 'Search...',
          classNames: {
            input: '!rounded-lg !border-none w-96 focus:outline-none transition-all duration-300 ease-in-out placeholder:ml-8',
          },
        }}
        classNames={{
          action: 'flex items-center !py-2 !px-4 gap-x-2 !rounded-lg !border-none w-96 transition-all duration-300 ease-in-out placeholder:ml-8 !text-gray-400 !text-sm',
        }}
      />
      <UnstyledButton
        onClick={async () => {
          spotlight.open()
          await getCycleList({
            apps_label: 'SP',
            datasource_type: 'database'
          }).then(async (data) => {
            setCycleListSP(data)
            await getCycleList({
              apps_label: 'Client',
              datasource_type: 'database'
            }).then(setCycleListClient)
          })
        }}
        classNames={{
          root: 'flex items-center !py-1.5 !px-3 gap-x-3 !rounded-lg !border-none w-72 transition-all duration-300 ease-in-out !bg-[#F1F4F5] placeholder:ml-8 !text-gray-400 !text-sm h-10',
        }}
      >
        <Icon
          icon="mingcute:search-line"
          width={20}
          className="text-gray-500 hover:text-[#895CF3] cursor-pointer"
        />
        <Text fz='sm'>Search</Text>
        {/* <Text
          ml='auto'
          classNames={{
            root: 'bg-[var(--mantine-color-gray-0)] !text-[calc(.6875rem_*_var(--mantine-scale))] !font-bold border border-[var(--mantine-color-gray-2)] !p-[calc(.25rem_*_var(--mantine-scale))_calc(.4375rem_*_var(--mantine-scale))] rounded-[var(--mantine-radius-sm)]'
          }}>Ctrl + K</Text> */}
      </UnstyledButton>
    </>
  )
}

export default SpotlightSearch