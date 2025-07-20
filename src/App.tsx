import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import { MarkerType, type Node, type Edge } from "@xyflow/react";
import Canvas from "./Canvas";
import { databases } from "./lib/appwrite";
import { useParams } from "react-router-dom";
import LearningPanel from "./LearningPanel";

export interface Subtopic {
  title: string;
  description: string;
  practicalExample: string;
}

interface RoadmapNode {
  id: string;
  title: string;
  duration: string;
  order: 1;
  prerequisite: string;
  subtopics: Subtopic[];
}

interface RoadmapData {
  title: string;
  description: string;
  difficultyLevel: string;
  estimatedDuration: string;
  nodes: RoadmapNode[];
}

const OverviewFlow = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [data, setData] = useState<RoadmapData>();
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string>("chat");

  const handleSubtopicClick = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setActiveTab("details");
  };

  const generateNodeEdges = (data: RoadmapData): void => {
    const nodes: Node[] = [
      {
        id: "anotation-node",
        type: "annotation",
        selectable: false,
        data: {
          label: data.title,
          level: 0,
          arrowStyle: {
            right: "50%",
            bottom: "-30%",
          },
        },
        position: { x: -100, y: -350 },
      },
    ];
    const edges: Edge[] = [];
    let nodeIdCounter = 0;

    const config = {
      startY: 0,
      mainNodeSpacingY: 150,
      mainNodeX: 0,
      subtopicX: 600,
      subtopicSpacingY: 200,
      minSubtopicSpacing: 100,
    };

    // Start node
    const startNodeId = nodeIdCounter++;
    nodes.push({
      id: startNodeId.toString(),
      type: "start",
      data: { label: data.title },
      position: { y: config.startY, x: config.mainNodeX },
    });

    let currentMainY = config.startY + config.mainNodeSpacingY;
    let globalSubtopicY = config.startY + 100;

    data.nodes.forEach((mainTopic, mainIndex) => {
      const mainNodeId = nodeIdCounter++;

      // Calculate space
      const subtopicCount = mainTopic.subtopics.length;
      const requiredWidth = Math.max(
        subtopicCount * config.subtopicSpacingY,
        config.minSubtopicSpacing * subtopicCount
      );

      const mainNodeY = currentMainY + requiredWidth / 2 - 100;

      nodes.push({
        id: mainNodeId.toString(),
        type: "main",
        position: { y: mainNodeY, x: config.mainNodeX },
        data: {
          label: mainTopic.title,
          duration: mainTopic.duration,
          prerequisite: mainTopic.prerequisite,
          isRight: mainNodeId % 2 !== 0,
        },
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
      const subtopicStartY = currentMainY + 50;
      mainTopic.subtopics.forEach((subtopic, subtopicIndex) => {
        const subtopicNodeId = `${mainNodeId}-sub-${subtopicIndex}`;
        const subtopicY =
          subtopicStartY + subtopicIndex * config.subtopicSpacingY;

        nodes.push({
          id: subtopicNodeId,
          type: "circle",
          position: {
            x: mainNodeId % 2 !== 0 ? config.subtopicX : -config.subtopicX,
            y: subtopicY,
          },
          data: {
            title: subtopic.title,
            description: subtopic.description,
            practicalExample: subtopic.practicalExample,
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

      currentMainY += requiredWidth + config.mainNodeSpacingY;
      globalSubtopicY = Math.max(globalSubtopicY, currentMainY);
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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Layout */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left Sidebar */}
        <div className="col-span-3 overflow-auto bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col">
          <div className="p-4 border-b border-gray-200/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Roadmap AI
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">
                  {data.nodes.length} Main Topics
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">
                  {data.nodes.reduce(
                    (acc, node) => acc + node.subtopics.length,
                    0
                  )}{" "}
                  Learning Steps
                </span>
              </div>
              {data.estimatedDuration && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {data.estimatedDuration}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Topics</h3>
            <div className="space-y-2 ">
              {data.nodes.map((node, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="font-medium text-sm text-gray-900 mb-1">
                    {node.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {node.subtopics.length} subtopics
                  </div>
                  {node.duration && (
                    <div className="text-xs text-blue-600 mt-1">
                      {node.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 col-span-9 grid grid-cols-12 ">
          {/* Middle Canvas */}
          <div className="border-r-2 border-l-2 border-gray-400 col-span-8 bg-white/50 backdrop-blur-sm">
            <Canvas
              nodes={nodes}
              edges={edges}
              onSubtopicClick={handleSubtopicClick}
            />
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 bg-white/80 backdrop-blur-sm flex flex-col h-full ">
            <LearningPanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedSubtopic={selectedSubtopic}
              roadmapData={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewFlow;
