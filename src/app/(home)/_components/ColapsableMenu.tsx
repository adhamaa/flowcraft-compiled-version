'use client';
import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Tabs, rem } from '@mantine/core';
import { useSideMenu } from '@/hooks/useSideMenu';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';


export default function ColapsableMenu() {
  const { layoutColSpan, setLayoutColSpan, sideMenuColSpan, setSideMenuColSpan } = useSideMenu();

  return (
    <aside
      className={cn(
        'grid',
        // 'border border-dashed border-red-500'
      )}
      style={{ gridTemplateColumns: `repeat(${sideMenuColSpan}, 10rem)` }}
    >
      {sideMenuColSpan > 0 && <motion.nav
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut"
        }}
        exit={{ opacity: 0, x: -100 }}

        className='border border-t-0 flex flex-col'>
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
        <button onClick={() => {
          setLayoutColSpan(layoutColSpan === 10 ? 20 : 10)
          setSideMenuColSpan(sideMenuColSpan === 1 ? 2 : 1)
        }}>{'|>'}</button>
      </motion.nav>}

      {sideMenuColSpan > 1 && <motion.nav
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut"
        }}
        exit={{ opacity: 0, x: -100 }}

        className='border border-t-0 flex flex-col'>
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
        <button onClick={() => {
          setLayoutColSpan(layoutColSpan === 20 ? 30 : 20)
          setSideMenuColSpan(sideMenuColSpan === 2 ? 3 : 2)
        }}>{'|>'}</button>
      </motion.nav>}

      {sideMenuColSpan > 2 && <motion.nav
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut"
        }}
        exit={{ opacity: 0, x: -100 }}

        className='border border-t-0 flex flex-col'>
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
      </motion.nav>}



    </aside>
  );
}