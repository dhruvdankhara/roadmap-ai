import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  type Node,
  type Edge,
} from "@xyflow/react";

import AnnotationNode from "./nodes/AnnotationNode";
import CircleNode from "./nodes/CircleNode";
import MainNode from "./nodes/MainNode";
import InputNode from "./nodes/InputNode";

const nodeTypes = {
  start: InputNode,
  main: MainNode,
  annotation: AnnotationNode,
  circle: CircleNode,
};

const nodeClassName = (node: Node) => node.type || "";

const Canvas = ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes && nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap zoomable pannable nodeClassName={nodeClassName} />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
