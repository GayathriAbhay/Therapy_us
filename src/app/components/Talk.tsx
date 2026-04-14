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
import { Send, RefreshCw, Heart } from "lucide-react";

export function Talk() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- ROLE LOGIC ---
  // We store the role in localStorage so the device remembers who it is
  const [myRole, setMyRole] = useState(localStorage.getItem("chat_role") || "user1");

  const spaceId = "Marapatti130922";

  const toggleRole = () => {
    const newRole = myRole === "user1" ? "user2" : "user1";
    setMyRole(newRole);
    localStorage.setItem("chat_role", newRole);
  };

  // 1. Listen for messages
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
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => unsub();
  }, []);

  // 2. Send Message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const textToSend = input;
    setInput(""); 

    try {
      await addDoc(collection(db, "spaces", spaceId, "messages"), {
        text: textToSend,
        sender: myRole, // This is key: it labels the message as yours
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-[#FFFDF9] relative">
      {/* Header */}
      <div className="p-6 border-b border-purple-50 bg-white/60 backdrop-blur-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent italic">
            Our Conversation
          </h1>
          <p className="text-[10px] text-[#9e8c9f] uppercase tracking-widest">
            Logged in as: <span className="text-[#9b7ea8] font-bold">{myRole === "user1" ? "Partner A" : "Partner B"}</span>
          </p>
        </div>
        
        {/* Role Switcher - Click this on ONE device to fix the alignment */}
        <button 
          onClick={toggleRole}
          className="p-2 bg-purple-50 rounded-full text-[#9b7ea8] hover:bg-purple-100 transition-colors"
          title="Switch Role"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex ${msg.sender === myRole ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] p-4 rounded-[2rem] shadow-sm relative ${
              msg.sender === myRole 
                ? "bg-[#9b7ea8] text-white rounded-tr-none shadow-purple-100" 
                : "bg-white border border-purple-50 text-[#5a4a5e] rounded-tl-none"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              
              {/* Optional: Small tail for the bubble */}
              <div className={`absolute top-0 w-4 h-4 ${
                msg.sender === myRole 
                ? "bg-[#9b7ea8] -right-1 rounded-bl-full" 
                : "bg-white -left-1 rounded-br-full border-t border-l border-purple-50"
              }`} />
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
            className="bg-[#9b7ea8] p-3 rounded-full text-white shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}