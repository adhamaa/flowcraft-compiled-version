'use client';

import toast from '@/components/toast';
import { getDiagramData } from '@/lib/service/client';
import { Icon } from '@iconify-icon/react';
import { Modal, Button } from '@mantine/core';
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

const nodeTypes = {
  Start: (node: { data: { label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => {
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
  End: (node: { data: { label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => {
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
  default: (node: { data: { label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => {
    return (
      <div>
        HELLO WORLD!
      </div>
    )
  },
};

const Diagram = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_id = params.cycle_id;
  const selected_app = searchParams.get('selected_app');

  const [opened, { open, close, toggle }] = useDisclosure(false);


  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, fetchNodesEdges } = useDiagramStore(
    useShallow(selector),
  );

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
        size="lg"
      >
        {/* here where you put the Diagram (reactflow) */}
        {/* <Image src='/Diagram.png' width={1000} height={1000} alt='diagram' className='object-cover' /> */}
        <div style={{ height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onInit={(instance) => {
              console.log('initialize reactflow', !!instance)
            }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView={true}
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
          >
            <Controls className='z-50 border' />
            <Background />

            {/* <DevTools /> */}
          </ReactFlow>
        </div>

      </Modal>

      {/* <Button
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
      </Button> */}
    </ReactFlowProvider>
  )


};

export default Diagram;