import EditForm from '@/app/cycle/_components/Forms/EditForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Deleted Stage Info",
  description: "Cycle Deleted Stage Information",
};

function StageInfoPage({ params: { stage_uuid } }: { params: { stage_uuid: string; } }) {
  const stageUuid = stage_uuid === 'undefined' ? false : stage_uuid
  return stageUuid && (
    <div className="w-full">
      <EditForm />
    </div>
  )
}

export default StageInfoPage