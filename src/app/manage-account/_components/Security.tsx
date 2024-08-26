"use client";

import HeaderForm from '@/app/cycle/_components/Forms/HeaderForm';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import toast from '@/components/toast';
import { getProfilePicture, getUserDetails, removeProfilePicture, setAuditTrail, updateUserDetails, uploadProfilePicture } from '@/lib/service';
import { ActionIcon, Avatar, Button, CloseButton, Flex, Group, InputWrapper, LoadingOverlay, Overlay, Pill, rem, ScrollAreaAutosize, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FileInput, Radio, RadioGroup, TextInput } from 'react-hook-form-mantine';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { Icon } from '@iconify-icon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useProfilePicturePreview } from '@/hooks/useProfilePicturePreview';
import { Blurhash } from 'react-blurhash';
import { encode } from 'blurhash';
import { encodeImageToBlurhash } from '@/lib/encodeImageToBlurhash';
import BlurhashImage from './BlurhashImage';

// Define the structure of each item in the InputList
type InputItem = {
  name: string;
  label: string;
  type: string;
  value?: any;
  disabled: boolean;
  icon?: React.ReactNode;
};

const Security = ({ data = {} }: { data?: any; }) => {
  const [hideOldPassword, setHideOldPassword] = React.useState(true);
  const [hideNewPassword, setHideNewPassword] = React.useState(true);
  const openDropzoneRef = React.useRef<() => void>(null);
  const [isEdit, { open: openEdit, close: closeEdit, toggle: toggleEdit }] = useDisclosure(false);
  const { data: session, update } = useSession();
  const username = session?.user?.name;
  const profileImg = session?.user?.image;
  const user_id = session?.user?.user_id;
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUrl = `${pathname}?${searchParams}`;

  const { data: userDetails, isLoading: isUserDetailsLoading, refetch: userDetailsRefetch } = useQuery({
    queryKey: ['userDetails', session?.user?.email],
    queryFn: () => getUserDetails({ email: session?.user?.email as string }),
    enabled: !!session?.user?.email,
  });

  const { mutate: updateUserDetailsMutate } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: async (response) => {
      userDetailsRefetch();
      await update({ user: { ...session!.user, name: userDetails?.name } });
      toast.success(response.message);
      setAuditTrail({
        action: `update_user_details`,
        location_url: pageUrl,
        object: 'src/app/manage-account/_components/Profile.tsx',
        process_state: 'TRIGGERAPI',
        sysfunc: '"onSuccess" callback of "updateUserDetailsMutate"',
        userid: user_id as string,
        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
        notes: `User updated profile details`,
        json_object: { email: session?.user?.email, ...response },
      });
      modals.closeAll();
      closeEdit();
    },
    onError: (error) => {
      toast.error('Error updating profile');
    }
  });

  const InputList: InputItem[] = [
    {
      name: 'old_password',
      label: 'Old password',
      type: hideOldPassword ? 'password' : 'text',
      value: userDetails?.password,
      disabled: true,
      icon: hideOldPassword ?
        <Icon icon="heroicons-solid:eye-off" onClick={() => setHideOldPassword(false)} className='cursor-pointer' /> :
        <Icon icon="heroicons-solid:eye" onClick={() => setHideOldPassword(true)} className='cursor-pointer' />
    },
    {
      name: "password",
      label: 'New Password',
      type: hideNewPassword ? 'password' : 'text',
      value: undefined,
      disabled: !isEdit,
      icon: hideNewPassword ?
        <Icon icon="heroicons-solid:eye-off" onClick={() => setHideNewPassword(false)} className='cursor-pointer' /> :
        <Icon icon="heroicons-solid:eye" onClick={() => setHideNewPassword(true)} className='cursor-pointer' />
    },
  ];

  const methods = useForm({
    defaultValues: {
      old_password: '',
      password: '',
    },
    values: {
      old_password: userDetails?.password,
    }
  });
  const { control, handleSubmit, setValue, watch } = methods;

  const onSubmit = async (data: any) => {
    modals.open({
      title: 'Confirm update',
      children: (
        <>
          <Text size="sm">Updating Profile Details</Text>
          <Flex gap={16} justify={'end'} mt="md">
            <Button onClick={() => modals.closeAll()} color='var(--fc-neutral-100)' c='var(--fc-neutral-900)' radius='md'>
              Cancel
            </Button>
            <Button onClick={() => {
              const sendData = {
                email: session?.user?.email as string,
                body: {
                  password: data.password,
                }
              };
              updateUserDetailsMutate(sendData);

              modals.closeAll();
              toggleEdit();
            }}
              color='var(--fc-brand-700)'
              radius='md'
            >
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
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={clsx('space-y-4 w-full')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeaderForm type='profile' {...{ toggleEdit, isEdit, toggleExpand: () => { } }} />
        <div
          className="flex">
          <ScrollAreaAutosize className='flex-1 h-[calc(100vh-341.5px)]'>
            <div className="mx-auto space-y-8 pb-10">
              {InputList?.map(({ label, name, type, value, disabled, icon }, index) => {
                return (
                  <InputWrapper
                    key={index}
                    label={label}
                    classNames={{
                      root: 'px-14 space-y-4',
                      label: '!text-sm !font-semibold',
                    }}>
                    <LabelTooltip label={label} />
                    <TextInput
                      name={name as "old_password" | "password"}
                      type={type}
                      defaultValue={value}
                      control={control}
                      disabled={disabled}
                      rightSection={icon}
                      rightSectionPointerEvents='all'
                      classNames={{
                        input: '!rounded-lg p-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
                      }} />

                  </InputWrapper>
                )
              })}
            </div>
          </ScrollAreaAutosize >
        </div>
      </form>
    </FormProvider>
  )
}

export default Security;