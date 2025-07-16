import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callGeminiAPI } from "./lib/gemini";
import { databases } from "./lib/appwrite";
import { ID } from "appwrite";
import LoginDialog from "./LoginDialog";
import { useAuth } from "./hooks/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const user = authContext?.user;

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Generating roadmap for:", inputText);

      const result = await callGeminiAPI(inputText);
      console.log("Gemini Response:", result);

      const documentData: Record<string, string> = {
        prompt: inputText,
        data: JSON.stringify(result),
      };

      // If user is logged in, associate the roadmap with their account
      if (user) {
        documentData.userId = user.$id;
        documentData.userEmail = user.email;
      }

      const response = await databases.createDocument(
        "6874d2200030c6ec9e6f",
        "6874d24a0021ae17ca60",
        ID.unique(),
        documentData
      );

      navigate(`/roadmap/${response.$id}`);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLoginSuccess={(userData) => {
          console.log("Login successful:", userData);
          setShowLoginDialog(false);
        }}
      />

      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">RoadmapAI</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>AI Powered</span>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/my-roadmaps")}
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  My Roadmaps
                </button>
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={() => authContext?.logout?.()}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginDialog(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-violet-200 text-violet-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Powered by Google Gemini AI</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Create Learning{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Roadmaps
              </span>{" "}
              <br className="hidden md:block" />
              in Seconds
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-8">
              Transform any learning goal into a structured, visual roadmap. Our
              AI analyzes your objectives and creates a step-by-step plan with
              clear milestones and actionable subtopics.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Instant results</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-10 mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Describe Your Learning Goal
              </h2>
              <p className="text-gray-600">
                Be specific about what you want to learn or achieve. The more
                detail you provide, the better your roadmap will be.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Example: 'I want to become a full-stack web developer focusing on React and Node.js' or 'Create a roadmap to master data science with Python and machine learning'"
                  className="w-full h-48 p-6 border-2 border-gray-200 rounded-2xl text-lg text-gray-800 resize-none outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 bg-gray-50/50 placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {inputText.length}/1000 characters
                  </span>
                  {inputText.length > 50 && (
                    <div className="flex items-center gap-1 text-green-600">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">Good detail</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Results in 10-30 seconds</span>
                  </div>
                </div>

                {!user && (
                  <p className="text-sm text-gray-500 text-center mt-3">
                    <button
                      onClick={() => setShowLoginDialog(true)}
                      className="text-violet-600 hover:text-violet-700 font-medium"
                    >
                      Sign in
                    </button>{" "}
                    to save and track your roadmaps
                  </p>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={inputText.trim().length < 3 || isLoading}
                  className={`
                    flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform
                    ${
                      inputText.trim().length > 3 && !isLoading
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Your Roadmap...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Generate Roadmap
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast Generation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get comprehensive, structured roadmaps in under 30 seconds. Our
                AI processes your goals instantly and delivers actionable plans.
              </p>
            </div>

            <div className="group text-center p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Structured & Visual
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Beautiful, interactive flow charts that break down complex
                topics into manageable steps and clear learning paths.
              </p>
            </div>

            <div className="group text-center p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI-Powered Intelligence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by Google's Gemini AI for intelligent topic analysis,
                logical sequencing, and personalized learning recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
