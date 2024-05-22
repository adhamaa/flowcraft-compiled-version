import { Apps_label, Datasource_type, getStageList } from '@/lib/service/client';
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
    data_source: Datasource_type;
  }
}) => {

  const stage = await getStageList({
    cycle_id: cycle_id,
    apps_label: selected_app as Apps_label,
    datasource_type: data_source
  });

  // Wait for the promises to resolve
  const [stageData] = await Promise.all([stage])

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <ColapsableMenu stageData={stageData} />
    </div>
  )
}

export default CyclePage