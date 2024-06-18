import Diamond from '@/app/cycle/restructure/[cycle_uuid]/_component/diamond';
import * as React from 'react';
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow';

const WithExitNode = ({ data: { label }, selected }: NodeProps) => {
  return (
    <div className='flex flex-col items-center w-60'>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Top} className='opacity-0' />
      {/* <div className='border border-gray-300 p-4'>
        <label htmlFor={node.data.label}>{node.data.label}</label>
      </div> */}
      <Diamond width={120} height={110} />
      <Handle type="source" position={Position.Bottom} className='opacity-0' />
    </div>
  )
};

export default React.memo(WithExitNode);