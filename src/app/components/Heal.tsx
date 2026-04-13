import { motion } from "motion/react";
import { Heart, Lock, CheckCircle2, Circle } from "lucide-react";
import { PageTransition } from "./PageTransition";

const modules = [
  {
    title: "Understanding the hurt",
    description: "Acknowledge what happened and how it affected both of you",
    progress: 100,
    status: "completed",
    sessions: 4,
  },
  {
    title: "Opening up safely",
    description: "Learn to express feelings without fear of judgment",
    progress: 75,
    status: "in-progress",
    sessions: 6,
  },
  {
    title: "Rebuilding trust",
    description: "Small steps toward believing in each other again",
    progress: 40,
    status: "in-progress",
    sessions: 8,
  },
  {
    title: "Forgiveness exercises",
    description: "Release resentment and make space for healing",
    progress: 0,
    status: "locked",
    sessions: 5,
  },
  {
    title: "Creating new patterns",
    description: "Build healthy communication habits together",
    progress: 0,
    status: "locked",
    sessions: 6,
  },
];

const exercises = [
  {
    title: "Today's practice",
    prompt: "Share one thing you're grateful for about your partner",
    time: "5 min",
  },
  {
    title: "Reflection",
    prompt: "What does trust mean to you?",
    time: "10 min",
  },
];

export function Heal() {
  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-8 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent">
          Healing Together
        </h1>
        <p className="text-[#9e8c9f] text-sm">
          Every step forward is worth celebrating
        </p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg shadow-purple-100/20"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#9e8c9f]">Your journey</span>
          <span className="text-sm text-[#9b7ea8]">43% complete</span>
        </div>
        <div className="relative h-3 bg-white/60 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "43%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] rounded-full shadow-lg shadow-purple-300/40"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9e8c9f]">
          <Heart className="w-4 h-4 text-[#9b7ea8]" />
          <span>You've completed 2 of 5 modules together</span>
        </div>
      </motion.div>

      {/* Daily Exercises */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 space-y-3"
      >
        <h2 className="text-sm text-[#9e8c9f] mb-3">Today's exercises</h2>
        {exercises.map((exercise, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-2xl p-5 shadow-lg shadow-purple-200/30 cursor-pointer relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <div className="flex items-start justify-between mb-2 relative z-10">
              <h3 className="text-sm opacity-90">{exercise.title}</h3>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                {exercise.time}
              </motion.span>
            </div>
            <p className="leading-relaxed relative z-10">{exercise.prompt}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-sm text-[#9e8c9f] mb-3">Healing modules</h2>
        {modules.map((module, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            whileHover={
              module.status !== "locked" ? { scale: 1.02, y: -2 } : undefined
            }
            className={`bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-lg shadow-purple-100/20 transition-all ${
              module.status === "locked"
                ? "opacity-60"
                : "hover:shadow-xl hover:shadow-purple-200/30 cursor-pointer"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {module.status === "completed" && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, type: "spring", stiffness: 200 }}
                    className="w-6 h-6 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] rounded-full flex items-center justify-center shadow-lg shadow-purple-200/30"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
                {module.status === "in-progress" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 bg-gradient-to-br from-[#d4a5c4] to-[#e8c5d8] rounded-full flex items-center justify-center shadow-lg shadow-purple-200/20"
                  >
                    <Circle className="w-4 h-4 text-white fill-current" />
                  </motion.div>
                )}
                {module.status === "locked" && (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    className="w-6 h-6 bg-white/60 rounded-full flex items-center justify-center"
                  >
                    <Lock className="w-4 h-4 text-[#9e8c9f]" />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-[#5a4a5e] mb-1">{module.title}</h3>
                <p className="text-sm text-[#9e8c9f] leading-relaxed mb-3">
                  {module.description}
                </p>

                {/* Progress Bar */}
                {module.status !== "locked" && (
                  <div className="mb-2">
                    <div className="relative h-2 bg-white/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${module.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] rounded-full"
                      />
                      {module.progress > 0 && (
                        <motion.div
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5 + idx * 0.1,
                          }}
                          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          style={{ width: `${module.progress}%` }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-[#9e8c9f]">
                  <span>{module.sessions} sessions</span>
                  {module.status !== "locked" && (
                    <span>{module.progress}% complete</span>
                  )}
                  {module.status === "locked" && (
                    <span>Complete previous modules to unlock</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </PageTransition>
  );
}

export default Heal;