import { Icon } from '@iconify-icon/react';
import { Button } from '@mantine/core';
import * as React from 'react'

const HeaderForm = ({ toggleEdit, isEdit, toggleExpand, type }: {
  type: 'edit' | 'general';
  toggleExpand: () => void;
  toggleEdit?: () => void;
  isEdit?: boolean;
}) => {
  if (!type) throw new Error('type is required');
  return (
    <div className='flex px-14 py-6 items-center border-b'>
      <Button color='#895CF3' radius='md' classNames={{
        root: '!p-2 mr-auto'
      }} onClick={toggleExpand}>
        <Icon icon="solar:maximize-outline" width="1rem" height="1rem" />
      </Button>
      {toggleEdit && <div className='flex gap-4'>
        <Button color={!isEdit ? '#007BFF' : '#DC3545'} radius='md' onClick={toggleEdit}>{!isEdit ? 'Edit' : 'Close'}</Button>
        {type === 'general' && <Button type='submit' color={!isEdit ? '#28A745' : '#28A745'} display={!isEdit ? 'none' : 'block'} radius='md' onClick={toggleEdit}>{!isEdit ? '' : 'Save'}</Button>}
      </div>}
    </div >
  )
}

export default HeaderForm