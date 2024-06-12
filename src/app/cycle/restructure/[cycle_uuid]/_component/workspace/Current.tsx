'use client';

import Diagram from '@/app/cycle/_components/Diagram';
import useDiagramStore, { RFState } from '@/store/Diagram';
import { useDisclosure } from '@mantine/hooks';
import { useParams, useSearchParams } from 'next/navigation';
import * as React from 'react'
import ReactFlow, { Background, Controls, DefaultEdgeOptions, FitViewOptions, Handle, MarkerType, Node, NodeResizer, ReactFlowProvider } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';
import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';
import Circle from '../circle';
import Diamond from '../diamond';
import FloatingEdge from '@/components/reactflow/edgeTypes/FloatingEdge';
import FloatingConnectionLine from '@/components/reactflow/edgeTypes/FloatingConnectionLine';
import StartNode from '@/components/reactflow/nodeTypes/Restructure/StartNode';
import EndNode from '@/components/reactflow/nodeTypes/Restructure/EndNode';
import WithEntryAndExitNode from '@/components/reactflow/nodeTypes/Restructure/WithEntryAndExitNode';
import WithEntry from '@/components/reactflow/nodeTypes/Restructure/WithEntry';
import WithExit from '@/components/reactflow/nodeTypes/Restructure/WithExit';
import CalculateNodePositions, { calculateNodePositions2 } from '@/components/reactflow/CalculateNodePositions';

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

function Current() {
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_id = params.cycle_id;
  const selected_app = searchParams.get('selected_app');

  const [opened, { open, close, toggle }] = useDisclosure(false);
  const [renderDiagram, setRenderDiagram] = React.useState(false);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, fetchNodesEdges } = useDiagramStore(
    useShallow(selector),
  );

  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: false,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.Arrow },
  };

  return (
    <div className='h-full space-y-6'>
      <h1 className='text-xl font-semibold'>Current Cycle Diagram</h1>
      <div className='border border-black rounded-xl h-full'>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView={true}
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineComponent={FloatingConnectionLine}
            edgeTypes={{ floating: FloatingEdge }}
            nodeTypes={{
              Start: StartNode,
              WithEntry: WithEntry,
              WithExit: WithExit,
              WithEntryAndExit: WithEntryAndExitNode,
              End: EndNode,
            }}
          // nodesDraggable={false}
          >
            <Background />
            <Controls />
            {/* <DevTools /> */}

            {/* <span className='absolute top-3 right-3 text-xs text-safwa-gray-3'>
                Cycle id: <span>{cycle_id}</span>
              </span>
              <span className='absolute right-2 bottom-1 text-[8px] text-safwa-gray-3'>
                Powered by Schinkels Technik
              </span> */}
          </ReactFlow>

          <style jsx global>{`
        .react-flow__panel.right {
          display: none;
        }
      `}</style>
        </ReactFlowProvider>
      </div>
    </div>
  );
};
export default Current

// new store for this \
// shape
// action