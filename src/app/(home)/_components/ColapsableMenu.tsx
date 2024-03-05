'use client';
import { Icon } from '@iconify-icon/react';
import { Tabs, rem } from '@mantine/core';

export default function ColapsableMenu() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <aside className='grid'>
      <nav>
        <ul className='p-6 space-y-4'>
          <li className='hover:border hover:border-teal-500 text-center p-4'>A</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>B</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>C</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>D</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>E</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>F</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>G</li>
          <li className='hover:border hover:border-teal-500 text-center p-4'>H</li>
        </ul>
      </nav>
    </aside>
  );
}