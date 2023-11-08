import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, {  useCallback , useState , useEffect } from 'react';
import "../index.css"
import "highlight.js/styles/github.css";
import "@runno/runtime"
import { Highlighter } from "rc-highlight";
//import hljs from "highlight.js";
import Highlight from 'react-highlight'
import ReactFlow, { Background } from 'reactflow';
import './tokyo-night-dark.css'
import { Helmet } from "react-helmet";
import { parse } from 'postcss';
import { Panel } from 'reactflow'
import DownloadButton from './DownloadButton';
import ParallelogramNode from './parallelogram';
import CodeCompile from './codeCompile';
// import CustomEdge from './customEdge';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";


const onDragStart = (event, nodeType ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
}
let valArr =[];
let nums = [];
let newArr = []
let newArr2 =[]
let res = 0;
let count = 0

let id = -1;
const getNodeId = () => {return `${id++}`};

let id1 = 0;
const getNodeId1 = () => {return `${id1++}`};

const decisionId = `decision_${id1++}`;
const yesNodeId = `yesNode_1`;
const noNodeId = `noNode_1`;



function MySideNav({ deleteNode , selectedNode , clearCanvas ,onSave , onRestore, nodes ,setNodes , edges , setEdges, nodeType}){

    const [label, setLabel] = useState('');
    const [input , setInput] = useState('')
    const [selectedOperator, setSelectedOperator] = useState('');
    const [selectedNodeType, setSelectedNodeType] = useState('input'); 
    const [inputNodeContents, setInputNodeContents] = useState({});
    const [inputValues, setInputValues] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [selectInputType, setInputType] = useState('single-input');
    const [dataType , setDataType] = useState('int');
    const [nValue, setNValue] = useState('');
    const [inputs, setInputs] = useState([
      { id: 1, variableName: '', dataType: 'int', value: '' },
    ]);
    const [SingleInput, setSingleInput] = useState([
      { id: 1, variableName: '', dataType: 'int', value: '' },
    ]);
    const [arrayElemNo, setArrayElemNo] = useState(1);
    const [arrayElem, setArrayElem] = useState(Array(1).fill(''));
    const [arrayElemType, setArrayElemType] = useState('int');
    const [selectedOperatorNodeType , handleOperatorNodeTypeChange] = useState('')
    const [Decision , setDecision] = useState('');
    const [YesNode , setYesNode] = useState('');
    const [NoNode , setNoNode] =  useState('');
    const [isEmpty , setIsEmpty] = useState(false)
  
    const manageSave = () => {
    onSave()
    }

    const mangeRestore = () => {
      onRestore()
    }

    // let connectNodes = (params , nodes) => {
    //   let sourceId = params.source;
    //   let targetId = params.target;
    //   let sourceType ;
    //   let targetType ;
    //   nodes.map((node) => {
    //     if(sourceId === node.id)
    //     {
    //       sourceType=node.type;
    //     }
    //     if(targetId === node.id)
    //     {
    //       targetType=node.type;
    //     }
    //   })
    // }


    // const onConnect = useCallback((params) =>
    // { 
    //   let sourceId = params.source;
    //   let targetId = params.target;
    //   let sourceType ;
    //   let targetType ;
    //   nodes.map((node) => {
    //     if(sourceId === node.id)
    //     {
    //       sourceType=node.type;
    //     }
    //     if(targetId === node.id)
    //     {
    //       targetType=node.type;
    //     }
    //   })
    //    if(sourceType === 'yes')
    //    {
    //      console.log(targetType);
    //    }
    // }, [nodes]);

    // onConnect()

    // const findNodesBetweenDecisionAndEnd = (nodes, edges, startNode, endNode) => {
    //   const visitedNodes = new Set();
    //   const nodesBetween = [];
    
    //   const dfs = (currentNode) => {
    //     visitedNodes.add(currentNode.id);
    
    //     if (currentNode.id === endNode.id) {
    //       return; 
    //     }
    //     nodesBetween.push(currentNode);
    //     const neighbors = edges
    //       .filter((edge) => edge.source === currentNode.id)
    //       .map((edge) => nodes.find((node) => node.id === edge.target));
    
    //     for (const neighbor of neighbors) {
    //       if (!visitedNodes.has(neighbor.id)) {
    //         dfs(neighbor);
    //       }
    //     }
    //   };
    //   dfs(startNode);
    //   return nodesBetween;
    // };
    
    
    // const decisionNode = nodes.find((node) => node.type === "decision");
    // const endNode = nodes.find((node) => node.type === "end");
    
    // if (decisionNode && endNode) {
    //   const nodesBetweenDecisionAndEnd = findNodesBetweenDecisionAndEnd(nodes, edges, decisionNode, endNode);
    //   const nodeTypes = nodesBetweenDecisionAndEnd.map((node) => node.type);
    //   console.log("Nodes between decision and end:", nodesBetweenDecisionAndEnd);
    //   console.log("nodes type : " , nodeTypes)
    // } else {
    //   console.log("Decision and/or end node not found.");
    // }
    

    
// if(selectedNodeType === 'decision')
// {
//   //let nodeConnection = nodesBetween.map((node) => node.type)
//     let codeString = `
//     if(${Decision})
//     {
       
//     }
//     else
//     {

//     }`

//     return codeString;
// }    


const AddCodeGenerator = () => {
const dataT = (selectInputType === 'single-input') ? SingleInput[0].dataType : (selectInputType === 'multi-input') ? inputs[0].dataType : undefined;
if(selectInputType === "multi-input" || selectInputType === "single-input")
{
let codeString = `
${dataT} AddNumbers(${nums.map((_, index) => `${dataT} x${index}`).join(" ,")})
{
  return (${nums.map((_, index) => `x${index}`).join(" + ")});
}`;
      return codeString;
}
else if(selectInputType === 'vector')
{
let codeString = `
${arrayElemType} AddNumbers(const vector<${arrayElemType}> &arr) {
  if (arr.empty()) {
      cout<< "Array is empty." <<endl;
      return 0; 
  }
  ${arrayElemType} result = arr[0]; 

  for (int i = 1; i < arr.size(); ++i) {
      result += arr[i];
  }
  return result;
}`
return codeString;
}
}
    
const SubCodeGenerator = () => {
const dataT = (selectInputType === 'single-input') ? SingleInput[0].dataType : (selectInputType === 'multi-input') ? inputs[0].dataType : undefined;

if(selectInputType === "multi-input" || selectInputType === "single-input")
{
let codeString = `
${dataT} SubNumbers(${nums.map((_, index)=>`${dataT} x${index}`).join(" ,")})
{
  return (${nums.map((_, index)=>`x${index}`).join(" - ")});
}`
  return codeString
}
else if(selectedOperatorNodeType === "vector")
{
  let codeString = `
    ${arrayElemType} SubNumbers(const vector<${arrayElemType}> &arr) {
    if (arr.empty()) {
        cout << "Array is empty." << endl;
        return 0.0;  
    }

    ${arrayElemType} result = arr[0];

    for (int i = 1; i < arr.size(); ++i) {
        result -= arr[i];
    }

    return result;
}`
return codeString;
}

}

const MulCodeGenerator = () => {
const dataT = (selectInputType === 'single-input') ? SingleInput[0].dataType : (selectInputType === 'multi-input') ? inputs[0].dataType : undefined;
  if(selectInputType === "multi-input" || selectInputType === "single-input")
  {
    let codeString = 
    `   
${dataT} MulNumbers(${nums.map((_, index)=>`${dataT} x${index}`).join(" ,")})
{
  return (${nums.map((_, index)=>`x${index}`).join(" * ")});
}`
 return codeString
  }
else if(selectInputType === "vector")
{
let codeString = `
${arrayElemType} MulNumbers(const vector<${arrayElemType}> &arr) {
if (arr.empty()) {
cout<< "Array is empty." <<endl;
return 0.0; 
}

${arrayElemType} result = arr[0]; 
for (int i = 1; i < arr.size(); ++i) {
result *= arr[i];
}

return result;
}`
return codeString;
}
}

const DivCodeGenerator = () => {
  const dataT = (selectInputType === 'single-input') ? SingleInput[0].dataType : (selectInputType === 'multi-input') ? inputs[0].dataType : undefined;
  if(selectedOperator ==="/" && (selectInputType==="multi-input" || selectInputType === "single-input"))
  {
  let codeString = `
${dataT} DivNumbers(${nums.map((_, index)=>`${dataT} x${index}`).join(" ,")})
{
  if (${nums.map((_, index) => `x${index} != 0`).join(' && ')}) 
  {
    return ( ${nums.map((_, index) => `x${index}`).join(' / ')});
  } else 
  {
    cout << "Division by zero detected." << endl;
    return 0;
  }
}`
return codeString;
} else if(selectInputType==="vector")
{
   let codeString = `
${arrayElemType} DivNumbers(const vector<${arrayElemType}> &arr) {
if (arr.empty()) {
    cout << "Array is empty." <<endl;
    return 0; 
}

${arrayElemType} result = arr[0];

for (size_t i = 1; i < arr.size(); ++i) {
    if (arr[i] != 0) {
        result /= arr[i];
    } else {
        cout << "Division by zero encountered." <<endl;
        return 0; 
    }
}

return result;
}`
return codeString;
}
}

const XORCodeGenerator = () => {
  let codeString = `
float XORNumbers(${nums.map((_, index)=>`x${index}`).join(" ,")})
{
return ${nums.map((_, index)=>`x${index}`).join(" ^ ")}
}
  `
  return codeString;
}

const ORCodeGenerator = () => {
  let codeString = `
float ORNumbers(${nums.map((_, index)=>`x${index}`).join(" ,")})
{
return ${nums.map((_, index)=>`x${index}`).join(" | ")}
}
  `
  return codeString;
}

const NORCodeGenerator = () => {
  let codeString = `
float NORNumbers(${nums.map((_, index)=>`x${index}`).join(" ,")})
{
return ~(${nums.map((_, index)=>`x${index}`).join(" | ")})
}
  `
  return codeString;
}

const ANDCodeGenerator = () => {
  let codeString = `
float XORNumbers(${nums.map((_, index)=>`x${index}`).join(" ,")})
{
return ${nums.map((_, index)=>`x${index}`).join(" & ")}
}
  `
  return codeString;
}

const PowerCodeGenerator = () => {
  let dataT = SingleInput[0].dataType;
  let codeString = `
${dataT} PowNumbers(${dataT} x0 , int n)
{
return pow(x0 , n);
}`
return codeString
}

const RootCodeGenerator = () => {
  let dataT = SingleInput[0].dataType;
  let codeString = `
${dataT} RootNumbers(${dataT} x0 ,int n)
{
return pow(x0 , 1.0/n);
}`
return codeString
}

const LOGCodeGenerator = () => {
  let dataT = SingleInput[0].dataType;
  let codeString = `
double LogNumbers(${dataT} x0 ,int n)
{
return Math.log(x0 , 1/n);
}`
return codeString
}

const ModCodeGenerator = () => {
  let dataT = SingleInput[0].dataType;
  let codeString = `
double ModNumbers(${dataT} x0)
{
return Math.abs(x0);
}`
return codeString
}

const BinarySearch = () => {
  let codeString = `
${arrayElemType} bin_search (vector <${arrayElemType}> &arr, int num, ${arrayElemType} tgt)  
{  
int beg = 0, end = num - 1;    
while (beg <= end)  
{  
    int mid = (beg + end) /2;         
    if (tgt == arr[mid])  
    {  
        return mid; 
    }          
    else if (tgt < arr[mid])  
    {  
        end = mid - 1;  
    }         
    else {  
        beg = mid + 1;  
    }  
}  
return -1;  
  }   `
return codeString;
}

const SelectionSort = () => {
  let codeString =
`
void swap(${arrayElemType} *xp, ${arrayElemType} *yp)  
{  
${arrayElemType} temp = *xp;  
*xp = *yp;  
*yp = temp;  
}  

void selectionSort(vector <${arrayElemType}> &arr)  
{  
  int n = arr.size();
  for (int i = 0; i < n - 1; i++)  
  {  
      int min_idx = i;  
      for (int j = i + 1; j < n; j++)  
      if (arr[j] < arr[min_idx])  
          min_idx = j;  

      swap(&arr[min_idx], &arr[i]);  
  }
}  
`
return codeString;
}

const InsertionSort = () => {
  let codeString =
`
void insertionSort(vector<${arrayElemType}>& arr)
{
int n = arr.size();
for (int i = 1; i < n; i++) {
  int key = arr[i];
  int j = i - 1;

  while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
  }
  arr[j + 1] = key;
}
}

`
return codeString;      
}

const BubbleSort = () => 
{
  let codeString = 
  `
void swap(${arrayElemType} *xp, ${arrayElemType} *yp)  
{  
  ${arrayElemType} temp = *xp;  
  *xp = *yp;  
  *yp = temp;  
} 
void bubbleSort(vector <${arrayElemType}> &arr) 
{ 
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) 

      for (int j = 0; j < n - i - 1; j++) 
          if (arr[j] > arr[j + 1]) 
              swap(arr[j], arr[j + 1]); 
}  
 `
 return codeString;
}    

const AlgoTemplate = () => {
let codeTemplate = "";
let dataT = arrayElemType !== "" ? arrayElemType : "int";


if (selectedOperatorNodeType === "binary" || selectedOperatorNodeType === "bubble" || selectedOperatorNodeType === "selection" ||selectedOperatorNodeType === "insertion") {
codeTemplate = `
int n;
cout << "Enter no. of elements in array :";
cin >> n;
cout << "Enter elements of array :";
for (int i = 0; i < n; i++) {
  int element;
  cin >> element;
  arr.push_back(element);
}`;
}
return codeTemplate;
}

const ArithTemplate = () => {
let codeTemplate = "";
if(selectedOperator !=="" && selectedOperatorNodeType === '' && selectInputType !== 'vector')
{
codeTemplate =
`
${selectedOperator.length === 1 ? `char selectedOperator = '${selectedOperator}';` : '' }
int result = 0;
${nums.map((_ ,index) => `${inputs[0].dataType} num${index};`).join('\n')}
${nums.map((_, index) => `cout << "Enter value ${index + 1}: ";\ncin >> num${index};`).join('\n')}
${selectedOperator === 'pow' || 'root' ? `int n ; cout<<"Enter Number" ; cin>>n ; `: `` }
`
return codeTemplate;
  }
else{
  codeTemplate = `
  vector<${arrayElemType.toLowerCase()}> arr;
  ${arrayElemType} result = 0;`
  return codeTemplate

}
}

       
let resultedCode = (     selectedOperator === "+" ? AddCodeGenerator() 
                       : selectedOperator === "-" ? SubCodeGenerator() 
                       : selectedOperator === "*" ? MulCodeGenerator() 
                       : selectedOperator === "/" ? DivCodeGenerator()
                       : selectedOperator === "pow" ? PowerCodeGenerator()
                       : selectedOperator === "root" ? RootCodeGenerator()
                       : selectedOperator === "log" ? LOGCodeGenerator()
                       : selectedOperator === "mod" ? ModCodeGenerator()
                       : selectedOperator === "XOR" ? XORCodeGenerator()
                       : selectedOperator === "AND" ? ANDCodeGenerator()
                       : selectedOperator === "OR" ? ORCodeGenerator()
                       : selectedOperator === "NOR" ? NORCodeGenerator()
                       : `` )

let algorithms = (     selectedOperatorNodeType === "binary" ? BinarySearch()
                     : selectedOperatorNodeType === "selection" ? SelectionSort()
                     : selectedOperatorNodeType === "insertion" ? InsertionSort()
                     : selectedOperatorNodeType === "bubble" ? BubbleSort()
                     : ``
                     )  
let algoCall = (selectedOperatorNodeType === "binary" ? 
    `
${arrayElemType} tar;
int res;
cout<<"Enter element to be searched : ";
cin>>tar;
res = bin_search(arr , n , tar);
    `: 
    selectedOperatorNodeType === "bubble" ?
    `
bubbleSort(arr);
cout<<"Sorted Array : ";
    `
    :
    selectedOperatorNodeType === "selection" ?
    `
selectionSort(arr);
cout<<"Sorted Array : ";
    `
    :
    selectedOperatorNodeType === "insertion" ?
    `
insertionSort(arr);
cout<<"Sorted array : ";`
    : ``
    )  

function getArithOnAlgo() {
      let ArithOnAlgo;
  
if (selectedOperatorNodeType === "binary" && selectedOperator === "+") {
ArithOnAlgo = ` result = AddNumbers(arr)`;
}
else if (selectedOperatorNodeType === "binary" && selectedOperator === "-") {
ArithOnAlgo =` result = SubNumbers(arr)` ;
} 
else if (selectedOperatorNodeType === "binary" && selectedOperator === "*") {
  ArithOnAlgo = ` result = MulNumbers(arr)`;
} 
else if (selectedOperatorNodeType === "binary" && selectedOperator === "/") {
  ArithOnAlgo = ` result = DivNumbers(arr)`;
}  
else if (selectedOperatorNodeType === "selection" && selectedOperator === "+") {
  ArithOnAlgo = ` result = AddNumbers(arr)`;
}
else if (selectedOperatorNodeType === "selection" && selectedOperator === "-") {
  ArithOnAlgo = ` result = SubNumbers(arr)`;
}
else if (selectedOperatorNodeType === "selection" && selectedOperator === "*") {
  ArithOnAlgo = ` result = MulNumbers(arr)`;
}
else if (selectedOperatorNodeType === "selection" && selectedOperator === "/") {
  ArithOnAlgo = ` result = DivNumbers(arr)`;
} 
else if (selectedOperatorNodeType === "insertion" && selectedOperator === "+") {
  ArithOnAlgo = ` result = AddNumbers(arr)`;
}
else if (selectedOperatorNodeType === "insertion" && selectedOperator === "-") {
  ArithOnAlgo = ` result = SubNumbers(arr)`;
}
else if (selectedOperatorNodeType === "insertion" && selectedOperator === "*") {
  ArithOnAlgo = ` result = MulNumbers(arr)`;
}
else if (selectedOperatorNodeType === "insertion" && selectedOperator === "/") {
  ArithOnAlgo = ` result = DivNumbers(arr)`;
}  
else if (selectedOperatorNodeType === "bubble" && selectedOperator === "+") {
  ArithOnAlgo = ` result = AddNumbers(arr)`;
}
else if (selectedOperatorNodeType === "bubble" && selectedOperator === "-") {
  ArithOnAlgo = ` result = SubNumbers(arr)`;
}
else if (selectedOperatorNodeType === "bubble" && selectedOperator === "*") {
  ArithOnAlgo = ` result = MulNumbers(arr)`;
}
else if (selectedOperatorNodeType === "bubble" && selectedOperator === "/") {
  ArithOnAlgo = ` result = DivNumbers(arr)`;
} 
else {
ArithOnAlgo = "";
}
      return ArithOnAlgo;
  }
   
const resultOutput = () => {
      let out = '';
      if(selectedOperator !=="" && selectedOperatorNodeType === "")
      {
out = `
result = ${generateFunctionCall()};
cout << "Output Value: " << result << endl;`
      }else if(selectedOperatorNodeType !== "" && selectedOperatorNodeType !=="binary")
      {
        out = ` 
for (int i = 0; i < n; i++) 
    cout << arr[i] << " "; 
cout << endl; `
      }else if(selectedOperatorNodeType ==="binary"){
        out=`
if(res == -1)
{
  cout<<"Element is not pesent in array";
}else
{
  cout<<"Element is present at index :"<<res;
}`
      }

      return out;
}

function generateFunctionCall() {
      let functionCall = "";
      if (selectedOperator === "+" && (selectInputType === "multi-input" || selectInputType==="single-input")) {
          functionCall = `AddNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "-" && (selectInputType === "multi-input" || selectInputType==="single-input")) {
          functionCall = `SubNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "*"  && (selectInputType === "multi-input" || selectInputType==="single-input")) {
          functionCall = `MulNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "/" && (selectInputType === "multi-input" || selectInputType==="single-input")) {
          functionCall = `DivNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "pow") {
          functionCall = `PowNumbers(num0 , n )`;
      } else if (selectedOperator === "root") {
          functionCall = `RootNumbers(num0 , n )`;
      } else if (selectedOperator === "log") {
          functionCall = `LogNumbers(num0 , n )`;
      } else if (selectedOperator === "mod") {
          functionCall = `ModNumbers(num0)`;
      } else if (selectedOperator === "XOR") {
          functionCall = `XORNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "AND") {
          functionCall = `ANDNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "OR") {
          functionCall = `ORNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if (selectedOperator === "NOR") {
          functionCall = `NORNumbers(${nums.map((_, index)=>`num${index}`).join(" ,")})`;
      } else if(selectInputType === "vector" && selectedOperator ==="+") {
        functionCall = `AddNumbers(arr)`;
      } else if(selectInputType === "vector" && selectedOperator ==="-") {
        functionCall = `SubNumbers(arr)`
      } else if(selectInputType === "vector" && selectedOperator ==="*") {
        functionCall = `MulNumbers(arr)`
      } else if(selectInputType === "vector" && selectedOperator ==="/") {
        functionCall = `DivNumbers(arr)`
      }
      return functionCall;
}
  
let generateAndDisplayCppCode = () => {
        
outputContent();      
const displayGeneratedCode = `
#include<iostream>  
#include<vector>
#include <cmath>
using namespace std;
${resultedCode}
${algorithms} 
int main() {
${ArithTemplate()}
${AlgoTemplate()}
${algoCall}
${resultOutput()}
${getArithOnAlgo()}
return 0;
}
`;
setGeneratedCode(displayGeneratedCode)
    
console.log('Generated C++ Code:', displayGeneratedCode);
};


function findChainConnected(Node) {
  if (!Node) {
    return [];
  }

  const chain = [Node];
  let currentNode = Node;
  let endNodeFound = false;

  while (!endNodeFound) {
    const outgoingEdges = edges.filter((edge) => edge.source === currentNode.id);

    if (outgoingEdges.length === 0) {
      break; 
    }

    const nextNodeId = outgoingEdges[0].target; 

    const nextNode = nodes.find((node) => node.id === nextNodeId);

    if (nextNode) {
      chain.push(nextNode);
      currentNode = nextNode;

      if (nextNode.type === 'end') {
        endNodeFound = true;
      }
    } else {
      break; 
    }
  }

  return chain;
}
let codeForYesLoop = ``;
let codeForNoLoop = ``;
let YesCode = ``

const yesNode = nodes.find((node) => node.type === 'yes');
const noNode = nodes.find((node) => node.type === 'no' );

const chainConnectedToNo = findChainConnected(noNode)
const chainConnectedToYes = findChainConnected(yesNode);

console.log(chainConnectedToYes);

const nodeInfoNo = chainConnectedToNo.map((node) => node.type)
console.log(nodeInfoNo)

const nodeInfoYes = chainConnectedToYes.map((node) => node.type);
console.log(nodeInfoYes);

const ConnectedToYes = () => {

  if(nodeInfoYes.includes('parallelogram'))
{
  codeForYesLoop +=`
  ${ArithTemplate()}`
  
  console.log(codeForYesLoop)
}
if(nodeInfoYes.includes('operator'))
{
  codeForYesLoop +=`
  ${resultedCode}`
  YesCode = codeForYesLoop
  console.log(codeForYesLoop)
}
if(nodeInfoYes.includes('binary') || nodeInfoYes.includes('selection') ||nodeInfoYes.includes('bubble') ||nodeInfoYes.includes('insertion') )
{
  codeForYesLoop +=`
  ${algorithms}
  ${AlgoTemplate()}
  ${algoCall}`
  YesCode = codeForYesLoop
  console.log(YesCode)
}
if(nodeInfoYes.includes('parallelogram') && selectedNodeType==='output')
{
  codeForYesLoop +=`
  result = ${generateFunctionCall()}`
  YesCode = codeForYesLoop
  console.log(YesCode)
}

}

const ConnectedToNo = () => {
  if(nodeInfoNo.includes('parallelogram'))
  {
    codeForNoLoop +=`
    ${ArithTemplate()}`
    
    console.log(codeForNoLoop)
  }
  if(nodeInfoNo.includes('operator'))
  {
    codeForNoLoop +=`
    ${resultedCode}`
    console.log(codeForNoLoop)
  }
  if(nodeInfoNo.includes('binary') || nodeInfoYes.includes('selection') ||nodeInfoYes.includes('bubble') ||nodeInfoYes.includes('insertion'))
  {
    codeForNoLoop +=`
    ${algorithms}
    ${AlgoTemplate()}
    ${algoCall}
    ${getArithOnAlgo()}`
    console.log(codeForNoLoop)
  }
  if(nodeInfoNo.includes('output'))
  {
    codeForNoLoop +=`
    result = ${generateFunctionCall()}`
  }
}

useEffect(() => {
  if(chainConnectedToYes)
  {
    ConnectedToYes()
  }
  if(chainConnectedToNo)
  {
    ConnectedToNo()
  }

  console.log("YesCode :" ,YesCode )
  console.log("NoCode" , codeForNoLoop)

}, [chainConnectedToYes , chainConnectedToNo])

// if(YesCode !== '')
// {
//   finalLoopCode+=YesCode
// }

// if(codeForNoLoop !== '')
// {
//   finalLoopCode += codeForNoLoop
// }
// console.log(finalLoopCode)



const outputContent = () => {


  if(selectInputType === "multi-input")
  {
    for (let i = 0; i < inputs.length; i++) {
      const numericValue = Number(inputs[i].value);
      nums[i] = isNaN(numericValue) ? 0 : numericValue;
  }
  console.log(inputs , nums )
  }
  else if(selectInputType === "vector")
  {
    let permittedValues = arrayElem.map(elem => Number(elem))
    console.log(nums);
    for(let i=0; i<arrayElemNo; i++)
    {
      if(isNaN(nums[i])  || nums[i] === undefined)
      {
        nums[i] = 0
      }
      nums[i] = permittedValues[i]
    }

  }
  else if(selectInputType === "single-input")
  {
    if (SingleInput.length > 0) {
      const numericValue = parseFloat(SingleInput[0].value);
      nums[0] = isNaN(numericValue) ? 0 : numericValue;
    }
    // const numericValue = Number(SingleInput.value);
    // nums[0] = isNaN(numericValue) ? 0 : numericValue;
  }

  console.log(nums)
  let n = nums.length;
  console.log(n);
  if(n === 0)
  {
      return 0;
  }  
      if(selectedOperator === "+" )
      {
        
        res = nums.reduce((accumulator, currentValue) => currentValue + accumulator);
        return res;
      } else if( selectedOperator === "-" )
      {
        res = nums.reduce((accumulator, currentValue) => accumulator - currentValue);
        return res;

      } else if( selectedOperator === "*"  )
      {
        res = nums.reduce((accumulator, currentValue) => currentValue * accumulator);
        return res;

      }else if( selectedOperator === "/"  )
      {
        res = nums.reduce((accumulator, currentValue) => accumulator/currentValue);
        console.log(res);
        return res; 
      }
      else if(selectedOperator === "pow")
      {
        let num = parseFloat(nValue);
        res = Math.pow(nums[0] , num);
        return res;

      }else if(selectedOperator === "root")
      {
        let num = parseFloat(nValue)
        res = Math.pow(nums[0] ,( 1/num))
        return res;
      }else if(selectedOperator === "log")
      {
        res = Math.log(nums.pop());
        return res;
      }else if( selectedOperator === "mod")
      {
        let num = parseFloat(nums.pop())
        res = Math.abs(num)
        return res;
      }else if(selectedOperator === "AND")
      {
        res = nums.reduce((accumulator, currentValue) => accumulator&currentValue);
        return res;
      }else if(selectedOperator === "OR")
      {
        res = nums.reduce((accumulator, currentValue) => accumulator|currentValue);
        return res;
      }else if(selectedOperator === "NOR")
      {
        res = nums.reduce((accumulator, currentValue) => accumulator|currentValue);
        return (~res);
      }
  
}

function SIngleInputComponent() {
 
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);

  const isVariableNameValid = (newName) => {

    if (!/^[a-zA-Z]/.test(newName)) {
      return false;
    }

    if (!/^[a-zA-Z0-9_]*$/.test(newName)) {
      return false;
    }

    const reservedKeywords = [

      'if', 'else', 'while', 'for', 'function', 'return', 'var', 'let', 'const',
    ];

    if (reservedKeywords.includes(newName)) {
      return false;
    }

    const isUnique = SingleInput.every((input) => input.variableName !== newName);

    return isUnique;
  };

  const handleNameChange = (id, newName) => {
    if (isVariableNameValid(newName)) {
      setSingleInput((prevInputs) =>
        prevInputs.map((input) => (input.id === id ? { ...input, variableName: newName } : input))
      );
    } else {

      setAlertMessage('Invalid variable name. Please follow the naming rules.');
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
        setAlertMessage('');
      }, 2000);
    }
  };

  const handleTypeChange = (id, newType) => {
    setSingleInput((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, dataType: newType } : input))
    );
  };

  const handleValChange = (id, newValue) => {
    setSingleInput((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value: newValue } : input))
    );
  };

  return (
    <div>
      {SingleInput.map((input) => (
        <div key={input.id} className="my-2">
          <select
            id="nodeType"
            value={input.dataType}
            onChange={(e) => handleTypeChange(input.id, e.target.value)}
            className="placeholder-opacity-50 placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm text-left rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="int">Int</option>
            <option value="Float">Double</option>
            <option value="Char">Char</option>
            <option value="String">String</option>
          </select>

          <input
            type="text"
            value={input.variableName}
            onChange={(e) => handleNameChange(input.id, e.target.value)}
            placeholder="Variable Name"
            className="placeholder-gray-500 my-2 bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          <input
            type="text"
            input-id="1"
            value={input.value}
            onChange={(e) => handleValChange(input.id, e.target.value)}
            placeholder="Input"
            className="placeholder-gray-500 my-2 bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      ))}
      {isAlertVisible && (
        <div className="text-red-400 border-2 border-gray-500 text-center mt-2">{alertMessage}</div>
      )}
    </div>
  );
}

function MultiInputComponent() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (alertVisible) {
      const timeoutId = setTimeout(() => {
        setAlertVisible(false);
        setAlertMessage('');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [alertVisible]);

  const isVariableNameValid = (newName) => {
    if (!/^[a-zA-Z]/.test(newName)) {
      return false;
    }
    if (!/^[a-zA-Z0-9_]*$/.test(newName)) {
      return false;
    }
    const reservedKeywords = [
      'if', 'else', 'while', 'for', 'function', 'return', 'var', 'let', 'const',
    ];
    if (reservedKeywords.includes(newName)) {
      return false;
    }
    const isUnique = inputs.every((input) => input.variableName !== newName);
    return isUnique;
  };
  const handleVariableNameChange = (id, newName) => {
    if (isVariableNameValid(newName)) {
      setInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id ? { ...input, variableName: newName } : input
        )
      );
    } else {
      setAlertMessage('Variable name must be unique and follow the rules.');
      setAlertVisible(true);
    }
  };

  const handleDataTypeChange = (id, newType) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, dataType: newType } : input
      )
    );
  };

  const handleValueChange = (id, newValue) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const addInput = () => {
    const newId = inputs.length + 1;
    setInputs([...inputs, { id: newId, variableName: '', dataType: 'int', value: '' }]);
  };

  const deleteLastInput = () => {
    if (inputs.length > 0) {
      setInputs(inputs.slice(0, -1)); // Remove the last input
    }
  };

  return (
    <div className="my-2">
      {inputs.map((input) => (
        <div key={input.id} className="grid grid-cols-3 gap-4 my-3">
          
               <select
                 value={input.dataType}
                 onChange={(e) => handleDataTypeChange(input.id, e.target.value)}
                 className=" m-0 placeholder-opacity-50 h-full placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm text-left rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               >
                 <option value="int">Int</option>
                 <option value="Float">Double</option>
                 <option value="Char">Char</option>
                 <option value="String">String</option>
               </select>

               <input
                 type="text"
                 value={input.variableName}
                 onChange={(e) => handleVariableNameChange(input.id, e.target.value)}
                 className="placeholder-gray-500 h-full m-0 bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Variable Name"
               />

               <input
                 type="text"
                 value={input.value}
                 onChange={(e) => handleValueChange(input.id, e.target.value)}
                 className="placeholder-gray-500 h-full m-0 bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Input"
               />
        </div>
      ))}

      {alertVisible && (
        <div className="text-red-400 text-sm text-center border-2 border-gray-500 mb-2">
          {alertMessage}
        </div>
      )}

      <div className="grid grid-cols-2 w-full">
            <button onClick={addInput} >
        <a href="#_" class="relative  inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group w-full">
        <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-green-800 via-teal-700 to-green-500 group-hover:opacity-100"></span>
        <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
        <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
        <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
        <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
        <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
        <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
          <span class="relative w-full z-100">
          <i
           class=
           "fi fi-br-plus mr-2"
           ></i> Add </span>
         </a>
        </button>

          <button onClick={deleteLastInput}>
           <a href="#_" class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
           <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-red-800 via-pink-700 to-red-400 group-hover:opacity-100"></span>
           <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
           <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
           <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
           <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
           <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
           <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
           <span class="relative w-full "><i
           class=
           "fi fi-rs-trash "
           ></i>Delete</span>
           </a>
         </button>
      </div>
    </div>
  );
}


function VectorInputComponent() {
  const handleArrayLengthChange = (e) => {
    const length = parseInt(e.target.value);
    setArrayElemNo(length);
    setArrayElem(Array(length).fill(''));
  };

  const handleArrayInputChange = (e, index) => {
    const updatedArrayElem = [...arrayElem];
    updatedArrayElem[index] = e.target.value;
    setArrayElem(updatedArrayElem);
    setArrayElemType(e.target.value);
  };

  const arrayInputComponents = Array.from({ length: arrayElemNo }, (_, index) => (
    <li key={index}>
      <input
        type="text"
        value={arrayElem[index]}
        onChange={(e) => handleArrayInputChange(e, index)}
        className="placeholder-gray-500 my-2 border-blue-400 w-5/6 m-auto bg-gray-800 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Input"
        required
      />
    </li>
  ));

  const allInputsFilled = arrayElem.every((element) => element.trim() !== '');

  const showErrorText = !allInputsFilled && (
    <div className="text-red-400 border-2 border-gray-500 text-center text-sm mt-1">Please fill all input fields</div>
  );

  return (
    <div className="border-gray-400 border-2 p-2 m-2">
      <select
        value={arrayElemType}
        onChange={(e) => {setArrayElemType(e.target.value)}}
        className="my-2 placeholder-opacity-50 h-full placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm text-left rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="int">Int</option>
        <option value="double">Double</option>
        <option value="char">Char</option>
        <option value="string">String</option>
      </select>
      <label>No. of inputs</label>
      <input
        min="1"
        max="50"
        type="number"
        value={arrayElemNo}
        onChange={handleArrayLengthChange}
        className="border-b-2 border-gray-400 placeholder-gray-500 my-2 bg-gray-800 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Input"
        required
      />
      {showErrorText}
      <hr className="bg-gray-400" />
      <ul className="h-40 overflow-auto">{arrayInputComponents}</ul>
    </div>
  );
}

    useEffect(() => {
      const inputNode1 = document.getElementById('inputnode-1');
      const dragBtn = document.getElementById('dragBtn');
      const submitBtn = document.getElementById("submitBtn");
      const nodeSpec = document.getElementById('nodeSpec');
      const cppCode = document.getElementById('run');
      const code = document.getElementById('code');
      const inptBx = document.getElementById("inputBox");

      document.getElementById("copyButton").addEventListener("click", () => {
        const preTag = document.getElementById("myPreTag");
        const range = document.createRange();
        range.selectNode(preTag);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    
        try {
            document.execCommand("copy");
            const copyButton = document.getElementById("copyButton");
            copyButton.innerHTML = `<i class="fi fi-rr-assept-document"></i>`;

            setTimeout(() => {
                copyButton.innerHTML = `<i class="fi fi-rr-copy-alt"></i>`;
            }, 1000);
        } catch (err) {
            console.error("Unable to copy code:", err);
        } finally {
            window.getSelection().removeAllRanges();
        }
    });
    
      
      cppCode.addEventListener("click" , generateAndDisplayCppCode)

      const submitHandler = () => {
         if(submitBtn)
         {
            nodeSpec.innerHTML = 
                             `<div class ="bg-gradient-l from-bluey to-green-800">
                              <div class="text-base m-1 text-gray-300  typewriter">Input Value : ${nums.join(", ")}</div>
                              <div class="text-base m-1 text-gray-300  typewriter">Operator Selected : ${selectedOperator}</div>
                              <div class="text-base m-1 text-gray-300  typewriter ">OutputNode Value : ${outputContent()}: </div>
                              </div>`
                   console.log(selectedOperator)           
         }else{
            nodeSpec.innerHTML = "Nothing to display";
         }

      }
      if(outputContent !== null || outputContent !== undefined)
      {
         submitBtn.addEventListener("click" , submitHandler);
      }
      
      const clickHandler = () => {
        if (inputNode1 && inputNode1.value !== '') {
          valArr.push(inputNode1.value);
          console.log(valArr);
        }
      };
  
      if (dragBtn) {
        dragBtn.removeEventListener('click', clickHandler);
        dragBtn.addEventListener('click', clickHandler);
        // onConnect()
      }

      return () => {
        if (dragBtn) {
          dragBtn.removeEventListener('click', clickHandler);
        }
      };
    }, [selectedOperator, outputContent]);

    function displayContent()
    { 
      if(selectInputType === "multi-input" )
      {

        return (
          <div>
            <p>Inputs:</p>
            {inputs.map((input) => 
            <p>{input.dataType} {input.variableName} : {input.value}</p>)}
            <p>float result = 0</p>
          </div>
      
        )

      }
      if(selectInputType === "single-input")
      {
        return (
          <div>
          <p>Inputs</p>
            {SingleInput.map((input) => 
            <p>{input.dataType} {input.variableName} : {input.value}</p>)}
          </div>
      
        )
      }
      if(selectInputType === "vector")
      {
        return (
          <div >
            <p>Inputs</p>
            <p >{arrayElemType} : [ {arrayElem.join(" , ") } ]</p>
          </div>
        )
      }
  
    }

    function displayDetails()
    {
      if(selectedNodeType === "operator")
      { outputContent();
        
          if(selectedOperator === "pow")
          {
            return (
              <div >
                <p>result ={SingleInput[0].value}<sup>{nValue}</sup></p>
              </div>
            )
          }
          else if(selectedOperator === "root")
          {
            return (
              <div >
                <p>result ={SingleInput[0].value}<sup>{1/nValue}</sup></p>
              </div>
            )
          }
          else if(selectedOperator === "log")
          {
            return (
              <div >
                <p>result =log({SingleInput[0].value})</p>
              </div>
            )
          }else if(selectedOperator === "modulus")
          {
            return (
              <div >
                <p>result =|{SingleInput[0].value}|</p>
              </div>
            )
          }
          else{
            return (
              <div >
                <p>result = {nums.map((_, index) => String.fromCharCode(97 + index)).join(selectedOperator)}</p>
              </div>
            )
          }
          
        
      }
      if(selectedNodeType === "output")
      {
        return (
          <div class ="h-full  w-full ">
            Print the result : {outputContent()}
          </div>
        )
      }
    }
    // const { value } = event.target.value;
    // // Update the inputValues state with the new value for the specified ID
    // setInputValues((prevInputValues) => ({
    //     ...prevInputValues,
    //     [id]: value,
    // }));
    // };

    // const handleLabelChange = (event) => {
    //     const val  = event.target.value;
    //     const nodeId = nodes.id; // Get the node ID from data-id
    //     console.log(val , nodeId);
    //     setInputValues((prevInputValues) => ({
    //       ...prevInputValues,
    //       [nodeId]: val, // Use nodeId as the key in the inputValues object
    //     }));
    //   };

    const handleLabelChange = (event) => {
      setLabel(event.target.value);
    };
     
   function showDiv(divId, element)
   {
       document.getElementById(divId).style.display = element.value == "operator" ? 'block' : 'none';
   }

   const customNodeTypes = {
    parallelogram: {
      type: 'parallelogram',
      shapeId: 'parallelogram',
      shape: (
        <g>
          <polygon points="-50,-25 50,-25 30,25 -70,25" fill="#A8DF8E" />
          <text>Parallelogram Node</text>
        </g>
      ),
      draggable: true, 
    },
  };
    
const handleOperatorChange = (event) => {
  setSelectedOperator(event.target.value);
  console.log(selectedOperator);
};

const handleClearCanvasClick = () => {
  clearCanvas();
  nums =[];
  id=-1;
};

const handleNodeTypeChange = (event) => {
  setSelectedNodeType(event.target.value);
};
const handleDeleteNodeClick = (id) => {
  deleteNode(id);
};

if(selectedNodeType === 'decision')
{

  if(YesNode !== '' )
  {
    newArr = YesNode.split('')
    newArr2 = NoNode.split('')
  }
console.log(newArr , newArr2)
}

const handleAddNodeClick = () => {
  console.log(selectedNodeType, selectedOperator)
  if(selectedNodeType === "input" && selectInputType ==="single-input" )
  {      
      const newNode = {
          id: getNodeId(),
          type: 'parallelogram',
          data: {
            label: displayContent() , color:"#FFCC70"
          },
          position: { x: 100, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
        console.log(newNode)

  }
  if(selectedNodeType === "input" && selectInputType ==="multi-input" )
  {      
      const newNode = {
          id: getNodeId(),
          type:'parallelogram',
          data: {
            label: displayContent() , color:'#FFCC70'
          },
          position: { x: 100, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);

        console.log(newNode)

  }
  if(selectedNodeType === "input" && selectInputType ==="vector" )
  {      
      const newNode = {
          id: getNodeId(),
          type: 'parallelogram',
          data: {
            label: displayContent() , color:'#FFCC70'
          },
          position: { x: 100, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);

        console.log(newNode)

  }
  else if(selectedNodeType === "operator")
  {
      const newNode = {
          id: getNodeId(),
          type: selectedNodeType,
          data: {
            label:displayDetails(),
          },
          position: { x: 150, y: 300 },
          style:{backgroundColor:"#FF8080" , fontSize:17 }
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
        console.log(newNode)
  } 
  else if (selectedNodeType === "output")
  {
      const newNode = {
          id: getNodeId(),
          type: 'parallelogram',
          data: {
            label:displayDetails(),color:'#A8DF8E'
          },
          position: { x: 120, y: 300 },
          
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
        console.log(newNode)
  }
  else if (selectedNodeType === "start")
  {
      const newNode = {
          id: "start",
          type: selectedNodeType,
          data: {
            label:"Start",
          },
          position: { x: 200, y: 100 },
          style:{backgroundColor:"#BC7AF9" , borderRadius:20 , fontSize : 17}
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);

      
  }
  else if (selectedNodeType === "end")
  {
      const newNode = {
          id: "end",
          type: selectedNodeType,
          data: {
            label:"End",
          },
          position: { x: 300, y: 400 },
          style:{backgroundColor:"#BC7AF9" , borderRadius:20 , fontSize : 17}
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
        console.log(newNode)


  }else if(selectedOperatorNodeType == "binary"  && selectedNodeType === "algorithms")
  {
    const newNode = {
      id: "10451",
      type: selectedOperatorNodeType  ,
      data: {
        label:`${selectedOperatorNodeType} search`,
      },
      position: { x: 300, y: 500 },
      style:{backgroundColor:"E5CFF7" , borderRadius:5 ,  fontSize : 17 }
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);

    console.log(newNode)
  }
  else if(selectedOperatorNodeType == "insertion"  && selectedNodeType === "algorithms")
  {
    const newNode = {
      id: "10451",
      type: selectedOperatorNodeType ,
      data: {
        label:`${selectedOperatorNodeType} sort `,
      },
      position: { x: 300, y: 500 },
      style:{backgroundColor:"#E5CFF7" , borderRadius:5 ,  fontSize : 17 }
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);

    console.log(newNode)
  }
  else if(selectedOperatorNodeType == "bubble"  && selectedNodeType === "algorithms")
  {
    const newNode = {
      id: "10451",
      type: selectedOperatorNodeType ,
      data: {
        label:`${selectedOperatorNodeType} sort `,
      },
      position: { x: 300, y: 500 },
      style:{backgroundColor:"E5CFF7F" , borderRadius:5 , fontSize : 17 }
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);

    console.log(newNode)
  }
  else if(selectedOperatorNodeType == "selection"  && selectedNodeType === "algorithms")
  {
    const newNode = {
      id: "10451",
      type: selectedOperatorNodeType ,
      data: {
        label:`${selectedOperatorNodeType} sort `,
      },
      position: { x: 300, y: 500 },
      style:{backgroundColor:"#E5CFF7" , borderRadius:5 , fontSize : 17 }
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);

    console.log(newNode)
  }
  else if(selectedNodeType === "decision")
  {
  
    const newNode = [
      {
        id: decisionId,
        type: 'decision',
        data: {
          label: `${Decision}`,
          color: '#E5CFF7',
        },
        position: { x: 300, y: 500 },
      },
      {
        id: yesNodeId,
        type: 'yes',
        data: { label: 'Yes' },
        position: { x: 400, y: 100 },
      },
      {
        id: noNodeId,
        type: 'no',
        data: { label: 'No' },
        position: { x: 100, y: 100 },
      },
    ];
  
    setNodes((prevNodes) => [...prevNodes, ...newNode]);
  
    const newEdges = [
      { id: `e_${decisionId}_${yesNodeId}`, source: decisionId, sourceHandle: 'a', target: yesNodeId, },
      { id: `e_${decisionId}_${noNodeId}`, source: decisionId, sourceHandle: 'b', target: noNodeId,  },
    ];
  
    setEdges((prevEdges) => [...prevEdges, ...newEdges]);
    console.log(newNode)
  }
};

    return (
<div >        
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex  items-center p-2 mt-2 ml-3 text-sm text-gray-100 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   {/* <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg> */}
</button>

<aside data-te-smooth-scroll-init id="default-sidebar" class="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0  border-r-gray-300 border-gray-300" aria-label="Sidebar" >
   <div class="h-full px-3 grid grid-cols-1 py-4 overflow-y-auto bg-bluey dark:bg-gray-800 text-white border-r-2 border-r-gray-300 ">
      <ul class="space-y-2 font-medium text-white ">
         <li >
            <a href="#" class="flex items-center ml-1 mr-0 p-2 text-white rounded-lg dark:text-white hover:bg-blue-800 hover:text-gray-900 dark:hover:bg-gray-700 group">
               <span><label for="countries" class="block ml-0 mr-3 mb-2 text-md font-medium text-white dark:text-white">Select node type</label></span>
               <div class ="ml-6 mr-0 w-2/4">
               <select id="nodeType" value={selectedNodeType} onChange={(e) => {handleNodeTypeChange(e) ; showDiv("op" , e.target)}} class="placeholder-opacity-50  placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm text-left rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " >
               <option value="input" class="placeholder-gray-500" >Input</option>
               <option value="output" >Output</option>
               <option value="operator">Operator</option>
               <option value="algorithms">Algorithms</option>
               <option value="start">Start</option>
               <option value="end">End</option>
               <option value="decision">Decision</option>
               </select>
               </div>
            </a>
         </li>
         {selectedNodeType === 'decision' && (
          <>
                <div className='w-full'>
                <input
                  class=" py-2  items-centre placeholder-gray-500  bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  type="text"
                  value={Decision}
                  onChange={(e) => { setDecision(e.target.value) ; setIsEmpty(e.target.value === '');}}
                  placeholder='condition' />
                </div>
                {isEmpty && (
                 <div className = 'border-2 border-red-400 my-2 p-2 text-red-300 text-sm text-center' >Please enter a condition</div>
                )}
          </>      
               )}

         <li >
            <a href="#" class="flex items-center ml-1 mr-0 p-2 text-white rounded-lg dark:text-white hover:bg-blue-800 hover:text-gray-900 dark:hover:bg-gray-700 group">
            <span><label for="countries" class=" block ml-0 mr-3 mb-2 text-md font-medium text-white dark:text-white">Input Node type :</label></span>
            { selectedNodeType === "input" && 
            <div class ="ml-6 mr-0 w-2/4" >
            <select value ={selectInputType} onChange={(e) => {setInputType(e.target.value); }}  placeholder='NodeType' class="placeholder-opacity-50  placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm text-left rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " >
            <option value="single-input" class="placeholder-gray-500" >Single Input</option>
            <option value="multi-input" >Multi-input</option>
            <option value="vector" selected >Vector</option>
            </select>
            </div>
            }  
            </a>
            {selectInputType === "single-input" && (
            <SIngleInputComponent/>
            )}

            {selectInputType === "multi-input" &&
            (<MultiInputComponent/>)
          
            } 

            {selectInputType === "vector" && (
            <VectorInputComponent />
            
            )}
         </li>
         {selectInputType === "vector" && (
         <div >
            <a href="#" class="flex items-center ml-1 mr-0 p-2 text-white rounded-lg dark:text-white hover:bg-blue-800 hover:text-gray-900 dark:hover:bg-gray-700 group">
               <span><label class="block ml-0 mr-3 mb-2 text-md font-medium text-white dark:text-white">Select Operator Node type</label></span>
               <div class ="ml-6 mr-0 w-2/4">
               <select id ="nodes" value = {selectedOperatorNodeType} onChange={(e) => {handleOperatorNodeTypeChange(e.target.value); }} class="placeholder-opacity-50  placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm text-left rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " >
               <option value="binary">Binary search</option>
               <option value="insertion" >Insertion Sort</option>
               <option value="selection">Selection sort</option>
               <option value="bubble">Bubble Sort</option>
               </select>
               </div>

            </a>
         </div>
         )}
        
         <li id ="op">
            <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-blue-800 dark:hover:bg-gray-700 group">
               <span><label for="countries" class="mr-3 ml-1 block mb-2 text-md font-medium text-white dark:text-white">Select a operator</label></span>
               <div class = "ml-6 mr-0 w-1/3 ">
               <select id="countries" disabled={selectedNodeType !== "operator"}  value={selectedOperator} onChange={handleOperatorChange} class="placeholder-gray-500 bg-gray-800 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option value="+" selected>+</option>
               <option value="-">-</option>
               <option value="*">x</option>
               <option value="/">/</option>
               <option value="mod">modulus</option>
               <option value="pow">power</option>
               <option value="root">root</option>
               <option value="log">log</option>
               <option value="XOR">XOR</option>
               <option value="AND">AND</option>
               <option value="OR">OR</option>
               <option value="NOR">NOR</option>
               </select>
               </div>
            </a>
            
      {selectedOperator === 'root' && (
        <div class =" p-2">
          <label htmlFor="nValue">Enter the value of n:</label>
          <input
            class=" py-2 items-centre my-3 mx-auto placeholder-gray-500  bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            type="number"
            id="nValue"
            value={nValue}
            onChange={(e) => setNValue(e.target.value)}
          />
        </div>
      )}

      {selectedOperator === 'pow' && (
        <div class=" p-2 ">
          <label htmlFor="nValue">Enter the value of n:</label>
          <input
            class=" py-2 mx-auto my-3 items-centre placeholder-gray-500  bg-gray-800 border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            type="number"
            id="nValue"
            value={nValue}
            onChange={(e) => setNValue(e.target.value)}
          />
        </div>
      )}
       
         </li>
         <li class = "  rounded-md justify-center " eventKey = "Drag" onDragStart={(event) => onDragStart(event, 'Drag')} draggable>
            <a href="#" class="text-md flex items-center justify-center  p-2 text-gray-100 rounded-lg  dark:text-white group">
               <button id = "dragBtn" type="button" onClick={handleAddNodeClick}  eventKey = "Drag" onDragStart={(event) => onDragStart(event, 'Drag')} draggable class="w-full"  >
               <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
               <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
               <span class="relative px-6 py-3 transition-all ease-out bg-bluey rounded-md group-hover:bg-opacity-0 duration-400">
               <span class="relative text-white">Drag</span>
               </span>
               </a>
               </button>
            </a>
         </li>

         <li class = " rounded-md justify-center " eventKey = "Drag" onDragStart={(event) => onDragStart(event, 'Drag')} draggable>
            <a href="#" class="text-md flex items-center justify-center  p-2 text-gray-100 rounded-lg  dark:text-white group">
               <button type="button" onClick={handleClearCanvasClick}  eventKey = "Drag" onDragStart={(event) => onDragStart(event, 'Drag')} draggable class="w-3/4">
               <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
               <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
               <span class="relative px-6 py-3 transition-all ease-out bg-bluey rounded-md group-hover:bg-opacity-0 duration-400">
               <span class="relative text-white">Clear All</span>
               </span>
               </a>
               </button>
            </a>
         </li>   
         <li>
            <div class="mt-8 bg-gradient-r  from-black to-bluey border-t border-b border-blue-700 text-white px-4 py-3" role="alert">
               <p class="font-bold mb-2">To Delete a particular node</p>
               <p class="text-sm">Click <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-900 bg-gray-300 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 p-2 m-2 dark:border-gray-500">Backspace</kbd> </p>
            </div>
         </li>
         {/* <li>
         <div>
         <DownloadButton className="m-5 , p-2 , relative margin-auto" />
         </div>
         </li> */}
 
         <li>
         <div class= "margin-auto w-full">
        <button className=' p-2 w-1/2 bg-blue-500 hover:bg-blue-600 border-2 border-gray-900' onClick={manageSave}><i class="fi fi-rs-disk mx-3 "></i>save</button>
        <button className=" p-2 w-1/2 bg-blue-500 hover:bg-blue-600 border-2 border-gray-900" onClick={mangeRestore}><i class="fi fi-rr-time-past mx-3 my-auto"></i>restore</button>
         </div>
         </li>

                    
      </ul>
   </div>
   
</aside>

<div class="p-4 sm:ml-64">
   <div class="p-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 mb-4 ">
         <div class="flex border-gray-500 border-2 hover:border-blue-300 items-center justify-center h-24 rounded bg-gray-300 dark:bg-gray-800  bg-gradient-to-r from-blue-900 to-green-900 hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-800">
            <p id='nodeSpec' class=" font-semibold text-base text-gray-100 w-3/4 justify-center flex  dark:text-gray-500">
              Node Specifications
            </p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-300 dark:bg-gray-800 hover:border-blue-300 hover:border-2">
               <button type="button" id="submitBtn" class=" text-2xl w-full h-full bg-gradient-to-r from-gray-900 to-bluey text-white hover:from-bluey hover:to-cyan ...">
                Submit
               </button>
              
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-300 dark:bg-gray-800  hover:border-blue-300 hover:border-2 ">
               <button type="button" id ='run' class="text-2xl w-full h-full bg-gradient-to-r from-gray-900 to-bluey text-white hover:from-bluey hover:to-cyan ...">
                Run
               </button>
         </div>
      </div>
      
      
      <div class="flex h-[108]  rounded bg-bluey dark:bg-gray-800 border-2 border-blue-400">
         <div id = "code" class="text-lg text-yellow-300 dark:text-gray-500 w-full  ">
         <div class ="inline-block place-items-end overflow-auto h-96 w-full  bg-code text-yellow-200">
         {/* <div data-pym-src='https://www.jdoodle.com/plugin?stdin=0&arg=0' data-language="cpp"
  data-version-index="4" data-libs="mavenlib1, mavenlib2" class = " bg-bluey"> */}
              <pre id="myPreTag" class ="bg-code">
                  <div class =" static flex justify-end bg-code ">
                  <button id="copyButton" class="bg-blue-500 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 relative hover:bg-blue-700 hover:border-2 hover:border-blue-300 text-white font-bold py-2 px-4 " ><i class="fi fi-rr-copy-alt m-2 mt-5 "></i></button>
                  </div>
                    <Highlight  className='cpp pt-0 mt-0 px-8 h-full copy-btn' id="myPreTag" >
                    {generatedCode}
                    </Highlight>
              </pre>       
  
         {/* </div> */}
          {/* {<Helmet>
          <script src="./script.js"></script>
          </Helmet>} */}
         
         </div>
         {/* <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <button onClick={createPost}>Create Post</button>
    </div> */}
         </div>
  
      </div>
      <div className ='flex h-64 bg-transparent border-2 border-blue-300 relative my-2 border-b-blue-400'>
      <div className='bg-gradient-to-br from-[#121329] to-gray-800 font-extrabold text-lg h-full w-full flex justify-center items-center text-gray-100'>
         <CodeCompile 
         generatedCode = {generatedCode} 
         nums = {nums} />
      </div>
      </div>

   </div>
</div>
</div>

    )
}

export default MySideNav;
