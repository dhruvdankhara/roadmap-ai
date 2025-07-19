import {
  ReactFlow,
  // MiniMap,
  Controls,
  Background,
  type Node,
  type Edge,
  BackgroundVariant,
  MarkerType,
  Panel,
} from "@xyflow/react";

import AnnotationNode from "./nodes/AnnotationNode";
import CircleNode from "./nodes/CircleNode";
import MainNode from "./nodes/MainNode";
import InputNode from "./nodes/InputNode";

interface Subtopic {
  title: string;
  description: string;
  practicalExample: string;
}

const Canvas = ({
  nodes,
  edges,
  onSubtopicClick,
}: {
  nodes: Node[];
  edges: Edge[];
  onSubtopicClick: (subtopic: Subtopic) => void;
}) => {
  const nodeTypes = {
    start: InputNode,
    main: MainNode,
    annotation: AnnotationNode,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    circle: (props: any) => (
      <CircleNode {...props} onSubtopicClick={onSubtopicClick} />
    ),
  };

  const onInit = (reactFlowInstance: {
    fitView: (arg0: {
      nodes: { id: string }[];
      duration: number;
      padding: number;
    }) => void;
  }) => {
    console.log("Canvas is ready!", reactFlowInstance);

    reactFlowInstance.fitView({
      nodes: [{ id: "1" }, { id: "anotation-node" }],
      duration: 800,
      padding: 0.6,
    });
  };

  return (
    <div className="w-full h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        attributionPosition="bottom-left"
        nodeTypes={nodeTypes}
        minZoom={0.1}
        maxZoom={2}
        panOnScroll={true}
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
        onInit={onInit}
      >
        {/* <MiniMap
          nodeStrokeWidth={3}
          nodeClassName={nodeClassName}
          className="bg-white border border-gray-200 rounded-lg shadow"
        /> */}

        <Controls />

        <Background variant={BackgroundVariant.Lines} bgColor="#f0f0f0" />

        <Panel position={"top-right"} className="bg-white p-4 rounded-xl">
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
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Canvas;
