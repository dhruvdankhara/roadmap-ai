import { Handle, Position } from "@xyflow/react";

interface CircleNodeData {
  label?: string;
  description?: string;
}

interface CircleNodeProps {
  data: CircleNodeData;
}

const CircleNode = ({ data }: CircleNodeProps) => {
  return (
    <div className="relative group bg-transparent ">
      {/* tooltip */}
      <div className="absolute  bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 hover:opacity-100 group-hover:opacity-100 z-20 transition-opacity duration-200">
        <div className="bg-gray-900  text-white text-sm rounded-lg px-4 py-3 w-80 max-w-sm text-left shadow-lg">
          <div className="font-semibold  text-white mb-1">{data.label}</div>
          {data.description && (
            <div className="text-gray-300 text-sm leading-relaxed">
              {data.description}
            </div>
          )}
          {/* arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* circle node */}
      <div className="w-32 h-32 bg-blue-500 rounded-full shadow-md border-2 border-blue-600 flex items-center justify-center p-4 cursor-pointer">
        <div className="text-white font-medium text-sm text-center leading-tight px-1 break-words ">
          {data.label || "Subtopic"}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 border-white bg-blue-400"
      />
    </div>
  );
};

export default CircleNode;
