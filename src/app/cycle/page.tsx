import * as React from 'react'
import HomeContent from './_components/HomeContent'
import { getApplicationList, getCycleList } from '@/lib/service/client';

async function HomePage({
  searchParams: {
    selected_app,
    data_source
  }
}: {
  searchParams: {
    selected_app: string;
    data_source: string;
  }
}) {
  const application = getApplicationList();
  const cycle = getCycleList({
    apps_label: selected_app,
    datasource_type: data_source
  });

  // Wait for the promises to resolve
  const [applicationData, cycleData] = await Promise.all([application, cycle])

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <HomeContent {...{ applicationData, cycleData }} />
    </div>
  )
}

export default HomePage