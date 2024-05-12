'use client';

import * as React from 'react'
import ReactFlow, { Background, Controls, DefaultEdgeOptions, Edge, EdgeChange, FitViewOptions, MiniMap, Node, NodeChange, NodeResizeControl, NodeResizer, NodeTypes, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow } from 'reactflow';
import DevTools from '../../../components/reactflow/Devtools';
import { RFState } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import useDiagramStore from '@/store/Diagram';
import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';
import { Button } from '@mantine/core';
import { getDiagramData } from '@/lib/service/client';
import { useParams, useSearchParams } from 'next/navigation';
import toast from '@/components/toast';


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
        // nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
          <NodeResizer />
          <NodeResizeControl />
          <DevTools />

        </ReactFlow>

      </ReactFlowProvider>
    </div>
  )
}

export default DiagramPage