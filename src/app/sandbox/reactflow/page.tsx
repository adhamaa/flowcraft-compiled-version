'use client';

import CalculateNodePositions, { calculateNodePositions2, calculateNodePositions3, calculateNodePositions4, calculateNodePositions5, calculateNodePositions6, calculateNodePositions7, calculateNodePositions8 } from '@/components/reactflow/CalculateNodePositions';
import DevTools from '@/components/reactflow/Devtools';
import { Button } from '@mantine/core';
import * as React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Connection,
  Edge,
  Background,
  Controls,
  useNodes,
} from 'reactflow';
import 'reactflow/dist/style.css';

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

// const initialNodes = [
//   {
//     data: {
//       action: "Verified",
//       label: "RGO-01-01-Contract-Executive",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: {
//         chk_doc: [
//           "*"
//         ],
//         verifyrole_by: [
//           "*"
//         ],
//         verifyuser_by: [
//           "banidom",
//           "697759750475",
//           "202355042955",
//           "328385035822",
//           "523076914311",
//           "893967024174",
//           "098987787666",
//           "133072060606",
//           "555818576607",
//           "809522351337",
//           "590699921935",
//           "910506192808",
//           "621817977239",
//           "435673457969",
//           "656112384042",
//           "295548797301",
//           "521391330051",
//           "809422477498",
//           "146872295806",
//           "320050107922",
//           "944236895385",
//           "1"
//         ]
//       }
//     },
//     id: "dcba85ea-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "Start",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 255,
//     height: 171
//   },
//   {
//     data: {
//       label: "FCA-01-02-Payment-Process",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: null
//     },
//     id: "e8bc33d3-fb9a-11ee-8694-0254444c7958",
//     type: "End",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 135
//   },
//   {
//     data: {
//       action: "Checked",
//       label: "RGO-02-01-Engineer",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: {
//         checkrole_by: [
//           "*"
//         ],
//         checkuser_by: [
//           "banidom",
//           "860515614892",
//           "501254020348",
//           "2",
//           "647950129451",
//           "930640793734",
//           "220301051801",
//           "981608356262",
//           "220301051748",
//           "585652474827",
//           "864610993494",
//           "733186976812",
//           "220301051785"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dcc0071b-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Verified",
//       label: "RGO-03-01-Area-Manager",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: {
//         chk_doc: [
//           "*"
//         ],
//         verifyrole_by: [
//           "*"
//         ],
//         verifyuser_by: [
//           "banidom",
//           "152176523823",
//           "220301051781",
//           "220301051790",
//           "220301051807",
//           "220301051799",
//           "220301051817"
//         ]
//       }
//     },
//     id: "dcc55451-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Checked",
//       label: "CPD-01-01-AQS",
//       list: [
//         {
//           pbt_id: "3",
//           pbt_name: "Majlis Bandaraya Johor Bahru"
//         },
//         {
//           pbt_id: "4",
//           pbt_name: "Majlis Bandaraya Pasir Gudang"
//         },
//         {
//           pbt_id: "5",
//           pbt_name: "Majlis Bandaraya Iskandar Puteri"
//         },
//         {
//           pbt_id: "6",
//           pbt_name: "Majlis Perbandaran Pontian"
//         },
//         {
//           pbt_id: "7",
//           pbt_name: "Majlis Perbandaran Kulai"
//         },
//         {
//           pbt_id: "8",
//           pbt_name: "Majlis Daerah Mersing"
//         },
//         {
//           pbt_id: "9",
//           pbt_name: "Majlis Perbandaran Pengerang"
//         },
//         {
//           pbt_id: "10",
//           pbt_name: "Majlis Daerah Kota Tinggi"
//         },
//         {
//           pbt_id: "11",
//           pbt_name: "Majlis Daerah Simpang Renggam"
//         },
//         {
//           pbt_id: "12",
//           pbt_name: "Majlis Perbandaran Kluang"
//         },
//         {
//           pbt_id: "13",
//           pbt_name: "Majlis Perbandaran Batu Pahat"
//         },
//         {
//           pbt_id: "14",
//           pbt_name: "Majlis Daerah Yong Peng"
//         },
//         {
//           pbt_id: "15",
//           pbt_name: "Majlis Perbandaran Muar"
//         },
//         {
//           pbt_id: "16",
//           pbt_name: "Majlis Daerah Tangkak"
//         },
//         {
//           pbt_id: "17",
//           pbt_name: "Majlis Daerah Labis"
//         },
//         {
//           pbt_id: "18",
//           pbt_name: "Majlis Perbandaran Segamat"
//         }
//       ],
//       listEntCondition: {
//         pbt_data: [
//           {
//             pbt_id: "3",
//             pbt_name: "Majlis Bandaraya Johor Bahru"
//           },
//           {
//             pbt_id: "4",
//             pbt_name: "Majlis Bandaraya Pasir Gudang"
//           },
//           {
//             pbt_id: "5",
//             pbt_name: "Majlis Bandaraya Iskandar Puteri"
//           },
//           {
//             pbt_id: "6",
//             pbt_name: "Majlis Perbandaran Pontian"
//           },
//           {
//             pbt_id: "7",
//             pbt_name: "Majlis Perbandaran Kulai"
//           },
//           {
//             pbt_id: "8",
//             pbt_name: "Majlis Daerah Mersing"
//           },
//           {
//             pbt_id: "9",
//             pbt_name: "Majlis Perbandaran Pengerang"
//           },
//           {
//             pbt_id: "10",
//             pbt_name: "Majlis Daerah Kota Tinggi"
//           },
//           {
//             pbt_id: "11",
//             pbt_name: "Majlis Daerah Simpang Renggam"
//           },
//           {
//             pbt_id: "12",
//             pbt_name: "Majlis Perbandaran Kluang"
//           },
//           {
//             pbt_id: "13",
//             pbt_name: "Majlis Perbandaran Batu Pahat"
//           },
//           {
//             pbt_id: "14",
//             pbt_name: "Majlis Daerah Yong Peng"
//           },
//           {
//             pbt_id: "15",
//             pbt_name: "Majlis Perbandaran Muar"
//           },
//           {
//             pbt_id: "16",
//             pbt_name: "Majlis Daerah Tangkak"
//           },
//           {
//             pbt_id: "17",
//             pbt_name: "Majlis Daerah Labis"
//           },
//           {
//             pbt_id: "18",
//             pbt_name: "Majlis Perbandaran Segamat"
//           }
//         ],
//         pbt_id: [
//           "3",
//           "4",
//           "5",
//           "6",
//           "7",
//           "8",
//           "9",
//           "10",
//           "11",
//           "12",
//           "13",
//           "14",
//           "15",
//           "16",
//           "17",
//           "18"
//         ]
//       },
//       listExtCondition: {
//         checkrole_by: [
//           "*"
//         ],
//         checkuser_by: [
//           "banidom",
//           "416691479947",
//           "674392234721",
//           "465623928924",
//           "430294689997",
//           "512309507318",
//           "257268313328",
//           "850793703966",
//           "741910165347",
//           "295775559561",
//           "176335379946"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dcca3ee9-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Checked",
//       label: "CPD-02-01-Periodic",
//       list: [
//         {
//           cate_id: "2",
//           category: "Periodic",
//           uuid: "edd96413-3442-11ed-92a7-02a2f02fcce4"
//         }
//       ],
//       listEntCondition: {
//         cate_data: [
//           {
//             cate_id: "2",
//             category: "Periodic",
//             uuid: "edd96413-3442-11ed-92a7-02a2f02fcce4"
//           }
//         ],
//         cate_id: [
//           "2"
//         ]
//       },
//       listExtCondition: {
//         checkrole_by: [
//           "*"
//         ],
//         checkuser_by: [
//           "&",
//           "banidom",
//           "admin_schinkels"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dccf4971-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Checked",
//       label: "CPD-02-02-Routine ",
//       list: [
//         {
//           cate_id: "1",
//           category: "Routine",
//           uuid: "edd96254-3442-11ed-92a7-02a2f02fcce4"
//         }
//       ],
//       listEntCondition: {
//         cate_data: [
//           {
//             cate_id: "1",
//             category: "Routine",
//             uuid: "edd96254-3442-11ed-92a7-02a2f02fcce4"
//           }
//         ],
//         cate_id: [
//           "1"
//         ]
//       },
//       listExtCondition: {
//         checkrole_by: [
//           "*"
//         ],
//         checkuser_by: [
//           "&",
//           "banidom",
//           "admin_schinkels"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dcd43f8b-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Checked",
//       label: "CPD-02-03-Other-Cate",
//       list: [
//         {
//           cate_id: "3",
//           category: "Emergency",
//           uuid: "edd96478-3442-11ed-92a7-02a2f02fcce4"
//         },
//         {
//           cate_id: "4",
//           category: "Urgent",
//           uuid: "edd964d3-3442-11ed-92a7-02a2f02fcce4"
//         },
//         {
//           cate_id: "5",
//           category: "Panel Contractor",
//           uuid: "7881a961-6940-11ed-92a7-02a2f02fcce4"
//         }
//       ],
//       listEntCondition: {
//         cate_data: [
//           {
//             cate_id: "3",
//             category: "Emergency",
//             uuid: "edd96478-3442-11ed-92a7-02a2f02fcce4"
//           },
//           {
//             cate_id: "4",
//             category: "Urgent",
//             uuid: "edd964d3-3442-11ed-92a7-02a2f02fcce4"
//           },
//           {
//             cate_id: "5",
//             category: "Panel Contractor",
//             uuid: "7881a961-6940-11ed-92a7-02a2f02fcce4"
//           }
//         ],
//         cate_id: [
//           "3",
//           "4",
//           "5"
//         ]
//       },
//       listExtCondition: {
//         checkrole_by: [
//           "*"
//         ],
//         checkuser_by: [
//           "&",
//           "banidom",
//           "admin_schinkels"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dcd92b72-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       label: "CPD-03-01-Contract-Manager",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: {
//         certifyrole_by: [
//           "*"
//         ],
//         certifyuser_by: [
//           "141900793353",
//           "banidom",
//           "admin_schinkels"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dcde77d2-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Approved",
//       label: "MGMT-01-01-General-Manager",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: {
//         approverole_by: [
//           "*"
//         ],
//         approveuser_by: [
//           "220301051733",
//           "banidom",
//           "admin_schinkels"
//         ],
//         chk_doc: [
//           "*"
//         ]
//       }
//     },
//     id: "dce3b2e8-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   },
//   {
//     data: {
//       action: "Verified",
//       label: "FCA-01-01-Financial-Controller",
//       listEntCondition: {
//         user_id: [
//           "*"
//         ]
//       },
//       listExtCondition: {
//         chk_doc: [
//           "*"
//         ],
//         verifyrole_by: [
//           "*"
//         ],
//         verifyuser_by: [
//           "220301051753",
//           "banidom",
//           "admin_schinkels",
//           "220301051755",
//           "220301051758",
//           "220301051759",
//           "220301051829",
//           "946323579249"
//         ]
//       }
//     },
//     id: "dce8bc89-04fe-11ee-a452-02c9dcd6ed1e",
//     type: "WithEntryAndExit",
//     position: {
//       x: 0,
//       y: 0
//     },
//     width: 192,
//     height: 130
//   }
// ];

// const initialEdges = [
//   {
//     id: 0,
//     source: "dcba85ea-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcc0071b-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 1,
//     source: "dcc0071b-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcc55451-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 2,
//     source: "dcc55451-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcca3ee9-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 3,
//     source: "dcca3ee9-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dccf4971-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 4,
//     source: "dcca3ee9-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcd43f8b-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 5,
//     source: "dcca3ee9-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcd92b72-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 6,
//     source: "dccf4971-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcde77d2-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 7,
//     source: "dcd43f8b-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcde77d2-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 8,
//     source: "dcd92b72-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dcde77d2-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 9,
//     source: "dcde77d2-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dce3b2e8-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 10,
//     source: "dce3b2e8-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "dce8bc89-04fe-11ee-a452-02c9dcd6ed1e"
//   },
//   {
//     id: 11,
//     source: "dce8bc89-04fe-11ee-a452-02c9dcd6ed1e",
//     style: {
//       borderWidth: "",
//       width: ""
//     },
//     target: "e8bc33d3-fb9a-11ee-8694-0254444c7958"
//   }
// ];

// Example usage:
const initialNodes: any[] = [
  {
    data: { label: "Start" },
    id: "1",
    type: "Start",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 1" },
    id: "2",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 2" },
    id: "3",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 3" },
    id: "4",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 4" },
    id: "5",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 5" },
    id: "6",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 6" },
    id: "7",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
  {
    data: { label: "Node 7" },
    id: "8",
    type: "Node",
    position: { x: 0, y: 0 },
    width: 100,
    height: 50
  },
];

const initialEdges: Edge[] = [
  { id: '1-2', source: "1", style: { borderWidth: "1px", width: "1px" }, target: "2" },
  { id: '1-3', source: "1", style: { borderWidth: "1px", width: "1px" }, target: "3" },
  { id: '1-4', source: "1", style: { borderWidth: "1px", width: "1px" }, target: "4" },
  { id: '2-5', source: "2", style: { borderWidth: "1px", width: "1px" }, target: "5" },
  { id: '3-5', source: "3", style: { borderWidth: "1px", width: "1px" }, target: "5" },
  { id: '4-5', source: "4", style: { borderWidth: "1px", width: "1px" }, target: "5" },
  { id: '5-6', source: "5", style: { borderWidth: "1px", width: "1px" }, target: "6" },
  { id: '5-7', source: "5", style: { borderWidth: "1px", width: "1px" }, target: "7" },
  { id: '6-8', source: "6", style: { borderWidth: "1px", width: "1px" }, target: "8" },
  { id: '7-8', source: "7", style: { borderWidth: "1px", width: "1px" }, target: "8" },
];


const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges as any[]);
  const [rfInstance, setRfInstance] = React.useState<any>(null);
  const { setViewport } = useReactFlow();

  const onConnect = React.useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  // const onSave = React.useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //   }
  // }, [rfInstance]);

  // const onRestore = React.useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(localStorage.getItem(flowKey) as string);

  //     if (flow) {
  //       const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       setViewport({ x, y, zoom });
  //     }
  //   };

  //   restoreFlow();
  // }, [setNodes, setViewport]);

  // const onAdd = React.useCallback(() => {
  //   const newNode = {
  //     id: getNodeId(),
  //     data: { label: 'Added node' },
  //     position: {
  //       x: Math.random() * window.innerWidth - 100,
  //       y: Math.random() * window.innerHeight,
  //     },
  //   };
  //   setNodes((nds) => nds.concat(newNode));
  // }, [setNodes]);

  const updatedNodes = calculateNodePositions8(nodes, edges);

  return (
    <ReactFlow
      nodes={updatedNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onInit={setRfInstance}
      fitView={true}
    >
      {/* <Panel position="top-right" className='flex gap-3'>
        <Button onClick={onSave}>save</Button>
        <Button onClick={onRestore}>restore</Button>
        <Button onClick={onAdd}>add node</Button>
      </Panel> */}
      <Background />
      <DevTools />
      <Controls />
    </ReactFlow>
  );
};

export default () => (
  <div className='h-screen'>
    <ReactFlowProvider>
      <SaveRestore />
    </ReactFlowProvider>
  </div>
);
