import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App dark min-h-screen bg-[#060611] text-slate-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(15, 15, 30, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#f8fafc",
            backdropFilter: "blur(16px)",
          },
        }}
      />
    </div>
  );
}

export default App;
