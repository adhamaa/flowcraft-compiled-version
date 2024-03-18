'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Input, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

const InputList = [
  'Cycle name',
  'Cycle id',
  'Applications',
  'Date Created',
  'No of stage',
  'Status'
];

const GeneralForm = () => {
  const cycle_id = useSearchParams().get('cycle_id')
  const [opened, { open, close, toggle }] = useDisclosure(false);



  return opened ? (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      // closeButtonProps={{
      //   p: 'md',
      //   radius: 'md',
      //   icon: <Icon icon="solar:maximize-outline" width="1rem" height="1rem" className='text-white' />,
      //   'aria-label': 'Close modal',
      //   bg: '#895CF3',
      //   color: 'white',
      // }}
      withCloseButton={false}
    >
      <GeneralFormContent {...{ open, close, toggle }} />
    </Modal>
  ) : (
    <GeneralFormContent {...{ open, close, toggle }} />
  )
}

export default GeneralForm

const GeneralFormContent = ({ open, close, toggle }: {
  open: () => void;
  close: () => void;
  toggle: () => void;
}) => {
  const [diagramOpened, { open: diagramOpen, close: diagramClose, toggle: diagramToggle }] = useDisclosure(false);

  return (
    <React.Fragment>
      <Modal
        centered
        opened={diagramOpened}
        onClose={diagramClose}
        radius='lg'
        transitionProps={{ transition: 'fade', duration: 200 }}
        closeButtonProps={{
          icon: <Icon icon="mingcute:close-fill" width="1.2rem" height="1.2rem" className='!text-[#895CF3]' />,
        }}
        size="lg"
      >
        <Image src='/Diagram.png' width={1000} height={1000} alt='diagram' className='object-cover' />
      </Modal>
      <div className='space-y-4'>
        <div className='flex px-14 py-6 items-center'>
          <Button color='#895CF3' radius='md' classNames={{
            root: '!p-2 mr-auto'
          }} onClick={toggle}>
            <Icon icon="solar:maximize-outline" width="1rem" height="1rem" />
          </Button>
          <Button color='#895CF3' radius='md' onClick={diagramToggle}>Business Process Diagram</Button>
        </div>
        <Input.Wrapper label="Cycle name" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
        <Input.Wrapper label="Cycle id" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
        <Input.Wrapper label="Applications" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
        <Input.Wrapper label="Date Created" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
        <Input.Wrapper label="No of stage" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
        <Input.Wrapper label="Status" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
        <Input.Wrapper label="Description" classNames={{
          root: 'px-14 space-y-4',
          label: '!text-sm !font-semibold',
        }}>
          <Input disabled classNames={{
            input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
          }} />
        </Input.Wrapper>
      </div>
    </React.Fragment>
  )
};