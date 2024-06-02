'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

function SideMenus() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const selected_app = searchParams.get('selected_app');
  console.log('selected_app:', selected_app)
  const stage_uuid = searchParams.get('stage_uuid');
  console.log('stage_uuid:', stage_uuid)
  const datasource_type = searchParams.get('data_source');
  console.log('datasource_type:', datasource_type)
  const cycle_id = params.cycle_id;
  console.log('cycle_id:', cycle_id)
  return (
    <div>{
      selected_app && datasource_type && cycle_id
        ? `Selected App: ${selected_app}, Stage UUID: ${stage_uuid}, Data Source: ${datasource_type}, Cycle ID: ${cycle_id}`
        : 'No selected app'
    }</div>
  )
}

export default SideMenus