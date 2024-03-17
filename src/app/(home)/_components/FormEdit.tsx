'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Input } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

const FormEdit = () => {
  const cycle_id = useSearchParams().get('cycle_id')
  return (
    <div className='space-y-4 w-fullh-full'>
      <div className='flex px-14 py-6 items-center'>
        <Button color='#895CF3' radius='md' classNames={{
          root: '!p-2 mr-auto'
        }}>
          <Icon icon="solar:maximize-outline" width="1rem" height="1rem" />
        </Button>
        <Button color='#895CF3' radius='md'>Business Process Diagram</Button>
      </div>
      <Input.Wrapper label="Cycle name" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
      <Input.Wrapper label="Cycle id" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
      <Input.Wrapper label="Applications" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
      <Input.Wrapper label="Date Created" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
      <Input.Wrapper label="No of stage" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
      <Input.Wrapper label="Status" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
      <Input.Wrapper label="Description" classNames={{
        root: 'px-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}>
        <Input disabled classNames={{
          input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5]',
        }} />
      </Input.Wrapper>
    </div>
  )
}

export default FormEdit