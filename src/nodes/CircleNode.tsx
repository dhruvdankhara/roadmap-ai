import { Handle, Position } from "@xyflow/react";

interface CircleNodeData {
  title: string;
  description: string;
  practicalExample: string;
}

interface CircleNodeProps {
  data: CircleNodeData;
  positionAbsoluteX: number;
  onSubtopicClick?: (subtopic: CircleNodeData) => void;
}

const CircleNode = ({
  data,
  positionAbsoluteX,
  onSubtopicClick,
}: CircleNodeProps) => {
  const handleClick = () => {
    if (onSubtopicClick) {
      onSubtopicClick(data);
    }
  };

  return (
    <div className="relative bg-transparent">
      {/* Circle node */}
      <div
        className="w-32 h-32 bg-blue-500 rounded-full shadow-md border-2 border-blue-600 flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-200"
        onClick={handleClick}
      >
        <div className="text-white font-medium text-sm text-center leading-tight break-words mb-1">
          {data.title || "Subtopic"}
        </div>
      </div>

      <Handle
        type="target"
        position={positionAbsoluteX > 0 ? Position.Left : Position.Right}
        className="w-3 h-3 border-2 border-white bg-blue-400"
      />
    </div>
  );
};

export default CircleNode;
