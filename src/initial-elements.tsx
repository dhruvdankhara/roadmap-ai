import { MarkerType } from "@xyflow/react";

// export const nodes = [
//   {
//     id: "annotation-1",
//     type: "annotation",
//     draggable: false,
//     selectable: false,
//     data: {
//       level: 1,
//       label:
//         "Built-in node and edge types. Draggable, deletable and connectable!",
//       arrowStyle: {
//         right: 0,
//         bottom: 0,
//         transform: "translate(-30px,10px) rotate(-80deg)",
//       },
//     },
//     position: { x: -200, y: -30 },
//   },
//   {
//     id: "1-1",
//     type: "input",
//     data: {
//       label: "Input Node",
//     },
//     position: { x: 150, y: 0 },
//   },
//   {
//     id: "1-2",
//     type: "default",
//     data: {
//       label: "Default Node",
//     },
//     position: { x: 0, y: 100 },
//   },
//   {
//     id: "1-3",
//     type: "output",
//     data: {
//       label: "Output Node",
//     },
//     position: { x: 300, y: 100 },
//   },
//   {
//     id: "annotation-2",
//     type: "annotation",
//     draggable: false,
//     selectable: false,
//     data: {
//       level: 2,
//       label: "Sub flows, toolbars and resizable nodes!",
//       arrowStyle: {
//         left: 0,
//         bottom: 0,
//         transform: "translate(5px, 25px) scale(1, -1) rotate(100deg)",
//       },
//     },
//     position: { x: 220, y: 200 },
//   },
//   {
//     id: "2-1",
//     type: "group",
//     position: {
//       x: -170,
//       y: 250,
//     },
//     style: {
//       width: 380,
//       height: 180,
//     },
//   },
//   {
//     id: "2-2",
//     data: {},
//     type: "tools",
//     position: { x: 50, y: 50 },
//     style: {
//       width: 80,
//       height: 80,
//     },
//     parentId: "2-1",
//     extent: "parent",
//   },
//   {
//     id: "2-3",
//     type: "resizer",
//     data: {
//       label: "Resize Me",
//     },
//     position: { x: 250, y: 50 },
//     style: {
//       width: 80,
//       height: 80,
//     },
//     parentId: "2-1",
//     extent: "parent",
//   },
//   {
//     id: "annotation-3",
//     type: "annotation",
//     draggable: false,
//     selectable: false,
//     data: {
//       level: 3,
//       label: <>Nodes and edges can be anything and are fully customizable!</>,
//       arrowStyle: {
//         right: 0,
//         bottom: 0,
//         transform: "translate(-35px, 20px) rotate(-80deg)",
//       },
//     },
//     position: { x: -40, y: 570 },
//   },
//   {
//     id: "3-2",
//     type: "textinput",
//     position: { x: 150, y: 650 },
//     data: {},
//   },
//   {
//     id: "3-1",
//     type: "circle",
//     position: { x: 350, y: 500 },
//     data: {},
//   },
// ];

// export const edges = [
//   {
//     id: "e1-2",
//     source: "1-1",
//     target: "1-2",
//     label: "edge",
//     type: "smoothstep",
//   },
//   {
//     id: "e1-3",
//     source: "1-1",
//     target: "1-3",
//     animated: true,
//     label: "animated edge",
//   },
//   {
//     id: "e2-2",
//     source: "1-2",
//     target: "2-2",
//     type: "smoothstep",
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   },
//   {
//     id: "e2-3",
//     source: "2-2",
//     target: "2-3",
//     type: "smoothstep",
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   },
//   {
//     id: "e3-3",
//     source: "2-3",
//     sourceHandle: "a",
//     target: "3-2",
//     type: "button",
//     animated: true,
//     style: { stroke: "rgb(158, 118, 255)" },
//   },
//   {
//     id: "e3-4",
//     source: "2-3",
//     sourceHandle: "b",
//     target: "3-1",
//     type: "button",
//   },
// ];

export const nodes = [
  {
    id: "1",
    type: "start",
    data: {
      label: "Introduction to Node.js",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "main",
    data: {
      label: "Node.js Basics",
    },
    position: { x: 400, y: 0 },
  },
  {
    id: "2-1",
    type: "circle",
    position: { x: 200, y: 200 },
    data: {
      label: "Node.js Introduction",
    },
  },
  {
    id: "2-2",
    type: "circle",
    position: { x: 400, y: 200 },
    data: {
      label: "Node.js Advanced Topics Node.js Advanced Topics",
    },
  },
  {
    id: "2-3",
    type: "circle",
    position: { x: 600, y: 200 },
    data: {
      label: "Node.js Deployment",
    },
  },
  {
    id: "3",
    type: "main",
    position: { x: 800, y: 0 },
    data: {
      label: "Node.js Best Practices",
    },
  },
  {
    id: "3-1",
    type: "circle",
    position: { x: 800, y: 200 },
    data: {
      label: "Node.js Performance Optimization",
    },
  },
  {
    id: "3-2",
    type: "circle",
    position: { x: 1000, y: 200 },
    data: {
      label: "Node.js Security Best Practices",
    },
  },
  {
    id: "4",
    type: "main",
    position: { x: 1200, y: 0 },
    data: {
      label: "Node.js Ecosystem",
    },
  },
];

export const edges = [
  {
    id: "e1-1",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: "rgb(158, 118, 255)" },
  },
  {
    id: "e1-2",
    source: "2",
    target: "2-1",
    animated: true,
    sourceHandle: "c",
  },
  {
    id: "e1-3",
    source: "2",
    target: "2-2",
    animated: true,
    sourceHandle: "c",
  },
  {
    id: "e1-4",
    source: "2",
    target: "2-3",
    sourceHandle: "c",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-5",
    source: "2",
    target: "3",
    sourceHandle: "b",
    style: { stroke: "rgb(158, 118, 255)" },
  },
  {
    id: "e1-7",
    source: "3",
    target: "3-1",
    sourceHandle: "c",
    style: { stroke: "rgb(158, 118, 255)" },
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-8",
    source: "2-2",
    target: "3-2",
    sourceHandle: "a",
    style: { stroke: "rgb(158, 118, 255)" },
  },
  {
    id: "e1-9",
    source: "2-3",
    target: "4",
    sourceHandle: "a",
    style: { stroke: "rgb(158, 118, 255)" },
  },
  {
    id: "e1-6",
    source: "3",
    target: "4",
    sourceHandle: "b",
    style: { stroke: "rgb(158, 118, 255)" },
  },
];
