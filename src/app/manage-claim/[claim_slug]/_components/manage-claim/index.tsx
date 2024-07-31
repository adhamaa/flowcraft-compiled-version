"use client";

import * as React from 'react'
import PendingClaim from './pending-claims';
import { notFound, useParams } from 'next/navigation';


function ManageClaim() {
  const params = useParams();

  const pendingClaimSlug = params.claim_slug === "pending-claim"
  const completedClaimSlug = params.claim_slug === "completed-claim"

  React.useEffect(() => {
    if (!pendingClaimSlug && !completedClaimSlug) notFound();
  }, [pendingClaimSlug])


  return pendingClaimSlug ? (
    <PendingClaim />
  ) : (null)
}

export default ManageClaim