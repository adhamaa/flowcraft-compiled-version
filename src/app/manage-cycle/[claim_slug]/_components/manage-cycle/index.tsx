"use client";

import * as React from 'react'
import PendingClaim from './pending-claims';
import { notFound, useParams } from 'next/navigation';
import CompletedClaim from './completed-claims';


function ManageClaim() {
  const params = useParams();

  const pendingClaimSlug = params.claim_slug === "pending-claim"
  const completedClaimSlug = params.claim_slug === "completed-claim"
  const stageSlug = params.claim_slug === "stage"
  const userSlug = params.claim_slug === "user"

  React.useEffect(() => {
    if (!pendingClaimSlug && !completedClaimSlug && stageSlug && userSlug) notFound();
  }, [pendingClaimSlug])


  return pendingClaimSlug ? (
    <PendingClaim />
  ) : completedClaimSlug ? (
    <CompletedClaim />
  ) : (
    <div>ManageClaim</div>
  )
}

export default ManageClaim