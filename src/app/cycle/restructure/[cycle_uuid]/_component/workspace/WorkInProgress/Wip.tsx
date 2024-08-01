'use client';

import * as React from 'react'
import { useSearchParams } from 'next/navigation';
import ReactFlow, { Background, Controls, DefaultEdgeOptions, FitViewOptions, MarkerType, ReactFlowState, useReactFlow, useStore, useStoreApi, useUpdateNodeInternals } from 'reactflow';
import FloatingEdge from '@/components/reactflow/edgeTypes/FloatingEdge';
import FloatingConnectionLine from '@/components/reactflow/edgeTypes/FloatingConnectionLine';
import useWorkInProgressDiagram from '@/store/WorkInProgressDiagram';
import Standard from '@/components/reactflow/nodeTypes/Restructure/Standard';

import { shallow } from 'zustand/shallow';
import 'reactflow/dist/style.css';
import '@/components/reactflow/style.css';

const nodeTypes = {
  Start: Standard,
  WithEntry: Standard,
  WithExit: Standard,
  WithEntryAndExit: Standard,
  End: Standard,
  Standard: Standard
};

const edgeTypes = { floating: FloatingEdge };

function Wip() {
  const searchParams = useSearchParams();
  const cycle_id = searchParams.get('cycle_id');
  const selected_app = searchParams.get('selected_app');

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setRfInstance, fetchNodesEdges } = useWorkInProgressDiagram();

  const store = useStoreApi();

  const { isInteractive } = useStore((s) => ({
    isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable
  }), shallow);

  const handleInteractivity = (state: boolean) => store.setState({
    nodesDraggable: state,
    nodesConnectable: state,
    elementsSelectable: state,
  });

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

  React.useEffect(() => {
    if (isInteractive) {
      handleInteractivity(false);
    }
  }, []);

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
          nodesDraggable={false}
        >
          <Background />
          <Controls showInteractive={true} onInteractiveChange={
            (isInteractive) => {
              console.log('Interactive change:', isInteractive);
            }
          } />
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