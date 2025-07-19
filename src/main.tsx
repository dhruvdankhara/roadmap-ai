import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./HomePage.tsx";
import MyRoadmaps from "./MyRoadmaps.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import AuthWrapper from "./AuthWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-roadmaps" element={<MyRoadmaps />} />
          <Route path="/roadmap" element={<App />} />
          <Route path="/roadmap/:roadmapId" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  </Provider>
);
