import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callGeminiAPI } from "./lib/gemini";
import { account, databases } from "./lib/appwrite";
import { ID } from "appwrite";
import LoginDialog from "./LoginDialog";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { login, logout, type User } from "./store/slices/authSlice";
import { FaCheck, FaStar } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiLightningBolt } from "react-icons/hi";
import { IoReorderFour } from "react-icons/io5";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.data);

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
    <div className="min-h-screen bg-indigo-100 flex flex-col">
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLoginSuccess={(userData) => {
          console.log("Login successful:", userData);
          dispatch(login(userData as User));
          setShowLoginDialog(false);
        }}
      />

      <header className="px-6 py-4 border-b border-white/20 backdrop-blur-md bg-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">RoadmapAI</div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/my-roadmaps")}
                  className="cursor-pointer flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium bg-violet-50/80 hover:bg-violet-100/80 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 border border-violet-200/50"
                >
                  My Roadmaps
                </button>

                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200/50">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium hidden sm:block">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={async () => {
                    await account.deleteSession("current");
                    dispatch(logout());
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium bg-gray-50/80 hover:bg-gray-100/80 px-3 py-2 rounded-lg transition-all duration-200 border border-gray-200/50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginDialog(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              <FaStar className="w-4 h-4" />
              <span>Powered by AI</span>
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
                      <FaCheck className="w-4 h-4 " />
                      <span className="text-sm font-medium">Good detail</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <BsInfoCircleFill className="w-4 h-4" />

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
                        ? "bg-purple-600 text-white hover:bg-violet-700 hover:scale-105 hover:shadow-2xl shadow-lg"
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
                      <HiLightningBolt className="w-5 h-5" />
                      Generate Roadmap
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightningBolt className="w-8 h-8 text-white" />
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
              <div className="w-16 h-16 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <IoReorderFour className="w-8 h-8 text-white" />
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
              <div className="w-16 h-16 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaStar className="w-8 h-8 text-white" />
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
