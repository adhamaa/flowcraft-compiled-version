import React from 'react'
import HomeContent from './_components/Content'
import { getApplicationList, getCycleList } from '@/lib/services';
import ColapsableMenu from './_components/ColapsableMenu';

async function HomePage({
  searchParams: { cycle_id, selected_app }
}: {
  searchParams: { cycle_id: string; selected_app: string; }
}) {
  const applicationData = await getApplicationList();
  const cycleData = await getCycleList({ apps_label: selected_app ?? '', cycle_id: cycle_id ? parseInt(cycle_id) : undefined });

  return (
    <div className="flex">
      <ColapsableMenu data={cycleData} />
      <HomeContent applicationData={applicationData} cycleData={cycleData} />
    </div>
  )
}

export default HomePage