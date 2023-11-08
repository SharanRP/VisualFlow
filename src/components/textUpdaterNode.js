import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import React, { useState } from 'react';
//const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable  }) {
  // const [inputValue, setInputValue] = useState("");  
//   const onChange = useCallback((evt) => {
//     const newValue = evt.target.value;
//     console.log(newValue)
//    // setInputValue(newValue)
//   }, []);
const handleChange = (event) => {
    if(data.label === "Input Node")
    {
        data.handleInputChange(data.id , event)
    }
    else if(data.label === "Operator Node")
    {
        data.handleOperatorChange(event)
    }
}

 // console.log(inputValue)
  return (
    <div >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text"></label>
        <input name="text" value = {data.defaultValue} onChange={handleChange} className="nodrag" placeholder={data.label} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
       // style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}
export default TextUpdaterNode;


