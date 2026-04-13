import { Routes, Route, useLocation } from "react-router"; // Use 'react-router' or 'react-router-dom'
import { AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Journal } from "./components/Journal";
import { Talk } from "./components/Talk";
import { Heal } from "./components/Heal";
import { Dates } from "./components/Dates";
import { PageTransition } from "./components/PageTransition";
import { FloatingElements } from "./components/FloatingElements";

export function App() { 
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A4238]">
      <FloatingElements />
      <Navigation />
      <main className="md:pl-64 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
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