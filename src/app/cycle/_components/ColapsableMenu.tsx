'use client';
import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Accordion, ActionIcon, Button, ScrollArea, Tabs, Transition, rem } from '@mantine/core';
import { MenuItem, useSideMenu } from '@/hooks/useSideMenu';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditForm from './Forms/EditForm';
import GeneralForm from './Forms/GeneralForm';
import { CycleData, StageData, StageInfoData } from './HomeContent';
import { getStageInfo } from '@/lib/service/client';
import { useDisclosure } from '@mantine/hooks';

export default function ColapsableMenu({
  cycleData,
  stageData,
  // stageInfoData
}: {
  cycleData: CycleData;
  stageData: StageData[];
  // stageInfoData: StageInfoData;
}) {
  const [isSideMenuCollapse, { toggle: toggleSideMenuCollapse }] = useDisclosure(false);
  const [stageInfo, setStageInfo] = React.useState<StageInfoData>()
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const selected_app = searchParams.get('selected_app');
  const stage_uuid = searchParams.get('stage_uuid');
  const cycle_id = params.cycle_id;

  const sideMenuLayer = stage_uuid ? 3 : 2;

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

  return (
    <aside
      className={clsx(
        'flex',
      )}
    >
      <Tabs component='div' defaultValue="cycle" orientation="vertical" classNames={{
        root: 'h-full w-screen',
        tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
        tabLabel: 'text-md',
        panel: ''
      }}>
        <Tabs.List>
          <></>
          <Tabs.Tab value="cycle" className=''>
            {/* <ActionIcon variant="filled" color="#895CF3" size="lg" radius="md" aria-label="Settings" >
              <Icon className='cursor-pointer rounded' icon="heroicons-outline:refresh" width="1rem" height="1rem" />
            </ActionIcon> */}
            Cycle
          </Tabs.Tab>

          <FooterButton {...{ isSideMenuCollapse }} isCollapse onClick={toggleSideMenuCollapse} />{/* ! main collapse button */}

        </Tabs.List>
        <Tabs.Panel value="cycle">
          <Tabs defaultValue="general" orientation="vertical" classNames={{
            root: 'h-full',
            tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
            tabLabel: 'text-md',
            panel: ''
          }}>
            {!isSideMenuCollapse && <Tabs.List>
              <></>
              <Tabs.Tab
                value="general"
                onClick={() => router.replace(pathname + '?' + removeQueryString('stage_uuid'))
                }>General Information</Tabs.Tab>
              <Tabs.Tab
                value="stages"
                onClick={
                  async () => {
                    router.push(pathname + '?' + createQueryString('stage_uuid', stageData[0]?.stage_uuid as string));
                    const stageInfoRes = await getStageInfo({
                      stage_uuid: stageData[0]?.stage_uuid as string,
                      cycle_id: parseInt(cycle_id as string),
                      apps_label: selected_app as string
                    });
                    setStageInfo(stageInfoRes)
                  }
                }
              >Stages</Tabs.Tab>

              {/* {sideMenuLayer === 2 && <FooterButton {...{isSideMenuCollapse}} isCollapse onClick={() => { }} />
              } */}
            </Tabs.List>}
            <Tabs.Panel value="general">
              <GeneralForm data={cycleData} />
            </Tabs.Panel>
            <Tabs.Panel value="stages" >
              <Tabs
                // keepMounted={false}
                defaultValue={stageData[0]?.stage_uuid ?? ''}
                orientation="vertical"
                classNames={{
                  root: 'h-full',
                  tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                  tabLabel: 'text-md',
                  panel: ''
                }}
                onChange={async (value) => {
                  router.push(pathname + '?' + createQueryString('stage_uuid', value as string));
                  const stageInfoRes = await getStageInfo({
                    stage_uuid: value as string,
                    cycle_id: parseInt(cycle_id as string),
                    apps_label: selected_app as string
                  });
                  setStageInfo(stageInfoRes)
                }}
              >
                {stageData.length === 0 && <div className='flex justify-start items-start p-7 h-full'>No stages found</div>}
                {!isSideMenuCollapse && (!!stageData.length && <Tabs.List>
                  <></>
                  <ScrollArea.Autosize mah={768}>
                    {stageData?.map((stage) => (
                      <Tabs.Tab
                        key={stage.stage_uuid}
                        value={stage.stage_uuid}>
                        {stage.stage_name}
                      </Tabs.Tab>
                    ))}

                  </ScrollArea.Autosize>

                  <FooterButton {...{ isSideMenuCollapse }} isAdd onClick={() => { }} />
                </Tabs.List>)}
                {stageData?.map((stage) => (
                  <Tabs.Panel key={stage.stage_uuid} value={stage.stage_uuid}>
                    <EditForm data={stageInfo as StageInfoData} />
                  </Tabs.Panel>
                ))}
              </Tabs>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
      </Tabs >
    </aside >
  );
}


// export const SideMenuComponent = ({ menuItems, menuItem }: { menuItems?: MenuItem[]; menuItem?: MenuItem }) => {
//   const [activeTab, setActiveTab] = React.useState<string | null>();

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -100 }}
//       animate={activeTab ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
//       transition={{
//         duration: 0.5,
//         x: { type: "spring", stiffness: 300, damping: 30 },
//         ease: "easeInOut"
//       }}
//       exit={{ opacity: 0, x: -100 }}
//     >
//       <Tabs
//         orientation='vertical'
//         value={activeTab}
//         onChange={setActiveTab}
//         classNames={{

//         }}
//       >
//         <Tabs.List>
//           {menuItems?.map((item, index) => (
//             <Tabs.Tab key={item.id} value={item.id}>{item.label}</Tabs.Tab>
//           ))}
//         </Tabs.List>
//         {menuItems?.map((item, index) => (
//           <Tabs.Panel key={item.id} value={item.id}>
//             {item.children && <SideMenuComponent menuItems={item.children} />}
//           </Tabs.Panel>
//         ))}
//       </Tabs>
//     </motion.div>
//   );
// };

const FooterButton = ({ isAdd, isCollapse, isSideMenuCollapse, onClick }: { isAdd?: boolean; isCollapse?: boolean; isSideMenuCollapse: boolean; onClick: () => void; }) => {
  return (
    <div className="flex items-end justify-end mt-auto py-2 border-t">
      <Button
        variant='transparent'
        color='#895CF3'
        fz={16}
        {...(isAdd && {
          leftSection:
            < Icon className='cursor-pointer rounded' icon="ic:round-plus" width="1.5rem" height="1.5rem" />
        })}
        onClick={onClick}
      >
        {isAdd && "Add stage"}
        {isCollapse && <Icon
          icon="tabler:chevron-down"
          width="3rem"
          rotate={isSideMenuCollapse ? 15 : 45}
          className='text-[#895CF3]' />}
      </Button>
    </div >
  );
}