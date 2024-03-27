import React from 'react'
import HomeContent from './_components/Content'
import { getApplicationList, getCycleList, getStageInfo, getStageList } from '@/lib/services';
import ColapsableMenu from './_components/ColapsableMenu';

async function HomePage({
  searchParams: { cycle_id, selected_app, stage_uuid }
}: {
  searchParams: { cycle_id: string; selected_app: string; stage_uuid: string; }
}) {
  const applicationData = await getApplicationList();
  const cycleData = await getCycleList({ apps_label: selected_app ?? '', cycle_id: cycle_id ? parseInt(cycle_id) : undefined });
  const stageData = await getStageList({ cycle_id: cycle_id ? parseInt(cycle_id) : undefined, apps_label: selected_app });
  const stageInfoData = await getStageInfo({
    stage_uuid: stage_uuid,
    cycle_id: cycle_id,
    apps_label: selected_app
  });

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <ColapsableMenu cycleData={cycleData} stageData={stageData} stageInfoData={stageInfoData} />
      <HomeContent applicationData={applicationData} cycleData={cycleData} />
    </div>
  )
}

export default HomePage