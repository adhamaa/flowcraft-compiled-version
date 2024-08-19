"use client";

import HeaderForm from '@/app/cycle/_components/Forms/HeaderForm';
import { LabelTooltip } from '@/app/cycle/_components/Forms/LabelTooltip';
import toast from '@/components/toast';
import { getProfilePicture, getUserDetails, setAuditTrail, updateUserDetails, uploadProfilePicture } from '@/lib/service';
import { ActionIcon, Avatar, Button, Flex, Group, InputWrapper, LoadingOverlay, Overlay, Pill, rem, ScrollAreaAutosize, Text, Tooltip } from '@mantine/core';
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
};

const Profile = ({ data = {} }: { data?: any; }) => {
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

  const { data: profilePictureUrl, isLoading: isProfilePictureUrlLoading, refetch: profilePictureUrlRefetch } = useQuery({
    queryKey: ['profilePicture', session?.user?.email],
    queryFn: () => getProfilePicture({ email: session?.user?.email as string }),
    enabled: !!session?.user?.email,
  });

  const { mutate: uploadProfilePictureMutate } = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: async (response) => {
      profilePictureUrlRefetch();
      await update({ ...session!.user, image: profilePictureUrl });
      toast.success(response.message);
      setAuditTrail({
        action: `update_profile_picture`,
        location_url: pageUrl,
        object: 'src/app/manage-account/_components/Profile.tsx',
        process_state: 'TRIGGERAPI',
        sysfunc: '"onSuccess" callback of "uploadProfilePictureMutate"',
        userid: user_id as string,
        sysapp: 'FLOWCRAFTBUSINESSPROCESS',
        notes: `User updated profile picture`,
        json_object: { email: session?.user?.email, ...response },
      });
      modals.closeAll();
      closeEdit();
    },
    onError: (error) => {
      toast.error('Error updating profile');
    }
  });

  const { mutate: updateUserDetailsMutate } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: async (response) => {
      userDetailsRefetch();
      await update({ ...session!.user, name: userDetails?.name });
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
      name: 'user_id',
      label: 'User ID',
      type: 'text',
      value: userDetails?.id,
      disabled: true
    },
    {
      name: "full_name",
      label: 'Full Name',
      type: 'text',
      value: userDetails?.name,
      disabled: !isEdit
    },
    {
      name: "role",
      label: 'Role',
      type: 'text',
      value: userDetails?.role || "N/A",
      disabled: true
    },
    {
      name: "email",
      label: 'Email',
      type: 'text',
      value: userDetails?.email,
      disabled: true
    },
    {
      name: "mobile_no",
      label: 'Mobile Number',
      type: 'text',
      value: userDetails?.mobile_no || "N/A",
      disabled: true
    },
  ];

  const methods = useForm({
    defaultValues: {
      user_id: '',
      full_name: '',
      role: '',
      email: '',
      mobile_no: '',
      profile_picture: null,
    },
    values: {
      user_id: userDetails?.id,
      full_name: userDetails?.name,
      role: userDetails?.role || "N/A",
      email: userDetails?.email,
      mobile_no: userDetails?.mobile_no || "N/A",
      profile_picture: profilePictureUrl,
    }
  });
  const { control, handleSubmit, setValue, watch } = methods;

  const imgSrc = useProfilePicturePreview(watch('profile_picture'));

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
                  name: data.full_name,
                }
              };
              updateUserDetailsMutate(sendData, {
                onSuccess: (response) => {
                  if (!response.error) {
                    if (data.profile_picture) {
                      const formData = new FormData();
                      formData.append('profile_picture', data.profile_picture[0]);
                      uploadProfilePictureMutate({
                        email: session?.user?.email as string,
                        formData
                      }, {
                        onSuccess: () => {
                        }
                      });
                    }
                  }
                  modals.closeAll();
                  toggleEdit();
                }
              });

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
        {/* create a box for image avatar on the left side */}
        <div
          className="flex">
          <div
            className='flex flex-col items-center ml-10 my-4 overflow-hidden space-y-4'
          >
            <InputWrapper className='relative'>
              <Controller
                control={control}
                name="profile_picture"
                render={({ field }) => {
                  return (
                    <Dropzone
                      openRef={openDropzoneRef}
                      activateOnClick={false}
                      onDrop={(files) =>
                        setValue("profile_picture", files as unknown as string)
                      }
                      onReject={(files) =>
                        console.log("rejected files", files)
                      }
                      // maxSize={3 * 1024 ** 2}
                      accept={IMAGE_MIME_TYPE}
                      loaderProps={{ color: "var(--fc-brand-700)" }}
                      loading={isProfilePictureUrlLoading}
                      {...field}
                    >
                      {isEdit && <Overlay
                        color="var(--fc-basic-black)"
                        backgroundOpacity={0.35}
                        blur={4}
                        className='!absolute !z-10 !rounded-md'
                      />}
                      <div className="rounded-md overflow-hidden w-48 h-48 transition-all duration-500 ease-in-out">
                        {/* <BlurhashImage
                          src={imgSrc}
                          width={198}
                          height={198}
                          alt="Example Image"
                        > */}
                        <Avatar
                          name={username as string}
                          src={imgSrc}
                          color="initials"
                          size={rem(150)}
                          radius="md"
                          alt="avatar"
                          className='!w-full !h-full'
                        />
                        {/* </BlurhashImage> */}
                      </div>
                    </Dropzone>
                  )
                }}
              />
              {isEdit && <Tooltip
                label={'Change Profile Picture'}
              >
                <ActionIcon
                  disabled={false}
                  onClick={() => openDropzoneRef.current?.()}
                  variant="subtle"
                  // bg="var(--fc-neutral-100)"
                  color='var(--fc-neutral-100)'
                  size="100%"
                  radius="md"
                  aria-label="Change Profile Picture"
                  className='!absolute !bottom-0 !z-50'
                >
                  <Icon icon="heroicons:camera" width="4rem" className='' />
                </ActionIcon>
              </Tooltip>}

            </InputWrapper>
            <span className='font-notosans'>{userDetails?.name}</span>
            <Button
              disabled={true}
              color='var(--fc-neutral-600)'
              type='button'
              variant='filled'
              classNames={{
                root: clsx('disabled:!bg-fc-neutral-100 disabled:text-fc-neutral-600 disabled:border-transparent',
                ),
              }}
            >
              Admin
            </Button>
          </div>
          <ScrollAreaAutosize className='flex-1 h-[calc(100vh-341.5px)]'>
            <div className="container mx-auto space-y-8 pb-10">
              {InputList?.map(({ label, name, type, value, disabled }, index) => {
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
                      name={name as "user_id" | "full_name" | "role" | "email" | "mobile_no"}
                      defaultValue={value}
                      control={control}
                      disabled={disabled}
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

export default Profile