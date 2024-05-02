'use client';

import toast from '@/components/toast'
import { SignupAction } from '../_action'
import { redirect } from 'next/navigation'
import { PasswordInput, TextInput } from 'react-hook-form-mantine';
import { useForm } from 'react-hook-form';
import { Button } from '@mantine/core';

function SignupForm() {

  const { handleSubmit, control } = useForm()

  const onSubmit = async (formData: any) => {
    await SignupAction(formData)
      .then((res) => {
        toast.success(res.message)
        redirect('/api/auth/signin')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const inputList = [{
    name: 'username',
    label: 'Username',
    disabled: false,
  }, {
    name: 'email',
    label: 'Email',
    disabled: false,
  }, {
    name: 'password',
    label: 'Password',
    disabled: false,
  }, {
    name: 'confirmPassword',
    label: 'Confirm Password',
    disabled: false,
  }];


  return (
    <>
      <form
        className='relative space-y-4 py-4 flex flex-col items-center justify-center w-96 bg-white rounded-lg shadow-md'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Signup Page</h1>
        {inputList.map(
          ({ name, disabled, label }, index) => ['Password', 'Confirm Password'].includes(label) ? (
            <PasswordInput
              key={index}
              name={name}
              label={label}
              control={control}
              disabled={disabled}
              classNames={{
                root: 'px-14 w-full',
                label: 'mb-3 !text-sm !font-semibold',
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }} />
          ) : (
            <TextInput
              key={index}
              name={name}
              label={label}
              control={control}
              disabled={disabled}
              classNames={{
                root: 'px-14 w-full',
                label: 'mb-3 !text-sm !font-semibold',
                input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
              }} />
          )
        )}
        <Button type='submit' color='#895CF3' radius='md'>
          Submit
        </Button>
      </form >
    </>
  )
}

export default SignupForm