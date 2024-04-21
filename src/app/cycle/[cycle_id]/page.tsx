import { getCycleList, getStageInfo, getStageList } from '@/lib/service/client';
import * as React from 'react'
import ColapsableMenu from '../_components/ColapsableMenu';

const CyclePage = async ({
  params: { cycle_id },
  searchParams: {
    selected_app,
    data_source
  }
}: {
  params: { cycle_id: string },
  searchParams: {
    selected_app: string;
    data_source: string;
  }
}) => {
  const cycle = await getCycleList({
    apps_label: selected_app ?? '',
    cycle_id: cycle_id ? parseInt(cycle_id) : undefined,
    datasource_type: data_source
  });
  const stage = await getStageList({
    cycle_id: parseInt(cycle_id),
    apps_label: selected_app,
    datasource_type: data_source
  });

  // Wait for the promises to resolve
  const [cycleData, stageData] = await Promise.all([cycle, stage])
  console.log('stageData:', stageData)

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <ColapsableMenu cycleData={cycleData} stageData={stageData} />
    </div>
  )
}

export default CyclePage