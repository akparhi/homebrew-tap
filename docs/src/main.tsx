import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing.tsx";
import { FerrixDocs } from "./pages/ferrix.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";

const root = document.getElementById("root")!;
createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename="/homebrew-tap">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ferrix" element={<FerrixDocs />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
requestAnimationFrame(() => (root.style.opacity = "1"));
