'use client';

import useEditableState from '@/app/cycle/_components/hooks/useEditableState';
import InputWithOverlay from '@/components/form/InputWithOverlay';
import { Button, LoadingOverlay, Stack } from '@mantine/core';
import clsx from 'clsx';
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form';

function InputPagesTesting() {
  const [visible, setVisible] = React.useState(false);
  const { isEditable, toggleIsEditable } = useEditableState();

  const method = useForm();
  const { handleSubmit } = method;

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
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
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
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
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
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
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
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
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
    <div className='p-10 container max-w-xl m-auto space-y-4'>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
      <FormProvider {...method}>
        <form className='relative' onSubmit={handleSubmit(onSubmit)}>
          <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: '#895CF3', type: 'oval' }} />
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
          </Stack>
        </form>

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

        <div>
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
      </FormProvider>
    </div >
  )
}

export default InputPagesTesting
