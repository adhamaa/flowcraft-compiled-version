'use client';
import * as React from 'react';
import { Icon } from '@iconify-icon/react';
import { Tabs, rem } from '@mantine/core';
import { useSideMenu } from '@/hooks/useSideMenu';
import { motion } from 'framer-motion';


export default function ColapsableMenu() {
  const { sideMenu, setSideMenu } = useSideMenu();
  const [colSpan, setColSpan] = React.useState(1);


  return sideMenu !== 0 && (
    <aside
      className='grid border border-dashed border-red-500'
      style={{ gridTemplateColumns: `repeat(${colSpan}, 10rem)` }}
    >
      <nav className='border flex flex-col'>
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
          setColSpan(colSpan === 1 ? 2 : 1)
          setSideMenu(sideMenu === 10 ? 20 : 10)
        }}>{'|>'}</button>
      </nav>

      {colSpan > 1 && <motion.nav
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut"
        }}
        exit={{ opacity: 0, x: -100 }}

        className='border flex flex-col'>
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
          setColSpan(colSpan === 2 ? 3 : 2)
          setSideMenu(sideMenu === 20 ? 30 : 20)
        }}>{'|>'}</button>
      </motion.nav>}

      {colSpan > 2 && <motion.nav
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut"
        }}
        exit={{ opacity: 0, x: -100 }}

        className='border flex flex-col'>
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