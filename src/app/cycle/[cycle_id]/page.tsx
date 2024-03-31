import { getCycleList, getStageInfo, getStageList } from '@/lib/services';
import * as React from 'react'
import ColapsableMenu from '../_components/ColapsableMenu';

const CyclePage = async ({
  params: { cycle_id },
  searchParams: { selected_app, stage_uuid }
}: {
  params: { cycle_id: string },
  searchParams: { selected_app: string; stage_uuid: string; }
}) => {
  const cycle = await getCycleList({ apps_label: selected_app ?? '', cycle_id: cycle_id ? parseInt(cycle_id) : undefined });
  const stage = await getStageList({ cycle_id: cycle_id ? parseInt(cycle_id) : undefined, apps_label: selected_app });
  // const stageInfo = await getStageInfo({
  //   stage_uuid: stage_uuid,
  //   cycle_id: parseInt(cycle_id),
  //   apps_label: selected_app
  // });

  // Wait for the promises to resolve
  const [cycleData, stageData ] = await Promise.all([cycle, stage])

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <ColapsableMenu cycleData={cycleData} stageData={stageData} />
    </div>
  )
}

export default CyclePage