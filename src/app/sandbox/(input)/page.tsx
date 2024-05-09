'use client';

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, Flex, InputWrapper, Overlay, Stack } from '@mantine/core';
import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Input, } from 'react-hook-form-mantine'
import type { InputProps } from 'react-hook-form-mantine'

function InputPagesTesting() {
  const method = useForm();
  const { handleSubmit } = method;

  const InputList = [
    {
      name: 'username',
      placeholder: 'Username',
      // defaultValue: 'adhamaa',
      type: 'text',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: 'disabled:bg-gray-100 disabled:cursor-pointer',
      }
    },
    {
      name: 'email',
      placeholder: 'Email',
      // defaultValue: '',
      type: 'email',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: 'disabled:bg-gray-100 disabled:cursor-pointer',
      }
    },
    {
      name: 'password',
      placeholder: 'Password',
      // defaultValue: '',
      type: 'password',
      control: method.control,
      setFocus: method.setFocus,
      handleSubmit: handleSubmit,
      radius: 'md',
      classNames: {
        wrapper: 'w-full',
        input: 'disabled:bg-gray-100 disabled:cursor-pointer',
      }
    }
  ]

  return (
    <div className='p-10 container max-w-96 m-auto'>
      <form>
        {InputList.map((input, index) => (
          <InputWithOverlay {...input} />
        ))}
      </form>
    </div >
  )
}

export default InputPagesTesting

const InputWithOverlay = (props: InputProps<any> & {
  placeholder?: string;
  type: string;
  setFocus: any;
  handleSubmit: any;
}) => {

  const [disabled, setDisabled] = React.useState(true);

  const handleToggle = () => setDisabled(!disabled)

  const onSubmit = (data: any, e: Event) => {
    const target_id = (e.target as HTMLInputElement).id || ((e.target as HTMLInputElement).childNodes[0] as any).id;
    const dataById = data[target_id];
    console.log('dataById:' + target_id + " -", dataById)
    handleToggle()
  }

  React.useEffect(() => {
    if (!disabled) {
      props.setFocus(props.name);
    }
  }, [props.setFocus, disabled]);


  return (
    <Stack classNames={{
      root: 'bg-white p-4 my-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out',
    }}
    >
      <InputWrapper classNames={{
        root: 'relative flex flex-col',
        label: 'text-gray-600 my-2',
      }}
        label={props.placeholder}
      >
        <Input
          id={props.name}
          disabled={disabled}
          name={props.name}
          // @ts-ignore
          placeholder={props.placeholder}
          type={props.type || 'text'}
          defaultValue={props.defaultValue}
          control={props.control}
          radius={props.radius || 'md'}
          classNames={props.classNames}
        />
        {disabled && <Overlay color="transparent" backgroundOpacity={0} blur={0} onClick={handleToggle} classNames={{
          root: 'cursor-pointer h-full rounded-lg',
        }} />}
      </InputWrapper>
      {!disabled && <Flex justify='end' align='center' gap='sm'>
        <ActionIcon variant="default" color="#895CF3" size="lg" radius="md" aria-label="Settings" onClick={props.handleSubmit(onSubmit)}>
          <Icon id={props.name} className='cursor-pointer rounded' icon="heroicons-solid:check" width="1rem" height="1rem" />
        </ActionIcon>
        <ActionIcon variant="default" color="#895CF3" size="lg" radius="md" aria-label="Settings" onClick={handleToggle}>
          <Icon className='cursor-pointer rounded' icon="heroicons-solid:x" width="1rem" height="1rem" />
        </ActionIcon>
      </Flex>}
    </Stack>
  )
};
