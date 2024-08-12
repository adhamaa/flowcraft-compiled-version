'use client';

import { Icon } from "@iconify-icon/react";
import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";

export type CustomInputType = HTMLInputTypeAttribute | 'json' | null;

const SaveActions = ({ name, copyValue, hidden, onCancel, type }: {
  name: string;
  type?: CustomInputType;
  copyValue?: string;
  hidden?: boolean;
  onCancel?: () => void;
}) => {
  return (
    <div className={clsx(
      'flex items-center ml-auto space-x-1.5',
      type === 'text' && 'absolute right-2'
    )}>
      {!hidden &&
        <>
          <Tooltip label="Save">
            <ActionIcon
              id={name}
              component='button'
              type='submit'
              // disabled
              variant="transparent"
              bg="var(--fc-neutral-100)"
              color='black'
              size="lg"
              radius="md"
              aria-label="Settings">
              <Icon
                icon="heroicons-outline:check"
                width="1.2rem"
                className='border p-2 rounded-lg text-black/70 hover:text-black'
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Cancel">
            <ActionIcon
              id={name}
              // disabled
              variant="transparent"
              bg="var(--fc-neutral-100)"
              color='black'
              size="lg"
              radius="md"
              aria-label="Settings"
              onClick={onCancel}
            >
              <Icon
                icon="heroicons-outline:x"
                width="1.2rem"
                className='border p-2 rounded-lg text-black/70 hover:text-black'
              />
            </ActionIcon>
          </Tooltip>
        </>
      }
      {type === 'json' &&
        <>
          <CopyButton value={copyValue as string} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'}>
                <ActionIcon
                  // disabled
                  color='black'
                  variant="transparent"
                  bg={copied ? "#c5aff9" : 'var(--fc-neutral-100)'}
                  size="lg"
                  radius="md"
                  onClick={copy}
                >
                  {copied ? (
                    <Icon
                      icon="heroicons-outline:check"
                      width="1.2rem"
                      height="1.2rem"
                      className='text-black/70 hover:text-black'
                    />
                  ) : (
                    <Icon
                      icon="heroicons-outline:document-duplicate"
                      width="1.2rem"
                      height="1.2rem"
                      className='text-black/70 hover:text-black'
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
    </div>
  )
};

export default SaveActions;