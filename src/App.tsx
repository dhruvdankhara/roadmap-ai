import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { MarkerType, type Node, type Edge } from "@xyflow/react";
import Canvas from "./Canvas";
import { databases } from "./lib/appwrite";
import { useNavigate, useParams } from "react-router-dom";

interface Subtopic {
  title: string;
  description: string;
}

interface RoadmapNode {
  title: string;
  subtopics: Subtopic[];
}

interface RoadmapData {
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

const OverviewFlow = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>();
  const navigate = useNavigate();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [data, setData] = useState<RoadmapData>();

  const generateNodeEdges = (data: RoadmapData): void => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeIdCounter = 0;

    const config = {
      startX: 100,
      mainNodeSpacingX: 300,
      mainNodeY: 50,
      subtopicY: 400,
      subtopicSpacingX: 200,
      minSubtopicSpacing: 200,
    };

    // Start node
    const startNodeId = nodeIdCounter++;
    nodes.push({
      id: startNodeId.toString(),
      type: "start",
      data: { label: data.title },
      position: { x: config.startX, y: config.mainNodeY },
    });

    let currentMainX = config.startX + config.mainNodeSpacingX;
    let globalSubtopicX = config.startX + 100;

    data.nodes.forEach((mainTopic, mainIndex) => {
      const mainNodeId = nodeIdCounter++;

      // Calculate space
      const subtopicCount = mainTopic.subtopics.length;
      const requiredWidth = Math.max(
        subtopicCount * config.subtopicSpacingX,
        config.minSubtopicSpacing * subtopicCount
      );

      const mainNodeX = currentMainX + requiredWidth / 2 - 100;

      nodes.push({
        id: mainNodeId.toString(),
        type: "main",
        position: { x: mainNodeX, y: config.mainNodeY },
        data: { label: mainTopic.title },
      });

      const sourceNodeId = mainIndex === 0 ? startNodeId : nodeIdCounter - 2;
      edges.push({
        id: `main-edge-${mainNodeId}`,
        source: sourceNodeId.toString(),
        target: mainNodeId.toString(),
        sourceHandle: mainIndex === 0 ? undefined : "b",
        targetHandle: "a",
        style: { stroke: "#8b5cf6", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      });

      // subtopics
      const subtopicStartX = currentMainX + 50;
      mainTopic.subtopics.forEach((subtopic, subtopicIndex) => {
        const subtopicNodeId = `${mainNodeId}-sub-${subtopicIndex}`;
        const subtopicX =
          subtopicStartX + subtopicIndex * config.subtopicSpacingX;

        nodes.push({
          id: subtopicNodeId,
          type: "circle",
          position: { x: subtopicX, y: config.subtopicY },
          data: {
            label: subtopic.title,
            description: subtopic.description,
          },
        });

        edges.push({
          id: `subtopic-edge-${subtopicNodeId}`,
          source: mainNodeId.toString(),
          target: subtopicNodeId,
          sourceHandle: "c",
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
        });
      });

      currentMainX += requiredWidth + config.mainNodeSpacingX;
      globalSubtopicX = Math.max(globalSubtopicX, currentMainX);
    });

    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    (async () => {
      const response = await databases.getDocument(
        "6874d2200030c6ec9e6f",
        "6874d24a0021ae17ca60",
        roadmapId!
      );

      const data = (await JSON.parse(response.data)) as unknown as RoadmapData;
      setNodes([]);
      setEdges([]);

      setData(data);
      generateNodeEdges(data);
      document.title = data.title;
    })();
  }, [roadmapId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-6">
            <div className="w-8 h-8 border-3 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Loading Your Roadmap
          </h1>
          <p className="text-gray-600 text-lg">
            Preparing your personalized learning journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            <div className="flex items-center gap-3 text-xl font-bold text-gray-900">
              RoadmapAI
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            {data.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your personalized learning roadmap with structured milestones and
            actionable steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data.nodes.length}
                </p>
                <p className="text-sm text-gray-600 font-medium">Main Topics</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data.nodes.reduce(
                    (acc, node) => acc + node.subtopics.length,
                    0
                  )}
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Learning Steps
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">AI</p>
                <p className="text-sm text-gray-600 font-medium">Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200/50">
            <div className="flex flex-col items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">Roadmap</h2>
              <p className="text-gray-600 text-sm">
                Explore your learning path • Hover over subtopics for details
              </p>
            </div>
          </div>
          <div className="h-screen">
            <Canvas nodes={nodes} edges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewFlow;
