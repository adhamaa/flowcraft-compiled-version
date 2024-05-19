'use client';

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, CopyButton, Flex, InputWrapper, List, Modal, ScrollArea, Stack, Table, Text, Tooltip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import HeaderForm from './HeaderForm';
import { StageInfoData } from '../HomeContent';
import { FieldValues, UseFormHandleSubmit, useForm } from 'react-hook-form';
import { JsonInput, TextInput } from 'react-hook-form-mantine';
import { MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_TableBodyCellValue, MRT_TableInstance, MRT_TablePagination, MRT_ToolbarAlertBanner, MantineReactTable, flexRender, useMantineReactTable } from 'mantine-react-table';
import clsx from 'clsx';
import { evaluateSemantics, getSemanticsErrorMessages, getSyntaxErrorMessages, testSemanticStageName, testSyntaxStageName, updateStage, verifySyntax } from '@/lib/service/client';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';

type stagesData = {
  process_stage_name: string;
  created_datetime: string;
}[];

const mock_list_next_stage = [
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-01-Engineer"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-02-Manager"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-03-CEO"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-04-CTO"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-05-CFO"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-06-COO"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-07-CTO"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-08-CFO"
  },
  {
    "created_datetime": "Wed, 07 Jun 2023 06:45:16 GMT",
    "process_stage_name": "RGO-02-09-COO"
  }
]

const EditForm = ({
  data
}: {
  data: StageInfoData
}) => {
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
      <EditFormContent {...{ data, toggleEdit, isEdit, open, close, toggle }} />
    </Modal>
  ) : (
    <EditFormContent {...{ data, toggleEdit, isEdit, open, close, toggle }} />
  )
}

export default EditForm

const EditFormContent = ({
  data,
  toggleEdit,
  isEdit,
  toggle: toggleExpand
}: {
  data: StageInfoData;
  toggleEdit: () => void;
  isEdit: boolean;
  toggle: () => void;
}) => {
  const searchParams = useSearchParams();
  const stage_uuid = searchParams.get('stage_uuid');

  const InputList = [
    { name: 'process_stage_name', label: 'Stage name', value: data?.process_stage_name, disabled: !isEdit }, // this is a string
    { name: 'updated_datetime', label: 'Last edited date', value: data?.updated_datetime, disabled: true }, // this is a date string
    { name: 'list_previous', label: 'List of previous stage', value: data?.list_previous, disabled: true }, // this is a list
    { name: 'list_next_stage', label: 'List of next stage', value: mock_list_next_stage || data?.list_next_stage, disabled: true }, // this is a list
    { name: 'list_user', label: 'Users', value: data?.list_user, disabled: !isEdit }, // this is a list
    { name: 'list_pbt', label: 'PBT', value: data?.list_pbt, disabled: !isEdit }, // this is a list
    { name: 'list_role', label: 'Roles', value: data?.list_role, disabled: !isEdit },
    { name: 'list_requirement', label: 'Requirements', value: data?.list_requirement, disabled: !isEdit }, // this is a list
    { name: 'list_action', label: 'Action', value: data?.list_action, disabled: !isEdit }, // this is a list
    { name: 'list_entry_condition', label: 'Entry condition', value: data?.list_entry_condition, disabled: !isEdit },
    { name: 'list_exit_condition', label: 'Exit condition', value: data?.list_exit_condition, disabled: !isEdit }
  ];

  const { control, handleSubmit, setValue } = useForm();

  //! to SAVE the changes made to the stage and TEST the syntax of the stage name or the syntax of the JSON string
  const onSaveSubmit = async (formdata: any, e: any) => {
    const target_id = e.nativeEvent.submitter.id
    const value = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);

    const label = InputList.find((input) => input.name === target_id)?.label;

    modals.open({
      title: 'Confirm update',
      children: (
        <>
          <Text size="sm">Are you sure you want to update <strong>{label}</strong>?</Text>
          <Flex gap={16} justify={'end'} mt="md">
            <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
              Cancel
            </Button>
            <Button onClick={
              async () => {
                let syntax;
                let semantics;

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

                  semantics = await testSemanticStageName({ params: { stage_name: value } })
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
                    }).then(() => {
                      toast.success(`${label} updated successfully`);
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
                  }).then(() => {
                    toast.success(`${label} updated successfully`);
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

  //! to TEST the syntax of the stage name or the syntax of the JSON string
  const onSyntaxSubmit = async (formdata: any, e: any) => {
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

  const onSemanticSubmit = async (formdata: any, e: any) => {
    const target_id = e.target.offsetParent.id
    const str_test_semantic = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);
    if (target_id === 'process_stage_name') {
      await testSemanticStageName({ params: { stage_name: str_test_semantic } })
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
    <ScrollArea.Autosize mah={max_h_768 ? 700 : 768}>
      <form
        className={clsx('space-y-8 py-4', max_h_768 && 'pb-8')}
        onSubmit={handleSubmit(onSaveSubmit)}
      >
        <HeaderForm type='stages' {...{ toggleEdit, isEdit, toggleExpand }} />
        {InputList?.map(({ name, label, value, disabled }, index) => ['Stage name', 'Sub-stage name', 'Last edited date'].includes(label) ? (
          <InputWrapper
            key={index}
            label={label}
            classNames={{
              root: 'px-14 space-y-4',
              label: '!text-sm !font-semibold',
            }}>
            <LabelTooltip label={label} />
            <TextInput
              name={name}
              defaultValue={value}
              control={control}
              disabled={disabled}
              classNames={{
                input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }}
              rightSection={!disabled &&
                <SaveActions {...{
                  name,
                  disabled,
                  onCancel: toggleEdit
                }} />}
            />
            {!disabled && <SyntaxSemanticActions {...{
              name,
              value,
              toggleEdit,
              onSyntaxSubmit: handleSubmit(onSyntaxSubmit),
              onSemanticSubmit: handleSubmit(onSemanticSubmit)
            }} />}
          </InputWrapper>
        ) : ['List of previous stage', 'List of next stage'].includes(label) ? (
          <InputWrapper key={index} label={label} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <LabelTooltip label={label} />
            <TableStages data={value as stagesData} />
          </InputWrapper>
        ) : (
          <InputWrapper
            key={index}
            label={label}
            classNames={{
              root: 'px-14',
              label: '!text-sm !font-semibold',
            }}>
            <LabelTooltip label={label} />
            <TextareaHeader
              actionsButton={
                <SaveActions {...{
                  name,
                  copyValue: JSON.stringify(value, null, 2),
                  disabled,
                  onCancel: toggleEdit
                }} />} />
            <JsonInput
              name={name}
              defaultValue={JSON.stringify(value, null, 2)}
              control={control}
              disabled={disabled}
              formatOnBlur
              autosize
              minRows={4}
              classNames={{
                input: '!rounded-none !rounded-b-lg !h-32 p-4 w-full focus:outline-none focus:!ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }}
            />
            {!disabled && <SyntaxSemanticActions  {...{
              name,
              value,
              toggleEdit,
              onSyntaxSubmit: handleSubmit(onSyntaxSubmit),
              onSemanticSubmit: handleSubmit(onSemanticSubmit)
            }} />}
          </InputWrapper>
        ))}
      </form >
    </ScrollArea.Autosize>
  )
}

const TableStages = ({ data }: { data: stagesData; }) => {
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
      {/* <Table
        captionSide="top"
        fz="md"
        highlightOnHover
        horizontalSpacing='xl'
        verticalSpacing="xs"
        withRowBorders={false}
        m="0"
        mih={150}
        classNames={{
          table: 'bg-[#F1F4F5]',
          // thead: 'sticky bg-[#F1F4F5]/95',
          th: 'border-b border-[#E0E0E0]',
        }}
      >
        <ScrollArea.Autosize mah={150} classNames={{
          thumb: '!bg-[#BDBDBD] z-10',
        }}>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id} >
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.Header ??
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>

          {!tableData.length ? (
            <Table.Tbody>
              <Table.Tr >
                <Table.Td colSpan={2} classNames={{
                  td: 'text-center text-black/30',
                }}>
                  No Data Found
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          ) : (
            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      <MRT_TableBodyCellValue cell={cell} table={table} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          )}
        </ScrollArea.Autosize>
      </Table> */}
    </Stack>
  )
}

export const TextareaHeader = ({ table, actionsButton }: {
  table?: any;
  actionsButton?: React.ReactNode;
}) => {
  const isTable = !!table
  return (
    <div className={clsx(
      'relative flex bg-[#D9D9D9] rounded-t-lg mt-4 min-h-10',
      isTable && '-mb-4'
    )}>
      <Flex justify="space-between" align="center" classNames={{
        root: clsx('py-1 px-2 w-full', isTable && '!p-0'),
      }}>
        {isTable &&
          <MRT_TablePagination
            autoContrast
            table={table}
            color='#895CF3'
            classNames={{
              root: '',
              // control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[#895CF3] !hover:text-white/90 !hover:!border-[#895CF3] !transition-all !duration-300 !ease-in-out',
            }}
          />}
        {actionsButton}
      </Flex>
    </div >
  )
}

const SyntaxSemanticActions = ({
  name,
  onSyntaxSubmit,
  onSemanticSubmit,
}: {
  name?: string;
  onSyntaxSubmit: (formdata: any, e: any) => void;
  onSemanticSubmit: (formdata: any, e: any) => void;
}) => {

  return (
    <div className="text-right ml-auto space-x-4 mt-4" >
      <Button id={name} color='#895CF3' radius='md' className="!font-normal"
        onClick={onSyntaxSubmit as never}
      >Verify syntax</Button>
      <Button id={name} color='#895CF3' radius='md' className="!font-normal"
        onClick={onSemanticSubmit as never}>Evaluate semantics
      </Button>
    </div >
  )
};

const SaveActions = ({ name, copyValue, disabled, onCancel }: {
  name: string;
  copyValue?: string;
  disabled?: boolean;
  onCancel?: () => void;
}) => {
  return disabled ? null :
    (
      <div className={clsx(
        'flex items-center ml-auto space-x-1',
        name === 'process_stage_name' && 'absolute right-0'
      )}>
        <Tooltip label="Save">
          <ActionIcon
            id={name}
            component='button'
            type='submit'
            // disabled
            variant="transparent"
            bg="#F1F5F9"
            color='black'
            size="lg"
            radius="md"
            aria-label="Settings">
            <Icon icon="heroicons-outline:check" width="1.2rem" className='border p-2 rounded-lg text-black/70 hover:text-black/50' />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Cancel">
          <ActionIcon
            id={name}
            // disabled
            variant="transparent"
            bg="#F1F5F9"
            color='black'
            size="lg"
            radius="md"
            aria-label="Settings"
            onClick={onCancel}
          >
            <Icon icon="heroicons-outline:x" width="1.2rem" className='border p-2 rounded-lg text-black/70 hover:text-black/50' />
          </ActionIcon>
        </Tooltip>
        <div className="pl-1 flex gap-1 items-center">
          {!['process_stage_name', 'updated_datetime'].includes(name) &&
            <CopyButton value={copyValue as string} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'}>
                  <ActionIcon
                    // disabled
                    color={copied ? 'teal' : 'gray'} variant="subtle" size="lg"
                    radius="md" onClick={copy}>
                    {copied ? (
                      <Icon icon="heroicons-outline:check" width="1.2rem" height="1.2rem" className='text-black/70 hover:text-black/50' />
                    ) : (
                      <Icon icon="heroicons-outline:document-duplicate" width="1.2rem" height="1.2rem" className='text-black/70 hover:text-black/50' />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>}
          {!['process_stage_name', 'updated_datetime'].includes(name) &&
            <ActionIcon
              // disabled
              color='gray' variant="subtle" size="lg"
              radius="md">
              <Icon icon="ph:code-bold" width="1.2rem" height="1.2rem" className='text-black/70 hover:text-black/50' />
            </ActionIcon>}
        </div>
      </div>
    )

}

const LabelTooltip = ({
  onMouseEnter,
  label
}: {
  onMouseEnter?: () => void;
  label?: string;
}) => {
  return (
    <Tooltip label={label}>
      <Icon icon="mingcute:information-fill" width="0.7rem" height="0.7rem" className='mb-1 cursor-pointer text-black/80 hover:text-black/70' onMouseEnter={onMouseEnter} />
    </Tooltip>
  )
}