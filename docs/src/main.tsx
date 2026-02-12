import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing.tsx";
import { FerrixDocs } from "./pages/ferrix.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ferrix" element={<FerrixDocs />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
);
