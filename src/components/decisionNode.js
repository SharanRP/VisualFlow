import React from 'react';
import { Handle , Position } from 'reactflow';


const DecisionNode = ({ data , isConnectable}) => {
  return (
    <div style={{ 
      width: '100px', 
      height: '100px', 
      transform: 'rotate(45deg)', 
      border: '1px solid black',
      backgroundColor: data.color,
    }}>
      <div style={{
        transform: 'rotate(-45deg)',
        textAlign: 'center',
        lineHeight: '100px',
      }}>
        {data.label}

      <Handle type="target" position={Position.Top} isConnectable={true} />
      <Handle type="source" position={Position.Bottom} isConnectable={true} />
      <Handle type="source" id ='a' position={Position.Right} isConnectable={true} />
      <Handle type="source" id ='b' position={Position.Left} isConnectable={true} />

      </div>
    </div>
  );
};

export default DecisionNode;

// import React from 'react';
// import { Handle , Position } from 'reactflow';

// const DecisionNode = ({ data }) => {
//   return (
//     <div style={{ 
//       width: '100px', 
//       height: '100px', 
//       transform: 'rotate(45deg)', 
//       border: '1px solid black',
//       backgroundColor: data.color,
//       position: 'relative',
//     }}>
//       <Handle
//         type="source"
//         position={Position.Top}
//        // style={{ left: '50%', background: '#555' }}
//         onConnect={(params) => console.log('handle onConnect', params)}
//         isConnectable={true} // Set isConnectable to true
//       />
//       <Handle
//         type="source"
//         position={Position.Right}
//        // style={{ top: '50%', background: '#555' }}
//         onConnect={(params) => console.log('handle onConnect', params)}
//         isConnectable={true} // Set isConnectable to true
//       />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//        // style={{ left: '50%', background: '#555' }}
//         onConnect={(params) => console.log('handle onConnect', params)}
//         isConnectable={true} // Set isConnectable to true
//       />
//       <Handle
//         type="source"
//         position={Position.Left}
//        // style={{ top: '50%', background: '#555' }}
//         onConnect={(params) => console.log('handle onConnect', params)}
//         isConnectable={true} // Set isConnectable to true
//       />
//       <div style={{
//         transform: 'rotate(-45deg)',
//         textAlign: 'center',
//         lineHeight: '100px',
//       }}>
//         {data.label}
//       </div>
//     </div>
//   );
// };

// export default DecisionNode;




// import React from 'react';

// const DecisionNode = ({ data }) => {
//   const handleStyle = {
//     position: 'absolute',
//     width: '10px',
//     height: '10px',
//     backgroundColor: 'red',
//     border: '1px solid black',
//   };

//   const topLeftHandle = { top: '-6px', left: '-6px' };
//   const topRightHandle = { top: '-6px', right: '-6px' };
//   const bottomLeftHandle = { bottom: '-6px', left: '-6px' };
//   const bottomRightHandle = { bottom: '-6px', right: '-6px' };

//   return (
//     <div style={{ 
//       width: '100px', 
//       height: '100px', 
//       transform: 'rotate(45deg)', 
//       border: '1px solid black',
//       backgroundColor: data.color,
//       position: 'relative',
//     }}>
//       <div style={{
//         transform: 'rotate(-45deg)',
//         textAlign: 'center',
//         lineHeight: '100px',
//         zIndex: 1, // Ensure the label is above the handles
//       }}>
//         {data.label}
//       </div>
//       <div style={{ ...handleStyle, ...topLeftHandle }}></div>
//       <div style={{ ...handleStyle, ...topRightHandle }}></div>
//       <div style={{ ...handleStyle, ...bottomLeftHandle }}></div>
//       <div style={{ ...handleStyle, ...bottomRightHandle }}></div>
//     </div>
//   );
// };

// export default DecisionNode;
