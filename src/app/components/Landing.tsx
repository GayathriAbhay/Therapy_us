import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Lock } from "lucide-react";

export function Landing({ onUnlock }: { onUnlock: (id: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleEntry = () => {
    // The shared password you set
    if (password === "Marapatti130922") {
      localStorage.setItem("shared_space_id", password);
      onUnlock(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center px-6 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 p-4 bg-purple-50 rounded-full"
      >
        <Heart className="w-12 h-12 text-[#9b7ea8] fill-[#9b7ea8]" />
      </motion.div>
      
      <h1 className="text-3xl font-medium text-[#5a4a5e] mb-2 italic">Our Safe Space</h1>
      <p className="text-[#9e8c9f] text-sm mb-8">Enter the secret password to enter our world</p>

      <div className="w-full max-w-xs space-y-4">
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Secret password..."
            className={`w-full p-4 rounded-2xl border bg-white focus:outline-none transition-all ${
              error ? "border-red-300 shake" : "border-purple-100 focus:ring-2 focus:ring-[#9b7ea8]/20"
            }`}
          />
          <Lock className="absolute right-4 top-4 w-5 h-5 text-[#e8d5db]" />
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleEntry}
          className="w-full bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] text-white py-4 rounded-2xl font-bold shadow-lg"
        >
          Enter Space
        </motion.button>
      </div>
    </div>
  );
}