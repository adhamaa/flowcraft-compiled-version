import EditForm from '@/app/cycle/_components/Forms/EditForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Stage Info",
  description: "Cycle Stage Information",
};

function StageInfoPage() {
  return (
    <div className="relative w-full">
      <EditForm />
    </div>
  )
}

export default StageInfoPage