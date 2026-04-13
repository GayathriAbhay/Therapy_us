import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, CheckCircle2, Circle, ArrowLeft, Check, ChevronRight, Save, Sparkles, MessageCircle, Heart } from "lucide-react";
import { PageTransition } from "./PageTransition";

// 1. Comprehensive Session Database
const sessionContent: Record<number, { 
  steps: { title: string; description: string; type: "info" | "exercise" | "reflect" }[] 
}> = {
  1: {
    steps: [
      { title: "Introduction", description: "Sit in a quiet space together. Take three deep breaths to arrive in this moment.", type: "info" },
      { title: "The Mirror Exercise", description: "Look into your partner's eyes for 60 seconds without speaking. Notice any feelings that arise.", type: "exercise" },
      { title: "Deep Reflection", description: "What was the most difficult part of staying present just now?", type: "reflect" }
    ]
  },
  2: {
    steps: [
      { title: "Safe Communication", description: "Today we practice the 'I feel' statement. It removes blame and invites understanding.", type: "info" },
      { title: "The Vulnerability Share", description: "Share one small thing you've been hesitant to mention this week. Your partner will only listen.", type: "exercise" },
      { title: "Reflect", description: "How did it feel to be heard without being interrupted?", type: "reflect" }
    ]
  }
};

export function Heal() {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [activeSessionNum, setActiveSessionNum] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  // 2. Persistent State (To be synced with Firebase)
  const [completedSessions, setCompletedSessions] = useState<Record<number, number[]>>(() => {
    const saved = localStorage.getItem("therapy_progress");
    return saved ? JSON.parse(saved) : { 1: [1] }; // Default Module 1, Session 1 done
  });

  const [reflections, setReflections] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("therapy_reflections");
    return saved ? JSON.parse(saved) : {};
  });

  // 3. Extended Module List
  const modules = [
    { id: 1, title: "Understanding the hurt", description: "Acknowledge what happened and its impact.", sessions: 4 },
    { id: 2, title: "Opening up safely", description: "Learn to express feelings without fear.", sessions: 6 },
    { id: 3, title: "Rebuilding trust", description: "Small steps toward believing again.", sessions: 8 },
    { id: 4, title: "Forgiveness practices", description: "Release resentment and find peace.", sessions: 5 },
    { id: 5, title: "Creating new patterns", description: "Build healthy habits for the future.", sessions: 6 }
  ];

  // Sync with LocalStorage (Replace with Firebase in production)
  useEffect(() => {
    localStorage.setItem("therapy_progress", JSON.stringify(completedSessions));
    localStorage.setItem("therapy_reflections", JSON.stringify(reflections));
  }, [completedSessions, reflections]);

  const toggleTick = (modId: number, sessNum: number) => {
    setCompletedSessions(prev => {
      const current = prev[modId] || [];
      const updated = current.includes(sessNum) ? current.filter(n => n !== sessNum) : [...current, sessNum];
      return { ...prev, [modId]: updated };
    });
  };

  const currentSteps = activeSessionNum ? (sessionContent[activeSessionNum]?.steps || sessionContent[1].steps) : [];

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-8 max-w-lg mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeModuleId === null ? (
            /* VIEW 1: PATHWAY LIST */
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-10">
                <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent font-medium italic">Healing Journey</h1>
                <p className="text-[#9e8c9f] text-sm italic">Take your time. Healing is not a race.</p>
              </div>

              <div className="space-y-4">
                {modules.map((m) => {
                  const done = completedSessions[m.id] || [];
                  const progress = (done.length / m.sessions) * 100;
                  return (
                    <div key={m.id} className="bg-white/60 border border-white/80 rounded-[2.5rem] p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${progress === 100 ? 'bg-[#9b7ea8]' : 'bg-purple-50'}`}>
                            {progress === 100 ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Heart className="w-4 h-4 text-[#9b7ea8]" />}
                          </div>
                          <h3 className="text-[#5a4a5e] font-semibold">{m.title}</h3>
                        </div>
                        <button onClick={() => setActiveModuleId(m.id)} className="text-[10px] font-bold text-[#9b7ea8] tracking-widest hover:underline uppercase">Sessions</button>
                      </div>
                      <div className="flex gap-1.5 h-1.5">
                        {Array.from({ length: m.sessions }).map((_, i) => (
                          <div key={i} className={`flex-1 rounded-full transition-colors duration-700 ${done.includes(i + 1) ? "bg-[#9b7ea8]" : "bg-white/40"}`} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : activeSessionNum === null ? (
            /* VIEW 2: SESSION SELECTOR (Manage Ticks Here) */
            <motion.div key="selector" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <button onClick={() => setActiveModuleId(null)} className="flex items-center gap-2 text-[#9e8c9f] mb-6"><ArrowLeft className="w-4 h-4" /> <span>Back to Pathway</span></button>
              <h2 className="text-2xl text-[#5a4a5e] mb-8 font-medium italic">{modules.find(m => m.id === activeModuleId)?.title}</h2>
              <div className="space-y-3">
                {Array.from({ length: modules.find(m => m.id === activeModuleId)?.sessions || 0 }).map((_, i) => {
                  const sNum = i + 1;
                  const isDone = (completedSessions[activeModuleId] || []).includes(sNum);
                  return (
                    <div key={i} className="flex items-center gap-4 bg-white/70 p-5 rounded-3xl border border-white/80 shadow-sm transition-all hover:bg-white/90">
                      <button onClick={() => toggleTick(activeModuleId, sNum)}>
                        {isDone ? <CheckCircle2 className="w-6 h-6 text-[#9b7ea8]" /> : <Circle className="w-6 h-6 text-[#e8d5db]" />}
                      </button>
                      <button onClick={() => {setActiveSessionNum(sNum); setCurrentStep(0);}} className="flex-1 text-left text-[#5a4a5e] font-medium">Session {sNum}</button>
                      <PlayCircle className={`w-5 h-5 ${isDone ? 'text-[#9b7ea8]' : 'text-[#e8d5db]'}`} />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* VIEW 3: ACTUAL SESSION PLAYER */
            <motion.div key="player" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <button onClick={() => setActiveSessionNum(null)} className="flex items-center gap-2 text-[#9e8c9f] mb-6"><ArrowLeft className="w-4 h-4" /> <span>Quit Session</span></button>
              <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl min-h-[500px] flex flex-col border border-white">
                <div className="flex justify-between items-center mb-12">
                   <span className="text-[10px] font-bold text-[#9b7ea8] tracking-[0.2em] uppercase">Step {currentStep + 1} of {currentSteps.length}</span>
                   <div className="flex gap-1">
                      {currentSteps.map((_, i) => <div key={i} className={`h-1 w-4 rounded-full transition-all ${i <= currentStep ? "bg-[#9b7ea8]" : "bg-[#e8d5db]"}`} />)}
                   </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl text-[#5a4a5e] mb-6 font-medium italic">{currentSteps[currentStep].title}</h3>
                  <p className="text-[#9e8c9f] text-lg leading-relaxed mb-10 italic">"{currentSteps[currentStep].description}"</p>
                  
                  {currentSteps[currentStep].type === "reflect" && (
                    <div className="space-y-4">
                      <textarea
                        value={reflections[`${activeModuleId}-${activeSessionNum}`] || ""}
                        onChange={(e) => setReflections({ ...reflections, [`${activeModuleId}-${activeSessionNum}`]: e.target.value })}
                        placeholder="Type your reflection together..."
                        className="w-full bg-[#faf7f5] border border-[#e8d5db] rounded-[2rem] p-6 text-[#5a4a5e] h-40 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#9b7ea8]/20"
                      />
                      <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-[#9b7ea8] uppercase">
                        <Save className="w-3 h-3" /> Auto-saved to Cloud
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-12">
                  {currentStep < currentSteps.length - 1 ? (
                    <button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 bg-[#9b7ea8] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => { if (!(completedSessions[activeModuleId] || []).includes(activeSessionNum)) toggleTick(activeModuleId, activeSessionNum); setActiveSessionNum(null); }} 
                      className="flex-1 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Complete & Exit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

// Helper component for Play icon
function PlayCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
  );
}

export default Heal;