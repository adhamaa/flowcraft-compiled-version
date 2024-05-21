'use client';

import InputWithOverlay from '@/components/form/InputWithOverlay';
import { Stack } from '@mantine/core';
import * as React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

function InputPagesTesting() {
  const method = useForm();
  const { handleSubmit } = method;

  const InputList = [
    {
      name: 'username',
      label: 'Username',
      // defaultValue: 'adhamaa',
      type: 'text',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      disabled: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    },
    {
      name: 'email',
      label: 'Email',
      // defaultValue: '',
      type: 'email',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      disabled: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    },
    {
      name: 'password',
      label: 'Password',
      // defaultValue: '',
      type: 'password',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      disabled: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    },
    {
      name: 'json',
      label: 'Json',
      // defaultValue: '',
      type: 'json',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      disabled: false,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
      }
    }
  ]

  return (
    <div className='p-10 container max-w-xl m-auto'>
      <FormProvider {...method}>
        <form>
          <Stack classNames={{
            root: 'bg-white p-4 py-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out',
          }}
          >
            {InputList.map((input, index) => (
              <InputWithOverlay key={index} {...input} />
            ))}
          </Stack>
        </form>
      </FormProvider>
    </div >
  )
}

export default InputPagesTesting
