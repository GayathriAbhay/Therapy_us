import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send } from "lucide-react";
import { PageTransition } from "./PageTransition";

const prompts = [
  "What I felt today…",
  "What I need from you…",
  "Something I appreciate about us…",
  "A fear I'm holding…",
  "What reconnecting means to me…",
];

const sampleMessages = [
  {
    sender: "you",
    text: "I've been thinking about us a lot today. I want you to know that I see how hard you're trying.",
    time: "2:34 PM",
  },
  {
    sender: "partner",
    text: "That means everything to me. I know I haven't been perfect, but I'm here and I'm not giving up on us.",
    time: "2:41 PM",
  },
];

export function Talk() {
  const [message, setMessage] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);

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
          Safe Space
        </h1>
        <p className="text-[#9e8c9f] text-sm">Take your time. Every word matters.</p>
      </motion.div>

      {/* Prompt Bubbles */}
      <AnimatePresence>
        {showPrompts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#9b7ea8]" />
              <p className="text-xs text-[#9e8c9f]">Gentle prompts to help you start</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMessage(prompt);
                    setShowPrompts(false);
                  }}
                  className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-4 py-2 text-sm text-[#5a4a5e] hover:bg-white/80 transition-all shadow-sm hover:shadow-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#9b7ea8]/10 to-[#c9a6ba]/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">{prompt}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 mb-6"
      >
        {sampleMessages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.sender === "you" ? 20 : -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -2 }}
            className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
          >
            <motion.div
              whileHover={
                msg.sender === "you"
                  ? {
                      boxShadow: "0 8px 30px rgba(155, 126, 168, 0.4)",
                    }
                  : {}
              }
              className={`max-w-[80%] rounded-3xl p-5 ${
                msg.sender === "you"
                  ? "bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white shadow-lg shadow-purple-200/30"
                  : "bg-white/60 backdrop-blur-md border border-white/80 text-[#5a4a5e] shadow-md"
              }`}
            >
              <p className="mb-2 leading-relaxed">{msg.text}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className={`text-xs ${
                  msg.sender === "you" ? "text-white/70" : "text-[#9e8c9f]"
                }`}
              >
                {msg.time}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-start"
        >
          <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl px-5 py-4 shadow-md">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-[#9b7ea8]"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Message Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sticky bottom-24 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-4 shadow-lg shadow-purple-100/20"
      >
        <div className="flex gap-3 mb-3">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write from your heart..."
            className="flex-1 bg-white/60 border border-white/80 rounded-2xl px-5 py-3 text-[#5a4a5e] placeholder:text-[#9e8c9f] focus:outline-none focus:ring-2 focus:ring-[#9b7ea8]/30 focus:bg-white/80 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ rotate: { duration: 0.5 } }}
            className="bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-2xl px-5 py-3 shadow-lg shadow-purple-200/30 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <Send className="w-5 h-5 relative z-10" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2 text-sm text-[#9b7ea8] hover:bg-white/60 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#9b7ea8]/10 to-[#c9a6ba]/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
          <span className="relative z-10">Rewrite gently</span>
        </motion.button>
      </motion.div>
    </div>
    </PageTransition>
  );
}

export default Talk;