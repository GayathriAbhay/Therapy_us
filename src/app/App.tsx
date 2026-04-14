import { Routes, Route, useLocation, useNavigate } from "react-router"; 
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react"; 

// Components
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Journal } from "./components/Journal";
import { Talk } from "./components/Talk";
import { Heal } from "./components/Heal";
import { Dates } from "./components/Dates";
import { PageTransition } from "./components/PageTransition";
import { FloatingElements } from "./components/FloatingElements";
import { Landing } from "./components/Landing";

export function App() { 
  const location = useLocation();
  const navigate = useNavigate();
  
  // State is the source of truth for the session
  const [spaceId, setSpaceId] = useState<string | null>(localStorage.getItem("shared_space_id"));

  // 1. Navigation Logic for Home buttons
  const handleNavigation = (path: string) => {
    const routeMap: Record<string, string> = {
      home: "/",
      talk: "/talk",
      journal: "/journal",
      dates: "/dates",
      heal: "/heal"
    };
    navigate(routeMap[path] || "/");
  };

  // 2. Global Logout / Lock Logic
  const handleLogout = () => {
    // This clears the 'key' from the specific system/browser it's running on
    localStorage.removeItem("shared_space_id"); 
    setSpaceId(null); 
    navigate("/"); 
  };

  // 3. Screen Gatekeeper
  // If spaceId is null, no one can see the routes below.
  if (!spaceId) {
    return <Landing onUnlock={(id) => {
      localStorage.setItem("shared_space_id", id);
      setSpaceId(id);
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A4238] overflow-x-hidden relative">
      <FloatingElements />

      {/* Logout / Lock Button */}
      <div className="fixed top-6 right-6 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white rounded-full shadow-sm text-[#9e8c9f] text-xs font-medium hover:text-red-400 hover:border-red-100 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock Space</span>
        </motion.button>
      </div>

      <Navigation />

      <main className="min-h-screen"> 
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <Home onNavigate={handleNavigation} />
                </PageTransition>
              } 
            />
            <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
            <Route path="/talk" element={<PageTransition><Talk /></PageTransition>} />
            <Route path="/heal" element={<PageTransition><Heal /></PageTransition>} />
            <Route path="/dates" element={<PageTransition><Dates /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;