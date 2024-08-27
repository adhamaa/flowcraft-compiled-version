"use client";

import HeaderForm from '@/app/cycle/_components/Forms/HeaderForm';

import { getActivityLog } from '@/lib/service';
import { Flex, LoadingOverlay, ScrollAreaAutosize, Text, Timeline, TimelineItem } from '@mantine/core';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import * as React from 'react'

import { useInfiniteQuery } from '@tanstack/react-query';

import { getTimeAgo } from '@/lib/helper';
import { useInView } from 'framer-motion';

// Define the structure of each item in the InputList
type InputItem = {
  name: string;
  label: string;
  type: string;
  value?: any;
  disabled: boolean;
};

const Activities = ({ data = {} }: { data?: any; }) => {
  const loadMoreRef = React.useRef(null)
  const isInView = useInView(loadMoreRef);
  const { data: session } = useSession();

  const user_id = session?.user?.user_id;


  const infiniteTimelineQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['activityLogs', user_id],
    queryFn: ({ pageParam }) => getActivityLog({
      user_id: user_id as string,
      per_page: 10,
      page: pageParam
    }),
    enabled: !!user_id,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page === lastPage.total_pages) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, _, firstPageParam) => {
      if (firstPage.page <= 0) {
        return undefined
      }
      return firstPageParam - 1
    },
  })

  const { data: timelineData, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = infiniteTimelineQuery || {};

  React.useEffect(() => {
    if (isInView) {
      fetchNextPage()
    }
  }, [fetchNextPage, isInView])

  return (
    <div>
      <div
        className={clsx('space-y-4 w-full')}
      >
        <HeaderForm type='profile' {...{ toggleExpand: () => { } }} />
        <div
          className="flex">
          <ScrollAreaAutosize className='flex-1 h-[calc(100vh-341.5px)]'>
            <div className="mx-auto space-y-8 p-14">
              <Timeline bulletSize={24} lineWidth={2}>
                {timelineData?.pages.map((page) => {
                  return (
                    <React.Fragment key={page.page}>
                      {page.data.map((item: {
                        action: string;
                        notes: string;
                        updated_datetime: string;
                      }, index: React.Key) => (
                        <TimelineItem key={index} bullet title={item.action} classNames={{
                          itemBullet: clsx('border-[#FFF] border-4', getRandomColor()),
                          item: 'h-40',
                        }}>
                          <Flex align="center">
                            <Text c="dimmed" size="sm">{item.notes}</Text>
                            <Text size="xs" mt={4} ml="auto">{getTimeAgo(item.updated_datetime)}</Text>
                          </Flex>
                        </TimelineItem>
                      ))}
                    </React.Fragment>
                  )
                })}
              </Timeline>
              <button
                ref={loadMoreRef}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className={clsx(!hasNextPage && "hidden")}
              >
                {(isFetchingNextPage || (isFetching && !isFetchingNextPage)) && <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'var(--fc-brand-700)', type: 'oval' }} />}
              </button>
            </div>
          </ScrollAreaAutosize >
        </div>
      </div>
    </div>
  )
}

export default Activities;

export function getRandomColor(): string {
  const colors: string[] = ['bg-fc-status-teal-400', 'bg-fc-status-amber-400', 'bg-fc-status-rose-400'];
  const randomIndex: number = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
