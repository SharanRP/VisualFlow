import React from 'react';
import { Handle, Position } from 'reactflow';


const ParallelogramNode = ({ data }) => {

    const height = data.label.length * 1000;
    const width = 500;

  return (
    <div style={{ 
      width: `${width}`, 
      height: `${height}`, 
      borderRadius:5,
      transform: 'skew(-20deg)', 
      border: '1px solid black',
      backgroundColor: data.color,
    }}>
      <span className='px-10 py-3' style ={{transform:'skew(20deg' , display:'block'}}>{data.label}</span>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom}  />
    </div>
  );
};

export default ParallelogramNode;
