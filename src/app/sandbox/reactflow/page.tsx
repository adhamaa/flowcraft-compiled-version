'use client';

import * as React from 'react'
import ReactFlow, { Background, Controls, DefaultEdgeOptions, Edge, EdgeChange, FitViewOptions, MiniMap, Node, NodeChange, NodeResizeControl, NodeResizer, NodeTypes, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow } from 'reactflow';
import { RFState } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import useDiagramStore from '@/store/Diagram';
import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';
import { Button, Modal, Tabs } from '@mantine/core';
import { getDiagramData } from '@/lib/service/client';
import { useParams, useSearchParams } from 'next/navigation';
import toast from '@/components/toast';
import ColorChooserNode from '@/components/reactflow/nodeTypes/ColorChooserNode';
import DevTools from '@/components/reactflow/Devtools';
import Diagram from '@/app/cycle/_components/Diagram';
import { useDisclosure } from '@mantine/hooks';
import { Icon } from '@iconify-icon/react';

const nodeTypes = { colorChooser: ColorChooserNode };

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  fetchNodesEdges: state.fetchNodesEdges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const DiagramPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_id = params.cycle_id;
  const selected_app = searchParams.get('selected_app');

  const [opened, { open, close, toggle }] = useDisclosure(false);
  const { fetchNodesEdges } = useDiagramStore(
    useShallow(selector),
  );
  return (
    <div className='grid place-items-center h-screen'>
      <Tabs variant='pills'>
        <Tabs.List>
          <Tabs.Tab value="cycle">Cycle</Tabs.Tab>
          <Tabs.Tab value="stage">Stage</Tabs.Tab>
          <Tabs.Tab value="process">Process</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cycle" className='grid place-items-center h-96'>
          {/* <Modal
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
            <Flow />
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
                cycle_id: cycle_id as string || '2',
                apps_label: selected_app as string || 'SP',
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
          <Diagram />
        </Tabs.Panel>
      </Tabs >

    </div>
  )
}

export default DiagramPage

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, fetchNodesEdges, setNodes, setEdges } = useDiagramStore(
    useShallow(selector),
  );

  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
  };
  return (
    <div style={{ height: '100vh' }}>
      <Button
        type='button'
        classNames={{
          root: 'absolute top-4 right-0 m-4 z-10',
        }}
        onClick={() => fetchNodesEdges({
          cycle_id: "2",
          apps_label: "SP"
        })}
      >Fetch Nodes and Edges</Button>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />

          <DevTools />

        </ReactFlow>

      </ReactFlowProvider>
    </div>
  )
};