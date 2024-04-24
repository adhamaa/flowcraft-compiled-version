'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Flex, Group, Input, Modal, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import * as React from 'react'
import { CycleData } from '../HomeContent';
import HeaderForm from './HeaderForm';
import { useForm } from "react-hook-form";
import { Radio, TextInput } from 'react-hook-form-mantine';
import { updateCycle } from '@/lib/service/client';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';


const GeneralForm = ({ data }: { data: CycleData }) => {
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
    { name: 'cycle_name', label: 'Cycle name', value: data?.cycle_name, disabled: true },
    { name: "cycle_id", label: 'Cycle id', value: data?.cycle_id, disabled: true },
    { name: "app_name", label: 'Applications', value: data?.app_name, disabled: true },
    { name: "cycle_created", label: 'Date Created', value: data?.cycle_created, disabled: true },
    { name: "cycle_updated", label: 'Last edited date', value: data?.cycle_updated, disabled: true },
    { name: "no_of_stages", label: 'No of stage', value: data?.no_of_stages, disabled: true },
    { name: "cycle_active", label: 'Status', value: data?.cycle_active, disabled: !isEdit },
    { name: "cycle_description", label: 'Description', value: data?.cycle_description, disabled: !isEdit },
  ];

  const [diagramOpened, { open: diagramOpen, close: diagramClose, toggle: diagramToggle }] = useDisclosure(false);
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = async (formdata: any) => {
    const hasStatusChange = !compareStates((data.cycle_active).toString(), formdata.cycle_active);
    const hasDescriptionChange = !compareStates(data.cycle_description, formdata.cycle_description);
    modals.open({
      title: 'Confirm update',
      children: (
        <>
          <Text size="sm">Are you sure you want to update <strong>Cycle status & description</strong>?</Text>
          <Flex gap={16} justify={'end'} mt="md">
            <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
              Cancel
            </Button>
            <Button onClick={
              async () => {
                await updateCycle({
                  cycle_uuid: data.cycle_uuid,
                  body: {
                    cycle_active: formdata.cycle_active,
                    cycle_description: formdata.cycle_description
                  }
                }).then(() => {
                  toast.success(message`Cycle ${compareStates((data.cycle_active).toString(), formdata.cycle_active)} and ${compareStates(data.cycle_description, formdata.cycle_description)} updated successfully`);
                }).catch((error) => {
                  toast.error('Failed to update cycle' + "\n" + error);
                }).finally(() => {
                  modals.closeAll();
                  toggleEdit()
                });

              }} color='#895CF3' radius='md'>
              Yes
            </Button>
          </Flex>
        </>
      ),
      overlayProps: {
        backgroundOpacity: 0.55,
        blur: 10,
      },
      radius: 'md',
    });

  }

  React.useEffect(() => {
    if (data) {
      setValue('cycle_active', data.cycle_active);
      setValue('cycle_description', data.cycle_description);
      setValue('cycle_id', data.cycle_id);
      setValue('app_name', data.app_name);
      setValue('cycle_updated', data.cycle_updated);
      setValue('no_of_stages', data.no_of_stages);
      setValue('cycle_name', data.cycle_name);

    }
  }, [data, setValue])


  return (
    <ScrollArea.Autosize mah={768}>
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
      <form
        className='space-y-4 py-4'
        onSubmit={handleSubmit(onSubmit)}
        onError={(e) => console.log(e)}
      >
        {/* <Button color='#895CF3' radius='md' onClick={diagramToggle}>Business Process Diagram</Button> */}
        <HeaderForm type='general' {...{ toggleEdit, isEdit, toggleExpand }} />
        <div className="flex justify-end py-2 px-14">{diagramToggle &&
          <Button
            // disabled
            variant='filled'
            color='#F1F5F9'
            c='#0F172A'
            radius='md'
            size="sm"
            fz={14}
            onClick={diagramToggle}
            classNames={{
              root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
            }}
          >
            Business Process Diagram
          </Button>
        }</div>

        {InputList?.map(({ name, label, value, disabled }, index) => ['Status'].includes(label) ? (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14 space-y-4',
            label: '!text-sm !font-semibold',
          }}>
            <Radio.Group
              name={name}
              control={control}
              defaultValue={value?.toString()}
            >
              <Group>
                <Radio.Item disabled={disabled} value="1" label="Active" />
                <Radio.Item disabled={disabled} value="0" label="Inactive" />
              </Group>
            </Radio.Group>
          </Input.Wrapper>
        ) : (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14 space-y-4',
            label: '!text-sm !font-semibold',
          }}>
            <TextInput
              name={name}
              defaultValue={value}
              control={control}
              disabled={disabled}
              classNames={{
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }} />
          </Input.Wrapper>
        ))}
      </form>
    </ScrollArea.Autosize >
  )
};

// function to compare the status and description and return appropriate message
function message(strings: TemplateStringsArray, ...values: any[]) {
  // let dict = values[values.length - 1] || {};
  // let result = [strings[0]];
  // keys.forEach(function (key, i) {
  //   let value = Number.isInteger(key) ? values[key] : dict[key];
  //   result.push(value, strings[i + 1]);
  // });
  // return result.join('');
  const status = values[0];
  const description = values[1];

  const cycle = strings[0];
  const and = strings[1];
  const updatedSuccessfully = strings[2];

  return `${cycle} status ${and} description ${updatedSuccessfully}`
};

function compareStates(prevStates: string, currStates: string) {
  if (currStates === prevStates) {
    return true
  } else {
    return false
  }
};
