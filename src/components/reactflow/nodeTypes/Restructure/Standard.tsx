import Circle from '@/app/cycle/restructure/[cycle_uuid]/_component/circle';
import Rectangle from '@/app/cycle/restructure/[cycle_uuid]/_component/rectangle';
import clsx from 'clsx';
import * as React from 'react';
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow';

const Standard = ({ data, selected, type }: NodeProps) => {
  return (
    <div className={clsx(
      'flex flex-col items-center w-60',
      selected && 'border border-dashed border-[#895CF3]'
    )}>
      {/* <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} /> */}
      <Handle type="target" position={Position.Top} className='opacity-0' />
      <div className='border border-gray-300 p-4'>
        <label htmlFor={data.label}>{data.label}</label>
      </div>
      {(type === "Start" || type === "End") ? <Circle /> : <Rectangle width={120} height={110} />}

      <Handle type="source" position={Position.Bottom} className='opacity-0' />
    </div>
  )
};

export default React.memo(Standard);