import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Video, Clock, Copy, Check } from "lucide-react";
import { PageTransition } from "./PageTransition";

const categories = ["All", "At-home", "Online", "Free", "Low-budget"];

const dateIdeas = [
  {
    title: "Virtual Movie Night",
    description: "Watch a meaningful film together and discuss what it meant to you both",
    category: "Online",
    mood: "reconnecting",
    image: "🎬",
  },
  {
    title: "Cook Together Apart",
    description: "Make the same recipe while video calling, share the meal at the end",
    category: "At-home",
    mood: "fun",
    image: "👨‍🍳",
  },
  {
    title: "Virtual Stargazing",
    description: "Use an astronomy app and share what constellations mean to you",
    category: "Free",
    mood: "calm",
    image: "⭐",
  },
  {
    title: "Memory Lane Walk",
    description: "Share screen and look through old photos together, relive happy moments",
    category: "Free",
    mood: "reconnecting",
    image: "📸",
  },
  {
    title: "Sunrise/Sunset Call",
    description: "Wake up early or stay up late to watch the sky change together",
    category: "Free",
    mood: "calm",
    image: "🌅",
  },
  {
    title: "Online Game Night",
    description: "Play collaborative games that require teamwork and communication",
    category: "Online",
    mood: "fun",
    image: "🎮",
  },
];

const moodColors = {
  calm: "from-[#d4e5f4] to-[#e8f0f5]",
  fun: "from-[#f4d4ba] to-[#f5e8d4]",
  reconnecting: "from-[#f4c4d4] to-[#f5dce8]",
};

export function Dates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copied, setCopied] = useState(false);
  const [dateModeOn, setDateModeOn] = useState(false);

  const meetLink = "meet.google.com/abc-defg-hij";
  const nextDate = "Tonight, 8:00 PM";
  const timeUntil = "2h 34m";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${meetLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredIdeas =
    selectedCategory === "All"
      ? dateIdeas
      : dateIdeas.filter((idea) => idea.category === selectedCategory);

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
          Time Together
        </h1>
        <p className="text-[#9e8c9f] text-sm">Every moment is a chance to reconnect</p>
      </motion.div>

      {/* Next Date Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-3xl p-6 shadow-lg shadow-purple-200/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm opacity-90">Next planned date</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDateModeOn(!dateModeOn)}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              dateModeOn
                ? "bg-white/30 backdrop-blur-sm"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {dateModeOn ? "💕 Date Mode On" : "Start Date Mode"}
          </motion.button>
        </div>
        <h2 className="text-2xl mb-1">{nextDate}</h2>
        <p className="text-sm opacity-75 mb-4">in {timeUntil}</p>

        {/* Meet Link */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Video className="w-5 h-5 flex-shrink-0" />
            </motion.div>
            <span className="text-sm truncate">{meetLink}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            animate={copied ? { scale: [1, 1.2, 1] } : {}}
            onClick={handleCopyLink}
            className="bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-all flex-shrink-0 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/30"
              initial={{ scale: 0 }}
              animate={copied ? { scale: 2, opacity: 0 } : {}}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              initial={false}
              animate={{ rotate: copied ? 360 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {copied ? (
                <Check className="w-4 h-4 relative z-10" />
              ) : (
                <Copy className="w-4 h-4 relative z-10" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] text-white shadow-lg shadow-purple-200/30"
                : "bg-white/60 backdrop-blur-sm border border-white/80 text-[#5a4a5e] hover:bg-white/80"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Date Ideas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredIdeas.map((idea, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.05, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-lg shadow-purple-100/20 hover:shadow-xl hover:shadow-purple-200/30 transition-all cursor-pointer relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#9b7ea8]/5 to-[#c9a6ba]/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex gap-4 relative z-10">
              {/* Emoji Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
              >
                {idea.image}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-[#5a4a5e]">{idea.title}</h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-xs text-[#5a4a5e] bg-gradient-to-br ${
                      moodColors[idea.mood as keyof typeof moodColors]
                    }`}
                  >
                    {idea.mood}
                  </motion.div>
                </div>
                <p className="text-sm text-[#9e8c9f] leading-relaxed mb-3">
                  {idea.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9e8c9f] bg-white/60 px-3 py-1 rounded-full">
                    {idea.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Generate More Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl py-4 text-[#9b7ea8] hover:bg-white/80 transition-all shadow-lg flex items-center justify-center gap-2"
      >
        <Heart className="w-5 h-5" />
        Generate more ideas
      </motion.button>
    </div>
    </PageTransition>
  );
}
