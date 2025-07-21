import { Handle, Position } from "@xyflow/react";
import { FaClock } from "react-icons/fa6";
import { IoReorderFour } from "react-icons/io5";

interface NodeData {
  label: string;
  duration?: string;
  prerequisite?: string;
  isRight: boolean;
}

interface MainNodeProps {
  data: NodeData;
  positionAbsoluteX: number;
  positionAbsoluteY: number;
}

const MainNode = ({
  data,
}: // positionAbsoluteX,
// positionAbsoluteY,
MainNodeProps) => {
  return (
    <div className="relative">
      <div className="px-5 py-3 bg-violet-600 text-white shadow-md rounded-xl border-2 border-violet-700 min-w-[180px] max-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-violet-700 rounded flex items-center justify-center">
            <IoReorderFour className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium uppercase">Main Topic</span>
        </div>

        <div className="text-base font-bold mb-2">{data.label}</div>

        <div className="space-y-2">
          {data.duration && (
            <div className="flex items-center gap-1 text-xs bg-blue-600/80 px-2 py-1 rounded">
              <FaClock className="w-3 h-3" />
              <span>{data.duration}</span>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="a"
        className="w-3 h-3 border-2 border-white bg-violet-500"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="w-3 h-3 border-2 border-white bg-violet-500"
      />

      <Handle
        type="source"
        position={data.isRight ? Position.Right : Position.Left}
        id="c"
        className="w-3 h-3 border-2 border-white bg-violet-500"
      />
    </div>
  );
};

export default MainNode;
