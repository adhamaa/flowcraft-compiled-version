'use client';
import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Button, ScrollArea, Tabs } from '@mantine/core';
import clsx from 'clsx';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditForm from './Forms/EditForm';
import GeneralForm from './Forms/GeneralForm';
import { CycleData, StageData, StageInfoData } from './HomeContent';
import { getCycleInfo, getStageInfo } from '@/lib/service/client';
import { useDisclosure } from '@mantine/hooks';

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
        apps_label: selected_app as string,
        cycle_id: cycle_id as string,
        datasource_type: datasource_type as string
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
        apps_label: selected_app as string,
        datasource_type: datasource_type as string
      });
      setStageInfo(stageInfoDataRes)
    }

    if (cycle_id && selected_app && datasource_type && stage_uuid) {
      getStageInfoData()
    }
  }, [cycle_id, datasource_type, selected_app, stage_uuid])


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
            tabLabel: '~text-md/lg',
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
                  }
                }
              >Stages</Tabs.Tab>

            </Tabs.List>}
            <Tabs.Panel value="general">
              <GeneralForm data={cycleInfo as CycleData} />
            </Tabs.Panel>
            <Tabs.Panel value="stages" >
              <Tabs
                // keepMounted={false}
                defaultValue={stageData[0]?.stage_uuid ?? ''}
                orientation="vertical"
                classNames={{
                  root: 'h-full',
                  tab: '!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[#895CF3] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold',
                  tabLabel: '~text-md/lg',
                  panel: ''
                }}
                onChange={async (value) => {
                  router.push(pathname + '?' + createQueryString('stage_uuid', value as string));
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

const FooterButton = ({ isAdd, isCollapse, isSideMenuCollapse, onClick }: { isAdd?: boolean; isCollapse?: boolean; isSideMenuCollapse: boolean; onClick: () => void; }) => {
  return (
    <div className="flex items-end justify-end mt-auto py-2 border-t">
      <Button
        variant='transparent'
        color='#895CF3'
        fz={16}
        {...(isAdd && {
          leftSection:
            < Icon className='cursor-pointer rounded' icon="ic:round-plus" width="1.75rem" />
        })}
        onClick={onClick}
      >
        {isAdd && "Restructure"}
        {isCollapse && <Icon
          icon="tabler:chevron-down"
          width="3rem"
          rotate={isSideMenuCollapse ? 15 : 45}
          className='text-[#895CF3]' />}
      </Button>
    </div >
  );
}