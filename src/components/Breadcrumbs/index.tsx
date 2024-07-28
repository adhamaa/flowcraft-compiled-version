"use client";

import useBreadcrumbs, { Breadcrumb } from '@/hooks/useBreadcrumbs';
import { Icon } from '@iconify-icon/react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import clsx from 'clsx';


function Breadcrumbs({ className }: { className?: string }) {
  const { breadcrumbs: items } = useBreadcrumbs();
  
  return (
    <div className={clsx('flex border-b-2 border-[#EBEAEA] items-center col-span-full p-6 gap-4 w-screen', className)}>
      <MantineBreadcrumbs
        separator={
          <Icon icon="tabler:chevron-right" width="1.2rem" />
        }
        separatorMargin="md"
        mt="xs"
      >
        {items.map((item, index) => (
          <Anchor
            key={index}
            href={item.href}
            
            c="#0F172A"
            size='lg'
          >
            {item.icon ? <Icon icon={item.icon as string}></Icon> : item.title}
          </Anchor>
        ))}
      </MantineBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;