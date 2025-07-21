import { useEffect, useState } from "react";
import { databases } from "./lib/appwrite";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import type { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { IoChevronBack, IoReorderFour } from "react-icons/io5";
import { MdOutlineViewList } from "react-icons/md";
import { FaClock } from "react-icons/fa";

interface SavedRoadmap {
  $id: string;
  prompt: string;
  data: string;
  $createdAt: string;
}

const MyRoadmaps = () => {
  const user = useSelector((state: RootState) => state.auth.data);

  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchRoadmaps = async () => {
      try {
        if (!user) return;

        const response = await databases.listDocuments(
          "6874d2200030c6ec9e6f",
          "6874d24a0021ae17ca60",
          [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
        );
        setRoadmaps(response.documents as unknown as SavedRoadmap[]);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-6">
            <div className="w-8 h-8 border-3 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Loading Your Roadmaps
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <IoChevronBack className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-900">My Roadmaps</h1>
            <div className="text-sm text-gray-600">Welcome, {user?.name}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {roadmaps.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MdOutlineViewList className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Roadmaps Yet
            </h2>
            <p className="text-gray-600 mb-8">
              Create your first AI-powered learning roadmap to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Create Your First Roadmap
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => {
              const parsedData = JSON.parse(roadmap.data);
              return (
                <div
                  key={roadmap.$id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/roadmap/${roadmap.$id}`)}
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {parsedData.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {parsedData.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <IoReorderFour className="w-3 h-3" />
                        {parsedData.nodes?.length || 0} topics
                      </span>
                      {parsedData.estimatedDuration && (
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {parsedData.estimatedDuration}
                        </span>
                      )}
                    </div>
                    <span>
                      {new Date(roadmap.$createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRoadmaps;
