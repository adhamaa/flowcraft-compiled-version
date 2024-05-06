'use client';

import toast from '@/components/toast'
import { PasswordInput, TextInput } from 'react-hook-form-mantine';
import { useForm } from 'react-hook-form';
import { Button } from '@mantine/core';
import Image from 'next/image';
import { LoginCredentials, SigninAction } from '../_action';

function SigninForm() {

  const { handleSubmit, control } = useForm()

  const onSubmit = async ({ email, password }: any) => {
    await SigninAction({ email, password } as LoginCredentials, '/')
  }

  const inputList = [{
    name: 'email',
    label: 'Email',
    disabled: false,
  }, {
    name: 'password',
    label: 'Password',
    disabled: false,
  }];


  return (
    <div className='grid grid-cols-4 w-screen h-screen'>
      <div className="relative w-full h-full col-span-3">
        <Image
          src='/login_img.jpg'
          fill
          alt='Flowcraft Logo'
        />
      </div>
      <div className='relative col-span-1 w-full h-full'>
        <form
          className='p-10 pt-12 space-y-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Image
            src='/flowcraft_logo.svg'
            width={150}
            height={48}
            alt='Flowcraft Logo'
          />
          <h1 className='font-semibold'>Nice to see you again</h1>
          {inputList.map(
            ({ name, disabled, label }, index) => ['Password'].includes(label) ? (
              <PasswordInput
                key={index}
                name={name}
                label={label}
                control={control}
                disabled={disabled}
                classNames={{
                  root: 'w-full',
                  label: 'mb-3 ml-4 !text-sm !font-semibold',
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
                  root: 'w-full',
                  label: 'mb-3 ml-4 !text-sm !font-semibold',
                  input: '!rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent',
                }} />
            )
          )}
          <div className='flex justify-end'>
            <a href='/auth/forgot-password' className='text-xs text-blue-500'>Forgot password?</a>
          </div>
          <Button type='submit' color='#895CF3' radius='md' classNames={{
            root: 'w-full !my-8',
          }}>
            Sign in
          </Button>
        </form >
      </div>
    </div>
  )
}

export default SigninForm