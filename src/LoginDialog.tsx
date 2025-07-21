import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { account } from "./lib/appwrite";
import { ID } from "appwrite";
import { IoClose } from "react-icons/io5";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: object) => void;
}

const LoginDialog = ({ isOpen, onClose, onLoginSuccess }: LoginDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      onLoginSuccess?.(user);
      onClose();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      onLoginSuccess?.(user);
      onClose();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleSignup;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 z-50">
          <div className="p-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 text-center mb-6">
              {isLogin
                ? "Sign in to access your saved roadmaps"
                : "Join RoadmapAI to save and track your learning progress"}
            </Dialog.Description>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </span>
                  </>
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-violet-600 hover:text-violet-700 text-sm font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginDialog;
