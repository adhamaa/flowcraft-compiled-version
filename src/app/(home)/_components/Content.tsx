
'use client';
import { useSideMenu } from '@/hooks/useSideMenu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AppListConst from '@/appList.json';
import { Box, Button, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Fragment } from 'react';
import { Icon } from '@iconify-icon/react';

export default function HomeContent() {
  const { layoutColSpan } = useSideMenu();
  const [opened, { toggle }] = useDisclosure(false);
  console.log('opened:', opened)

  return (
    <div
      className={cn('overflow-y-auto',
        // ' border border-dashed border-green-500',
        'w-full'
      )}>
      <section className='px-20 py-10 border'>
        <h1 className='font-bold text-xl'>Business Process Cycle</h1>
      </section>
      <section className='px-20 py-1 border bg-[#EBEAEA]'>
        <div className="p-4">
          <div className={cn("flex items-center")}>
            <h2 className='font-bold text-lg'>Appplications</h2>
            <UnstyledButton className='ml-auto text-sm' onClick={toggle} color='blue'>
              <span className='flex items-center gap-2'>
                Hide
                <Icon icon="tabler:chevron-down" width="1rem" height="1rem" rotate={opened ? 90 : 0} />
              </span>
            </UnstyledButton>
          </div>
          <ApplicationSection {...{ opened }} />
        </div>
      </section>

      <section className='flex flex-col items-center'>
        <Image src='/process-pana.svg' width={400} height={500} className='object-cover' alt='process illustration' />
        <span>Explore business process cycles by clicking on the application</span>
      </section>
    </div>
  );
}



const ApplicationSection = ({ opened }: { opened: boolean }) => {
  const listApps = AppListConst[
    'qa' as keyof typeof AppListConst
  ];

  return (
    <Collapse in={opened}>
      <div className="flex gap-7 pt-7">
        {listApps.map((app, index) => (
          <Fragment key={app.uuid}>
            <div className='shadow-lg w-44 h-48 rounded-xl flex flex-col p-4 items-center justify-center gap-2 bg-white'>
              <div className='bg-[#9747FF] w-32 h-32 rounded-full flex justify-center items-center font-semibold text-white text-2xl text-center'>
                <p className='w-20'>FREE DEMO</p>
              </div>
              <p className='truncate text-sm text-[#9747FF]'>{app.name}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </Collapse>
  )
};