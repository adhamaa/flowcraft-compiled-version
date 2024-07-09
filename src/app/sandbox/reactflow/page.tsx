'use client';


import { calculateNodePositions } from '@/components/reactflow/CalculateNodePositions';
import DevTools from '@/components/reactflow/Devtools';
import { Button } from '@mantine/core';
import * as React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Connection,
  Edge,
  Background,
  Controls,
  useNodes,
  ConnectionLineType,
} from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';


const initialNodes = [
  { data: { label: "Start" }, id: "1", type: "Start", position: { x: 0, y: 0 }, width: 100, height: 50 },
  { data: { label: "Node 1" }, id: "2", type: "Node", position: { x: 0, y: 0 }, width: 120, height: 60 },
  { data: { label: "Node 2" }, id: "3", type: "Node", position: { x: 0, y: 0 }, width: 130, height: 70 },
  { data: { label: "Node 3" }, id: "4", type: "Node", position: { x: 0, y: 0 }, width: 140, height: 80 },
  { data: { label: "Node 4" }, id: "5", type: "Node", position: { x: 0, y: 0 }, width: 150, height: 90 },
  { data: { label: "Node 5" }, id: "6", type: "Node", position: { x: 0, y: 0 }, width: 160, height: 100 },
  { data: { label: "Node 6" }, id: "7", type: "Node", position: { x: 0, y: 0 }, width: 170, height: 110 },
  { data: { label: "Node 7" }, id: "8", type: "Node", position: { x: 0, y: 0 }, width: 180, height: 120 },
  { data: { label: "Node 8" }, id: "9", type: "Node", position: { x: 0, y: 0 }, width: 190, height: 130 },
  { data: { label: "Node 9" }, id: "10", type: "Node", position: { x: 0, y: 0 }, width: 200, height: 140 },
  { data: { label: "Node 10" }, id: "11", type: "Node", position: { x: 0, y: 0 }, width: 210, height: 150 },
  { data: { label: "Node 11" }, id: "12", type: "Node", position: { x: 0, y: 0 }, width: 220, height: 160 },
  { data: { label: "Node 12" }, id: "13", type: "Node", position: { x: 0, y: 0 }, width: 230, height: 170 },
];

const initialEdges = [
  { id: '1-2', source: "1", style: { borderWidth: "1px", width: "1px" }, target: "2" },
  { id: '1-3', source: "1", style: { borderWidth: "1px", width: "1px" }, target: "3" },
  { id: '1-4', source: "1", style: { borderWidth: "1px", width: "1px" }, target: "4" },
  { id: '2-5', source: "2", style: { borderWidth: "1px", width: "1px" }, target: "5" },
  { id: '3-5', source: "3", style: { borderWidth: "1px", width: "1px" }, target: "5" },
  { id: '4-5', source: "4", style: { borderWidth: "1px", width: "1px" }, target: "5" },
  { id: '5-6', source: "5", style: { borderWidth: "1px", width: "1px" }, target: "6" },
  { id: '5-7', source: "5", style: { borderWidth: "1px", width: "1px" }, target: "7" },
  { id: '6-8', source: "6", style: { borderWidth: "1px", width: "1px" }, target: "8" },
  { id: '7-8', source: "7", style: { borderWidth: "1px", width: "1px" }, target: "8" },
  { id: '8-9', source: "8", style: { borderWidth: "1px", width: "1px" }, target: "9" },
  { id: '8-10', source: "8", style: { borderWidth: "1px", width: "1px" }, target: "10" },
  { id: '8-11', source: "8", style: { borderWidth: "1px", width: "1px" }, target: "11" },
  { id: '8-12', source: "8", style: { borderWidth: "1px", width: "1px" }, target: "12" },
  { id: '9-13', source: "9", style: { borderWidth: "1px", width: "1px" }, target: "13" },
  { id: '10-13', source: "10", style: { borderWidth: "1px", width: "1px" }, target: "13" },
  { id: '11-13', source: "11", style: { borderWidth: "1px", width: "1px" }, target: "13" },
  { id: '12-13', source: "12", style: { borderWidth: "1px", width: "1px" }, target: "13" },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 150; // horizontal space between nodes
const nodeHeight = 100; // vertical space between nodes

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = React.useCallback(
    (params: Edge | Connection) => {
      console.log('params:', params)
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.Step, animated: true }, eds)
      )
    },
    []
  );
  const onLayout = React.useCallback(
    (direction: string | undefined) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={{ animated: false, type: ConnectionLineType.Step }}
      fitView
    >
      <Panel position="top-right" className='space-x-2'>
        <Button onClick={() => onLayout('TB')}>vertical layout</Button>
        <Button onClick={() => onLayout('LR')}>horizontal layout</Button>
        <Button onClick={() => {
          setNodes([...nodes, { data: { label: "Node 6 copy" }, id: "13-copy", type: "Node", position: { x: 0, y: 0 }, width: 170, height: 110 },
          ]);
        }}>add node</Button>
        <Button onClick={() => {

          setEdges([...edges, { id: '7-13-copy', source: "7", style: { borderWidth: "1px", width: "1px" }, target: "13-copy" }, { id: '13-copy-13', source: "13-copy", style: { borderWidth: "1px", width: "1px" }, target: "13" }, { id: '8-13-copy', source: "8", style: { borderWidth: "1px", width: "1px" }, target: "13-copy" },]);
        }}>add edges</Button>
      </Panel>
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default () => (
  <div className='h-screen'>
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  </div>
);
