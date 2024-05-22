import * as React from 'react'
import HomeContent from './_components/HomeContent'
import { Apps_label, getApplicationList, getCycleList } from '@/lib/service/client';
import { auth } from '@/auth';
import { DatasourceType } from '@/constant/datasource';

async function HomePage({
  searchParams: {
    selected_app,
    data_source
  }
}: {
  searchParams: {
    selected_app: Apps_label;
    data_source: DatasourceType;
  }
}) {

  const session = await auth()

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