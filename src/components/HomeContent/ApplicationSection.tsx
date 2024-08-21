'use client';

import { Icon } from '@iconify-icon/react';
import { Button, Collapse, Skeleton, Tooltip, UnstyledButton } from '@mantine/core';
import clsx from 'clsx';
import * as React from 'react'
import { ApplicationData } from '.';
import { useGlobalState } from '@/hooks/useGlobalState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import useQueryString from '@/hooks/useQueryString';
import { getApplicationList } from '@/lib/service';
import { useQuery } from '@tanstack/react-query';

const ApplicationSection = ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  const { selectedApp, setSelectedApp } = useGlobalState();
  const { createQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const selected_app_param = searchParams.get('selected_app');
  const router = useRouter();
  const pathname = usePathname();
  const isManageCycle = pathname === '/manage-cycle';
  const isCycle = pathname === '/cycle';

  const { data: applicationData, isLoading: applicationIsLoading } = useQuery<{ apps_label: string; apps_name: string; }[]>({
    queryKey: ["applications"],
    queryFn: () => getApplicationList(),
  });

  return (
    <section className={clsx('px-20 py-1 bg-[var(--fc-neutral-100)]',
      'shadow-[inset_4px_4px_10px_0_rgb(203_213_225_/_0.25)]'
    )} > {/* #CBD5E140 */}
      <div className="p-4" >
        <div className={clsx("flex items-center")}>
          <h2 className='font-bold text-lg'>Applications</h2>
          &nbsp;
          {selectedApp && <span>{`(${selectedApp})`}</span>}
          <UnstyledButton className='ml-auto text-sm' onClick={toggle} color='blue'>
            <span className='flex items-center gap-2 text-[var(--fc-brand-700)]'>
              {opened ? 'Hide' : 'Unhide'}
              <Icon icon="tabler:chevron-down" width="1rem" height="1rem" rotate={opened ? 90 : 0} />
            </span>
          </UnstyledButton>
        </div>
        <Collapse in={opened}>
          <div className="flex gap-7 pt-7">
            {applicationIsLoading && (
              <>
                <Skeleton height={192} width={176} radius="md" />
                <Skeleton height={192} width={176} radius="md" />
                <Skeleton height={192} width={176} radius="md" />
                <Skeleton height={192} width={176} radius="md" />
              </>
            )}
            {!applicationIsLoading && applicationData?.map(({ apps_label, apps_name }, index) => {
              const handleAppClick = () => {
                setSelectedApp(apps_name);
                router.push(pathname + "?" + createQueryString('selected_app', apps_label))
              };
              const logoImg = "/claims_logo.svg";

              return (
                <Button
                  key={index}
                  variant='default'
                  classNames={{
                    root: apps_label != selected_app_param ? '!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none' : '!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none shadow-[var(--fc-brand-700)]/30',
                    label: 'flex flex-col items-center justify-center',
                  }}
                  onClick={handleAppClick}
                >
                  {logoImg ? <Image src={logoImg} width={opened ? 400 : 600} height={opened ? 500 : 700} className={clsx('object-cover',
                  )} alt='process illustration' /> :
                    <div className='bg-[var(--fc-brand-700)] w-32 h-32 rounded-full flex justify-center items-center font-semibold text-white text-2xl text-center'>
                      <p className='w-20 whitespace-pre-wrap'>FREE DEMO</p>
                    </div>}
                  <p className='text-wrap text-sm text-[#4F4F4F]'>{apps_name}</p>
                </Button>
              )
            })}
          </div>
        </Collapse>
      </div >
    </section >
  )
};

export default ApplicationSection;