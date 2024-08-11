"use client";

import HeaderForm from '@/app/cycle/_components/Forms/HeaderForm';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import toast from '@/components/toast';
import { Button, Flex, Group, InputWrapper, ScrollAreaAutosize, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Radio, RadioGroup, TextInput } from 'react-hook-form-mantine';

const Profile = ({ data = {} }: { data?: any; }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const toggleEdit = () => setIsEdit(!isEdit);

  const { data: session } = useSession();
  const user_id = session?.user?.user_id;
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUrl = `${pathname}?${searchParams}`;


  const InputList = [
    { name: 'user_id', label: 'User ID', type: 'text', value: data?.cycle_name, disabled: true },
    { name: "full_name", label: 'Full Name', type: 'text', value: data?.cycle_id, disabled: true },
    { name: "role", label: 'Role', type: 'text', value: data?.app_name, disabled: true },
    { name: "email", label: 'Email', type: 'text', value: data?.cycle_created, disabled: true },
    { name: "mobile_no", label: 'Mobile Number', type: 'text', value: data?.cycle_updated, disabled: true },
  ];

  // const [statusRefList, setStatusRefList] = React.useState<StatusRef[]>([]);

  const methods = useForm({
    defaultValues: {
      cycle_active: '',
      cycle_description: '',
      cycle_id: '',
      app_name: '',
      cycle_updated: '',
      no_of_stages: '',
      cycle_name: '',
    },
    values: {
      cycle_active: data?.cycle_active,
      cycle_description: data?.cycle_description,
      cycle_id: data?.cycle_id,
      app_name: data?.app_name,
      cycle_updated: data?.cycle_updated,
      no_of_stages: data?.no_of_stages,
      cycle_name: data?.cycle_name,
    }
  });
  const { control, handleSubmit, setValue } = methods;

  const onSubmit = async (formdata: any) => {
    console.log('formdata:', formdata)
    // const hasStatusChange = !compareStates((data?.cycle_active as unknown as number).toString(), formdata.cycle_active);
    // const hasDescriptionChange = !compareStates(data?.cycle_description as unknown as string, formdata.cycle_description);
    // modals.open({
    //   title: 'Confirm update',
    //   children: (
    //     <>
    //       <Text size="sm">Are you sure you want to update <strong>Cycle status & description</strong>?</Text>
    //       <Flex gap={16} justify={'end'} mt="md">
    //         <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
    //           Cancel
    //         </Button>
    //         <Button onClick={
    //           async () => {

    //             if (!hasStatusChange && !hasDescriptionChange) {
    //               toast.error('No changes detected');
    //               modals.closeAll();
    //               toggleEdit();
    //             } else if (hasStatusChange || hasDescriptionChange) {
    //               try {
    //                 const response = await Promise.all([
    //                   updateStatusCycle({
    //                     cycle_id: data?.cycle_id.toString() as string,
    //                     status_code: formdata.cycle_active
    //                   }),
    //                   updateCycle({
    //                     cycle_uuid: data?.cycle_uuid as unknown as string,
    //                     body: {
    //                       cycle_description: formdata.cycle_description
    //                     }
    //                   })
    //                 ]);

    //                 const statusResponseOk = !response[0].error;
    //                 const descriptionResponseOk = !response[1].error;
    //                 const statusMessage = response[0].message;
    //                 const descriptionMessage = response[1].message;
    //                 if (statusResponseOk && descriptionResponseOk) {

    //                   toast.success(message`${statusMessage} ${descriptionMessage}`);
    //                   modals.closeAll();
    //                   toggleEdit();
    //                   await setAuditTrail({
    //                     action: 'update_cycle_info',
    //                     location_url: pageUrl,
    //                     object: 'src/app/cycle/_components/Forms/GeneralForm.tsx',
    //                     process_state: 'TRIGGERAPI',
    //                     sysfunc: '"onSubmit" func ',
    //                     userid: user_id as string,
    //                     sysapp: 'FLOWCRAFTBUSINESSPROCESS',
    //                     notes: `Cycle and description updated successfully`,
    //                     json_object: formdata,
    //                   });
    //                   window.location.reload();
    //                 } else if (statusResponseOk) {
    //                   toast.success(statusMessage);
    //                   modals.closeAll();
    //                   toggleEdit();
    //                   await setAuditTrail({
    //                     action: 'update_cycle_info',
    //                     location_url: pageUrl,
    //                     object: 'src/app/cycle/_components/Forms/GeneralForm.tsx',
    //                     process_state: 'TRIGGERAPI',
    //                     sysfunc: '"onSubmit" func ',
    //                     userid: user_id as string,
    //                     sysapp: 'FLOWCRAFTBUSINESSPROCESS',
    //                     notes: `Cycle and description updated successfully`,
    //                     json_object: formdata,
    //                   });
    //                   window.location.reload();
    //                 } else if (descriptionResponseOk) {
    //                   toast.success(descriptionMessage);
    //                   modals.closeAll();
    //                   toggleEdit();
    //                   await setAuditTrail({
    //                     action: 'update_cycle_info',
    //                     location_url: pageUrl,
    //                     object: 'src/app/cycle/_components/Forms/GeneralForm.tsx',
    //                     process_state: 'TRIGGERAPI',
    //                     sysfunc: '"onSubmit" func ',
    //                     userid: user_id as string,
    //                     sysapp: 'FLOWCRAFTBUSINESSPROCESS',
    //                     notes: `Cycle and description updated successfully`,
    //                     json_object: formdata,
    //                   });
    //                   window.location.reload();
    //                 } else {
    //                   toast.error('Failed to update cycle and description');
    //                   modals.closeAll();
    //                   toggleEdit();
    //                 }
    //               } catch (error) {
    //                 toast.error('Failed to update cycle and description' + "\n" + error);
    //               }
    //             } else {
    //               toast.error('Failed to update cycle and description');
    //               modals.closeAll();
    //               toggleEdit();
    //             }
    //           }
    //         } color='var(--fc-brand-700)' radius='md'>
    //           Yes
    //         </Button>
    //       </Flex>
    //     </>
    //   ),
    //   overlayProps: {
    //     backgroundOpacity: 0.55,
    //     blur: 10,
    //   },
    //   radius: 'md',
    // });
  }

  return (
    <ScrollAreaAutosize >
      <FormProvider {...methods}>
        <form
          className={clsx('space-y-4 h-[calc(100vh-146.5px)] w-full')}
          onSubmit={handleSubmit(onSubmit)}
        >
          <HeaderForm type='profile' {...{ toggleEdit, isEdit, toggleExpand: () => { } }} />

          <div className="container mx-auto space-y-8 py-4">
            {InputList?.map(({ label, name, type, value, disabled }, index) => {
              return ['Status'].includes(label) ? (
                <InputWrapper
                  key={index}
                  label={label}
                  classNames={{
                    root: 'px-14 space-y-4',
                    label: '!text-sm !font-semibold',
                  }}>
                  <LabelTooltip label={label} />
                  <RadioGroup
                    name={name as 'cycle_active' | 'cycle_description' | 'cycle_id' | 'app_name' | 'cycle_updated' | 'no_of_stages' | 'cycle_name'}
                    control={control}
                    defaultValue={value?.toString()}
                  >
                    <Group>
                      {/* {statusRefList?.map((status: StatusRef) => (
                        <Radio.Item
                          key={status.uuid}
                          disabled={disabled}
                          value={status.code}
                          label={<span className='capitalize'>{status.descriptions}</span>} />
                      ))} */}
                    </Group>
                  </RadioGroup>
                </InputWrapper>
              ) : (
                <InputWrapper key={index} label={label} classNames={{
                  root: 'px-14 space-y-4',
                  label: '!text-sm !font-semibold',
                }}>
                  <LabelTooltip label={label} />
                  <TextInput
                    name={name as 'cycle_active' | 'cycle_description' | 'cycle_id' | 'app_name' | 'cycle_updated' | 'no_of_stages' | 'cycle_name'}
                    defaultValue={value}
                    control={control}
                    disabled={disabled}
                    classNames={{
                      input: '!rounded-lg p-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                    }} />
                </InputWrapper>
              )
            })}

          </div>
        </form>
      </FormProvider>
    </ScrollAreaAutosize >
  )
}

export default Profile