import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Heart } from "lucide-react";
import { db } from "../../firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

export function Talk() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use a hardcoded Space ID for now, or get it from your "Login" state
  const spaceId = "our-secret-space-123"; 

  // 1. Listen for new messages
  useEffect(() => {
    const q = query(
      collection(db, "spaces", spaceId, "messages"),
      orderBy("createdAt", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      // Scroll to bottom on new message
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => unsubscribe();
  }, [spaceId]);

  // 2. Send Message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;

    await addDoc(collection(db, "spaces", spaceId, "messages"), {
      text: msg,
      sender: "UserA", // You'll swap this with actual Auth later
      createdAt: serverTimestamp(),
    });
    setMsg("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-lg mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex ${m.sender === "UserA" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              m.sender === "UserA" 
              ? "bg-[#9b7ea8] text-white rounded-tr-none" 
              : "bg-white text-[#5a4a5e] rounded-tl-none border border-purple-50"
            }`}>
              <p className="text-sm">{m.text}</p>
            </div>
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-4 rounded-2xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#9b7ea8]/20 italic"
        />
        <button type="submit" className="bg-[#9b7ea8] text-white p-4 rounded-2xl shadow-lg">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}