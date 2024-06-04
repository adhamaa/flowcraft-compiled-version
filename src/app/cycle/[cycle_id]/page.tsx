import * as React from 'react'
import { Metadata } from 'next';
import GeneralForm from '../_components/Forms/GeneralForm';

export const metadata: Metadata = {
  title: 'Cycle Page',
}

function CycleInfoPage() {
  return (
    <div className="w-full">
      <GeneralForm />
    </div>
  )
}

export default CycleInfoPage
