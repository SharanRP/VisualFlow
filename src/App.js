
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from "./components/Navbar";
import MySideNav from './components/sideNav';
import React, { useState, useRef, useCallback, useEffect  } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  getIncomers,
  getOutgoers,
  applyEdgeChanges,
  applyNodeChanges,
  getConnectedEdges,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import './index.css';
import  { MiniMap } from 'reactflow';
import CustomNode from './components/CustomNode';
import DownloadButton from "./components/DownloadButton"
import ParallelogramNode from './components/parallelogram';
import DecisionNode from './components/decisionNode';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import CustomEdge from './components/customEdge';
import  { Background, MarkerType } from 'reactflow';
// import "./styles.css";

let id = 1;
const getNodeId = () => {return `${id++}`};

const flowKey = 'example-flow';

const nodeTypes = {
  parallelogram: ParallelogramNode,
  decision: DecisionNode,
};

const initialNodes = [
  // {
  //   id: '1268',
  //   data: { label:"Start"  },
  //   position: { x: 0, y: 50 },
  //   style:{backgroundColor:"#BC7AF9" , borderRadius:20}
  // },
  // {
  //   id: '3802',
  //  // type: 'DefNode',
  //   data: { label:"end"  },

  //   position: { x: 200, y: 500 },
  //   style:{backgroundColor:"#BC7AF9" , borderRadius:20}
  // },
  // {
  //   id: '3',
  //  // type: '',
  //   data: {label:"Node" },
  //   position: { x: 200, y: 200 },
  // },
];

const initialEdges = [
];

// const isValidConnection = (connection) => {
//   if (connection.source === 'output') {
//     return false;
//   }
//   if (connection.target === 'start') {
//     return false;
//   }
//   return true;
// };

const FlowExample = () => {
  const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes] = useNodesState([]);
//   const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges , setEdges] = useEdgesState(initialEdges);
  const [state, setState] = useState({ node: "", operator: "" });
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [errorMsg , setErrorMsg] = useState('')
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
 // const [editState, setEditState] = useState({ id: "", name: "", age: "" });

 const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const edgeTypes = {
//   custom: CustomEdge,
// };

 const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A0';
    case 'operator':
      return '#3B7288' 
    default:
      return '#1A0458';
  }
};

const colorN = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A0';
    case 'operator':
      return '#3B7288' 
    default:
      return '#1A0458';
  }
};

// const shouldConnect = (source, target) => {
//   if (source.type === 'paralleologram' && target.type === ``) {
//     return true;
//   }
//   return false;
// };


  const reactFlowStyle = {
    width: '100%',
    height: 200,
    opacity:"100%",
    
  };

  console.log(nodes)
  // const addNode = (newNode) => {
  //   // Add the new node to the existing nodes
  //   setNodes((prevNodes) => [...prevNodes, newNode]);
  // };

  const deleteNode = (id) => {
    // Filter out the node with the specified ID
    const filteredNodes = nodes.filter((node) => node.id !== id);
    setNodes(filteredNodes);
  };

  const clearCanvas = () => {
    setEdges([]);
    setNodes([]);
  }
 
  // const updateNodeData = (newValue) => {
  //   // Update the data of a specific node or all nodes as needed
  //   const updatedNodes = nodes.map((node) => ({
  //     ...node,
  //     data: {
  //       ...node.data,
  //       label: `${node.id} - ${newValue}`,
  //     },
  //   }));

  //   setNodes(updatedNodes);
  // };
  // const onEdit = () => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === editState.id) {
  //         node.data = {
  //           ...node.data,
  //           label: `${node.id} - ${editState.name} (${editState.age})`
  //         };
  //       }

  //       return node;
  //     })
  //   );
  // };

  // const onAdd = () => {
  //   const id = getNodeId();
  //   const newNode = {
  //     id,
  //     data: { label: `${id} - ${state.name} (${state.age})` },
  //     position: {
  //       x: 0,
  //       y: 0 + (nodes.length + 1) * 20
  //     }
  //   };
  //   setNodes((nds) => nds.concat(newNode));
  // };

const onNodesChange = useCallback(
  (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  [setNodes]
);

const onEdgesChange = useCallback(
  (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  [setEdges]
);

const checkValidity = (params , nodes) => {

  let sourceId = params.source;
  let targetId = params.target;
  let sourceType ;
  let targetType;
  console.log(nodes)
  nodes.map((node) => {
    if(sourceId === node.id)
    {
      sourceType=node.type;
    }
    if(targetId === node.id)
    {
      targetType=node.type;
    }
  })
  console.log(sourceType === targetType , sourceType , targetType)
  if(sourceType ==="parallelogram" && targetType === "parallelogram")
  {
    console.log("1st")
    return false;
  }
  if((sourceType === 'start' && targetType === 'end' || (targetType === 'start' && sourceType === 'end')))
  {
    console.log("2nd")
    return false
  }
  if(sourceType === 'start' && targetType === 'operator')
  {
    console.log("3rd")
    return false;
  }
  if((targetType === 'binary' ||targetType === 'bubble' || targetType === 'selection' ||targetType === 'insertion') && (sourceType === 'start' || sourceType === 'end') )
  {
      return false;
  }
  if(targetType === 'parallelogram' && (sourceType === 'binary' ||sourceType === 'bubble' || sourceType === 'selection' ||sourceType === 'insertion'))
  {
    return false;
  }
  if(sourceType === 'binary' && (targetType === 'bubble' || targetType === 'selection' ||targetType === 'insertion'))
  {
    return false
  }
  else 
  {
    // const edge = {
    //   id: `${params.source}-${params.target}`,
    //   source: params.source,
    //   target: params.target,
    //   type: "custom",
    // };
  
    // setEdges((prevEdges) => [...prevEdges, edge]);
    return true;
  }


}

const onConnect = useCallback((params) =>
{ 
   if(checkValidity(params , nodes))
   {
    setEdges((eds) => addEdge(params, eds))
   }
   else{
    setErrorMsg("Invalid Connection")
      displayErrorMsg()
   }
}, [nodes]);

const displayErrorMsg = () => {
  setSnackbarMessage("Invalid Connection");
  setSnackbarOpen(true);
};

const handleCloseSnackbar = () => {
  setSnackbarOpen(false);
};

// const handleConnect = (params) => {
// if (checkValidity(params.source, params.target)) {
//   setEdges((prevEdges) => [
//     ...prevEdges,
//     { ...params, id: `e${params.source}-${params.target}` },

//   ]);
// }
// };   

const onSave = useCallback(() => {
  if (rfInstance) {
    const flow = rfInstance.toObject();
    localStorage.setItem(flowKey, JSON.stringify(flow));
    console.log("Stored !!")
  }
}, [rfInstance]);

const onRestore = useCallback(() => {
  const restoreFlow = async () => {
    const flow = JSON.parse(localStorage.getItem(flowKey));

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes([...flow.nodes] || []);
      setViewport({ x, y, zoom });
      console.log("Restored !!")
      console.log(flow.edges , flow.nodes);
      
    }
  };
  restoreFlow();
}, [setNodes,setEdges,setViewport]);



const onNodesDelete = useCallback(
  (deleted) => {
    setEdges(
      deleted.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);

        const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
        );

        return [...remainingEdges, ...createdEdges];
      }, edges)
    );
    console.log("deleted");
  },
  [nodes, edges]
);

const saveDataToLocalStorage = () => {
  if (rfInstance) {
    const flow = rfInstance.toObject();
    const dataToSave = {
      nodes: flow.nodes,
      edges: flow.edges,
      viewport: flow.viewport,
    };
    localStorage.setItem(flowKey, JSON.stringify(dataToSave));
    console.log("Data saved to local storage");
  }
};

// Function to restore data from local storage
const restoreDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem(flowKey));

  if (data) {
    setNodes([...data.nodes] || []);
    setEdges([...data.edges] || []);
    setViewport(data.viewport || { x: 0, y: 0, zoom: 1 });
    console.log("Data restored from local storage");
  }
};


const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}, []);

const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    if (typeof type === 'undefined' || !type) {
      return;
    }
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });   
    
    const newNode = {
      id: "1",
      //type: 'Node',
      position,
      data: { label: "Node" ,  },
    }
    setNodes((nds) => nds.concat(newNode))
  },
  [reactFlowInstance]
);


  return (
   
    <div className="dndflow  bg-gradient-to-r from-bluey  via-cyan to-blue-800 ...">
     <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        action={
          <IconButton size="small" aria-label="close" className='bg-red-400' onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      ><Alert  severity="error" sx={{ width: '100%' }}>{snackbarMessage}</Alert></Snackbar> 
         <Panel position='top-right' className='top-14 mr-0'>
         <div><DownloadButton className="w-full" /></div>
         </Panel>
          {/* <Panel position = 'bottom-right' className='w-40 '>
         <div class= "margin-auto w-full">
        <button className=' p-2 w-1/2 bg-blue-500 hover:bg-blue-600 border-2 border-gray-900' onClick={saveDataToLocalStorage}>save</button>
        <button className=" p-2 w-1/2 bg-blue-500 hover:bg-blue-600 border-2 border-gray-900" onClick={restoreDataFromLocalStorage}>restore</button>
         </div>
         </Panel>  */}
      <ReactFlowProvider >
        <div className="reactflow-wrapper border-solid border-b-2 border-r-2 pattern-boxes pattern-gray-500 
  pattern-size-4 pattern-opacity-80"  ref={reactFlowWrapper} style={{ height: 800, width: 1700 }}>
          <ReactFlow
            style={reactFlowStyle}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodesDelete={onNodesDelete}
            onConnect={onConnect}
           // onInit={setReactFlowInstance}
            onInit = {setRfInstance}
            onDrop={onDrop}
        //    isValidConnection={isValidConnection}
           // edgeTypes={edgeTypes}
            nodeColor={colorN}
            nodeTypes ={nodeTypes}
            onDragOver={onDragOver}
            fitView
          >  
          {/* <svg style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <marker
        id="arrowhead"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M0,0 L10,5 L0,10 Z" fill="#FF0072" />
      </marker>
    </defs>
  </svg> */}
            <Controls />
            
          <MiniMap nodeColor={nodeColor} />
          </ReactFlow>
        </div>
        <BasicExample/>
        <MySideNav 
        // addNode={addNode}  
        deleteNode={deleteNode}  
     //   edgeTypes = {edgeTypes}
        onInit = {setRfInstance} 
        // onConnect = {handleConnect}
        nodes={nodes} 
        setNodes = {setNodes}
        edges ={edges}
        setEdges={setEdges}
        clearCanvas={clearCanvas}  
        nodeTypes = {nodeTypes}
        onSave = {onSave} 
        onRestore = {onRestore} 
        displayErrorMsg = {displayErrorMsg}
        />
       
      </ReactFlowProvider>

    </div>
      
    // {/* </div> */}
  );
};

export default () => (
  <ReactFlowProvider>
    <FlowExample />
  </ReactFlowProvider>
);


