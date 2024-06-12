import Circle from '@/app/cycle/restructure/[cycle_uuid]/_component/circle';
import * as React from 'react';
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow';

const EndNode = ({ data: { label }, selected }: NodeProps) => {
  return (
    <div className='flex flex-col items-center'>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Top} className='opacity-0' />
      <Circle />
      {/* <div className='border border-gray-300 p-4'>
        <label htmlFor={node.data.label}>{node.data.label}</label>
      </div> */}
      {/* <Handle type="source" position={Position.Bottom} className='opacity-0' /> */}
    </div>
  )
};

export default React.memo(EndNode);