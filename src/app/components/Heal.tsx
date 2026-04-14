import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, CheckCircle2, Circle, ArrowLeft, Sparkles, 
  Heart, Brain, Zap, ShieldCheck, MessageSquare, ChevronRight,
  Bot, ChevronLeft
} from "lucide-react";
import { PageTransition } from "./PageTransition";

// Firebase Imports
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

// 1. THE 20-PATHWAY DATABASE
const pathways = [
  { id: 1, title: "Initial Connection", icon: <Heart className="w-5 h-5"/>, desc: "Re-establishing the safety to speak." },
  { id: 2, title: "The Anatomy of Hurt", icon: <Brain className="w-5 h-5"/>, desc: "Breaking down triggers and pain points." },
  { id: 3, title: "Building Safety", icon: <ShieldCheck className="w-5 h-5"/>, desc: "Creating a 'No-Judgment' zone." },
  { id: 4, title: "Active Listening", icon: <Zap className="w-5 h-5"/>, desc: "Hearing what isn't being said." },
  { id: 5, title: "Vulnerability Lab", icon: <Sparkles className="w-5 h-5"/>, desc: "Sharing fears without the armor." },
  { id: 6, title: "Trust Foundations", icon: <Lock className="w-5 h-5"/>, desc: "Small actions that build big trust." },
  { id: 7, title: "Conflict Resolution", icon: <Zap className="w-5 h-5"/>, desc: "Fighting fair and finding solutions." },
  { id: 8, title: "Forgiveness: Part 1", icon: <Heart className="w-5 h-5"/>, desc: "Letting go of the heavy weight." },
  { id: 9, title: "Forgiveness: Part 2", icon: <Heart className="w-5 h-5"/>, desc: "Accepting the new version of us." },
  { id: 10, title: "Intimacy Rebuild", icon: <Sparkles className="w-5 h-5"/>, desc: "Emotional and physical closeness." },
  { id: 11, title: "Shadow Work", icon: <Brain className="w-5 h-5"/>, desc: "Addressing personal baggage." },
  { id: 12, title: "Future Mapping", icon: <Zap className="w-5 h-5"/>, desc: "Aligning your life goals." },
  { id: 13, title: "Communication Habits", icon: <MessageSquare className="w-5 h-5"/>, desc: "Daily rituals for talking." },
  { id: 14, title: "The Power of Play", icon: <Sparkles className="w-5 h-5"/>, desc: "Rediscovering fun and laughter." },
  { id: 15, title: "Boundaries Lab", icon: <ShieldCheck className="w-5 h-5"/>, desc: "Healthy lines for a healthy pair." },
  { id: 16, title: "Ego Dissolution", icon: <Brain className="w-5 h-5"/>, desc: "Moving from 'Me' to 'Us'." },
  { id: 17, title: "Resilience Building", icon: <Zap className="w-5 h-5"/>, desc: "Preparing for future storms." },
  { id: 18, title: "Apology Language", icon: <MessageSquare className="w-5 h-5"/>, desc: "Learning how to truly say sorry." },
  { id: 19, title: "Shared Values", icon: <ShieldCheck className="w-5 h-5"/>, desc: "Defining what your unit stands for." },
  { id: 20, title: "The New Chapter", icon: <Heart className="w-5 h-5"/>, desc: "Celebrating the healed version of you." }
];

const therapistPrompts = [
  "That is a powerful realization. How does your body feel as you share this?",
  "I see deep growth here. Remember, healing is a spiral, not a straight line.",
  "This is a brave admission. How can your partner support this specific need?",
  "Acknowledgment is 50% of the cure. You are doing the hard work together."
];

export function Heal() {
  const [activePath, setActivePath] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [reflection, setReflection] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const spaceId = "Marapatti130922";

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "spaces", spaceId), (doc) => {
      if (doc.exists() && doc.data().healingProgress) {
        setCompletedIds(doc.data().healingProgress);
      }
    });
    return () => unsub();
  }, []);

  const updateFirebaseProgress = async (newList: number[]) => {
    try {
      await setDoc(doc(db, "spaces", spaceId), {
        healingProgress: newList
      }, { merge: true });
    } catch (e) {
      console.error("Error saving progress:", e);
    }
  };

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newList = completedIds.includes(id) 
      ? completedIds.filter(i => i !== id) 
      : [...completedIds, id];
    setCompletedIds(newList);
    updateFirebaseProgress(newList);
  };

  const handleNext = () => {
    if (currentStep === 2) {
      setAiResponse(therapistPrompts[Math.floor(Math.random() * therapistPrompts.length)]);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!completedIds.includes(activePath.id)) {
        const newList = [...completedIds, activePath.id];
        setCompletedIds(newList);
        updateFirebaseProgress(newList);
      }
      setActivePath(null);
      setCurrentStep(0);
      setReflection("");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) setAiResponse(""); 
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-8 max-w-lg mx-auto pb-44">
        {!activePath ? (
          <div className="space-y-6">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-medium bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent italic text-center">Healing Roadmap</h1>
              <p className="text-[#9e8c9f] text-sm italic">{completedIds.length} of 20 stages completed</p>
            </header>

            <div className="grid grid-cols-1 gap-4">
              {pathways.map((path) => (
                <motion.div
                  key={path.id}
                  layout
                  onClick={() => setActivePath(path)}
                  className={`bg-white/60 backdrop-blur-md border border-white/80 rounded-[2rem] p-5 shadow-sm cursor-pointer flex items-center gap-4 transition-all ${
                    completedIds.includes(path.id) ? "opacity-70" : "hover:shadow-md"
                  }`}
                >
                  <button onClick={(e) => toggleComplete(path.id, e)} className="relative z-10">
                    {completedIds.includes(path.id) ? (
                      <CheckCircle2 className="w-6 h-6 text-[#9b7ea8]" />
                    ) : (
                      <Circle className="w-6 h-6 text-[#e8d5db]" />
                    )}
                  </button>
                  <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-[#9b7ea8]">{path.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-[#5a4a5e] font-bold text-sm ${completedIds.includes(path.id) ? "line-through" : ""}`}>{path.title}</h3>
                    <p className="text-[10px] text-[#9e8c9f] italic">{path.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#e8d5db]" />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => setActivePath(null)} className="mb-6 flex items-center gap-2 text-[#9e8c9f] text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Roadmap
            </button>

            <div className="bg-white/95 p-8 rounded-[3rem] shadow-2xl min-h-[480px] flex flex-col border border-white">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-[#9b7ea8] uppercase tracking-widest block">
                  {activePath.title} • {currentStep === 3 ? "AI Guidance" : `Step ${currentStep + 1}`}
                </span>
                <div className="flex gap-1 mt-3">
                  {[0, 1, 2, 3].map(i => (
                    <button 
                      key={i} 
                      onClick={() => i < currentStep && setCurrentStep(i)}
                      className={`h-1 flex-1 rounded-full transition-all ${i <= currentStep ? "bg-[#9b7ea8]" : "bg-purple-50"}`} 
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-medium text-[#5a4a5e] mb-4">Centering</h2>
                      <p className="text-[#9e8c9f] text-lg italic leading-relaxed">"Close your eyes. Imagine a safe place where only the two of you exist. Breathe together for 60 seconds."</p>
                    </motion.div>
                  )}
                  {currentStep === 1 && (
                    <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-medium text-[#5a4a5e] mb-4">Sharing</h2>
                      <p className="text-[#9e8c9f] text-lg italic leading-relaxed">"Today's prompt: What is one thing you appreciate about how we handled our last disagreement?"</p>
                    </motion.div>
                  )}
                  {currentStep === 2 && (
                    <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Bot className="w-5 h-5 text-[#9b7ea8]" />
                        <h2 className="text-xl font-medium text-[#5a4a5e]">Personal Reflection</h2>
                      </div>
                      <textarea 
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder="Write your heart out... AI therapist will listen."
                        className="w-full h-40 p-5 rounded-[2rem] bg-purple-50/30 border-none text-[#5a4a5e] italic focus:ring-2 focus:ring-purple-100 outline-none"
                      />
                    </motion.div>
                  )}
                  {currentStep === 3 && (
                    <motion.div key="s4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <div className="bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] p-6 rounded-[2.5rem] text-white shadow-xl relative">
                        <Sparkles className="absolute top-4 right-4 w-5 h-5 opacity-50" />
                        <p className="text-lg italic leading-relaxed">"{aiResponse}"</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    className="px-6 py-5 rounded-2xl font-bold bg-white border border-purple-100 text-[#9e8c9f]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                )}
                <button 
                  onClick={handleNext}
                  disabled={currentStep === 2 && !reflection.trim()}
                  className={`flex-1 py-5 rounded-2xl font-bold shadow-xl transition-all ${
                    currentStep === 2 && !reflection.trim() 
                    ? "bg-gray-100 text-gray-400" 
                    : "bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] text-white"
                  }`}
                >
                  {currentStep === 2 ? "Get AI Guidance" : currentStep === 3 ? "Finish & Log Stage" : "Continue"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}

export default Heal;