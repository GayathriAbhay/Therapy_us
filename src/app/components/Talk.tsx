import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db } from "../../firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { Send, User, Heart } from "lucide-react";

export function Talk() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const spaceId = "Marapatti130922";
  const myRole = "user1"; // On the other device, change this to "user2"

  // 1. Listen for messages in real-time
  useEffect(() => {
    const q = query(
      collection(db, "spaces", spaceId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      
      // Auto-scroll to bottom
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsub();
  }, []);

  // 2. Send Message logic
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: myRole,
      timestamp: serverTimestamp(),
    };

    setInput(""); // Clear input immediately for better UX

    try {
      await addDoc(collection(db, "spaces", spaceId, "messages"), newMessage);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-[#FFFDF9]">
      {/* Header */}
      <div className="p-6 border-b border-purple-50 bg-white/60 backdrop-blur-md">
        <h1 className="text-2xl font-medium bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent italic">
          Our Conversation
        </h1>
        <p className="text-[10px] text-[#9e8c9f] uppercase tracking-widest mt-1">
          Directly connected
        </p>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === myRole ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] p-4 rounded-[2rem] shadow-sm ${
              msg.sender === myRole 
                ? "bg-[#9b7ea8] text-white rounded-tr-none" 
                : "bg-white border border-purple-50 text-[#5a4a5e] rounded-tl-none"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-lg mx-auto">
        <form 
          onSubmit={sendMessage}
          className="bg-white border border-purple-100 rounded-full p-2 shadow-2xl flex items-center gap-2 backdrop-blur-xl"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-4 py-2 outline-none text-[#5a4a5e] text-sm"
          />
          <button 
            type="submit"
            className="bg-[#9b7ea8] p-3 rounded-full text-white shadow-lg hover:bg-[#8a6d97] transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}