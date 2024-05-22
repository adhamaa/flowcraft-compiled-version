'use client';

import * as React from 'react'
import { Icon } from "@iconify-icon/react";
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from "@mantine/spotlight";
import { UnstyledButton } from '@mantine/core';
import '@mantine/spotlight/styles.css';
import { CycleData } from '@/app/cycle/_components/HomeContent';
import { getCycleList } from '@/lib/service/client';
import { useRouter } from 'next/navigation';



// /cycle/27?selected_app=SP&data_source=database
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
          // leftSection: <Icon
          //   icon="heroicons-outline:document"
          //   width={20}
          //   className="hover:text-[#895CF3] cursor-pointer"
          // />,
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
          // leftSection: <Icon
          //   icon="heroicons-outline:document"
          //   width={20}
          //   className="hover:text-[#895CF3] cursor-pointer"
          // />,
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
          action: 'flex items-center !px-4 !py-2 gap-x-2 !rounded-lg !border-none w-96 transition-all duration-300 ease-in-out placeholder:ml-8 !text-gray-400 !text-sm',
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
          root: 'flex items-center !p-2 gap-x-2 !rounded-lg !border-none w-96 transition-all duration-300 ease-in-out !bg-[#F1F4F5] placeholder:ml-8 !text-gray-400 !text-sm',

        }}
      >
        <Icon
          icon="mingcute:search-line"
          width={20}
          className="text-gray-500 hover:text-[#895CF3] cursor-pointer"
        />
        Search
      </UnstyledButton>
      {/* <Input
    type="search"
    leftSectionPointerEvents="auto"
    leftSection={
      <Icon
        icon="mingcute:search-line"
        width={20}
        onClick={spotlight.open}
        className="hover:text-[#895CF3] cursor-pointer"
      />}
    onClick={spotlight.open}
    placeholder="Search"
    radius="md"
    classNames={{
      input: '!rounded-lg !border-none w-96 focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent focus:!bg-white transition-all duration-300 ease-in-out !bg-[#F1F4F5] placeholder:ml-8',
    }}
  /> */}</>
  )
}

export default SpotlightSearch