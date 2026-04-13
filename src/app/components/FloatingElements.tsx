import { motion } from "motion/react";

const floatingShapes = [
  { size: 8, top: "10%", left: "15%", delay: 0, duration: 20 },
  { size: 6, top: "25%", left: "80%", delay: 2, duration: 25 },
  { size: 10, top: "60%", left: "10%", delay: 4, duration: 22 },
  { size: 7, top: "75%", left: "70%", delay: 1, duration: 24 },
  { size: 9, top: "40%", left: "50%", delay: 3, duration: 26 },
  { size: 5, top: "85%", left: "40%", delay: 5, duration: 23 },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5">
      {floatingShapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-gradient-to-br from-[#d4a5c4]/20 to-[#b8a4c9]/10 backdrop-blur-sm"
          style={{
            width: shape.size * 4,
            height: shape.size * 4,
            top: shape.top,
            left: shape.left,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingElements;