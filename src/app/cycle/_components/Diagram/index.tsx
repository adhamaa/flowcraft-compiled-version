'use client';

import toast from '@/components/toast';
import { getDiagramData } from '@/lib/service/client';
import { Icon } from '@iconify-icon/react';
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import * as React from 'react';
import ReactFlow, { Background, Controls, DefaultEdgeOptions, FitViewOptions, ReactFlowProvider } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';
import useDiagramStore, { RFState } from '@/store/Diagram';
import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';
import DevTools from '@/components/reactflow/Devtools';


const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  fetchNodesEdges: state.fetchNodesEdges,
});

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
          {/* <Button
            type='button'
            classNames={{
              root: 'absolute top-4 right-0 m-4 z-10',
            }}
            onClick={() => fetchNodesEdges({
              cycle_id: "2",
              apps_label: "SP"
            })}
          >Fetch Nodes and Edges</Button> */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
          // nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />

            <DevTools />
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
    </ReactFlowProvider>
  )


};

export default Diagram;