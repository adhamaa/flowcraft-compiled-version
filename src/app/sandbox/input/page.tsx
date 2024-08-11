'use client';

import InputWithOverlay from '@/components/form/InputWithOverlay';
import useEditableState from '@/hooks/useEditableState';
import { Button, Group, LoadingOverlay, Stack } from '@mantine/core';
import clsx from 'clsx';
import * as React from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form';
import { MultiSelect, Select } from 'react-hook-form-mantine';

function InputPagesTesting() {


  return (
    <div className='p-10 container max-w-screen-lg m-auto space-y-4'>
      <FormOverlayWithProvider />
      <div className="flex flex-auto space-x-4 w-full">
        <FormWithProvider />
        <FormWithControl />
      </div>
    </div >
  )
}

export default InputPagesTesting

const FormOverlayWithProvider = () => {
  const [visible, setVisible] = React.useState(false);
  const { isEditable, toggleIsEditable } = useEditableState();

  const method = useForm();
  const { handleSubmit, reset } = method;

  const onSubmit = (data: any, e: any) => {
    const target_id = e.nativeEvent.submitter.id
    console.log({ [target_id]: data[target_id] });
    toggleIsEditable(target_id);
  }

  const InputList = [
    {
      name: 'username',
      label: 'Username',
      defaultValue: 'adhamaa',
      type: 'text',
      disabled: false,
      isEditable: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    },
    {
      name: 'email',
      label: 'Email',
      defaultValue: '',
      type: 'email',
      disabled: false,
      isEditable: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    },
    {
      name: 'password',
      label: 'password',
      defaultValue: '',
      type: 'password',
      disabled: false,
      isEditable: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    },
    {
      name: 'json',
      label: 'Json',
      defaultValue: '',
      type: 'json',
      disabled: false,
      isEditable: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    }
  ]

  const [divIds, setDivIds] = React.useState<string[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<{ [key: string]: boolean }>({});
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddDiv = () => {
    if (inputValue && !divIds.includes(inputValue)) {
      setDivIds([...divIds, inputValue]);
      setSelectedIds((prev) => ({
        ...prev,
        [inputValue]: false
      }));
      setInputValue('');
    }
  };


  const toggleId = (id: string) => {
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <FormProvider {...method}>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
      <div className="flex space-x-4">
        <form className='relative' onSubmit={handleSubmit(onSubmit)}>
          <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'var(--fc-brand-700)', type: 'oval' }} />
          <Stack classNames={{
            root: 'bg-white p-4 py-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out',
          }}
          >
            {InputList.map((input, index) => (
              <InputWithOverlay
                key={index}
                allowEdit={!input.disabled}
                {...input}
                isEditable={isEditable[input.name]}
                toggleIsEditable={() => toggleIsEditable(input.name)}
              />
            ))}

            <Group justify='end'>
              <Button type='submit'
              >Submit</Button>
              <Button type='button'
                onClick={() => reset()}
              >Reset</Button>
            </Group>
          </Stack>

        </form>
        <div>
          <div className="flex p-4 border gap-4">
            <div
              id='1'
              className={clsx('border border-yellow-600 p-4', selectedIds['1'] && 'bg-yellow-300')}
              onClick={() => toggleId('1')}
            >
              1
            </div>
            <div
              id='2'
              className={clsx('border border-yellow-600 p-4', selectedIds['2'] && 'bg-yellow-300')}
              onClick={() => toggleId('2')}
            >
              2
            </div>
            <div
              id='3'
              className={clsx('border border-yellow-600 p-4', selectedIds['3'] && 'bg-yellow-300')}
              onClick={() => toggleId('3')}
            >
              3
            </div>
          </div>
          <h1>Dynamic Divs Example</h1>
          <div className="input-group">
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter ID" />
            <button onClick={handleAddDiv}>Add Div</button>
          </div>
          <div className="flex p-4 border gap-4">
            {divIds.map((id) => (
              <div
                key={id}
                id={id}
                className={clsx('border border-yellow-600 p-4', selectedIds[id] && 'bg-yellow-300')}
                onClick={() => toggleId(id)}
              >
                {id}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

const FormWithProvider = () => {
  const method = useForm({ defaultValues: { select: null, multiSelect: [] } });
  const { handleSubmit, reset, control } = method;

  return (
    <FormProvider {...method}>
      <form
        onSubmit={handleSubmit((e) => console.log(e))}
        className='relative w-1/2 flex-col justify-center items-center space-y-4 border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
      >
        <strong>Provider</strong>
        <Select
          name='select'
          label='Select'
          placeholder='Select item'
          data={['React', 'Angular', 'Vue']}
          control={control}
        />
        <MultiSelect
          name='multiSelect'
          label='Multi Select'
          placeholder='Select multiple items'
          data={['React', 'Angular', 'Vue']}
          control={control}
        />
        <Group>
          <Button type='submit'
          >Submit</Button>
          <Button type='button'
            onClick={() => reset()}
          >Reset</Button>
        </Group>
      </form>
    </FormProvider>
  )
}

const FormWithControl = () => {
  const method = useForm({ defaultValues: { select: null, multiSelect: [] } });
  const { reset, control } = method;

  return (
    <Form
      control={control}
      onSubmit={(e) => console.log(e.data)}
      onError={(e) => console.log(e)}
      className='relative w-1/2 flex-col justify-center items-center space-y-4 border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
    >
      <strong>Control</strong>
      <Select
        name='select'
        label='Select'
        placeholder='Select item'
        data={['React', 'Angular', 'Vue']}
        control={control}
      />
      <MultiSelect
        name='multiSelect'
        label='Multi Select'
        placeholder='Select multiple items'
        data={['React', 'Angular', 'Vue']}
        control={control}
      />
      <Group>
        <Button type='submit'
        >Submit</Button>
        <Button type='button'
          onClick={() => reset()}
        >Reset</Button>
      </Group>
    </Form>
  )
}