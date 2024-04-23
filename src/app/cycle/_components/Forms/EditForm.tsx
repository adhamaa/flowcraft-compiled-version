'use client';
import { Icon } from '@iconify-icon/react';
import { Button, Flex, Input, List, Modal, ScrollArea, Stack, Table, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import HeaderForm from './HeaderForm';
import { StageInfoData } from '../HomeContent';
import { FieldValues, UseFormHandleSubmit, useForm } from 'react-hook-form';
import { JsonInput, TextInput } from 'react-hook-form-mantine';
import { MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_TableBodyCellValue, MRT_TableInstance, MRT_TablePagination, MRT_ToolbarAlertBanner, flexRender, useMantineReactTable } from 'mantine-react-table';
import clsx from 'clsx';
import { evaluateSemantics, getErrorMessages, testStageName, updateStage, verifySyntax } from '@/lib/service/client';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';

type stagesData = {
  process_stage_name: string;
  created_datetime: string;
}[];


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
    { name: 'list_next_stage', label: 'List of next stage', value: data?.list_next_stage, disabled: true }, // this is a list
    { name: 'list_user', label: 'Users', value: data?.list_user, disabled: !isEdit }, // this is a list
    { name: 'list_pbt', label: 'PBT', value: data?.list_pbt, disabled: !isEdit }, // this is a list
    { name: 'list_role', label: 'Roles', value: data?.list_role, disabled: !isEdit },
    { name: 'list_requirement', label: 'Requirements', value: data?.list_requirement, disabled: !isEdit }, // this is a list
    { name: 'list_action', label: 'Action', value: data?.list_action, disabled: !isEdit }, // this is a list
    { name: 'list_entry_condition', label: 'Entry condition', value: data?.list_entry_condition, disabled: !isEdit },
    { name: 'list_exit_condition', label: 'Exit condition', value: data?.list_exit_condition, disabled: !isEdit }
  ];

  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = async (formdata: any, e: any) => {
    const target_id = e.nativeEvent.submitter.id
    const value = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);

    const stage_name = InputList.find((input) => input.name === target_id)?.label;

    await updateStage({
      stage_uuid: stage_uuid as string,
      field_name: target_id,
      body: { value }
    }).then(() => {
      console.log(`${stage_name} updated successfully`);
      toast.success(`${stage_name} updated successfully`);
    }).catch((error) => {
      console.log('Failed to update stage', error);
      toast.error('Failed to update stage' + '\n' + error);
    });
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

  return (
    <ScrollArea.Autosize mah={768}>
      <form
        className='space-y-4 py-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeaderForm type='edit' {...{ toggleEdit, isEdit, toggleExpand }} />
        {InputList?.map(({ name, label, value, disabled }, index) => ['Stage name', 'Sub-stage name', 'Last edited date'].includes(label) ? (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <LabelTooltip label={label} />
            <TextInput
              name={name}
              defaultValue={value}
              control={control}
              disabled={disabled}
              classNames={{
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }} />
            {!disabled && <ActionButtons {...{ name, value, toggleEdit, handleSubmit }} />}
          </Input.Wrapper>
        ) : ['List of previous stage', 'List of next stage'].includes(label) ? (
          <Input.Wrapper key={index} label={label} classNames={{
            root: 'px-14',
            label: '!text-sm !font-semibold',
          }}>
            <LabelTooltip label={label} />
            <TableStages data={value as stagesData} />
          </Input.Wrapper>
        ) : (
          <Input.Wrapper
            key={index}
            label={label}
            classNames={{
              root: 'px-14',
              label: '!text-sm !font-semibold',
            }}>
            <LabelTooltip label={label} />
            <TextareaHeader />
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
            {!disabled && <ActionButtons  {...{ name, value, toggleEdit, handleSubmit }} />}
          </Input.Wrapper>
        ))}
      </form >
    </ScrollArea.Autosize>
  )
}

const TableStages = ({ data }: { data: stagesData; }) => {
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
    // initialState: {
    //   pagination: { pageSize: 5, pageIndex: 0 },
    // },
    // enableStickyHeader: true,
    // mantineTableContainerProps: {
    //   mah: '40'
    // },
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '15'],
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',
  });

  React.useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <Stack>
      <TextareaHeader isTable {...{ table }} />
      <Table
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
      </Table>
    </Stack>
  )
}

export const TextareaHeader = ({ isTable, table }: {
  isTable?: boolean;
  table?: any;
}) => (
  <div className={clsx('flex bg-[#D9D9D9] rounded-t-lg mt-4 min-h-10', isTable && ' -mb-4')}>
    <Flex justify="space-between" align="center" classNames={{
      root: 'py-1 px-2 pr-4 w-full',
    }}>
      {isTable && <MRT_TablePagination table={table} classNames={{
        root: '',
        control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[#895CF3] !hover:text-white/90 !hover:!border-[#895CF3] !transition-all !duration-300 !ease-in-out',
      }} />}
      {!isTable && <Icon icon="ph:code-bold" width="1.2rem" height="1.2rem" className='ml-auto cursor-pointer text-black/70 hover:text-black/50' />}
    </Flex>
  </div >
)

const ActionButtons = ({
  name,
  value,
  toggleEdit,
  handleSubmit
}: {
  name?: string;
  value?: string | string[] | number | boolean | undefined | null | any[] | Record<string, any> | Record<string, any>[];
  toggleEdit: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
}) => {
  const onSubmit = async (formdata: any, e: any) => {
    const target_id = e.target.offsetParent.id
    const str_test_syntax = target_id === 'process_stage_name' ? formdata[target_id] : JSON.parse(formdata[target_id]);
    if (target_id === 'process_stage_name') {
      await testStageName({ params: { stage_name: str_test_syntax } }).then((response) => {
        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
      }).catch((error) => {
        console.log('Failed to test stage name', error);
        toast.error('Failed to test stage name' + '\n' + error);
      });
    } else {
      await verifySyntax({ body: { str_test_syntax } }).then(async (response) => {
        if (response.error) {
          toast.error(response.message);
          await getErrorMessages({ body: { list_error_no: response.list_error_no } }).then((errorMessages) => {
            modals.open({
              title: 'Syntax errors',
              children: (
                <>
                  {errorMessages.map(({ error_message }: { error_message: string }, index: React.Key | null | undefined) => (
                    <List key={index} type="ordered" withPadding>
                      <List.Item>{error_message}</List.Item>
                    </List>
                  ))}
                  <Flex gap={16} justify={'end'} mt="md">
                    <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                      Close
                    </Button>
                    {/* <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
                  Cancel
                </Button>
                <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                  Save
                </Button> */}
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
            console.log('Failed to get error messages', error);
            toast.error('Failed to get error messages' + '\n' + error);
          });
        } else {
          toast.success(response.message);
        }

      }).catch((error) => {
        console.log('Failed to verify syntax', error);
        toast.error('Failed to verify syntax' + '\n' + error);
      });
    }
  }
  return (

    <div className="text-right ml-auto space-x-4 mt-4" >
      <Button color='#DC3545' radius='md' className="!font-normal" onClick={toggleEdit}>Cancel</Button>
      <Button key={name} id={name} type='submit' color='#28A745' radius='md' className="!font-normal"
      >Save</Button>
      <Button key={name} id={name} color='#1C1454' radius='md' className="!font-normal"
        onClick={handleSubmit(onSubmit)}
      >Verify syntax</Button>
      <Button color='#FF6347' radius='md' className="!font-normal" onClick={() => evaluateSemantics().then((text) => modals.open({
        title: 'Semantics errors',
        children: (
          <>
            <Text size="sm">{text}</Text>
            <Flex gap={16} justify={'end'} mt="md">
              <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
                Close
              </Button>
              {/* <Button onClick={() => modals.closeAll()} color='#F1F5F9' c='#0F172A' radius='md'>
              Cancel
            </Button>
            <Button onClick={() => modals.closeAll()} color='#895CF3' radius='md'>
              Save
            </Button> */}
            </Flex>
          </>
        ),
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 10,
        },
        radius: 'md',
      }))
      }>Evaluate semantics
      </Button>
    </div >

  )
};

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