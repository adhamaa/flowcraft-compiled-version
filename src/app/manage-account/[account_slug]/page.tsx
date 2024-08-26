"use client";

import { ScrollAreaAutosize } from '@mantine/core';
import { notFound, useParams, usePathname } from 'next/navigation';
import * as React from 'react'
import Profile from '../_components/Profile';
import Security from '../_components/Security';
import Activities from '../_components/Activities';

function AccountSlugPage() {
  const pathname = usePathname();
  const params = useParams();

  const isProfile = params.account_slug === 'profile';
  const isSecurity = params.account_slug === 'security';
  const isActivities = params.account_slug === 'activities';

  return (
    // <ScrollAreaAutosize>
    <div className='flex flex-col space-y-4 w-full pb-36'>
      {isProfile && (<Profile />)}
      {isSecurity && (<Security />)}
      {isActivities && (<Activities />)}
    </div>
    // </ScrollAreaAutosize>
  );
}

export default AccountSlugPage;