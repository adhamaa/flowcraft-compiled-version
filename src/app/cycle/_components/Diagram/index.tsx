'use client';

import toast from '@/components/toast';
import { getDiagramData } from '@/lib/service/client';
import { Icon } from '@iconify-icon/react';
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import * as React from 'react';
import ReactFlow, { EdgeChange, NodeChange, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';
import 'reactflow/dist/style.css';
import useDiagramStore, { RFState } from '@/store/Diagram';

interface UseDiagramProps {
  edges?: any[];
  nodes?: any[];
}

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const Diagram = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_id = params.cycle_id;
  const selected_app = searchParams.get('selected_app');

  const [opened, { open, close, toggle }] = useDisclosure(false);


  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useDiagramStore(
    useShallow(selector),
  );

  return (
    <>
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
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        />

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
          await getDiagramData({
            cycle_id: cycle_id as string,
            apps_label: selected_app as string
          })
            .then((diagramResponse) => {
              
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
    </>
  )


};

export default Diagram;