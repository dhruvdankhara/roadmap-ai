import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callGeminiAPI } from "./gemini";

const HomePage = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      console.log("Generating roadmap for:", inputText);

      const result = await callGeminiAPI(inputText);
      console.log("Gemini Response:", result);

      navigate("/roadmap", { state: { result } });
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              AI Powered
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">
              Free AI{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Roadmap
              </span>{" "}
              Generator
            </h1>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Transform your ideas into actionable roadmaps with AI. Simply
              describe your topic, and our intelligent system will create a
              structured plan to guide you toward success.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe your project or goal in detail... e.g., 'Create node js backend roadmap' or 'Roadmap to master Machine Learning'"
                  className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl text-lg text-gray-800 resize-none outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 bg-gray-50/50"
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                  {inputText.length} characters
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                <div></div>
                <button
                  onClick={handleGenerate}
                  disabled={!inputText.trim() || isLoading}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-200
                    ${
                      inputText.trim() && !isLoading
                        ? "bg-violet-600 text-white hover:bg-violet-700 hover:scale-105 hover:shadow-xl shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>⚡ Generate Roadmap</>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 text-sm">
                Generate comprehensive roadmaps in seconds with AI
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Goal Focused</h3>
              <p className="text-gray-600 text-sm">
                Each roadmap is tailored to your specific objectives
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Visual & Clear
              </h3>
              <p className="text-gray-600 text-sm">
                Easy-to-follow visual roadmaps with clear milestones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
