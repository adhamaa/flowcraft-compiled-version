import * as React from 'react';
import { Handle, Position, NodeResizer, Node } from 'reactflow';

const ResizableNodeSelected = ({ data, selected }: Node) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default React.memo(ResizableNodeSelected);
