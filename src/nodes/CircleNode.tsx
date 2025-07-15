import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

interface CircleNodeData {
  title: string;
  description: string;
  practicalExample: string;
}

const CircleNode = ({ data }: { data: CircleNodeData }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="relative bg-transparent">
        {/* Circle node */}
        <div
          className="w-32 h-32 bg-blue-500 rounded-full shadow-md border-2 border-blue-600 flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-200"
          onClick={() => setShowModal(true)}
        >
          <div className="text-white font-medium text-sm text-center leading-tight break-words mb-1">
            {data.title || "Subtopic"}
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 border-2 border-white bg-blue-400"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute top-40 -left-full  bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 rounded-2xl w-96">
          <div className="absolute -top-1 left-1/2 w-0 h-0 border-l-12 border-r-12 border-b-12 border-transparent border-b-blue-500"></div>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-96 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r bg-blue-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {data.practicalExample && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Practical Example
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 leading-relaxed">
                      {data.practicalExample}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CircleNode;
