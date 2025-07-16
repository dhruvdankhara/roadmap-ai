import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
