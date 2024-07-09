'use client';

import * as React from 'react'
import { useParams, useSearchParams } from 'next/navigation';
import ReactFlow, { Background, Controls, DefaultEdgeOptions, FitViewOptions, MarkerType, ReactFlowProvider, useNodes, useStore, useStoreApi } from 'reactflow';
import FloatingEdge from '@/components/reactflow/edgeTypes/FloatingEdge';
import FloatingConnectionLine from '@/components/reactflow/edgeTypes/FloatingConnectionLine';
import StartNode from '@/components/reactflow/nodeTypes/Restructure/StartNode';
import EndNode from '@/components/reactflow/nodeTypes/Restructure/EndNode';
import WithEntryAndExitNode from '@/components/reactflow/nodeTypes/Restructure/WithEntryAndExitNode';
import WithEntry from '@/components/reactflow/nodeTypes/Restructure/WithEntry';
import WithExit from '@/components/reactflow/nodeTypes/Restructure/WithExit';

import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import { Button } from '@mantine/core';

const nodeTypes = {
  Start: StartNode,
  WithEntry: WithEntry,
  WithExit: WithExit,
  WithEntryAndExit: WithEntryAndExitNode,
  End: EndNode,
};

const edgeTypes = { floating: FloatingEdge };

function Wip() {
  const params = useParams();
  const searchParams = useSearchParams();
  const cycle_id = searchParams.get('cycle_id');
  const selected_app = searchParams.get('selected_app');

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setRfInstance, fetchNodesEdges } = useWorkInProgressDiagram();

  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: false,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.Arrow },
  };

  React.useEffect(() => {
    fetchNodesEdges({
      cycle_id: cycle_id as string,
      apps_label: selected_app as any
    });
  }, [cycle_id, selected_app]);

  return (
    <div className='h-full space-y-6'>
      <h1 className='text-xl font-semibold'>Work In Progress Diagram</h1>
      <div className='border border-black rounded-xl h-full'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit={setRfInstance}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView={true}
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineComponent={FloatingConnectionLine}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
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
      </div>
    </div >
  );
};

export default Wip;