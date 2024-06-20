'use client';

import { Button, Flex, List, Modal, ScrollArea, ScrollAreaAutosize, Stack, Text, } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import HeaderForm from './HeaderForm';
import { StageInfoData } from '../HomeContent';
import { FormProvider, useForm } from 'react-hook-form';
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import clsx from 'clsx';
import { Apps_label, Datasource_type, evaluateSemantics, getSemanticsErrorMessages, getStageInfo, getSyntaxErrorMessages, setAuditTrail, testSemanticStageName, testSyntaxStageName, updateStage, verifySyntax } from '@/lib/service/client';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';
import InputWithOverlay from '@/components/form/InputWithOverlay';
import TextareaHeader from '@/components/form/TextareaHeader';
import { useSession } from 'next-auth/react';
import { isObjectEmpty } from '@/lib/helper';
import useEditableState from '../hooks/useEditableState';

export type stagesData = {
  process_stage_name: string;
  created_datetime: string;
}[];

const EditForm = () => {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const [data, setData] = React.useState<StageInfoData>();
  const isDataEmpty = isObjectEmpty(data as object);
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const selected_app = searchParams.get('selected_app');
  const datasource_type = searchParams.get('data_source');
  const cycle_id = params.cycle_id;
  const stage_uuid = params.stage_uuid;

  /**
  * Fetch stage info data
  */
  React.useEffect(() => {
    async function getStageInfoData() {
      const stageInfoDataRes = await getStageInfo({
        stage_uuid: stage_uuid as string,
        cycle_id: cycle_id as string,
        apps_label: selected_app as Apps_label,
        datasource_type: datasource_type as Datasource_type
      });
      setData(stageInfoDataRes)
    }

    if (cycle_id && selected_app && datasource_type && stage_uuid) {
      getStageInfoData()
    }
  }, [cycle_id, datasource_type, selected_app, stage_uuid]);

  return opened ? (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      withCloseButton={false}
    >
      <EditFormContent {...{ data, open, close, toggle }} />
    </Modal>
  ) : (
    <EditFormContent {...{ data, open, close, toggle }} />
  )
}

export default EditForm


/**
 * @description Test the syntax of the stage name or the syntax of the JSON string
 * @param formdata - form data
 * @param e - event
 * @returns {Promise<void>}
 */
export const onSyntaxSubmit = async (formdata: any, e: any) => {
  const target_id = e.target.offsetParent.id
  const str_test_syntax = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);
  if (target_id === 'process_stage_name') {
    await testSyntaxStageName({ params: { stage_name: str_test_syntax } })
      .then(async (response) => {
        if (response.error) {
          toast.error(response.message);
          await getSyntaxErrorMessages({ params: { error_message_uuid: response.uuid_error } })
            .then((errorMessages) => {
              modals.open({
                title: 'Syntax errors',
                children: (
                  <>
                    {errorMessages.map(({ error_message }: { error_message: string }, index: number) => (
                      <List key={index} type="ordered" withPadding>
                        <List.Item>{index + 1}. {error_message}</List.Item>
                      </List>
                    ))}
                    <Flex gap={16} justify={'end'} mt="md">
                      <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                        Close
                      </Button>
                    </Flex>
                  </>
                ),
                overlayProps: {
                  backgroundOpacity: 0.55,
                  blur: 10,
                },
                radius: 'md',
              })
            }).catch((error) => {
              toast.error('Failed to get error messages' + '\n' + error);
            });
        } else {
          toast.success(response.message);
        }
      }).catch((error) => {
        toast.error('Failed to test stage name' + '\n' + error);
      });
  } else {
    await verifySyntax({ body: { str_test_syntax } })
      .then(async (response) => {
        if (response.error) {
          toast.error(response.message);
          await getSyntaxErrorMessages({ params: { error_message_uuid: response.list_error_no } })
            .then((errorMessages) => {
              modals.open({
                title: 'Syntax errors',
                children: (
                  <>
                    {errorMessages.map(({ error_message }: { error_message: string }, index: number) => (
                      <List key={index} type="ordered" withPadding>
                        <List.Item>{index + 1}. {error_message}</List.Item>
                      </List>
                    ))}
                    <Flex gap={16} justify={'end'} mt="md">
                      <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                        Close
                      </Button>
                    </Flex>
                  </>
                ),
                overlayProps: {
                  backgroundOpacity: 0.55,
                  blur: 10,
                },
                radius: 'md',
              })
            }).catch((error) => {
              toast.error('Failed to get error messages' + '\n' + error);
            });
        } else {
          toast.success(response.message);
        }

      }).catch((error) => {
        toast.error('Failed to verify syntax' + '\n' + error);
      });
  }
}
/**
 * @description Test the semantics of the stage name or the semantics of the JSON string
 * @param formdata - form data
 * @param e - event
 * @returns {Promise<void>}
 */
export const onSemanticSubmit = async (formdata: any, e: any) => {
  const target_id = e.target.offsetParent.id
  const cycle_id = e.target.offsetParent.dataset.cycle_id
  const str_test_semantic = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);
  if (target_id === 'process_stage_name') {
    await testSemanticStageName({ params: { stage_name: str_test_semantic, cycle_id } })
      .then(async (response) => {
        if (response.error) {
          toast.error(response.message);
          await getSemanticsErrorMessages({ params: { error_message_uuid: response.uuid_error } })
            .then((errorMessages) => {
              modals.open({
                title: 'Semantic errors',
                children: (
                  <>
                    {errorMessages.map(({ error_message }: { error_message: string }, index: number) => (
                      <List key={index} type="ordered" withPadding>
                        <List.Item>{index + 1}. {error_message}</List.Item>
                      </List>
                    ))}
                    <Flex gap={16} justify={'end'} mt="md">
                      <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                        Close
                      </Button>
                    </Flex>
                  </>
                ),
                overlayProps: {
                  backgroundOpacity: 0.55,
                  blur: 10,
                },
                radius: 'md',
              })
            }).catch((error) => {
              toast.error('Failed to get error messages' + '\n' + error);
            });
        } else {
          toast.success(response.message);
        }
      }).catch((error) => {
        toast.error('Failed to test stage name' + '\n' + error);
      });
  } else {
    await evaluateSemantics({ body: { str_test_semantic } })
      .then(async (response) => {
        if (response.error) {
          toast.error(response.message);
          await getSemanticsErrorMessages({ params: { error_message_uuid: response.list_error_no } })
            .then((errorMessages) => {
              modals.open({
                title: 'Semantic errors',
                children: (
                  <>
                    {errorMessages.map(({ error_message }: { error_message: string }, index: number) => (
                      <List key={index} type="ordered" withPadding>
                        <List.Item>{index + 1}. {error_message}</List.Item>
                      </List>
                    ))}
                    <Flex gap={16} justify={'end'} mt="md">
                      <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                        Close
                      </Button>
                    </Flex>
                  </>
                ),
                overlayProps: {
                  backgroundOpacity: 0.55,
                  blur: 10,
                },
                radius: 'md',
              })
            }).catch((error) => {
              toast.error('Failed to get error messages' + '\n' + error);
            });
        } else {
          toast.success(response.message);
        }

      }).catch((error) => {
        toast.error('Failed to evaluate semantics' + '\n' + error);
      });
  }
};

const EditFormContent = ({ data, toggle: toggleExpand }: {
  data: StageInfoData | undefined;
  toggle: () => void;
}) => {
  const { data: session } = useSession();
  const user_id = session?.user?.user_id;
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUrl = `${pathname}?${searchParams}`;
  const stage_uuid = params.stage_uuid;
  const cycle_id = params.cycle_id;
  const datasource_type = searchParams.get('data_source');
  const isDeletedStage = pathname.includes('deleted');

  const InputList = [
    { name: 'process_stage_name', label: 'Stage name', type: 'text', value: data?.process_stage_name, disabled: false }, // this is a string
    { name: 'updated_datetime', label: 'Last edited date', type: 'text', value: data?.updated_datetime, disabled: true }, // this is a date string
    { name: 'list_previous', label: 'List of previous stage', type: null, value: data?.list_previous, disabled: true }, // this is a list
    { name: 'list_next_stage', label: 'List of next stage', type: null, value: data?.list_next_stage, disabled: true }, // this is a list
    { name: 'list_user', label: 'Users', type: 'json', value: data?.list_user, disabled: false }, // this is a list
    { name: 'list_pbt', label: 'PBT', type: 'json', value: data?.list_pbt, disabled: false }, // this is a list
    { name: 'list_role', label: 'Roles', type: 'json', value: data?.list_role, disabled: false },
    { name: 'list_requirement', label: 'Requirements', type: 'json', value: data?.list_requirement, disabled: false }, // this is a list
    { name: 'list_action', label: 'Action', type: 'json', value: data?.list_action, disabled: false }, // this is a list
    { name: 'list_entry_condition', label: 'Entry condition', type: 'json', value: data?.list_entry_condition, disabled: false },
    { name: 'list_exit_condition', label: 'Exit condition', type: 'json', value: data?.list_exit_condition, disabled: false }
  ];


  const methods = useForm();
  const { handleSubmit, setValue } = methods;
  const { isEditable, toggleIsEditable } = useEditableState();

  /**
   * @description Update the stage info
   * @param formdata - form data
   * @param e - event
   * @returns {Promise<void>}
   */
  const onSaveSubmit = async (formdata: any, e: any) => {
    const target_id = e.nativeEvent.submitter.id
    const value = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);

    const label = InputList.find((input) => input.name === target_id)?.label;

    modals.open({
      onClose: toggleIsEditable?.(target_id) as never,
      title: 'Confirm update',
      children: (
        <>
          <Text size="sm">Are you sure you want to update <strong>{label}</strong>?</Text>
          <Flex gap={16} justify={'end'} mt="md">
            <Button
              onClick={() => modals.closeAll()}
              color='#F1F5F9'
              c='#0F172A'
              radius='md'>
              Cancel
            </Button>
            <Button onClick={
              /**
               * Update the stage info
               * Test the syntax of the stage name or the syntax of the JSON string
               * Test the semantics of the stage name or the semantics of the JSON string
               * If syntax and semantics are true, update the stage info
               * otherwise display an error message
               * @returns {Promise<void>}
               */
              async () => {
                let syntax: boolean | "conditional";
                let semantics: boolean | "conditional";

                if (target_id === 'process_stage_name') {
                  syntax = await testSyntaxStageName({ params: { stage_name: value } })
                    .then((response) => {
                      if (response.error) {
                        toast.error(response.message)
                        return response.result
                      } else {
                        toast.success(response.message);
                        return response.result
                      }
                    })
                    .catch((error) => {
                      toast.error('Failed to test syntax on stage name' + '\n' + error);
                    }).finally(() => {
                      modals.closeAll();
                    });

                  semantics = await testSemanticStageName({ params: { stage_name: value, cycle_id: cycle_id as string } })
                    .then((response) => {
                      if (response.error) {
                        toast.error(response.message);
                        return response.result
                      } else {
                        toast.success(response.message);
                        return response.result
                      }
                    })
                    .catch((error) => {
                      toast.error('Failed to test semantics on stage name' + '\n' + error);
                    }).finally(() => {
                      modals.closeAll();
                    });

                  if (syntax && semantics) {
                    await updateStage({
                      stage_uuid: stage_uuid as string,
                      field_name: target_id,
                      body: { value }
                    }).then(async () => {
                      toast.success(`${label} updated successfully`);
                      await setAuditTrail({
                        action: `update_stage_info`,
                        location_url: pageUrl,
                        object: 'src/app/cycle/_components/Forms/EditForm.tsx',
                        process_state: 'TRIGGERAPI',
                        sysfunc: '"onSaveSubmit" func ',
                        userid: user_id as string,
                        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
                        notes: `stage info "${label}" updated successfully`,
                        json_object: { stage_uuid, field_name: target_id, value },
                      });
                    }).catch((error) => {
                      toast.error('Failed to update stage' + '\n' + error);
                    }).finally(() => {
                      modals.closeAll();
                    });
                  } else {
                    toast.error(`Failed to update ${label}`);
                  }

                } else {
                  syntax = await verifySyntax({ body: { str_test_syntax: value } })
                    .then(async (response) => {
                      if (response.error) {
                        toast.error(response.message);
                        return response.result
                      } else {
                        toast.success(response.message);
                        return response.result
                      }

                    }).catch((error) => {
                      toast.error('Failed to verify syntax' + '\n' + error);
                    }).finally(() => {
                      modals.closeAll();
                    });
                }

                semantics = await evaluateSemantics({ body: { str_test_semantic: value } })
                  .then(async (response) => {
                    if (response.error) {
                      toast.error(response.message);
                      return response.result
                    } else {
                      toast.success(response.message);
                      return response.result
                    }
                  }).catch((error) => {
                    toast.error('Failed to evaluate semantics' + '\n' + error);
                  }).finally(() => {
                    modals.closeAll();
                  });

                if (syntax && semantics) {
                  await updateStage({
                    stage_uuid: stage_uuid as string,
                    field_name: target_id,
                    body: { value }
                  }).then(async () => {
                    toast.success(`${label} updated successfully`);
                    await setAuditTrail({
                      action: `update_stage_info`,
                      location_url: pageUrl,
                      object: 'src/app/cycle/_components/Forms/EditForm.tsx',
                      process_state: 'TRIGGERAPI',
                      sysfunc: '"onSaveSubmit" func ',
                      userid: user_id as string,
                      sysapp: 'FLOWCRAFTBUSINESSPROCESS',
                      notes: `stage info "${label}" updated successfully`,
                      json_object: { stage_uuid, field_name: target_id, value },
                    });
                  }).catch((error) => {
                    toast.error('Failed to update stage' + '\n' + error);
                  }).finally(() => {
                    modals.closeAll();
                  });
                } else {
                  toast.error(`Failed to update ${label}`);
                }

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
    })
  }

  React.useEffect(() => {
    if (data) {
      setValue('process_stage_name', data.process_stage_name);
      setValue('updated_datetime', data.updated_datetime);
      setValue('list_previous', data.list_previous);
      setValue('list_next_stage', data.list_next_stage);
      setValue('list_user', JSON.stringify(data.list_user, null, 2));
      setValue('list_pbt', JSON.stringify(data.list_pbt, null, 2));
      setValue('list_role', JSON.stringify(data.list_role, null, 2));
      setValue('list_requirement', JSON.stringify(data.list_requirement, null, 2));
      setValue('list_action', JSON.stringify(data.list_action, null, 2));
      setValue('list_entry_condition', JSON.stringify(data.list_entry_condition, null, 2));
      setValue('list_exit_condition', JSON.stringify(data.list_exit_condition, null, 2));
    }
  }, [data, setValue])

  const max_h_768 = useMediaQuery('(max-height: 768px)');

  return (
    <ScrollAreaAutosize mah={max_h_768 ? 700 : 768}>
      <FormProvider {...methods}>
        <form
          className={clsx('space-y-4 pb-4', max_h_768 && 'pb-14')}
          onSubmit={handleSubmit(onSaveSubmit)}
        >
          <HeaderForm type='stages' {...{ toggleExpand }} />
          <div className="container mx-auto space-y-8 py-4">
            {InputList?.map((inputProps, index) => (
              <InputWithOverlay
                key={index}
                allowEdit={datasource_type === 'database' && !inputProps.disabled && !isDeletedStage}
                {...inputProps}
                isEditable={isEditable[inputProps.name]}
                toggleIsEditable={() => toggleIsEditable(inputProps.name)}
              />
            ))}
          </div>
        </form >
      </FormProvider>
    </ScrollAreaAutosize>
  )
}

export const TableStages = ({ data }: { data: stagesData; }) => {
  const [pagination, setPagination] = React.useState({
    pageSize: 5,
    pageIndex: 0,
  });
  const [tableData, setTableData] = React.useState<stagesData>([]);

  const columns: MRT_ColumnDef<stagesData[0]>[] = [
    {
      header: 'Stage Name',
      accessorFn: (originalRow) => originalRow.process_stage_name,
    },
    {
      header: 'Date created',
      accessorFn: (originalRow) => originalRow.created_datetime,
    },
  ];

  const table = useMantineReactTable({
    columns,
    data: React.useMemo(() => tableData, [tableData]),
    initialState: { density: 'xs' },
    onPaginationChange: setPagination,
    state: { pagination },
    enableSorting: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    mantineTableContainerProps: {
      mah: '150',
      px: '32',
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',

    mantinePaperProps: {
      classNames: {
        root: '!border-none !shadow-none w-full'
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      classNames: { tr: '!border-none' },
    }),
  });

  React.useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <Stack>
      <TextareaHeader {...{ table }} />
      <MantineReactTable table={table} />
    </Stack>
  )
}






