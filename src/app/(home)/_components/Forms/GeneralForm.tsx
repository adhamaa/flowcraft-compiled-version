'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Group, Input, Modal, Radio, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { CycleData } from '../Content';
import HeaderForm from './HeaderForm';



const GeneralForm = ({ data }: { data: CycleData }) => {
  const cycle_id = useSearchParams().get('cycle_id')
  const [isEdit, setIsEdit] = React.useState(false);
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const toggleEdit = () => setIsEdit(!isEdit);

  return opened ? (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      withCloseButton={false}
    >
      <GeneralFormContent {...{ data, toggleEdit, isEdit, open, close, toggle }} />
    </Modal>
  ) : (
    <GeneralFormContent {...{ data, toggleEdit, isEdit, open, close, toggle }} />
  )
}

export default GeneralForm

const GeneralFormContent = ({
  data,
  open,
  close,
  toggleEdit,
  isEdit,
  toggle: toggleExpand
}: {
  data: CycleData;
  open: () => void;
  close: () => void;
  toggleEdit: () => void;
  isEdit: boolean;
  toggle: () => void;
}) => {
  const InputList = [
    { name: 'Cycle name', value: data.cycle_name, disabled: true },
    { name: 'Cycle id', value: data.cycle_id, disabled: true },
    { name: 'Applications', value: data.app_name, disabled: true },
    { name: 'Date Created', value: data.cycle_created, disabled: true },
    { name: 'Last edited date', value: data.cycle_updated, disabled: true },
    { name: 'No of stage', value: data.no_of_stages, disabled: true },
    { name: 'Status', value: data.cycle_active, disabled: !isEdit },
    { name: 'Description', value: data.cycle_description, disabled: !isEdit },
  ];
  const [diagramOpened, { open: diagramOpen, close: diagramClose, toggle: diagramToggle }] = useDisclosure(false);
  const [status, setStatus] = React.useState<number | string>(data?.cycle_active);

  return (
    <ScrollArea.Autosize mah={640}>
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
      <div className='space-y-4 py-4'>
        <HeaderForm type='general' {...{ toggleEdit, isEdit, toggleExpand }} />
        <div className="flex justify-end py-2 px-14">{diagramToggle && <Button color='#895CF3' radius='md' onClick={diagramToggle}>Business Process Diagram</Button>}</div>
        {InputList.map(({ name, value, disabled }, index) => ['Status'].includes(name) ? (
          <Input.Wrapper key={index} label="Status" classNames={{
            root: 'px-14 space-y-4',
            label: '!text-sm !font-semibold',
          }}>
            <Radio.Group
              name="Status"
              value={status as string}
              onChange={(value) => {
                setStatus(+value) // convert to number
              }}
            >
              <Group>
                <Radio disabled={disabled} value={1} label="Active" />
                <Radio disabled={disabled} value={0} label="Inactive" />
              </Group>
            </Radio.Group>
          </Input.Wrapper>
        ) : (
          <Input.Wrapper key={index} label={name} classNames={{
            root: 'px-14 space-y-4',
            label: '!text-sm !font-semibold',
          }}>
            <Input
              disabled={disabled}
              classNames={{
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }}
              value={value}
            />
          </Input.Wrapper>
        ))}
      </div>
    </ScrollArea.Autosize >
  )
};