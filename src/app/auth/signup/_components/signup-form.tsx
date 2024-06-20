'use client';

import toast from '@/components/toast'

import { PasswordInput, TextInput } from 'react-hook-form-mantine';
import { useForm } from 'react-hook-form';
import { Anchor, Button } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validation';
import { SignUp } from '../_action';
import { useRouter } from 'next/navigation';
import { signOut } from '../../signout/_action';
import Image from 'next/image';

function SignupForm() {
  const router = useRouter();

  const { handleSubmit, control, formState: { isSubmitting, isLoading, isValidating } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (formData: any) => {
    try {
      const resSignup = await SignUp(formData);
      if (resSignup.result === 'error') {
        toast.error(resSignup.message)
      } else {
        toast.success(resSignup.message);
        await signOut(); // signout user
        router.push('/'); // redirect to login page
      }
    } catch (error: any) {
      toast.error(error.message)
    }
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
    <div className='grid grid-cols-4 w-screen h-screen bg-white'>
      <div className="relative w-full h-full col-span-3">
        <Image
          src='/login_img.jpg'
          fill
          alt='Flowcraft Logo'
        />
      </div>
      <div className='relative grid w-full h-full col-span-1'>
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
          <h1 className='font-semibold'>Sign Up</h1>
          {inputList.map(
            ({ name, disabled, label }, index) => ['Password', 'Confirm Password'].includes(label) ? (
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
            <Anchor
              component="button"
              type='button'
              // disabled
              onClick={() => router.push('/')}
              underline="hover"
              // c="#895CF3"
              classNames={{
                root: 'disabled:cursor-default disabled:!no-underline disabled:opacity-50 hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 ease-in-out !text-xs',
              }}
            >
              Back to login
            </Anchor>
          </div>
          <Button
            type='submit'
            loading={isSubmitting || isLoading || isValidating}
            color='#895CF3'
            radius='md'
            classNames={{
              root: '!w-full !my-8',
            }}>
            Sign up
          </Button>
        </form >

        <div className='relative w-full text-center mt-auto p-8'>
          <h5 className='text-xs text-[#64748B]'>Powered by Schinkels Technik</h5>
        </div>
      </div>
    </div>
  )
}

export default SignupForm