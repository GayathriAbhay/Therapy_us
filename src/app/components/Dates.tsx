import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Clock, 
  Copy, 
  Check, 
  Edit2, 
  ExternalLink, 
  ChevronRight, 
  X,
  VideoIcon
} from "lucide-react";
import { PageTransition } from "./PageTransition";

const dateIdeas = [
  { title: "Virtual Movie Night", description: "Watch a film together using Teleparty and discuss it over wine.", category: "Online", mood: "reconnecting", image: "🎬" },
  { title: "Cook Together Apart", description: "Pick a recipe, buy the ingredients, and cook while on a video call.", category: "At-home", mood: "fun", image: "👨‍🍳" },
  { title: "Virtual Stargazing", description: "Use a Night Sky app to find constellations in your respective cities.", category: "Free", mood: "calm", image: "⭐" },
  { title: "Memory Lane Walk", description: "Share your screen and look through the very first photos you took together.", category: "Free", mood: "reconnecting", image: "📸" },
  { title: "Online Game Night", description: "Play collaborative games like 'It Takes Two' or 'Among Us'.", category: "Online", mood: "fun", image: "🎮" },
  { title: "Digital Escape Room", description: "Work together to solve puzzles against a timer in a virtual room.", category: "Online", mood: "fun", image: "🧩" },
  { title: "Playlist Exchange", description: "Create 'Songs that remind me of you' playlists and listen live.", category: "Free", mood: "calm", image: "🎵" },
  { title: "Future Home Tour", description: "Browse Zillow or Pinterest and pick out your dream kitchen and garden.", category: "Free", mood: "calm", image: "🏠" },
  { title: "YouTube Yoga", description: "Follow a 20-minute gentle yoga session to de-stress together.", category: "Free", mood: "calm", image: "🧘" },
  { title: "Online Museum Tour", description: "Walk through the Louvre or the British Museum via Google Arts.", category: "Free", mood: "reconnecting", image: "🖼️" },
  { title: "21 Questions", description: "Deep dive into 'Ask Me Anything' questions to learn something new.", category: "Free", mood: "reconnecting", image: "❓" },
  { title: "Lego Build-off", description: "Each person buys a small $10 set and you race to build it first.", category: "Low-budget", mood: "fun", image: "🧱" },
  { title: "Ordering Surprises", description: "Order a surprise $15 dessert for each other via UberEats/Zomato.", category: "Low-budget", mood: "fun", image: "🍕" },
  { title: "Digital Painting", description: "Use a shared canvas app like Aggie.io to draw a portrait of each other.", category: "Free", mood: "fun", image: "🎨" },
  { title: "Language Learning", description: "Start a Duolingo streak together in a language you both want to learn.", category: "Free", mood: "fun", image: "🗣️" },
  { title: "Google Earth Travel", description: "Pick a random city and 'walk' the streets using Street View.", category: "Free", mood: "Adventure", image: "🌍" },
  { title: "Write a Shared Story", description: "Alternate writing one paragraph each of a short story.", category: "Free", mood: "reconnecting", image: "✍️" },
];

const categories = ["All", "At-home", "Online", "Free", "Low-budget", "Adventure"];

export function Dates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [datingMode, setDatingMode] = useState<any>(null);
  const [nextDate, setNextDate] = useState("Saturday 8:30PM");
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Your Specific GMeet Link
  const meetLink = "meet.google.com/zwn-fewo-ovp";

  const filteredIdeas = selectedCategory === "All" 
    ? dateIdeas 
    : dateIdeas.filter(i => i.category === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-8 max-w-lg mx-auto pb-44 relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent italic">Date Planner</h1>
          <p className="text-[#9e8c9f] text-sm italic">Making time for us</p>
        </div>

        {/* Next Date Card */}
        <div className="mb-8 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Next Date</span>
            <button onClick={() => setIsEditingTime(!isEditingTime)} className="p-2 hover:bg-white/10 rounded-full"><Edit2 className="w-4 h-4" /></button>
          </div>
          {isEditingTime ? (
            <input value={nextDate} onChange={(e) => setNextDate(e.target.value)} onBlur={() => setIsEditingTime(false)} className="text-3xl font-bold bg-transparent outline-none w-full" autoFocus />
          ) : (
            <h2 className="text-3xl font-bold mb-6">{nextDate}</h2>
          )}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
            <span className="text-xs font-mono truncate mr-4">{meetLink}</span>
            <div className="flex gap-2">
              <button onClick={() => { navigator.clipboard.writeText(`https://${meetLink}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 bg-white/20 rounded-lg">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full text-xs transition-all ${selectedCategory === cat ? "bg-[#9b7ea8] text-white shadow-lg" : "bg-white border border-[#e8d5db] text-[#5a4a5e]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredIdeas.map((idea, idx) => (
            <motion.div key={idx} layout onClick={() => setSelectedIdea(idea)} className="bg-white/70 backdrop-blur-sm border border-white rounded-[2rem] p-5 shadow-sm cursor-pointer flex items-center gap-4 group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl">{idea.image}</div>
              <div className="flex-1">
                <h3 className="text-[#5a4a5e] font-bold">{idea.title}</h3>
                <span className="text-[10px] bg-[#9b7ea8]/10 text-[#9b7ea8] px-2 py-0.5 rounded-full uppercase font-bold">{idea.category}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#e8d5db]" />
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedIdea && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6" onClick={() => setSelectedIdea(null)}>
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="text-6xl text-center mb-6">{selectedIdea.image}</div>
                <h2 className="text-2xl font-bold text-[#5a4a5e] text-center mb-6">{selectedIdea.title}</h2>
                <p className="text-[#9e8c9f] text-center italic mb-8">"{selectedIdea.description}"</p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setDatingMode(selectedIdea); setSelectedIdea(null); }}
                  className="w-full bg-gradient-to-r from-red-400 to-[#9b7ea8] text-white py-5 rounded-3xl font-bold shadow-xl flex items-center justify-center gap-3 group"
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                    <Heart className="w-6 h-6 fill-white" />
                  </motion.div>
                  Enter Dating Mode
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIVE DATING MODE OVERLAY */}
        <AnimatePresence>
          {datingMode && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-gradient-to-b from-[#9b7ea8] to-[#c9a6ba] p-8 flex flex-col items-center justify-center text-white text-center"
            >
              <div className="absolute top-10 right-10">
                <button onClick={() => setDatingMode(null)} className="p-3 bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
              </div>

              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-9xl mb-8 drop-shadow-2xl">
                {datingMode.image}
              </motion.div>

              <h2 className="text-4xl font-bold mb-2 italic">Dating Mode</h2>
              <p className="text-xl opacity-90 mb-10 px-4 italic">"{datingMode.title}"</p>
              
              <motion.a
                href={`https://${meetLink}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-12 bg-white text-[#9b7ea8] px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3"
              >
                <VideoIcon className="w-6 h-6" />
                Go to Date (GMeet)
              </motion.a>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <Heart className="w-8 h-8 fill-white animate-pulse" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest">You</span>
                </div>
                <div className="w-12 border-t-2 border-dashed border-white/40 self-center mt-[-20px]" />
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                      <Heart className="w-8 h-8 fill-white animate-pulse" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest">Partner</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

export default Dates;