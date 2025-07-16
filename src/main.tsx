import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./HomePage.tsx";
import MyRoadmaps from "./MyRoadmaps.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-roadmaps" element={<MyRoadmaps />} />
        <Route path="/roadmap" element={<App />} />
        <Route path="/roadmap/:roadmapId" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
