'use client';

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, Flex, Group, InputWrapper, Modal, ScrollAreaAutosize, Text } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import * as React from 'react'
import { CycleData } from '../HomeContent';
import HeaderForm from './HeaderForm';
import { FormProvider, useForm } from "react-hook-form";
import { Radio, RadioGroup, TextInput } from 'react-hook-form-mantine';
import { Apps_label, Datasource_type, getCycleInfo, getStatusRefList, setAuditTrail, updateCycle, updateStatusCycle } from '@/lib/service';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';
import Diagram from '../Diagram';
import clsx from 'clsx';
import { LabelTooltip } from './LabelTooltip';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';

// function useWaitQuery(props: { cycle_id: string, apps_label: string, datasource_type: string }) {
//   const query = useSuspenseQuery({
//     queryKey: ['cycleinfo', props.cycle_id, props.apps_label, props.datasource_type],
//     queryFn: () => getCycleInfo({
//       cycle_id: props.cycle_id,
//       apps_label: props.apps_label as Apps_label,
//       datasource_type: props.datasource_type as Datasource_type
//     }),
//   })

//   return [query.data, query] as const
// }

const GeneralForm = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const selected_app = searchParams.get('selected_app');
  const datasource_type = searchParams.get('data_source');
  const cycle_id = params.cycle_id;
  const stage_uuid = params.stage_uuid;
  const { currentCycleInfo, setCycleInfo } = useWorkInProgressDiagram();
  const toggleEdit = () => setIsEdit(!isEdit);

  /**
   * Fetch cycle info data
   */
  React.useEffect(() => {
    async function getCycleInfoData() {
      const cycleInfoDataRes = await getCycleInfo({
        apps_label: selected_app as Apps_label,
        cycle_id: cycle_id as string,
        datasource_type: datasource_type as Datasource_type
      });
      setCycleInfo(cycleInfoDataRes);
    }

    if (cycle_id && selected_app && datasource_type) {
      getCycleInfoData()
    }
  }, [cycle_id, datasource_type, selected_app])

  return opened ? (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      withCloseButton={false}
    >
      <GeneralFormContent {...{ data: currentCycleInfo, toggleEdit, isEdit, open, close, toggle }} />
    </Modal>
  ) : (
    <GeneralFormContent {...{ data: currentCycleInfo, toggleEdit, isEdit, open, close, toggle }} />
  )
}

export default GeneralForm

type StatusRef = {
  code: string;
  created_datetime: string;
  descriptions: string;
  updated_datetime: string;
  uuid: string;
};

const GeneralFormContent = ({
  data,
  open,
  close,
  toggleEdit,
  isEdit,
  toggle: toggleExpand
}: {
  data: Record<string, CycleData> | undefined;
  open: () => void;
  close: () => void;
  toggleEdit: () => void;
  isEdit: boolean;
  toggle: () => void;
}) => {
  const { data: session } = useSession();
  const user_id = session?.user?.user_id;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUrl = `${pathname}?${searchParams}`;

  const cycle_id = params.cycle_id as string;
  const apps_label = searchParams.get('selected_app') as Apps_label;
  const datasource_type = searchParams.get('datasource_type') as Datasource_type;

  const InputList = [
    { name: 'cycle_name', label: 'Cycle name', type: 'text', value: data?.cycle_name, disabled: true },
    { name: "cycle_id", label: 'Cycle id', type: 'text', value: data?.cycle_id, disabled: true },
    { name: "app_name", label: 'Applications', type: 'text', value: data?.app_name, disabled: true },
    { name: "cycle_created", label: 'Date Created', type: 'text', value: data?.cycle_created, disabled: true },
    { name: "cycle_updated", label: 'Last edited date', type: 'text', value: data?.cycle_updated, disabled: true },
    { name: "no_of_stages", label: 'No of stage', type: 'text', value: data?.no_of_stages, disabled: true },
    { name: "cycle_active", label: 'Status', type: 'radio', value: data?.cycle_active, disabled: !isEdit },
    { name: "cycle_description", label: 'Description', type: 'text', value: data?.cycle_description, disabled: !isEdit },
  ];

  const [statusRefList, setStatusRefList] = React.useState<StatusRef[]>([]);

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
    const hasStatusChange = !compareStates((data?.cycle_active as unknown as number).toString(), formdata.cycle_active);
    const hasDescriptionChange = !compareStates(data?.cycle_description as unknown as string, formdata.cycle_description);
    modals.open({
      title: 'Confirm update',
      children: (
        <>
          <Text size="sm">Are you sure you want to update <strong>Cycle status & description</strong>?</Text>
          <Flex gap={16} justify={'end'} mt="md">
            <Button onClick={() => modals.closeAll()} color='var(--fc-neutral-100)' c='var(--fc-neutral-900)' radius='md'>
              Cancel
            </Button>
            <Button onClick={
              async () => {

                if (!hasStatusChange && !hasDescriptionChange) {
                  toast.error('No changes detected');
                  modals.closeAll();
                  toggleEdit();
                } else if (hasStatusChange || hasDescriptionChange) {
                  try {
                    const response = await Promise.all([
                      updateStatusCycle({
                        cycle_id: data?.cycle_id.toString() as string,
                        status_code: formdata.cycle_active
                      }),
                      updateCycle({
                        cycle_uuid: data?.cycle_uuid as unknown as string,
                        body: {
                          cycle_description: formdata.cycle_description
                        }
                      })
                    ]);

                    const statusResponseOk = !response[0].error;
                    const descriptionResponseOk = !response[1].error;
                    const statusMessage = response[0].message;
                    const descriptionMessage = response[1].message;
                    if (statusResponseOk && descriptionResponseOk) {

                      toast.success(message`${statusMessage} ${descriptionMessage}`);
                      modals.closeAll();
                      toggleEdit();
                      await setAuditTrail({
                        action: 'update_cycle_info',
                        location_url: pageUrl,
                        object: 'src/app/cycle/_components/Forms/GeneralForm.tsx',
                        process_state: 'TRIGGERAPI',
                        sysfunc: '"onSubmit" func ',
                        userid: user_id as string,
                        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
                        notes: `Cycle and description updated successfully`,
                        json_object: formdata,
                      });
                      window.location.reload();
                    } else if (statusResponseOk) {
                      toast.success(statusMessage);
                      modals.closeAll();
                      toggleEdit();
                      await setAuditTrail({
                        action: 'update_cycle_info',
                        location_url: pageUrl,
                        object: 'src/app/cycle/_components/Forms/GeneralForm.tsx',
                        process_state: 'TRIGGERAPI',
                        sysfunc: '"onSubmit" func ',
                        userid: user_id as string,
                        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
                        notes: `Cycle and description updated successfully`,
                        json_object: formdata,
                      });
                      window.location.reload();
                    } else if (descriptionResponseOk) {
                      toast.success(descriptionMessage);
                      modals.closeAll();
                      toggleEdit();
                      await setAuditTrail({
                        action: 'update_cycle_info',
                        location_url: pageUrl,
                        object: 'src/app/cycle/_components/Forms/GeneralForm.tsx',
                        process_state: 'TRIGGERAPI',
                        sysfunc: '"onSubmit" func ',
                        userid: user_id as string,
                        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
                        notes: `Cycle and description updated successfully`,
                        json_object: formdata,
                      });
                      window.location.reload();
                    } else {
                      toast.error('Failed to update cycle and description');
                      modals.closeAll();
                      toggleEdit();
                    }
                  } catch (error) {
                    toast.error('Failed to update cycle and description' + "\n" + error);
                  }
                } else {
                  toast.error('Failed to update cycle and description');
                  modals.closeAll();
                  toggleEdit();
                }
              }
            } color='var(--fc-brand-700)' radius='md'>
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
    async function getStatusList() {
      const statusRefListRes = await getStatusRefList();
      setStatusRefList(statusRefListRes);
    }

    getStatusList();
  }, [])

  const max_h_768 = useMediaQuery('(max-height: 768px)');

  return (
    <FormProvider {...methods}>
      <form
        className={clsx('space-y-4 w-full')}
        onSubmit={handleSubmit(onSubmit)}
        onError={(e) => console.log(e)}
      >
        <HeaderForm type='general' {...{ toggleEdit, isEdit, toggleExpand }} />

        <ScrollAreaAutosize className='h-[calc(100vh-231.5px)]'>
          <div className="container mx-auto space-y-8 pt-4 pb-10">
            <DiagramBar />
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
                      {statusRefList?.map((status: StatusRef) => (
                        <Radio.Item
                          key={status.uuid}
                          disabled={disabled}
                          value={status.code}
                          label={<span className='capitalize'>{status.descriptions}</span>} />
                      ))}
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
        </ScrollAreaAutosize >
      </form>
    </FormProvider>
  )
};

function message(strings: TemplateStringsArray, ...values: any[]) {
  const status = values[0];
  const description = values[1];

  return `${status} \n ${description}`
};

function compareStates(prevStates: string, currStates: string) {
  if (currStates === prevStates) {
    return true
  } else {
    return false
  }
};


function DiagramBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const datasource_type = searchParams.get('data_source') as Datasource_type;
  const canDisplay = datasource_type === 'database';

  return canDisplay && (
    <div className="flex justify-end py-2 px-14">
      <ActionIcon
        disabled
        variant="filled"
        color="var(--fc-brand-700)" size="lg"
        radius="md" aria-label="Settings" mr="auto"
        onClick={() => router.refresh()}
      >
        <Icon className='rounded' icon="heroicons-outline:refresh" width="1rem" height="1rem" />
      </ActionIcon>
      <Diagram />
    </div>
  )

}