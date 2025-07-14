import { Handle, Position } from "@xyflow/react";

interface NodeData {
  label: string;
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
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xs font-medium uppercase">Main Topic</span>
        </div>

        <div className="text-base font-bold">{data.label}</div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="a"
        className="w-3 h-3 border-2 border-white bg-violet-500"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        className="w-3 h-3 border-2 border-white bg-violet-500"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        className="w-3 h-3 border-2 border-white bg-violet-500"
      />
    </div>
  );
};

export default MainNode;
