import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, BookHeart, Calendar, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { PageTransition } from "./PageTransition";

const moods = [
  { emoji: "😊", label: "Happy", color: "from-[#f4d4ba] to-[#f5e8d4]" },
  { emoji: "😌", label: "Calm", color: "from-[#d4e5f4] to-[#e8f0f5]" },
  { emoji: "😔", label: "Sad", color: "from-[#d4c5d4] to-[#e8dce8]" },
  { emoji: "😟", label: "Anxious", color: "from-[#e5d4c4] to-[#f0e8e0]" },
  { emoji: "💕", label: "Loving", color: "from-[#f4c4d4] to-[#f5dce8]" },
];

const quickActions = [
  { icon: MessageCircle, label: "Start a conversation", to: "/talk", gradient: "from-[#b8a4c9] to-[#c9a6ba]" },
  { icon: BookHeart, label: "Write in journal", to: "/journal", gradient: "from-[#d4a5c4] to-[#e8c5d8]" },
  { icon: Calendar, label: "Plan a date", to: "/dates", gradient: "from-[#c9a6ba] to-[#d4a5c4]" },
  { icon: Heart, label: "Healing exercises", to: "/heal", gradient: "from-[#9b7ea8] to-[#b8a4c9]" },
];

export function Home() {
  const [mood1, setMood1] = useState<number | null>(null);
  const [mood2, setMood2] = useState<number | null>(null);

  const connectionLevel = 68;

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-8 max-w-lg mx-auto">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.h1
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-3xl mb-2 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent"
        >
          How are we feeling today?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#9e8c9f] text-sm"
        >
          Check in with each other
        </motion.p>
      </motion.div>

      {/* Dual Mood Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-6"
      >
        {/* Partner 1 */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg shadow-purple-100/20"
        >
          <p className="text-sm text-[#9e8c9f] mb-3">You</p>
          <div className="flex gap-3 justify-between">
            {moods.map((mood, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood1(idx)}
                animate={
                  mood1 === idx
                    ? {
                        boxShadow: [
                          "0 4px 20px rgba(155, 126, 168, 0.2)",
                          "0 4px 30px rgba(155, 126, 168, 0.4)",
                          "0 4px 20px rgba(155, 126, 168, 0.2)",
                        ],
                      }
                    : {}
                }
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`flex-1 aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                  mood1 === idx
                    ? `bg-gradient-to-br ${mood.color} shadow-lg shadow-purple-200/30 border-2 border-white`
                    : "bg-white/50 border border-white/60 hover:bg-white/70"
                }`}
              >
                <motion.span
                  animate={mood1 === idx ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  {mood.emoji}
                </motion.span>
                <span className="text-[10px] text-[#5a4a5e]">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Partner 2 */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg shadow-purple-100/20"
        >
          <p className="text-sm text-[#9e8c9f] mb-3">Your partner</p>
          <div className="flex gap-3 justify-between">
            {moods.map((mood, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood2(idx)}
                animate={
                  mood2 === idx
                    ? {
                        boxShadow: [
                          "0 4px 20px rgba(155, 126, 168, 0.2)",
                          "0 4px 30px rgba(155, 126, 168, 0.4)",
                          "0 4px 20px rgba(155, 126, 168, 0.2)",
                        ],
                      }
                    : {}
                }
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`flex-1 aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                  mood2 === idx
                    ? `bg-gradient-to-br ${mood.color} shadow-lg shadow-purple-200/30 border-2 border-white`
                    : "bg-white/50 border border-white/60 hover:bg-white/70"
                }`}
              >
                <motion.span
                  animate={mood2 === idx ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  {mood.emoji}
                </motion.span>
                <span className="text-[10px] text-[#5a4a5e]">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Connection Meter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ delay: 0.2 }}
        className="mb-8 bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg shadow-purple-100/20"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-[#9e8c9f]">Connection level</p>
          <div className="flex items-center gap-1">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-[#9b7ea8]" />
            </motion.div>
            <span className="bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent">
              Growing
            </span>
          </div>
        </div>
        <div className="relative h-3 bg-white/60 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${connectionLevel}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] rounded-full shadow-lg shadow-purple-300/40"
          />
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        <p className="text-xs text-[#9e8c9f] mt-2 text-center">
          You've shared 12 moments this week
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {quickActions.map((action, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={action.to}
              className={`flex items-center gap-4 bg-gradient-to-r ${action.gradient} text-white rounded-2xl p-5 shadow-lg shadow-purple-200/30 transition-shadow hover:shadow-xl hover:shadow-purple-300/40 relative overflow-hidden group`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-3 relative z-10"
              >
                <action.icon className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </PageTransition>
  );
}
