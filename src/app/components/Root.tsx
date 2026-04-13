import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { motion } from "motion/react";
import { FloatingElements } from "./FloatingElements";

export function Root() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#faf7f5] via-[#f5e8f0] to-[#e8d5e8] -z-10" />

      {/* Animated Ambient Glow Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#d4a5c4]/30 to-transparent blur-3xl -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#b8a4c9]/20 to-transparent blur-3xl -z-10"
      />

      {/* Floating Elements */}
      <FloatingElements />

      <div className="pb-24">
        <Outlet />
      </div>

      <Navigation />
    </div>
  );
}

export default Root;