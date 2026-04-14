import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { 
  MessageSquare, 
  BookHeart, 
  Calendar, 
  Sparkles,
  ChevronRight 
} from "lucide-react";

// The prop "onNavigate" is what makes the switching happen
export function Home({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [myMood, setMyMood] = useState("");
  const [partnerMood, setPartnerMood] = useState("");
  const [connectionScore, setConnectionScore] = useState(50);
  
  const spaceId = "Marapatti130922";
  const myRole = "user1"; 
  const partnerRole = "user2";

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "spaces", spaceId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMyMood(data[`${myRole}Mood`] || "");
        setPartnerMood(data[`${partnerRole}Mood`] || "");
        
        if (data[`${myRole}Mood`] && data[`${partnerRole}Mood`]) {
          const val1 = moods.find(m => m.label === data[`${myRole}Mood`])?.value || 0;
          const val2 = moods.find(m => m.label === data[`${partnerRole}Mood`])?.value || 0;
          setConnectionScore(((val1 + val2) / 10) * 100);
        }
      }
    });
    return () => unsub();
  }, []);

  const handleMoodSelect = async (label: string) => {
    setMyMood(label);
    await setDoc(doc(db, "spaces", spaceId), { [`${myRole}Mood`]: label }, { merge: true });
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-lg mx-auto pb-44 overflow-y-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-medium bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent italic">
          How are we feeling?
        </h1>
      </header>

      {/* --- MOOD SECTION --- */}
      <div className="space-y-6 mb-10">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-white">
          <p className="text-[#9e8c9f] text-[10px] font-bold uppercase tracking-widest mb-6 text-center">You</p>
          <div className="flex justify-between items-center px-2">
            {moods.map((m) => (
              <button key={m.label} onClick={() => handleMoodSelect(m.label)} className="flex flex-col items-center gap-2">
                <span className={`text-4xl transition-all ${myMood === m.label ? "scale-125 saturate-100" : "opacity-30 saturate-0"}`}>{m.emoji}</span>
                <span className="text-[9px] font-bold text-[#9e8c9f]">{m.label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONNECTION METER --- */}
      <div className="bg-white/80 p-8 rounded-[3rem] shadow-xl border border-white mb-12">
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#5a4a5e] font-bold">Connection Level</p>
          <span className="text-[#9b7ea8] text-xs font-bold bg-purple-50 px-4 py-1.5 rounded-full">
            ✨ {connectionScore >= 80 ? "Thriving" : connectionScore >= 50 ? "Growing" : "Healing"}
          </span>
        </div>
        <div className="w-full h-3 bg-purple-50 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${connectionScore}%` }} className="h-full bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba]" />
        </div>
      </div>

      {/* --- NAVIGATION BUTTONS --- */}
      <div className="space-y-4">
        <h2 className="text-[#5a4a5e] font-bold ml-2 mb-2">Our Space</h2>
        
        {/* Talk Button */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("talk")} 
          className="w-full p-6 bg-[#9b7ea8] text-white rounded-[2.5rem] shadow-lg flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl"><MessageSquare /></div>
            <div className="text-left font-bold text-lg">Start a conversation</div>
          </div>
          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
        </motion.button>

        {/* Journal Button */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("journal")}
          className="w-full p-6 bg-[#d4a5c4] text-white rounded-[2.5rem] shadow-lg flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl"><BookHeart /></div>
            <div className="text-left font-bold text-lg">Write in journal</div>
          </div>
          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
        </motion.button>

        {/* Dates Button */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("dates")}
          className="w-full p-6 bg-[#c9a6ba] text-white rounded-[2.5rem] shadow-lg flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl"><Calendar /></div>
            <div className="text-left font-bold text-lg">Plan a date</div>
          </div>
          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
        </motion.button>

        {/* Heal Button */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("heal")}
          className="w-full p-6 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] text-white rounded-[2.5rem] shadow-lg flex items-center justify-between group border border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/30 rounded-2xl"><Sparkles /></div>
            <div className="text-left font-bold text-lg">Heal together</div>
          </div>
          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
        </motion.button>
      </div>

      <div className="h-10" />
    </div>
  );
}

const moods = [
  { label: "Happy", emoji: "😊", value: 5 },
  { label: "Calm", emoji: "😌", value: 4 },
  { label: "Sad", emoji: "😔", value: 2 },
  { label: "Anxious", emoji: "😰", value: 2 },
  { label: "Loving", emoji: "💖", value: 5 },
];