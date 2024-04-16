import * as React from 'react'
import HomeContent from './_components/HomeContent'
import { getApplicationList, getCycleList, getStageInfo, getStageList } from '@/lib/services';

async function HomePage({
  searchParams: { selected_app }
}: {
  searchParams: { cycle_id: string; selected_app: string; stage_uuid: string; }
}) {
  const application = getApplicationList();
  const cycle = getCycleList({ apps_label: selected_app });

  // Wait for the promises to resolve
  const [applicationData, cycleData] = await Promise.all([application, cycle])

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <HomeContent {...{ applicationData, cycleData }} />
    </div>
  )
}

export default HomePage