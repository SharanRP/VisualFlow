// import React from 'react';
// import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
// import { toPng } from 'html-to-image';
// //import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// function downloadImage(dataUrl) {
//   const a = document.createElement('a');

//   a.setAttribute('download', 'reactflow.png');
//   a.setAttribute('href', dataUrl);
//   a.click();
// }

// const imageWidth = 1024;
// const imageHeight = 768;

// function DownloadButton() {
//   const { getNodes } = useReactFlow();
//   const onClick = () => {
//     // we calculate a transform for the nodes so that all nodes are visible
//     // we then overwrite the transform of the `.react-flow__viewport` element
//     // with the style option of the html-to-image library
//     const nodesBounds = getRectOfNodes(getNodes());
//     const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

//     toPng(document.querySelector('.react-flow__viewport'), {
//       backgroundColor: '#fff',
//       width: imageWidth,
//       height: imageHeight,
//       style: {
//         width: imageWidth,
//         height: imageHeight,
//         transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
//       },
//     }).then(downloadImage);
//   };

//   return (
//     <Panel position='top-right'>
//     <div>
//       <button classname = "m-0" onClick={onClick}>
//       <a href="#_" class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-blue-500  group">
// <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-blue-700 rounded group-hover:-mr-4 group-hover:-mt-4">
// <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
// </span>
// <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-blue-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
// <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"><i class="fi fi-rr-download mx-2"></i>FlowChart</span>
// </a>
      
//       </button>
//     </div>
//     </Panel>

//   );
// }

// export default DownloadButton;

import React from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
  const a = document.createElement('a');
  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

function DownloadButton() {
  const { getNodes } = useReactFlow();

  const onClick = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, nodesBounds.width, nodesBounds.height, 0.5, 2);

    // Apply the transform directly to the .react-flow__viewport element
    const viewport = document.querySelector('.react-flow__viewport');
    viewport.style.transform = `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`;

    toPng(viewport, {
      backgroundColor: '#fff',
      width: nodesBounds.width, // Set image width to match canvas width
      height: nodesBounds.height, // Set image height to match canvas height
    }).then((dataUrl) => {
      downloadImage(dataUrl);
      
      // Reset the transform by setting it back to its original state
      viewport.style.transform = 'none';
    });
  };

  return (
    <Panel position='top-right'>
      <div>
        <button className="m-0" onClick={onClick}>
          <a href="#_" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-blue-500 group">
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-blue-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-blue-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"><i className="fi fi-rr-download mx-2"></i>FlowChart</span>
          </a>
        </button>
      </div>
    </Panel>
  );
}

export default DownloadButton;
