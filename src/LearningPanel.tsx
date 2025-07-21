import "@xyflow/react/dist/style.css";
import * as Tabs from "@radix-ui/react-tabs";
import { useState, useRef, useEffect } from "react";
import { callGeminiChat } from "./lib/gemini";
import type { Subtopic } from "./App";
import { marked } from "marked";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiLightningBolt, HiReply } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface RoadmapNode {
  title: string;
  duration?: string;
  prerequisite?: string;
  subtopics: Subtopic[];
}

interface RoadmapData {
  title: string;
  description?: string;
  difficultyLevel?: string;
  estimatedDuration?: string;
  nodes: RoadmapNode[];
}

const LearningPanel = ({
  activeTab,
  setActiveTab,
  selectedSubtopic,
  roadmapData,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSubtopic: Subtopic | null;
  roadmapData?: RoadmapData;
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI learning assistant. I can help you understand your roadmap, explain concepts, and answer questions about your learning journey. \n\n**What would you like to know?**\n\nI can help with:\n- Explaining concepts\n- Code examples\n- Learning strategies\n- Step-by-step guidance",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateRoadmapContext = (): string => {
    if (!roadmapData) return "";

    const context = `
      Roadmap: ${roadmapData.title}
      Description: ${roadmapData.description || "N/A"}
      Difficulty: ${roadmapData.difficultyLevel || "N/A"}
      Duration: ${roadmapData.estimatedDuration || "N/A"}

      Main Topics:
      ${roadmapData.nodes
        .map(
          (node, index) => `
            ${index + 1}. ${node.title}
              Duration: ${node.duration || "N/A"}
              Prerequisites: ${node.prerequisite || "None"}
              Subtopics: ${node.subtopics.map((sub) => sub.title).join(", ")}
          `
        )
        .join("")}

        Current Context: ${
          selectedSubtopic
            ? `Currently viewing "${selectedSubtopic.title}" - ${selectedSubtopic.description}`
            : "No specific topic selected"
        }
    `;

    return context.trim();
  };

  const callGeminiAI = async (userMessage: string): Promise<string> => {
    try {
      const context = generateRoadmapContext();

      const prompt = `You are an expert learning assistant for a personalized roadmap platform. Your role is to help learners understand their roadmap, explain concepts, provide guidance, and answer questions about their learning journey.

      CONTEXT INFORMATION:
      ${context}

      USER MESSAGE: ${userMessage}

      INSTRUCTIONS:
      - Provide helpful, encouraging, and educational responses
      - Reference the roadmap context when relevant
      - If asked about specific topics, explain them clearly with practical examples
      - Suggest next steps or learning strategies when appropriate
      - Keep responses conversational but informative
      - If the user asks about something not in the roadmap, still try to be helpful within the learning context
      - Be encouraging and supportive of their learning journey
      - Use markdown formatting to enhance readability:
        - Use **bold** for important concepts
        - Use \\\`code\\\` for technical terms or variables
        - Use code blocks with triple backticks for longer code examples
        - Use bullet points for lists
        - Use headings (##) for sections when appropriate

      Respond in a friendly, knowledgeable manner as a learning mentor would, using markdown formatting to make your response clear and well-structured.`;

      const response = await callGeminiChat(prompt);
      return response;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error(
        "Failed to get AI response. Please check your connection and try again."
      );
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await callGeminiAI(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the AI service right now. Please check your internet connection and try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <>
      <Tabs.Root
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col h-full"
      >
        {/* Tabs Header */}
        <div className="p-4 border-b border-gray-200/50">
          <Tabs.List className="flex bg-gray-100 rounded-lg p-1">
            <Tabs.Trigger
              value="chat"
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 hover:text-gray-900"
            >
              <div className="flex items-center gap-2">
                <IoChatbubbleEllipsesSharp className="size-4" />
                AI Chat
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="details"
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 hover:text-gray-900"
            >
              <div className="flex items-center gap-2">
                <BsInfoCircleFill className="w-4 h-4" />
                Details
              </div>
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden min-h-0">
          {/* AI Tab */}
          <Tabs.Content value="chat" className="h-full flex flex-col">
            <div className="flex-1 flex flex-col min-h-0">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="flex flex-col gap-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white rounded-br-md user-message"
                            : "bg-gray-100 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        <div className="text-sm markdown-content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: marked.parse(message.text, {
                                breaks: true,
                                gfm: true,
                              }) as string,
                            }}
                          />
                        </div>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md p-3 max-w-[85%]">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="flex-shrink-0 p-4 border-t border-gray-200">
                {selectedSubtopic && (
                  <div className="bg-indigo-50 border border-blue-200 rounded-xl p-3 mb-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                        <HiReply className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {selectedSubtopic.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Ask me anything about this topic
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-end gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder={
                      isLoading
                        ? "AI is thinking..."
                        : "Ask about your roadmap..."
                    }
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </Tabs.Content>

          {/* Subtopic Tab */}
          <Tabs.Content value="details" className="h-full overflow-y-auto">
            {selectedSubtopic ? (
              <div className="p-4 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {selectedSubtopic.title}
                  </h3>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BsInfoCircleFill className="w-5 h-5 text-blue-500" />
                    Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedSubtopic.description}
                  </p>
                </div>

                {selectedSubtopic.practicalExample && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <HiLightningBolt className="w-5 h-5 text-green-500" />
                      Practical Example
                    </h4>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-800 leading-relaxed text-sm">
                        {selectedSubtopic.practicalExample}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <BsInfoCircleFill className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">No Topic Selected</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click any subtopic in the roadmap to view details
                  </p>
                </div>
              </div>
            )}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </>
  );
};

export default LearningPanel;
