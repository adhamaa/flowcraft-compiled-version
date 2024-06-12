
import * as React from 'react'

import { Metadata } from 'next';

import Workspace from './_component/workspace';

export const metadata: Metadata = {
  title: "Restructure Cycle",
  description: "Cycle Restructure Page",
};

function RestructureCyclePage() {
  return (
    <Workspace />
  )
}

export default RestructureCyclePage