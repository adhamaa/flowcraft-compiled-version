'use client';

import { Icon } from "@iconify-icon/react";
import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";

export type CustomInputType = HTMLInputTypeAttribute | 'json' | null;

const SaveActions = ({ name, copyValue, disabled, onCancel, type }: {
  name: string;
  type?: CustomInputType;
  copyValue?: string;
  disabled?: boolean;
  onCancel?: () => void;
}) => {
  return (
    <div className={clsx(
      'flex items-center ml-auto space-x-1.5',
      name === 'process_stage_name' && 'absolute right-0'
    )}>
      {!disabled &&
        <>
          <Tooltip label="Save">
            <ActionIcon
              id={name}
              component='button'
              type='submit'
              // disabled
              variant="transparent"
              bg="#F1F5F9"
              color='black'
              size="lg"
              radius="md"
              aria-label="Settings">
              <Icon
                icon="heroicons-outline:check"
                width="1.2rem"
                className='border p-2 rounded-lg text-black/70 hover:text-black/50'
              />
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
              <Icon
                icon="heroicons-outline:x"
                width="1.2rem"
                className='border p-2 rounded-lg text-black/70 hover:text-black/50'
              />
            </ActionIcon>
          </Tooltip>
        </>
      }
      {/* <div className="flex items-center"> */}
      {type === 'json' &&
        <>
          <CopyButton value={copyValue as string} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'}>
                <ActionIcon
                  // disabled
                  color='black'
                  variant="transparent"
                  bg={copied ? "#c5aff9" : '#F1F5F9'}
                  size="lg"
                  radius="md"
                  onClick={copy}
                >
                  {copied ? (
                    <Icon
                      icon="heroicons-outline:check"
                      width="1.2rem"
                      height="1.2rem"
                      className='text-black/70 hover:text-black/50'
                    />
                  ) : (
                    <Icon
                      icon="heroicons-outline:document-duplicate"
                      width="1.2rem"
                      height="1.2rem"
                      className='text-black/70 hover:text-black/50'
                    />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <ActionIcon
            disabled
            color='black'
            variant="subtle"
            size="lg"
            bg='transparent'
            radius="md"
            classNames={{
              root: 'disabled:!text-black/60'
            }}
          >
            <Icon
              icon="ph:code-bold"
              width="1.2rem"
              height="1.2rem"
              className='cursor-default'
            />
          </ActionIcon>
        </>}
      {/* </div> */}
    </div>
  )
};

export default SaveActions;