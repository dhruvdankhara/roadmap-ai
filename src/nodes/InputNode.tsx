import { Handle, Position } from "@xyflow/react";

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
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
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
        position={Position.Right}
        id="1"
        className="w-4 h-4 border-2 border-white bg-emerald-400"
      />
    </div>
  );
};

export default InputNode;
