import { Handle, Position } from "@xyflow/react";

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

        <div className="text-base font-bold mb-2">{data.label}</div>

        <div className="space-y-2">
          {data.duration && (
            <div className="flex items-center gap-1 text-xs bg-blue-600/80 px-2 py-1 rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{data.duration}</span>
            </div>
          )}

          {data.prerequisite && (
            <div className="flex items-center gap-1 text-xs bg-orange-400/80 px-2 py-1 rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">{data.prerequisite}</span>
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
