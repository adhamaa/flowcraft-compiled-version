import EditForm from '@/app/cycle/_components/Forms/EditForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Deleted Stage Info",
  description: "Cycle Deleted Stage Information",
};

function StageInfoPage() {
  return (
    <div className="w-full">
      <EditForm />
    </div>
  )
}

export default StageInfoPage