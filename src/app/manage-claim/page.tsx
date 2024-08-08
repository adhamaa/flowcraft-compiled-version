import * as React from 'react'
import { Apps_label, getApplicationList, getCycleList } from '@/lib/service';
import { DatasourceType } from '@/constant/datasource';
import HomeContent from '../cycle/_components/HomeContent';

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


  const application = getApplicationList();
  const cycle = getCycleList({
    apps_label: selected_app,
    datasource_type: data_source
  });

  // Wait for the promises to resolve
  const [applicationData, cycleData] = await Promise.all([application, cycle])

  return (
    <HomeContent />
  )
}

export default HomePage