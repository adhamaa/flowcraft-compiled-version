import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import clsx from 'clsx';
import * as React from 'react'

const HeaderForm = ({ toggleEdit, isEdit, toggleExpand, type, isFullscreen }: {
  type: 'edit' | 'general';
  toggleExpand: () => void;
  toggleEdit?: () => void;
  isEdit?: boolean;
  isFullscreen?: boolean;
}) => {
  if (!type) throw new Error('type is required');
  return (
    <div className={clsx('flex px-14 py-6 items-center border-b', 'justify-end')}>
      {isFullscreen && <Button color='#895CF3' radius='md' classNames={{
        root: '!p-2 mr-auto'
      }} onClick={toggleExpand}>
        <Icon icon="solar:maximize-outline" width="1rem" height="1rem" />
      </Button>}

      {!isEdit ?
        <div className='flex gap-4'>
          {type === 'edit' && <Button
            disabled
            variant='filled'
            color='#F1F5F9'
            c='#0F172A'
            radius='md'
            size="sm"
            fz={14}
            onClick={() => { }}
            classNames={{
              root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
            }}
          >
            Duplicate
          </Button>}
          <Button
            disabled
            variant='filled'
            color='#F1F5F9'
            c='#0F172A'
            radius='md'
            size="sm"
            fz={14}
            onClick={() => { }}
            classNames={{
              root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
            }}
          >
            Delete
          </Button>
          <Button
            // disabled
            variant='filled'
            color='#F1F5F9'
            c='#0F172A'
            radius='md'
            size="sm"
            fz={14}
            onClick={toggleEdit}
            classNames={{
              root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
            }}
          >
            Edit
          </Button>
        </div> :
        <div className='flex gap-4'>
          {type === 'edit' ? <Button
            // disabled
            variant='white'
            color='#F1F5F9'
            c='#0F172A'
            radius='md'
            size="sm"
            fz={14}
            onClick={toggleEdit}
            classNames={{
              root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
            }}
          >
            Close
          </Button> :
            <>
              <Button
                type='submit'
                // disabled
                variant='filled'
                color='#895CF3'
                // c='#0F172A'
                radius='md'
                size="sm"
                fz={14}
                // onClick={toggleEdit}
                classNames={{
                  root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
                }}
              >
                Save
              </Button>
              <Button
                // disabled
                variant='white'
                color='#F1F5F9'
                c='#0F172A'
                radius='md'
                size="sm"
                fz={14}
                onClick={toggleEdit}
                classNames={{
                  root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
                }}
              >
                Cancel
              </Button>
            </>
          }
        </div>
      }

      {/* {toggleEdit && <div className='flex gap-4'>
        <Button color={!isEdit ? '#007BFF' : '#DC3545'} radius='md' onClick={toggleEdit}>{!isEdit ? 'Edit' : 'Close'}</Button>
        {type === 'general' && <Button type='submit' color={!isEdit ? '#28A745' : '#28A745'} display={!isEdit ? 'none' : 'block'} radius='md' onClick={toggleEdit}>{!isEdit ? '' : 'Save'}</Button>}
      </div>} */}
    </div>
  )
}

export default HeaderForm