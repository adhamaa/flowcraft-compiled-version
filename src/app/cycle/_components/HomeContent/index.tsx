
'use client';

import * as React from 'react';
import { useDisclosure } from '@mantine/hooks';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features

import clsx from 'clsx';

import TitleSection from './TitleSection';
import ApplicationSection from './ApplicationSection';
import TabularSection from './TabularSection';

export type ApplicationData = {
  apps_label: string;
  apps_name: string;
  cycle: CycleData[];
};

export type CycleData = {
  app_label: string;
  app_name: string;
  app_sys_code: string;
  app_uuid: string;
  cycle_active: number;
  cycle_created: string;
  cycle_description: string;
  cycle_id: number;
  cycle_name: string;
  cycle_updated: string;
  cycle_uuid: string;
  no_of_stages: number;
}

export type StageData = {
  stage_name: string;
  stage_uuid: string;

}

export type StageInfoData = {
  created_datetime: string;
  listNextStagesUuid: string[];
  listPrevStagesUuid: string[];
  list_action: {
    can_edit: string[];
    can_view: string[];
    can_view_exception: string[];
    can_view_exclusion: string[];
    checkrole_by: string[];
    checkuser_by: string[];
    insert_cop_date: string[];
    notify_role: string[];
    percentage: string[];
    revert: string[];
    revert_mode: string[];
    revert_stage: string[];
    select_role: string[];
  };
  list_entry_condition: {
    pbt_id: string[];
  };
  list_exit_condition: {
    checkrole_by: string[];
    checkuser_by: string[];
    chk_doc: string[];
  };
  list_next_stage: {
    created_datetime: string;
    process_stage_name: string;
  }[];
  list_pbt: {
    pbt_id: string[];
  };
  list_previous: {
    created_datetime: string;
    process_stage_name: string;
  }[];
  list_requirement: {
    upload_doc: string[];
  };
  list_role: {
    "*": string[];
    check_roles: string[];
  };
  list_user: {
    user_id: string[];
  };
  process_stage_name: string;
  updated_datetime: string;
  uuid: string;
}


export default function HomeContent({
  applicationData,
  cycleData
}: {
  applicationData: ApplicationData[];
  cycleData: CycleData[]
}) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <div
      className={clsx('overflow-y-auto',
        'w-full'
      )}>
      <TitleSection title='Business Process Cycle' />
      <ApplicationSection {...{ opened, toggle, applicationData, cycleData }} />
      <TabularSection {...{ opened, cycleData }} />
    </div>
  );
}












