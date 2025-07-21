import { Handle, Position } from "@xyflow/react";
import { FaCirclePlay } from "react-icons/fa6";

interface InputNodeData {
  label: string;
}

interface InputNodeProps {
  data: InputNodeData;
}

const InputNode = ({ data }: InputNodeProps) => {
  return (
    <div className="relative">
      <div className="px-6 py-4 bg-emerald-500 text-white shadow-md rounded-xl border-2 border-emerald-600 min-w-[200px] max-w-[300px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <FaCirclePlay className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium uppercase">Start Here</span>
        </div>

        <div className="text-lg font-bold">{data.label}</div>

        <div className="text-emerald-100 text-sm">
          Your learning journey begins here
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="1"
        className="w-4 h-4 border-2 border-white bg-emerald-400"
      />
    </div>
  );
};

export default InputNode;
