import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  type Node,
  type Edge,
  BackgroundVariant,
  MarkerType,
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
    <div className="w-full h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-left"
        nodeTypes={nodeTypes}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          style: {
            strokeWidth: 12,
            stroke: "#8b5cf6",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#8b5cf6",
            width: 15,
            height: 15,
          },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          zoomable
          pannable
          nodeClassName={nodeClassName}
          className="bg-white border border-gray-200 rounded-lg shadow"
        />

        <Controls
          className="bg-white border border-gray-200 rounded-lg shadow"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />

        <Background
          variant={BackgroundVariant.Lines}
          gap={20}
          size={1}
          color="#e2e8f0"
        />
      </ReactFlow>

      <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">Legend</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-700">Start Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-violet-600 rounded"></div>
            <span className="text-gray-700">Main Topics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Learning Steps</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
