'use client';

import { Icon } from '@iconify-icon/react';
import { ActionIcon, Button, CopyButton, Flex, InputWrapper, Overlay, Stack, Tooltip, __InputStylesNames } from '@mantine/core';
import clsx from 'clsx';
import * as React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Input, PasswordInput, TextInput, } from 'react-hook-form-mantine'
import type { InputProps } from 'react-hook-form-mantine'

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

const InputWithOverlay = (props: InputProps<any> & {
  label?: string;
  type: string;
  setFocus: any;
}) => {
  const { handleSubmit } = useFormContext();

  const [disabled, setDisabled] = React.useState(true);

  const handleToggle = () => setDisabled(!disabled)

  const onSubmit = (data: any, e: any) => {
    const target_id = e?.nativeEvent?.submitter?.id
      || e?.target?.offsetParent?.id
      || e?.target?.id
      || e.target?.childNodes?.[0]?.id;
    const dataById = data[target_id];
    handleToggle()
  }

  React.useEffect(() => {
    if (!disabled) {
      props.setFocus(props.name);
    }
  }, [props.setFocus, disabled]);


  return (
    <InputWrapper classNames={{
      root: 'relative flex flex-col px-14 space-y-4',
      label: '!text-sm !font-semibold',
    }}
      label={props.label}
    >
      <TextInput
        id={props.name}
        disabled={disabled}
        name={props.name}
        type={props.type}
        placeholder={props.label}
        control={props.control}
        radius={props.radius || 'md'}
        classNames={{ ...props.classNames }}
        rightSectionWidth={72}
        rightSection={!disabled && <SaveActions {...{
          name: props.name,
          disabled,
          onSave: handleSubmit(onSubmit),
          onCancel: handleToggle
        }} />
        }
      />
      {disabled && <Overlay color="transparent" backgroundOpacity={0} blur={0} onClick={handleToggle} classNames={{
        root: 'cursor-pointer h-full rounded-lg',
      }} />}
    </InputWrapper>
  )
};


const SaveActions = ({ name, copyValue, disabled, onSave, onCancel }: {
  name: string;
  copyValue?: string;
  disabled?: boolean;
  onSave: () => void;
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
            // component='button'
            // type='submit'
            // disabled
            variant="transparent"
            bg="#F1F5F9"
            color='black'
            size="lg"
            radius="md"
            aria-label="Settings"
            onClick={onSave}
          >
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
          {!['username', 'email', 'password'].includes(name) &&
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
          {!['username', 'email', 'password'].includes(name) &&
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