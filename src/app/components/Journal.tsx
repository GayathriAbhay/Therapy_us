import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookHeart, Plus, ChevronDown } from "lucide-react";
import { PageTransition } from "./PageTransition";

const prompts = [
  "What made me smile today",
  "A moment I want to remember",
  "Something I learned about us",
  "What I'm hoping for",
  "How I felt when...",
];

const entries = [
  {
    date: "April 12, 2026",
    author: "you",
    prompt: "What made me smile today",
    content:
      "Seeing your name pop up on my phone this morning. It's the little things that remind me why we're doing this.",
    private: false,
  },
  {
    date: "April 10, 2026",
    author: "partner",
    prompt: "A moment I want to remember",
    content:
      "When we laughed together yesterday during our video call. For the first time in weeks, it felt like us again. Like we're finding our way back.",
    private: false,
  },
  {
    date: "April 8, 2026",
    author: "you",
    prompt: "Something I learned about us",
    content:
      "We're both scared, but we're both still here. That has to mean something.",
    private: false,
  },
  {
    date: "April 6, 2026",
    author: "partner",
    prompt: "How I felt when...",
    content:
      "When you said you weren't giving up, I felt hope for the first time in a long time. Thank you for fighting for us.",
    private: false,
  },
];

export function Journal() {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);

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
          Shared Journal
        </h1>
        <p className="text-[#9e8c9f] text-sm">Your story, written together</p>
      </motion.div>

      {/* Write Entry Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsWriting(!isWriting)}
        className="w-full mb-6 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-2xl py-4 shadow-lg shadow-purple-200/30 flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 2, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          animate={isWriting ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isWriting ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </motion.div>
        <span className="relative z-10">
          {isWriting ? "Close" : "Write an entry"}
        </span>
      </motion.button>

      {/* Writing Area */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-lg shadow-purple-100/20">
              {/* Prompt Selection */}
              <div className="mb-4">
                <label className="text-sm text-[#9e8c9f] mb-2 block">
                  Choose a prompt (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {prompts.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPrompt(prompt)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all relative overflow-hidden ${
                        selectedPrompt === prompt
                          ? "bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] text-white shadow-lg shadow-purple-200/30"
                          : "bg-white/60 border border-white/80 text-[#5a4a5e] hover:bg-white/80"
                      }`}
                    >
                      {selectedPrompt !== prompt && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#9b7ea8]/10 to-[#c9a6ba]/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10">{prompt}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write from your heart..."
                rows={6}
                className="w-full bg-white/60 border border-white/80 rounded-2xl px-5 py-4 text-[#5a4a5e] placeholder:text-[#9e8c9f] focus:outline-none focus:ring-2 focus:ring-[#9b7ea8]/30 focus:bg-white/80 resize-none leading-relaxed"
                style={{ fontFamily: "'Crimson Text', Georgia, serif" }}
              />

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-xl py-3 shadow-lg shadow-purple-200/30"
                >
                  Save entry
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 bg-white/60 border border-white/80 text-[#5a4a5e] rounded-xl py-3 hover:bg-white/80 transition-all"
                >
                  Private
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {entries.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05, type: "spring", stiffness: 100 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-lg shadow-purple-100/20 hover:shadow-xl hover:shadow-purple-200/30 transition-all cursor-pointer relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#9b7ea8]/5 to-[#c9a6ba]/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Header */}
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    entry.author === "you"
                      ? "bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] shadow-purple-200/30"
                      : "bg-gradient-to-br from-[#d4a5c4] to-[#e8c5d8] shadow-purple-200/20"
                  }`}
                >
                  <BookHeart className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm text-[#5a4a5e]">
                    {entry.author === "you" ? "You" : "Your partner"}
                  </p>
                  <p className="text-xs text-[#9e8c9f]">{entry.date}</p>
                </div>
              </div>
            </div>

            {/* Prompt */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mb-3 px-4 py-2 bg-gradient-to-r from-[#f4c4d4]/30 to-[#f5dce8]/30 rounded-xl border border-[#f4c4d4]/50 relative z-10"
            >
              <p className="text-sm text-[#5a4a5e] italic">{entry.prompt}</p>
            </motion.div>

            {/* Content */}
            <p
              className="text-[#5a4a5e] leading-relaxed relative z-10"
              style={{ fontFamily: "'Crimson Text', Georgia, serif" }}
            >
              {entry.content}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 text-center"
      >
        <p className="text-sm text-[#9e8c9f]">
          You've written <span className="text-[#9b7ea8]">24 entries</span>{" "}
          together this month
        </p>
      </motion.div>
    </div>
    </PageTransition>
  );
}

export default Journal;