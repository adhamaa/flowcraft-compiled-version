'use client';

import toast from '@/components/toast';
import { getDiagramData } from '@/lib/service/client';
import { Icon } from '@iconify-icon/react';
import { Modal, Button, Popover, Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import * as React from 'react';
import ReactFlow, { Background, Controls, DefaultEdgeOptions, FitViewOptions, Handle, Node, ReactFlowProvider } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';
import useDiagramStore, { RFState } from '@/store/Diagram';
import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';
import DevTools from '@/components/reactflow/Devtools';
import { isObjectEmpty } from '@/lib/helper';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';


export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom"
}

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  fetchNodesEdges: state.fetchNodesEdges,
});

function DataChecker(data: any) {
  // Check if 'data' exists and includes a list with only a string with a star ('*'). If so, return 'Any'
  if (data && data.includes('*')) {
    return (
      <div className='flex items-center'>
        <div className='w-2 h-2 bg-black rounded-full'></div>
        <span className='pl-2'>Any</span>
      </div>
    );
  }
}

function RoleChecker(role: string[] | undefined) {
  if (role && role.includes('*')) {
    return (
      <img
        src='/business_process/anyUser.png'
        alt='icon'
        className='absolute border -left-9 -top-1 w-10 h-10 rounded-full object-cover'
      />
    );
  }
  // if none of the checking above is satisfied, then return null
  return null;
}

const nodeTypes = {
  Start: (node: { data: { label: string }; }) => {
    return (
      <div className='flex flex-col justify-center'>
        <img
          src='/business_process/BPD-start.svg'
          alt='start-icon'
          className=' mx-auto w-32 h-32'
        />
        <div className='flex justify-center w-max px-2 py-2 rounded-md  border shadow-md shadow-safwa-gray-4 border-black bg-white'>
          <span>{node.data.label}</span>
        </div>
        {/* this is the blackdot for edges connection*/}
        <Handle type='source' position={Position.Bottom} className='opacity-0' />
      </div>
    )
  },
  WithEntry: (node: { data: { label: any; listEntCondition: any; listExtCondition: any; listRequirement: any; }; }) => {
    const [opened, setOpened] = React.useState(false);

    const label = node.data.label;
    const listEntCondition = node.data.listEntCondition;
    const listExtCondition = node.data.listExtCondition;
    const list = listEntCondition?.pbt_data || listEntCondition?.cate_data;
    const listRequirement = node.data.listRequirement;

    return (
      <div
        className='flex flex-col items-center justify-center w-48'
      // style={{ zIndex: zIndex }}
      >
        <div>
          <div className='flex items-center justify-center w-48'>
            <Handle type='target' position={Position.Top} className='opacity-0' />
            <Handle
              type='source'
              position={Position.Bottom}
              className='opacity-0'
            />
            <div className='relative flex justify-center px-2 py-1 rounded-md border w-max shadow-md shadow-safwa-gray-4 border-black bg-[#c8c2f4]'>
              <Popover
                opened={opened}
                closeOnClickOutside
                clickOutsideEvents={['click']}
                onClose={() => setOpened(false)}
              >
                <Popover.Target>
                  <span
                    className='absolute top-0 -right-10 cursor-pointer'
                    onClick={() => setOpened(true)}
                  >
                    <Icon
                      icon='material-symbols:list-alt-rounded'
                      className='w-8 h-8 text-safwa-blue-1'
                    />
                  </span>
                </Popover.Target>
                {createPortal(
                  <Popover.Dropdown className='shadow-md max-h-96'>
                    <span
                      className='absolute right-1 top-1 cursor-pointer'
                      onClick={() => setOpened(false)}
                    >
                      <Icon
                        icon='ep:close-bold'
                        className='w-6 h-6 text-safwa-red-2'
                      />
                    </span>
                    <div className='pt-4 min-w-52 space-y-4 !z-100'>
                      {/* List */}
                      {list && (
                        <Accordion className='m-0 p-0'>
                          <Accordion.Item value='list' className='border-b-0'>
                            <Accordion.Control className=''>
                              <div className='flex space-x-4'>
                                <span>
                                  <Icon
                                    icon='clarity:list-line'
                                    className='w-8 h-8 text-safwa-blue-1'
                                  />
                                </span>
                                <span className='font-semibold text-safwa-blue-1'>
                                  {list[0]?.pbt_name
                                    ? 'List of PBT'
                                    : list[0]?.category
                                      ? 'Category'
                                      : ''}
                                </span>
                              </div>
                            </Accordion.Control>
                            <Accordion.Panel className='flex'>
                              <span className='ml-3 w-1 bg-safwa-gray-4 h-auto'></span>
                              <ul className='space-y-4 scrollbar-custom overflow-y-scroll max-h-32'>
                                {list?.map(
                                  (
                                    item: {
                                      pbt_name: Array<string>;
                                      category: Array<string>;
                                    },
                                    id: number
                                  ) => (
                                    <li
                                      key={id}
                                      className='flex relative item-center space-x-4'
                                    >
                                      <span className='absolute left-0 top-2 w-2 h-2 rounded-full bg-black'></span>
                                      <span>
                                        {item?.pbt_name || item?.category}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Accordion.Panel>
                          </Accordion.Item>
                        </Accordion>
                      )}
                      {/* accordion that contain the list of user on this specific stage */}
                      <Accordion>
                        <Accordion.Item value='user' className='border-b-0'>
                          {/* accordion button */}
                          <Accordion.Control>
                            <div className='flex space-x-4 items-center'>
                              <span>
                                <Icon
                                  icon='eos-icons:role-binding-outlined'
                                  className='w-8 h-8 text-safwa-blue-1'
                                />
                              </span>
                              <span className='font-semibold text-safwa-blue-1'>
                                List of users on this stage
                              </span>
                            </div>
                          </Accordion.Control>
                          {/* accordion content */}
                          <Accordion.Panel>
                            <span className='ml-2'>
                              {/* this check if either the input data return '*' or an array in the listEntCondition
                               * user on entry condition will be deleted in the near future
                               */}
                              {Array.isArray(listEntCondition?.user_id) ? (
                                listEntCondition.user_id.includes('*') ? (
                                  <span className='relative flex space-x-4 items-center'>
                                    <span className='absolute w-2 h-2 rounded-full bg-black'></span>
                                    <span>Any</span>
                                  </span>
                                ) : (
                                  <ul className='space-y-4'>
                                    {listEntCondition.user_id.map(
                                      (
                                        userId: string | Array<string>,
                                        id: number
                                      ) => (
                                        <li
                                          key={id}
                                          className='relative flex items-center'
                                        >
                                          <span className='absolute w-2 h-2 bg-black rounded-full'></span>
                                          <span className='pl-4'>{userId}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )
                              ) : listEntCondition?.user_id === '*' ? (
                                'Any'
                              ) : (
                                listEntCondition?.user_id
                              )}
                            </span>
                          </Accordion.Panel>
                        </Accordion.Item>
                      </Accordion>
                      {/* Requirement */}
                      {listRequirement && (
                        <div className='flex items-center'>
                          <span>
                            <Icon
                              className='w-8 h-8 text-safwa-blue-1'
                              icon='streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form'
                            />
                          </span>
                          <span>
                            Requirement:{' '}
                            {listRequirement.chk_doc.includes('*')
                              ? 'Any'
                              : listRequirement.chk_doc.map(
                                (item: Array<string>) => item
                              )}
                          </span>
                        </div>
                      )}
                    </div>
                  </Popover.Dropdown>,
                  document.body
                )}
              </Popover>
              <span className='truncate'>{label}</span>
            </div>
            {/* <span className='h-[9rem]'></span> */}
          </div>
        </div>
        <Handle
          type='source'
          position={Position.Left}
          className='opacity-0'
          id='a'
        />
        <Handle
          type='source'
          position={Position.Right}
          className='opacity-0'
          id='b'
        />
      </div>
    );
  },
  WithExit: (node: { data: { label: string; action: any; listEntCondition: any; listExtCondition: any; }; }) => {
    const [infoOpened, setInfoOpened] = React.useState(false);

    const label = node.data.label;
    const action = node.data.action;
    const listEntCondition = node.data.listEntCondition;
    const listExtCondition = node.data.listExtCondition;

    return (
      <div className='flex flex-col items-center justify-center w-48 !-z-10'>
        <div className='flex justify-center w-48'>
          <div className='relative flex justify-center px-2 py-1 rounded-md border w-max shadow-md shadow-safwa-gray-4 border-black bg-[#c8c2f4]'>
            {/* <div className='absolute -left-3 -top-1 w-10 h-10 rounded-full bg-[#c7e1fa]'></div> */}
            {RoleChecker(
              listExtCondition?.verifyrole_by ||
              listExtCondition?.approverole_by ||
              listExtCondition?.checkrole_by
            )}
            <span className='truncate'>{label}</span>
          </div>
        </div>
        <Handle type='target' position={Position.Top} className='opacity-0' />
        <Handle type='source' position={Position.Bottom} className='opacity-0' />
        <div className='relative flex items-center justify-center w-[95px] h-[95px]'>
          <Handle
            type='source'
            position={Position.Left}
            className='opacity-0'
            id='a'
          />
          <Handle type='source' position={Position.Right} className='opacity-0' />
          <div
            className={clsx(
              action === 'Verified'
                ? 'bg-[#ADD8E6]'
                : action === 'Checked'
                  ? 'bg-[#FFECB3]'
                  : action === 'Approved'
                    ? 'bg-[#90EE90]'
                    : '',
              'absolute h-[70px] w-[70px] rotate-45 border rounded-sm border-black shadow-md shadow-safwa-gray-4'
            )}
          ></div>

          <span className='z-10'>{action}</span>
          <Popover
            opened={infoOpened}
            clickOutsideEvents={['click']}
            closeOnClickOutside
            onClose={() => setInfoOpened(false)}
          >
            <Popover.Target>
              <span
                className='absolute bottom-3 cursor-pointer'
                onClick={() => setInfoOpened(true)}
              >
                <Icon
                  icon='mdi:information-variant-circle'
                  className='w-6 h-6 text-safwa-blue-1'
                />
              </span>
            </Popover.Target>
            {createPortal(
              <Popover.Dropdown className='shadow-md max-h-96'>
                <div className='flex flex-col'>
                  <span
                    className='absolute top-2 right-2'
                    onClick={() => setInfoOpened(false)}
                  >
                    <Icon
                      icon='iconamoon:close-fill'
                      className='w-8 h-8 cursor-pointer text-safwa-red-3'
                    />
                  </span>
                  <Accordion>
                    {/* action role accordion */}
                    <Accordion.Item value='Action' className='border-b-0'>
                      <Accordion.Control className='pr-2'>
                        <span className='font-semibold text-safwa-blue-1'>
                          List of role:
                        </span>
                      </Accordion.Control>
                      <Accordion.Panel>
                        {/* refer to the function itself to know how it works :) */}
                        {DataChecker(
                          listExtCondition?.verifyrole_by ||
                          listExtCondition?.checkrole_by ||
                          listExtCondition?.approverole_by
                        )}
                      </Accordion.Panel>
                    </Accordion.Item>

                    {/* person in charge of the action accordion */}
                    <Accordion.Item value='User' className='border-b-0'>
                      <Accordion.Control className='pr-2'>
                        <span className='font-semibold text-safwa-blue-1'>
                          Person in charge:
                        </span>
                      </Accordion.Control>{' '}
                      <Accordion.Panel className='max-h-32 overflow-y-scroll scrollbar-custom'>
                        {/* refer to the function itself to know how it works :) */}
                        {DataChecker(
                          listExtCondition?.verifyuser_by ||
                          listExtCondition?.checkuser_by ||
                          listExtCondition?.approveuser_by
                        )}
                      </Accordion.Panel>
                    </Accordion.Item>
                    {/* document's accordion */}
                    <Accordion.Item value='Document' className='border-b-0'>
                      <Accordion.Control className='pr-2'>
                        <span className='font-semibold text-safwa-blue-1'>
                          List of document:
                        </span>
                      </Accordion.Control>{' '}
                      <Accordion.Panel>
                        {/* refer to the function itself to know how it works :) */}
                        {DataChecker(listExtCondition?.chk_doc)}
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Popover.Dropdown>,
              document.body
            )}
          </Popover>
        </div>
      </div>
    );
  },
  WithEntryAndExit: (node: { data: { label: any; action: any; listEntCondition: any; listExtCondition: any; listRequirement: any; }; }) => {
    const [opened, setOpened] = React.useState(false);
    const [infoOpened, setInfoOpened] = React.useState(false);

    const label = node.data.label;
    const action = node.data.action;
    const listEntCondition = node.data.listEntCondition;
    const listExtCondition = node.data.listExtCondition;
    const list = listEntCondition?.pbt_data || listEntCondition?.cate_data;
    const listRequirement = node.data.listRequirement;

    return (
      <>
        <div className='flex flex-col items-center justify-center w-48 '>
          <div className='flex items-center justify-center w-48'>
            <div className='relative flex justify-center px-2 py-1 rounded-md border w-max shadow-md shadow-safwa-gray-4  border-black bg-safwa-purple-2'>
              {RoleChecker(
                listExtCondition?.verifyrole_by ||
                listExtCondition?.approverole_by ||
                listExtCondition?.checkrole_by
              )}

              <span className='truncate'>{label}</span>
              {/* ------ listEntCondition - a button that contain all the requirement for entry ----- */}
              <Popover
                opened={opened}
                closeOnClickOutside
                clickOutsideEvents={['click']}
                onClose={() => setOpened(false)}
              >
                <Popover.Target>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className='absolute top-0 -right-9 cursor-pointer'
                    onClick={() => setOpened(true)}
                  >
                    <Icon
                      icon='material-symbols:list-alt-rounded'
                      className='w-8 h-8 text-safwa-blue-1'
                    />
                  </motion.span>
                </Popover.Target>
                {createPortal(
                  <Popover.Dropdown className='shadow-md max-h-96'>
                    <span
                      className='absolute right-1 top-1 cursor-pointer'
                      onClick={() => setOpened(false)}
                    >
                      <Icon
                        icon='ep:close-bold'
                        className='w-6 h-6 text-safwa-red-2'
                      />
                    </span>
                    <div className='pt-4 min-w-52 space-y-4 !z-100'>
                      {/* List */}
                      {list && (
                        <Accordion className='m-0 p-0'>
                          <Accordion.Item value='list' className='border-b-0'>
                            <Accordion.Control className=''>
                              <div className='flex space-x-4'>
                                <span>
                                  <Icon
                                    icon='clarity:list-line'
                                    className='w-8 h-8 text-safwa-blue-1'
                                  />
                                </span>
                                <span className='font-semibold text-safwa-blue-1'>
                                  {list[0]?.pbt_name
                                    ? 'List of PBT'
                                    : list[0]?.category
                                      ? 'Categories'
                                      : ''}
                                </span>
                              </div>
                            </Accordion.Control>
                            <Accordion.Panel className='flex'>
                              <span className='ml-3 w-1 bg-safwa-gray-4 h-auto'></span>
                              <ul className='space-y-4 scrollbar-custom overflow-y-scroll max-h-32'>
                                {list?.map(
                                  (
                                    item: {
                                      pbt_name: Array<string>;
                                      category: Array<string>;
                                    },
                                    id: number
                                  ) => (
                                    <li
                                      key={id}
                                      className='flex relative item-center space-x-4'
                                    >
                                      <span className='absolute left-0 top-2 w-2 h-2 rounded-full bg-black'></span>
                                      <span>
                                        {item?.pbt_name || item?.category}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Accordion.Panel>
                          </Accordion.Item>
                        </Accordion>
                      )}
                      {/* accordion that contain the list of user on this specific stage */}
                      <Accordion>
                        <Accordion.Item value='user' className='border-b-0'>
                          {/* accordion button */}
                          <Accordion.Control>
                            <div className='flex space-x-4 items-center'>
                              <span>
                                <Icon
                                  icon='eos-icons:role-binding-outlined'
                                  className='w-8 h-8 text-safwa-blue-1'
                                />
                              </span>
                              <span className='font-semibold text-safwa-blue-1'>
                                List of users on this stage
                              </span>
                            </div>
                          </Accordion.Control>
                          {/* accordion content */}
                          <Accordion.Panel>
                            <span className='ml-2'>
                              {/* this check if either the input data return '*' or an array in the listEntCondition
                             * user on entry condition will be deleted in the near future
                             */}
                              {Array.isArray(listEntCondition?.user_id) ? (
                                listEntCondition.user_id.includes('*') ? (
                                  <span className='relative flex space-x-4 items-center'>
                                    <span className='absolute w-2 h-2 rounded-full bg-black'></span>
                                    <span>Any</span>
                                  </span>
                                ) : (
                                  <ul className='space-y-4'>
                                    {listEntCondition.user_id.map(
                                      (
                                        userId: string | Array<string>,
                                        id: number
                                      ) => (
                                        <li
                                          key={id}
                                          className='relative flex items-center'
                                        >
                                          <span className='absolute w-2 h-2 bg-black rounded-full'></span>
                                          <span className='pl-4'>{userId}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )
                              ) : listEntCondition?.user_id === '*' ? (
                                'Any'
                              ) : (
                                listEntCondition?.user_id
                              )}
                            </span>
                          </Accordion.Panel>
                        </Accordion.Item>
                      </Accordion>
                      {/* Requirement */}
                      {listRequirement && (
                        <div className='flex items-center'>
                          <span>
                            <Icon
                              className='w-8 h-8 text-safwa-blue-1'
                              icon='streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form'
                            />
                          </span>
                          <span>
                            Requirement:{' '}
                            {listRequirement.chk_doc.includes('*')
                              ? 'Any'
                              : listRequirement.chk_doc.map(
                                (item: Array<string>) => item
                              )}
                          </span>
                        </div>
                      )}
                    </div>
                  </Popover.Dropdown>,
                  document.body
                )}
              </Popover>
            </div>
          </div>
          <Handle type='target' position={Position.Top} className='opacity-0' />
          <Handle
            type='source'
            position={Position.Bottom}
            className='opacity-0'
          />
          <div className='relative flex items-center justify-center w-[95px] h-[95px]'>
            <Handle
              type='source'
              position={Position.Left}
              className='opacity-0'
              id='a'
            />
            <Handle
              type='source'
              position={Position.Right}
              className='opacity-0'
              id='b'
            />
            <div
              className={clsx(
                action === 'Verified'
                  ? 'bg-[#ADD8E6]'
                  : action === 'Approved'
                    ? 'bg-[#90EE90]'
                    : action === 'Checked'
                      ? 'bg-[#FFECB3]'
                      : '',
                'absolute h-[70px] w-[70px] rotate-45 border rounded-sm shadow-md shadow-safwa-gray-4 border-black'
              )}
            ></div>
            <span
              className={clsx(
                action === 'Verified'
                  ? ''
                  : action === 'Checked'
                    ? ''
                    : action === 'Approved'
                      ? ''
                      : '',
                'z-10'
              )}
            >
              {action}
            </span>

            {/* popover in condition, basically it contain everything from list exit condition (listExtCondition) */}
            <Popover
              opened={infoOpened}
              closeOnClickOutside={true}
              onClose={() => setInfoOpened(false)}
              clickOutsideEvents={['click']}
            >
              <Popover.Target>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className='absolute top-[4.5rem] z-10 cursor-pointer hover:scale-125'
                  onClick={() => setInfoOpened(true)}
                >
                  <Icon
                    icon='mdi:information-variant-circle'
                    className='w-6 h-6 text-safwa-blue-1'
                  />
                </motion.span>
              </Popover.Target>
              {createPortal(
                <Popover.Dropdown className='shadow-md max-h-96'>
                  <div className='flex flex-col'>
                    <span
                      className='absolute top-2 right-2'
                      onClick={() => setInfoOpened(false)}
                    >
                      <Icon
                        icon='iconamoon:close-fill'
                        className='w-8 h-8 cursor-pointer text-safwa-red-3'
                      />
                    </span>
                    <Accordion>
                      {/* action role accordion */}
                      <Accordion.Item value='Action' className='border-b-0'>
                        <Accordion.Control className='pr-2'>
                          <span className='font-semibold text-safwa-blue-1'>
                            List of role:
                          </span>
                        </Accordion.Control>
                        <Accordion.Panel>
                          {/* refer to the function itself to know how it works :) */}
                          {DataChecker(
                            listExtCondition?.verifyrole_by ||
                            listExtCondition?.checkrole_by ||
                            listExtCondition?.approverole_by
                          )}
                        </Accordion.Panel>
                      </Accordion.Item>

                      {/* person in charge of the action accordion */}
                      <Accordion.Item value='User' className='border-b-0'>
                        <Accordion.Control className='pr-2'>
                          <span className='font-semibold text-safwa-blue-1'>
                            Person in charge:
                          </span>
                        </Accordion.Control>{' '}
                        <Accordion.Panel className='max-h-32 overflow-y-scroll scrollbar-custom'>
                          {/* refer to the function itself to know how it works :) */}
                          {DataChecker(
                            listExtCondition?.verifyuser_by ||
                            listExtCondition?.checkuser_by ||
                            listExtCondition?.approveuser_by
                          )}
                        </Accordion.Panel>
                      </Accordion.Item>
                      {/* document's accordion */}
                      <Accordion.Item value='Document' className='border-b-0'>
                        <Accordion.Control className='pr-2'>
                          <span className='font-semibold text-safwa-blue-1'>
                            List of document:
                          </span>
                        </Accordion.Control>{' '}
                        <Accordion.Panel>
                          {/* refer to the function itself to know how it works :) */}
                          {DataChecker(listExtCondition?.chk_doc)}
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Popover.Dropdown>,
                document.body
              )}
            </Popover>
          </div>
        </div>
      </>
    );
  },
  End: (node: { data: { label: string } }) => {
    return (
      <div className='flex flex-col items-center justify-center w-48'>
        <Handle type='target' position={Position.Top} className='opacity-0' />
        <Handle type='source' position={Position.Bottom} className='opacity-0' />
        <Handle
          type='source'
          position={Position.Left}
          className='opacity-0'
          id='a'
        />
        <Handle type='source' position={Position.Right} className='opacity-0' />
        <div className='flex flex-col items-center justify-center w-48'>
          <img
            src='/business_process/LastStage.svg'
            alt=''
            className='w-40 h-w-40 z-10'
          />
          <div className='flex justify-center px-2 py-1 -mt-2 rounded-md border w-max shadow-md shadow-safwa-gray-4 border-black bg-[#c8c2f4]'>
            {/* <div className='absolute -left-3 -top-1 w-10 h-10 rounded-full bg-[#c7e1fa]'></div> */}
            <span className='truncate'>{node.data.label}</span>
          </div>
        </div>
      </div>
    )
  },
  default: (node: { data: { label: string } }) => {
    return (
      <>
        <Handle type='target' position={Position.Top} className='opacity-0' />
        <Handle
          type='target'
          position={Position.Left}
          className='opacity-0'
          id='a'
        />
        <Handle type='target' position={Position.Right} className='opacity-0' />
        <div className='flex justify-center w-48'>
          <div className='flex justify-center px-2 py-1 rounded-md border w-max border-black bg-[#c8c2f4]'>
            {/* <div className='absolute -left-3 -top-1 w-10 h-10 rounded-full bg-[#c7e1fa]'></div> */}
            <span className='truncate'>{node.data.label}</span>
          </div>
        </div>
        <Handle type='source' position={Position.Bottom} className='opacity-0' />
      </>
    )
  },
};

function getNodeType(node: Record<string, any>) {
  const { type, data } = node;
  const { label, listEntCondition, listExtCondition } = data || {};

  if (type === 'Start') {
    return 'Start';
  }

  if (type === 'End') {
    if (label === 'FCA-01-02-Payment-Process') {
      return 'End';
    }

    const hasEntry = !isObjectEmpty(listEntCondition);
    const hasExit = !isObjectEmpty(listExtCondition);

    if (hasEntry && hasExit) {
      return 'WithEntryAndExit';
    }
    if (!hasEntry && hasExit) {
      return 'WithExit';
    }
    if (hasEntry && !hasExit) {
      return 'WithEntry';
    }
    return 'default';
  }
}

const Diagram = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_id = params.cycle_id;
  const selected_app = searchParams.get('selected_app');

  const [opened, { open, close, toggle }] = useDisclosure(false);


  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, fetchNodesEdges } = useDiagramStore(
    useShallow(selector),
  );

  const refineNodes = nodes.map((node) => {
    return {
      ...node,
      type: getNodeType(node),
    };
  });

  const refineEdges = edges.map((edge) => {
    const { source, target } = edge;
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (!sourceNode || !targetNode) {
      return edge;
    }

    const sourceNodeType = getNodeType(sourceNode);
    const targetNodeType = getNodeType(targetNode);

    if (sourceNodeType === 'Start' && targetNodeType === 'WithEntry') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'Start' && targetNodeType === 'WithEntryAndExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'Start' && targetNodeType === 'WithExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntry' && targetNodeType === 'WithEntry') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntry' && targetNodeType === 'WithEntryAndExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntry' && targetNodeType === 'WithExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntry' && targetNodeType === 'End') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntryAndExit' && targetNodeType === 'WithEntry') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntryAndExit' && targetNodeType === 'WithEntryAndExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntryAndExit' && targetNodeType === 'WithExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithEntryAndExit' && targetNodeType === 'End') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithExit' && targetNodeType === 'WithEntry') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithExit' && targetNodeType === 'WithExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    if (sourceNodeType === 'WithExit' && targetNodeType === 'WithEntryAndExit') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }


    if (sourceNodeType === 'WithExit' && targetNodeType === 'End') {
      return {
        ...edge,
        animated: false,
        type: 'smoothstep',
      };
    }

    return edge;
  });

  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
  };

  return (
    <ReactFlowProvider>
      <Modal
        centered
        opened={opened}
        onClose={close}
        radius='lg'
        transitionProps={{ transition: 'fade', duration: 200 }}
        closeButtonProps={{
          icon: <Icon icon="mingcute:close-fill" width="1.2rem" height="1.2rem" className='!text-[#895CF3]' />,
        }}
        size="xl"
      >
        {/* here where you put the Diagram (reactflow) */}
        {/* <Image src='/Diagram.png' width={1000} height={1000} alt='diagram' className='object-cover' /> */}
        <div style={{ height: '80vh' }}>
          <ReactFlow
            nodes={refineNodes}
            edges={refineEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView={true}
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
          >
            {/* <Background /> */}
            <Controls />
            {/* <DevTools /> */}

            <span className='absolute top-3 right-3 text-xs text-safwa-gray-3'>
              Cycle id: <span>{cycle_id}</span>
            </span>
            <span className='absolute right-2 bottom-1 text-[8px] text-safwa-gray-3'>
              Powered by Schinkels Technik
            </span>
          </ReactFlow>
        </div>

      </Modal>

      <Button
        // disabled
        variant='filled'
        color='#F1F5F9'
        c='#0F172A'
        radius='md'
        size="sm"
        fz={14}
        onClick={async () => {
          await fetchNodesEdges({
            cycle_id: cycle_id as string,
            apps_label: selected_app as string
          })
            .catch((error) => toast.error(error.message))
            .finally(() => open())
        }}
        classNames={{
          root: 'disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]',
        }}
      >
        Business Process Diagram
      </Button>
      <style jsx global>{`
        .react-flow__panel.right {
          display: none;
        }
      `}</style>
    </ReactFlowProvider>
  )


};

export default Diagram;