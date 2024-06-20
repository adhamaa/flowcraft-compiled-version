import Circle from '@/app/cycle/restructure/[cycle_uuid]/_component/circle';
import clsx from 'clsx';
import * as React from 'react';
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow';

const StartNode = ({ data: { label }, selected }: NodeProps) => {
  return (
    <div className={clsx('flex flex-col items-center w-60', selected && 'border border-dashed border-indigo-400')}>
      {/* <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} /> */}
      {/* <Handle type="target" position={Position.Top} className='opacity-0' /> */}
      <div className='border border-gray-300 p-4'>
        <label htmlFor={label}>{label}</label>
      </div>
      <Circle />
      <Handle type="source" position={Position.Bottom} className='opacity-0' />
    </div>
  )
};

export default React.memo(StartNode);